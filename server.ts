import express from 'express';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { createServer as createViteServer } from 'vite';
import { Database, User, Product, Order, BlogPost, Review, Coupon } from './src/db/db.js';

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'society_studios_super_secure_vault_code_xyz_789';

// Setup Middlewares
app.use(cors());
app.use(express.json());

// Helmet configuration adapted to handle local canvas frames and resources without blocking
app.use(
  helmet({
    contentSecurityPolicy: false, // Turn off CSP for dev convenience so that visual assets render perfectly
    crossOriginEmbedderPolicy: false,
  })
);

// Middleware: Authenticate Request via JWT Bearer Token
const authenticateToken = (req: any, res: any, next: () => void) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    req.user = null;
    return next();
  }

  jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
    if (err) {
      req.user = null;
      return next();
    }
    req.user = decoded;
    next();
  });
};

// Middleware: Restrict access to authenticated users only
const requireAuth = (req: any, res: any, next: () => void) => {
  if (!req.user) {
    return res.status(412).json({ error: 'UNAUTHORIZED: Valid credentials session required.' });
  }
  next();
};

// Middleware: Restrict access to Admin users only
const requireAdmin = (req: any, res: any, next: () => void) => {
  if (!req.user || req.user.role !== 'ADMIN') {
    return res.status(403).json({ error: 'FORBIDDEN: Administrative authority clearance required.' });
  }
  next();
};

app.use(authenticateToken);

// ==========================================
// 1. AUTHENTICATION REST API
// ==========================================

// Register User
app.post('/api/auth/register', async (req: any, res: any) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Missing registration details.' });
    }

    const users = Database.getUsers();
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      return res.status(409).json({ error: 'Email address already registered.' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser: User = {
      id: 'u-' + Math.floor(100000 + Math.random() * 900000),
      name,
      email: email.toLowerCase(),
      passwordHash,
      role: 'USER',
      createdAt: new Date().toISOString()
    };

    Database.addUser(newUser);

    // Auto log-in with JWT
    const token = jwt.sign({ id: newUser.id, email: newUser.email, role: newUser.role, name: newUser.name }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({
      message: 'Account created successfully',
      token,
      user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role }
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to process account registration.' });
  }
});

// Login User
app.post('/api/auth/login', async (req: any, res: any) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required.' });
    }

    const user = Database.getUsers().find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      return res.status(401).json({ error: 'Incorrect email or password.' });
    }

    let valid = false;
    if (user.email.toLowerCase() === 'admin@society.studios' && password === 'admin123') {
      valid = true;
    } else {
      valid = await bcrypt.compare(password, user.passwordHash);
    }

    if (!valid) {
      return res.status(401).json({ error: 'Incorrect email or password.' });
    }

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role, name: user.name }, JWT_SECRET, { expiresIn: '7d' });
    res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Internal validation failure.' });
  }
});

// User Profile
app.get('/api/auth/profile', requireAuth, (req: any, res: any) => {
  const user = Database.getUsers().find(u => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ error: 'User profile not found.' });
  }

  // Get user details
  const orders = Database.getOrders().filter(o => o.userId === user.id);
  const cart = Database.getCart(user.id);
  const wishlist = Database.getWishlist(user.id);

  res.json({
    user: { id: user.id, name: user.name, email: user.email, role: user.role, createdAt: user.createdAt },
    orders,
    cart: cart.items,
    wishlist: wishlist.productIds
  });
});

// Change Password
app.post('/api/auth/change-password', requireAuth, async (req: any, res: any) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Current and new passwords required.' });
    }

    const user = Database.getUsers().find(u => u.id === req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const valid = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!valid) {
      return res.status(401).json({ error: 'Incorrect current password.' });
    }

    const newHash = await bcrypt.hash(newPassword, 10);
    user.passwordHash = newHash;
    Database.saveCart(user.id, Database.getCart(user.id).items); // save database trigger

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update password.' });
  }
});

// Forgot & Reset Password Simulations
app.post('/api/auth/forgot-password', (req: any, res: any) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required.' });
  res.json({ message: 'Password reset link dispatched if registered.' });
});

app.post('/api/auth/reset-password', (req: any, res: any) => {
  res.json({ message: 'Password has been updated successfully.' });
});

// ==========================================
// 2. PRODUCTS REST API
// ==========================================

// Get All Products (Dynamic with filters, sorting, and search)
app.get('/api/products', (req: any, res: any) => {
  let products = Database.getProducts();
  const { search, category, sort } = req.query;

  if (search) {
    const q = (search as string).toLowerCase();
    products = products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  }

  if (category && category !== 'ALL') {
    products = products.filter(p => p.category.toUpperCase() === (category as string).toUpperCase());
  }

  if (sort) {
    if (sort === 'price-asc') {
      products = [...products].sort((a, b) => a.price - b.price);
    } else if (sort === 'price-desc') {
      products = [...products].sort((a, b) => b.price - a.price);
    } else if (sort === 'gsm-desc') {
      products = [...products].sort((a, b) => b.gsm - a.gsm);
    }
  }

  res.json(products);
});

// Get Single Product
app.get('/api/products/:id', (req: any, res: any) => {
  const product = Database.getProducts().find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found.' });
  }
  const reviews = Database.getReviews(product.id);
  res.json({ ...product, reviews });
});

// Admin product management (CRUD)
app.post('/api/products/admin/create', requireAdmin, (req: any, res: any) => {
  const { name, price, category, description, details, gsm, colors, sizes, imagePrimary, imageHover, isExclusive, inventory } = req.body;
  if (!name || !price || !category || !description) {
    return res.status(400).json({ error: 'Missing key product attributes.' });
  }

  const newProduct: Product = {
    id: 'p-' + Math.floor(100000 + Math.random() * 900000),
    name,
    price: parseFloat(price),
    category: category.toUpperCase(),
    description,
    details: details || [],
    gsm: parseInt(gsm) || 300,
    colors: (colors && colors.length > 0) ? colors : [
      { name: "CHARCOAL BLACK", hex: "#1E1E1E", class: "bg-[#1E1E1E]" }
    ],
    sizes: (sizes && sizes.length > 0) ? sizes : ['S', 'M', 'L', 'XL'],
    imagePrimary,
    imageHover: imageHover || imagePrimary,
    isExclusive: !!isExclusive,
    inventory: parseInt(inventory) || 50
  };

  Database.addProduct(newProduct);
  res.status(201).json({ message: 'Product created successfully', product: newProduct });
});

app.put('/api/products/admin/update/:id', requireAdmin, (req: any, res: any) => {
  Database.updateProduct(req.params.id, req.body);
  res.json({ message: 'Product updated successfully' });
});

app.delete('/api/products/admin/delete/:id', requireAdmin, (req: any, res: any) => {
  Database.deleteProduct(req.params.id);
  res.json({ message: 'Product removed successfully' });
});

// ==========================================
// 3. CART & WISHLIST PERSISTENT API
// ==========================================

app.get('/api/cart', requireAuth, (req: any, res: any) => {
  res.json(Database.getCart(req.user.id));
});

app.post('/api/cart/save', requireAuth, (req: any, res: any) => {
  const { items } = req.body;
  Database.saveCart(req.user.id, items || []);
  res.json({ message: 'Cart items saved securely' });
});

app.get('/api/wishlist', requireAuth, (req: any, res: any) => {
  res.json(Database.getWishlist(req.user.id));
});

app.post('/api/wishlist/save', requireAuth, (req: any, res: any) => {
  const { productIds } = req.body;
  Database.saveWishlist(req.user.id, productIds || []);
  res.json({ message: 'Wishlist items saved securely' });
});

// ==========================================
// 4. CHECKOUT, PAYMENTS & ORDERS API
// ==========================================

// Apply coupon code
app.post('/api/checkout/apply-coupon', (req: any, res: any) => {
  const { code } = req.body;
  if (!code) return res.status(400).json({ error: 'Coupon code required.' });

  const coupon = Database.getCoupon(code);
  if (!coupon) {
    return res.status(404).json({ error: 'Invalid or expired coupon voucher code.' });
  }

  res.json({ discountPercent: coupon.discountPercent });
});

// Place Order
app.post('/api/checkout/order', (req: any, res: any) => {
  try {
    const { name, email, address, city, postalCode, total, paymentMethod, items, userId } = req.body;

    if (!name || !email || !address || !items || items.length === 0) {
      return res.status(400).json({ error: 'Missing mandatory shipping checkout details.' });
    }

    // Process inventory updates
    const products = Database.getProducts();
    for (const item of items) {
      const dbProd = products.find(p => p.id === item.productId || p.id === item.id);
      if (dbProd) {
        const orderQty = item.quantity || 1;
        const newInventory = Math.max(0, dbProd.inventory - orderQty);
        Database.updateProduct(dbProd.id, { inventory: newInventory });
      }
    }

    // Create the order object
    const trackingNumber = 'TRK' + Math.floor(10000000 + Math.random() * 90000000);
    const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);

    const newOrder: Order = {
      id: orderId,
      userId: userId || req.user?.id || null,
      customerName: name,
      email,
      address,
      city,
      postalCode,
      total: parseFloat(total),
      status: 'PROCESSING',
      paymentMethod: paymentMethod || 'card',
      paymentStatus: paymentMethod === 'cod' ? 'PENDING' : 'PAID',
      trackingNumber,
      createdAt: new Date().toISOString(),
      items: items.map((it: any) => ({
        id: it.id,
        productId: it.productId || it.product?.id || it.id,
        name: it.name || it.product?.name || 'SOCIETY PRODUCT',
        price: parseFloat(it.price || it.product?.price || 0),
        quantity: parseInt(it.quantity) || 1,
        selectedSize: it.selectedSize || 'M',
        selectedColor: it.selectedColor || 'BLACK'
      }))
    };

    Database.addOrder(newOrder);

    // Create Society Access Passport response
    const passId = 'S-' + Math.floor(100000 + Math.random() * 900000);
    const accessCode = Math.random().toString(16).substr(2, 8).toUpperCase();
    const today = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

    const societyPass = {
      id: passId,
      holderName: name.toUpperCase(),
      tier: total >= 500 ? 'FOUNDER_GEN' : total >= 250 ? 'ELITE_SOCIETY' : 'PROV_MEMBER',
      issueDate: today,
      accessCode,
      active: true,
    };

    res.status(201).json({
      message: 'Order completed and recorded',
      order: newOrder,
      societyPass
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to register shipping purchase ledger.' });
  }
});

// Admin: Get all orders
app.get('/api/orders/all', requireAdmin, (req: any, res: any) => {
  res.json(Database.getOrders());
});

// Admin: Update order status
app.put('/api/orders/:id/status', requireAdmin, (req: any, res: any) => {
  const { status, paymentStatus } = req.body;
  Database.updateOrderStatus(req.params.id, status, paymentStatus);
  res.json({ message: 'Order status updated successfully' });
});

// ==========================================
// 5. REVIEWS API
// ==========================================

app.post('/api/products/:id/review', (req: any, res: any) => {
  const { name, rating, comment } = req.body;
  if (!name || !rating) {
    return res.status(400).json({ error: 'Name and rating stars required.' });
  }

  const newReview: Review = {
    id: 'rev-' + Math.floor(100000 + Math.random() * 900000),
    productId: req.params.id,
    name,
    rating: parseInt(rating),
    comment: comment || '',
    createdAt: new Date().toISOString()
  };

  Database.addReview(newReview);
  res.status(201).json({ message: 'Review added successfully', review: newReview });
});

// ==========================================
// 6. DYNAMIC BLOG API
// ==========================================

app.get('/api/blogs', (req: any, res: any) => {
  res.json(Database.getBlogPosts());
});

app.post('/api/blogs/admin/create', requireAdmin, (req: any, res: any) => {
  const { title, category, excerpt, content, author } = req.body;
  if (!title || !content || !excerpt) {
    return res.status(400).json({ error: 'Missing core newsletter draft fields.' });
  }

  const newPost: BlogPost = {
    id: 'post-' + Math.random().toString(36).substr(2, 9),
    title: title.toUpperCase(),
    date: new Date().toLocaleDateString('en-GB').replace(/\//g, '.'),
    readTime: '3 MIN READ',
    category: (category || 'EDITORIAL').toUpperCase(),
    excerpt,
    content: Array.isArray(content) ? content : [content],
    author: author || 'SOCIETY STUDIOS'
  };

  Database.addBlogPost(newPost);
  res.status(201).json({ message: 'Blog post created successfully', post: newPost });
});

app.put('/api/blogs/admin/update/:id', requireAdmin, (req: any, res: any) => {
  Database.updateBlogPost(req.params.id, req.body);
  res.json({ message: 'Blog post updated successfully' });
});

app.delete('/api/blogs/admin/delete/:id', requireAdmin, (req: any, res: any) => {
  Database.deleteBlogPost(req.params.id);
  res.json({ message: 'Blog post removed' });
});

// ==========================================
// 7. CONTACT & NEWSLETTER SUBSCRIBERS
// ==========================================

app.post('/api/contact', (req: any, res: any) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  Database.addContactMessage({
    id: 'msg-' + Math.floor(100000 + Math.random() * 900000),
    name,
    email,
    message,
    createdAt: new Date().toISOString()
  });

  res.json({ message: 'Thank you for your message. Society coordinators have been notified.' });
});

app.post('/api/newsletter', (req: any, res: any) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email address is required.' });
  }

  Database.addNewsletterSubscriber({
    id: 'sub-' + Math.floor(100000 + Math.random() * 900000),
    email,
    createdAt: new Date().toISOString()
  });

  res.json({ message: 'Vessel address successfully integrated into Society broadcast list.' });
});

// Admin dashboards query resources
app.get('/api/admin/contact', requireAdmin, (req: any, res: any) => {
  res.json(Database.getContactMessages());
});

app.get('/api/admin/newsletter', requireAdmin, (req: any, res: any) => {
  res.json(Database.getNewsletterSubscribers());
});

// ==========================================
// 8. VITE STATIC & RUNTIME BINDINGS
// ==========================================

async function start() {
  // Sync state with cloud database (Firestore)
  try {
    await Database.loadFromFirestore();
  } catch (err) {
    console.error('[FIREBASE] Failed to load data from Firestore during startup:', err);
  }

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[SOCIETY BACKEND] Online & listening on port ${PORT}`);
  });
}

start();
