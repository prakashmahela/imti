import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, HelpCircle, X, Check } from 'lucide-react';

import { Product, CartItem, SocietyPass } from './types';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import Header from './components/Header';
import Hero from './components/Hero';
import EditorialGrid from './components/EditorialGrid';
import FeaturedUniform from './components/FeaturedUniform';
import BrandStory from './components/BrandStory';
import ShopSection from './components/ShopSection';
import ProductDetailModal from './components/ProductDetailModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import PassViewerModal from './components/PassViewerModal';
import Footer from './components/Footer';
import FeaturedCollection from './components/FeaturedCollection';
import BlogDrawer from './components/BlogDrawer';
import AccessPortalModal from './components/AccessPortalModal';
import { ApiClient } from './lib/api';


// Generated Asset Registry Paths
const IMAGE_HERO = 'https://i.ibb.co/n84LXD0m/Chat-GPT-Image-Jun-23-2026-10-57-37-AM.png';
const IMAGE_GRID_LEFT = 'https://i.ibb.co/NdJZh7nJ/Hoodies-Free-delivery-on-adidas-UK.jpg';
const IMAGE_GRID_LEFT_HOVER = 'https://i.ibb.co/hF6P8ygm/Cozy-and-Stylish-Hoodies-for-Any-Outfit.jpg';
const IMAGE_GRID_RIGHT = 'https://i.ibb.co/cKW2gBHH/Calvin-Klein-Black-Cotton-Blend-Fleece-Hoodie-Large-Mens.jpg';
const IMAGE_GRID_RIGHT_HOVER = 'https://i.ibb.co/Lzbvny7H/Buy-Calvin-Klein-Black-Monogram-Hoodie-from-the-Next-UK-online-shop.jpg';
const IMAGE_FEATURED_GRID = '/src/assets/images/three_hoodies_featured_1781837279453.jpg';
const IMAGE_STORY_CINEMATIC = '/src/assets/images/brand_story_cinematic_1781837292148.jpg';

const PRODUCT_BLACK = 'https://i.ibb.co/WN8XTMD1/download-2.jpg';
const PRODUCT_CREAM = 'https://i.ibb.co/LXp1qGPj/Cozy-hoodie-girls-fleece.jpg';
const PRODUCT_GREY = 'https://i.ibb.co/RTY1dkgS/MANCHETTE-LIGHT-GREY-MELANGE-HOODIE-XXL.jpg';
const PRODUCT_CAP = 'https://i.ibb.co/RkzsnWf1/Casquette-Noir-Homme.jpg';

const PRODUCTS: Product[] = [
  {
    id: 'uniform-hoodie',
    name: 'THE UNIFORM HOODIE',
    price: 185,
    category: 'ESSENTIALS',
    description: 'Heavyweight loopback cotton hoodie. 500 GSM thick organic loop back knit texture, drop shoulder slouch posture, with high standing doubled felted hood loops.',
    details: [
      '500 GSM loopback organic cotton jersey',
      'Thick dual felted double hood without drawstrings',
      'Dropped shoulder architectural slouch profile',
      'Heavy-rib horizontal knit waistband & wrist cuffs',
      'Finished with central debossed tonal silicon print'
    ],
    gsm: 500,
    colors: [
      { name: 'CHARCOAL BLACK', hex: '#1E1E1E', class: 'bg-[#1E1E1E]' },
      { name: 'OATMEAL CREAM', hex: '#F0EFEA', class: 'bg-[#F0EFEA]' },
      { name: 'HEATHER GREY', hex: '#BABABA', class: 'bg-[#BABABA]' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    imagePrimary: PRODUCT_BLACK,
    imageHover: 'https://i.ibb.co/TM043sFH/download-1.jpg'
  },
  {
    id: 'hoodie-cream',
    name: 'THE OATMEAL STAPLE HOODIE',
    price: 185,
    category: 'ESSENTIALS',
    description: 'Oversized heavy loopback casual hoodie raw-dyed in charcoal oatmeal cream colorways. Engineered with reinforced box pockets.',
    details: [
      '500 GSM thick loops organic terry',
      'Kangaroo reinforced bottom double hand pockets',
      'Unstructured double-folded clean visual hood line',
      'Premium pre-shrunk wash for secure fits',
      'Raw loop details inside'
    ],
    gsm: 500,
    colors: [
      { name: 'OATMEAL CREAM', hex: '#F0EFEA', class: 'bg-[#F0EFEA]' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    imagePrimary: PRODUCT_CREAM,
    imageHover: 'https://i.ibb.co/Z6cb3Xg7/download-3.jpg'
  },
  {
    id: 'hoodie-grey',
    name: 'THE STONE GREY STAPLE HOODIE',
    price: 185,
    category: 'ESSENTIALS',
    description: 'Stripe-cut slouch heavyweight loopback hoodie. Washed stone gray tone, with heavy felted cuffs and flatlock geometry stitches.',
    details: [
      '500 GSM French terry loops cotton jersey',
      'Signature horizontal felt split cuffs detailing',
      'Dropped shoulder posture',
      'Silky silicone waterbase branding detail',
      'Extremely dense heavy weight drape'
    ],
    gsm: 500,
    colors: [
      { name: 'HEATHER GREY', hex: '#BABABA', class: 'bg-[#BABABA]' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    imagePrimary: PRODUCT_GREY,
    imageHover: 'https://i.ibb.co/JWYssHns/Men-s-Casual-Minimalist-Solid-Color-Kangaroo-Pocket-Drawstring-Hoodie-Suitable-For-Daily-Commute-A.jpg'
  },
  {
    id: 'trucker-cap',
    name: 'SIGNATURE TRUCKER CAP',
    price: 65,
    category: 'ACCESSORIES',
    description: 'Minimal 6-panel heavy cotton twill crown cap in washed coal black. Detailed with customized flat high contrast white embroideries.',
    details: [
      '100% heavyweight robust washed cotton twill cap',
      'White high-density flat-embellished embroidery SOCIETY print',
      'Adjustable snapback strap backed by custom brass clasp',
      'Reinforced buckram inner front panels structure',
      'Raw distressed brim accents'
    ],
    gsm: 320,
    colors: [
      { name: 'CHARCOAL BLACK', hex: '#1E1E1E', class: 'bg-[#1E1E1E]' }
    ],
    sizes: ['ONE_SIZE'],
    imagePrimary: PRODUCT_CAP,
    imageHover: 'https://i.ibb.co/B1p7d56/Inspiration.jpg',
    isExclusive: true
  }
];

export default function App() {
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [savedPass, setSavedPass] = useState<SocietyPass | null>(null);
  const [currentPage, setCurrentPage] = useState<'home' | 'dolenga'>('home');
  const [productsList, setProductsList] = useState<Product[]>(PRODUCTS);

  // Panel toggles
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [passViewerOpen, setPassViewerOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [blogOpen, setBlogOpen] = useState(false);
  
  // Gate code prompt (Enter the society)
  const [societyModalOpen, setSocietyModalOpen] = useState(false);
  const [gateCode, setGateCode] = useState('');
  const [gateFeedback, setGateFeedback] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Initial read from local history storage databases
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('society_studios_bag');
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }

      const storedPass = localStorage.getItem('society_studios_passport');
      if (storedPass) {
        setSavedPass(JSON.parse(storedPass));
      }
    } catch (e) {
      console.error('Failed reading localStorage credentials', e);
    }
  }, []);

  // Sync products dynamically from real-time database backend
  useEffect(() => {
    const fetchProds = async () => {
      try {
        const data = await ApiClient.getProducts();
        if (data && data.length > 0) {
          setProductsList(data);
        }
      } catch (err) {
        console.error('Failed fetching products from PostgreSQL backend database. Using local static presets fallback.', err);
      }
    };
    fetchProds();

    const interval = setInterval(fetchProds, 8000);
    return () => clearInterval(interval);
  }, []);

  // Save changes back to localStorage & sync database backend
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('society_studios_bag', JSON.stringify(newCart));
    try {
      const itemsData = newCart.map(it => ({
        id: it.id,
        productId: it.product.id,
        selectedSize: it.selectedSize,
        selectedColor: it.selectedColor,
        selectedColorHex: it.selectedColorHex,
        quantity: it.quantity
      }));
      ApiClient.saveCartRemote(itemsData);
    } catch (e) {
      console.error('Failed saving remote cart:', e);
    }
  };

  const handleAddToCart = (product: Product, size: string, color: string, colorHex: string) => {
    const itemId = `${product.id}-${size}-${color.replace(/\s+/g, '')}`;
    const existing = cart.find((it) => it.id === itemId);

    if (existing) {
      const updated = cart.map((it) =>
        it.id === itemId ? { ...it, quantity: it.quantity + 1 } : it
      );
      saveCart(updated);
    } else {
      const newItem: CartItem = {
        id: itemId,
        product,
        selectedSize: size,
        selectedColor: color,
        selectedColorHex: colorHex,
        quantity: 1,
      };
      saveCart([...cart, newItem]);
    }
  };

  const handleUpdateQuantity = (itemId: string, amount: number) => {
    const targetItem = cart.find((it) => it.id === itemId);
    if (!targetItem) return;

    const nextQty = targetItem.quantity + amount;
    if (nextQty <= 0) {
      handleRemoveItem(itemId);
    } else {
      const updated = cart.map((it) =>
        it.id === itemId ? { ...it, quantity: nextQty } : it
      );
      saveCart(updated);
    }
  };

  const handleRemoveItem = (itemId: string) => {
    const filtered = cart.filter((it) => it.id !== itemId);
    saveCart(filtered);
  };

  const handleOrderComplete = (newPass: SocietyPass) => {
    setSavedPass(newPass);
    localStorage.setItem('society_studios_passport', JSON.stringify(newPass));
    // Flush shopping bag
    saveCart([]);
  };

  const handleRevokePass = () => {
    setSavedPass(null);
    localStorage.removeItem('society_studios_passport');
    setPassViewerOpen(false);
    alert('Cryptographic key revoked successfully. Scanning portal will now flag verification failure.');
  };

  const handleGateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (gateCode.trim().toUpperCase() === 'MOCK_SOCIETY') {
      const mockPass: SocietyPass = {
        id: 'M-' + Math.floor(100000 + Math.random() * 900000),
        holderName: 'DEVELOPER DISCOVER',
        tier: 'FOUNDER_GEN',
        issueDate: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }),
        accessCode: 'A0B2C4D6',
        active: true,
      };
      handleOrderComplete(mockPass);
      setGateFeedback('SUCCESS_ MOCKED ACCESS TO LEVEL_01 SECURED!');
      setTimeout(() => {
        setSocietyModalOpen(false);
        setGateCode('');
        setGateFeedback('');
        setPassViewerOpen(true);
      }, 1000);
    } else {
      setGateFeedback('INCORRECT RECIPIENT ACCESS PROTOCOL CODE.');
    }
  };

  const scrollUtility = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const targetOffset = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: targetOffset, behavior: 'smooth' });
    }
  };

  const filteredProducts = productsList.filter((product) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    );
  });

  return (
    <>
      <LoadingScreen onComplete={() => setLoading(false)} />
      {/* Scrollable layout elements are wrapped only after loading hides */}
      {!loading && (
        <div id="society-main-stage" className="relative bg-[#FAF9F6] min-h-screen selection:bg-neutral-300 selection:text-black">
          
          {/* Subtle Global Concrete Grains & Ambient Lighting */}
          <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20views%3D%220%200%20200%20200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F200%2Fsvg%22%3E%3Cfilter%20id%3D%22noise%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.8%22%20numOctaves%3D%223%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23noise)%22%2F%3E%3C%2Fsvg%3E')]" />
          
          <CustomCursor />

          {currentPage === 'home' ? (
            <>
              {/* Navigation Bar */}
              <Header
                cart={cart}
                savedPass={savedPass}
                onOpenCart={() => setCartOpen(true)}
                onOpenPassViewer={() => setPassViewerOpen(true)}
                onOpenEnterSociety={() => setSocietyModalOpen(true)}
                searchVal={searchQuery}
                onSearchChange={setSearchQuery}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                onOpenBlog={() => setBlogOpen(true)}
              />

              {/* Hero Widescreen Campaign */}
              <Hero
                heroImage={IMAGE_HERO}
                onShopClick={() => scrollUtility('shop-section')}
                onEnterSocietyClick={() => setSocietyModalOpen(true)}
              />

              {/* Campaign Closeup masonry gallery */}
              <EditorialGrid imageLeft={IMAGE_GRID_LEFT} imageHoverLeft={IMAGE_GRID_LEFT_HOVER} imageRight={IMAGE_GRID_RIGHT} imageHoverRight={IMAGE_GRID_RIGHT_HOVER} />

              {/* Interactive Uniform detailed configuration */}
              <FeaturedUniform
                products={productsList}
                onAddToCart={handleAddToCart}
                onOpenProductDetail={(prod) => setActiveProduct(prod)}
                creamImage={PRODUCT_CREAM}
                greyImage={PRODUCT_GREY}
                blackImage={PRODUCT_BLACK}
                gridBanner={IMAGE_FEATURED_GRID}
              />

              {/* Story narrative */}
              <BrandStory
                storyImage={IMAGE_STORY_CINEMATIC}
              />

              {/* Premium curated Featured Collection horizontal carousel */}
              <FeaturedCollection
                onAddToCart={handleAddToCart}
                onOpenProductDetail={(prod) => setActiveProduct(prod)}
              />

              {/* Ecommerce Catalog grid */}
              <ShopSection
                products={filteredProducts}
                onAddToCart={handleAddToCart}
                onOpenProductDetail={(prod) => setActiveProduct(prod)}
              />

              {/* Elegant dark Footer */}
              <Footer />
            </>
          ) : (
            <div className="pt-24 text-center">
              <p className="text-sm font-mono tracking-widest text-neutral-500 uppercase">PAGE NOT AVAILABLE</p>
              <button
                onClick={() => setCurrentPage('home')}
                className="mt-4 text-xs font-mono border-b border-black text-black pb-1 uppercase hover:text-neutral-500 hover:border-neutral-500 transition-colors"
              >
                Return to Home
              </button>
            </div>
          )}

          {/* SHOPPING BAG DRAWER */}
          <CartDrawer
            isOpen={cartOpen}
            cart={cart}
            onClose={() => setCartOpen(false)}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onCheckout={() => {
              setCartOpen(false);
              setCheckoutOpen(true);
            }}
          />

          {/* EDITORIAL BLOG DRAWER */}
          <BlogDrawer
            isOpen={blogOpen}
            onClose={() => setBlogOpen(false)}
          />

          {/* CHECKOUT MODAL FLOW */}
          <CheckoutModal
            isOpen={checkoutOpen}
            cart={cart}
            onClose={() => setCheckoutOpen(false)}
            onOrderSuccess={handleOrderComplete}
          />

          {/* PASSPORT DETAIL INSPECTOR */}
          <PassViewerModal
            isOpen={passViewerOpen}
            pass={savedPass}
            onClose={() => setPassViewerOpen(false)}
            onRevokePass={handleRevokePass}
          />

          {/* INDIVIDUAL GARMENT SPECS MODAL */}
          <ProductDetailModal
            product={activeProduct}
            onClose={() => setActiveProduct(null)}
            onAddToCart={handleAddToCart}
          />

          {/* SECURE INTEGRATED MEMBER & ADMIN PORTAL CONSOLE */}
          <AccessPortalModal
            isOpen={societyModalOpen}
            onClose={() => setSocietyModalOpen(false)}
            onOrderSuccess={handleOrderComplete}
            onOpenPassViewer={() => setPassViewerOpen(true)}
          />

        </div>
      )}
    </>
  );
}
