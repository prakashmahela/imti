{
  "entities": {
    "User": {
      "title": "User",
      "description": "User account registration details",
      "type": "object",
      "properties": {
        "id": { "type": "string" },
        "email": { "type": "string" },
        "passwordHash": { "type": "string" },
        "name": { "type": "string" },
        "role": { "type": "string", "enum": ["USER", "ADMIN"] },
        "createdAt": { "type": "string" }
      },
      "required": ["id", "email", "passwordHash", "name", "role", "createdAt"]
    },
    "ProductColor": {
      "title": "ProductColor",
      "description": "Color options for a product",
      "type": "object",
      "properties": {
        "name": { "type": "string" },
        "hex": { "type": "string" },
        "class": { "type": "string" }
      }
    },
    "Product": {
      "title": "Product",
      "description": "Garment / item available in catalog",
      "type": "object",
      "properties": {
        "id": { "type": "string" },
        "name": { "type": "string" },
        "price": { "type": "number" },
        "category": { "type": "string" },
        "description": { "type": "string" },
        "details": { "type": "array" },
        "gsm": { "type": "number" },
        "colors": { "type": "array" },
        "sizes": { "type": "array" },
        "imagePrimary": { "type": "string" },
        "imageHover": { "type": "string" },
        "isExclusive": { "type": "boolean" },
        "inventory": { "type": "number" }
      },
      "required": ["id", "name", "price", "category", "description", "details", "gsm", "colors", "sizes", "imagePrimary", "imageHover", "inventory"]
    },
    "CartItemData": {
      "title": "CartItemData",
      "description": "Item details inside a cart",
      "type": "object",
      "properties": {
        "id": { "type": "string" },
        "productId": { "type": "string" },
        "selectedSize": { "type": "string" },
        "selectedColor": { "type": "string" },
        "selectedColorHex": { "type": "string" },
        "quantity": { "type": "number" }
      }
    },
    "Cart": {
      "title": "Cart",
      "description": "Shopping cart for a registered user",
      "type": "object",
      "properties": {
        "userId": { "type": "string" },
        "items": { "type": "array" }
      },
      "required": ["userId", "items"]
    },
    "Wishlist": {
      "title": "Wishlist",
      "description": "Wishlist for a registered user",
      "type": "object",
      "properties": {
        "userId": { "type": "string" },
        "productIds": { "type": "array" }
      },
      "required": ["userId", "productIds"]
    },
    "OrderItem": {
      "title": "OrderItem",
      "description": "Product purchased inside an order",
      "type": "object",
      "properties": {
        "id": { "type": "string" },
        "productId": { "type": "string" },
        "name": { "type": "string" },
        "price": { "type": "number" },
        "quantity": { "type": "number" },
        "selectedSize": { "type": "string" },
        "selectedColor": { "type": "string" }
      }
    },
    "Order": {
      "title": "Order",
      "description": "Checkout order records",
      "type": "object",
      "properties": {
        "id": { "type": "string" },
        "userId": { "type": "string" },
        "customerName": { "type": "string" },
        "email": { "type": "string" },
        "address": { "type": "string" },
        "city": { "type": "string" },
        "postalCode": { "type": "string" },
        "total": { "type": "number" },
        "status": { "type": "string", "enum": ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"] },
        "paymentMethod": { "type": "string" },
        "paymentStatus": { "type": "string" },
        "trackingNumber": { "type": "string" },
        "createdAt": { "type": "string" },
        "items": { "type": "array" }
      },
      "required": ["id", "customerName", "email", "address", "city", "postalCode", "total", "status", "paymentMethod", "paymentStatus", "trackingNumber", "createdAt", "items"]
    },
    "BlogPost": {
      "title": "BlogPost",
      "description": "A magazine/journal post",
      "type": "object",
      "properties": {
        "id": { "type": "string" },
        "title": { "type": "string" },
        "date": { "type": "string" },
        "readTime": { "type": "string" },
        "category": { "type": "string" },
        "excerpt": { "type": "string" },
        "content": { "type": "array" },
        "author": { "type": "string" }
      },
      "required": ["id", "title", "date", "readTime", "category", "excerpt", "content", "author"]
    },
    "Review": {
      "title": "Review",
      "description": "User review for a specific product",
      "type": "object",
      "properties": {
        "id": { "type": "string" },
        "productId": { "type": "string" },
        "name": { "type": "string" },
        "rating": { "type": "number" },
        "comment": { "type": "string" },
        "createdAt": { "type": "string" }
      },
      "required": ["id", "productId", "name", "rating", "comment", "createdAt"]
    },
    "Coupon": {
      "title": "Coupon",
      "description": "Discount coupon definitions",
      "type": "object",
      "properties": {
        "code": { "type": "string" },
        "discountPercent": { "type": "number" },
        "active": { "type": "boolean" }
      },
      "required": ["code", "discountPercent", "active"]
    },
    "ContactMessage": {
      "title": "ContactMessage",
      "description": "User contact submission",
      "type": "object",
      "properties": {
        "id": { "type": "string" },
        "name": { "type": "string" },
        "email": { "type": "string" },
        "message": { "type": "string" },
        "createdAt": { "type": "string" }
      },
      "required": ["id", "name", "email", "message", "createdAt"]
    },
    "NewsletterSubscriber": {
      "title": "NewsletterSubscriber",
      "description": "Newsletter email subscription list",
      "type": "object",
      "properties": {
        "id": { "type": "string" },
        "email": { "type": "string" },
        "createdAt": { "type": "string" }
      },
      "required": ["id", "email", "createdAt"]
    }
  },
  "firestore": {
    "/users/{userId}": {
      "schema": "User",
      "description": "Registered user accounts"
    },
    "/products/{productId}": {
      "schema": "Product",
      "description": "Garments catalogue catalog"
    },
    "/carts/{userId}": {
      "schema": "Cart",
      "description": "Shopping carts for users"
    },
    "/wishlists/{userId}": {
      "schema": "Wishlist",
      "description": "User wishlists"
    },
    "/orders/{orderId}": {
      "schema": "Order",
      "description": "Checkout orders list"
    },
    "/blogPosts/{postId}": {
      "schema": "BlogPost",
      "description": "Magazine and news editorial posts"
    },
    "/reviews/{reviewId}": {
      "schema": "Review",
      "description": "Product rating and review logs"
    },
    "/coupons/{code}": {
      "schema": "Coupon",
      "description": "Promotional coupon definitions"
    },
    "/contactMessages/{messageId}": {
      "schema": "ContactMessage",
      "description": "Support queries and message records"
    },
    "/newsletterSubscribers/{subscriberId}": {
      "schema": "NewsletterSubscriber",
      "description": "Newsletter sign-up listing"
    }
  }
}
