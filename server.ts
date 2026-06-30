rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper functions
    function isAdmin() {
      return request.auth != null && (
        request.auth.token.email == 'admin@society.studios' ||
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'ADMIN'
      );
    }
    
    function isUser(userId) {
      return request.auth != null && request.auth.uid == userId;
    }

    match /users/{userId} {
      allow read, write: if true; // In simple demo, allow login/registration writes
    }

    match /products/{productId} {
      allow read: if true;
      allow write: if true; // Allow admin or public demo simulation
    }

    match /carts/{userId} {
      allow read, write: if true; // Anyone can retrieve/save cart
    }

    match /wishlists/{userId} {
      allow read, write: if true;
    }

    match /orders/{orderId} {
      allow read, write: if true;
    }

    match /blogPosts/{postId} {
      allow read: if true;
      allow write: if true;
    }

    match /reviews/{reviewId} {
      allow read: if true;
      allow write: if true;
    }

    match /coupons/{code} {
      allow read: if true;
      allow write: if true;
    }

    match /contactMessages/{messageId} {
      allow read, write: if true;
    }

    match /newsletterSubscribers/{subscriberId} {
      allow read, write: if true;
    }
  }
}
