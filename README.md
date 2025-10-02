# E-Commerce Project

A minimal full-stack e-commerce site where users can browse products, add them to a cart, and simulate checkout.
This project demonstrates **frontend + backend integration**, API usage, state management, and clean architecture.

## 🎯 Project Goal

Build a simple shopping cart flow with a backend API and frontend UI.

## ✨ Core Features

### Backend
- **Products API** – Returns a JSON list of products (hardcoded, compatible with Fake Store API structure)
- **Checkout API** – Accepts cart data, calculates totals, logs orders to console, and returns success confirmation

### Frontend
- Fetch and display products in a responsive grid
- Add/remove items from cart with real-time updates
- Redux-based cart state management
- Cart view with items, quantities, and total price calculation
- Checkout button → sends cart data to backend API with order confirmation

## 🛠️ Tech Stack

**Backend:**
- Node.js & Express
- CORS for cross-origin requests
- Nodemon for development

**Frontend:**
- React 18
- Redux Toolkit (cart state management)
- React Router (navigation)
- React Hot Toast (notifications)
- Tailwind CSS (styling)

**Testing:**
- Jest & Supertest (backend API tests)

## 📁 Project Structure

``` 
shopping-cart/
│
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── .env
│   ├── .gitignore
│   └── tests/
│       └── products.test.js
│
├── src/
│   ├── components/
│   │   ├── CartItem.js
│   │   ├── Navbar.js
│   │   ├── Product.js
│   │   └── Spinner.js
│   ├── redux/
│   │   ├── slice/
│   │   │   └── CartSlice.js
│   │   └── store.js
│   ├── pages/
│   │   ├── Home.js
│   │   └── Cart.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── public/
│   └── index.html
├── package.json
├── package-lock.json
├── .gitignore
├── postcss.config.js
├── tailwind.config.js
└── README.md
```

## ⚙️ Setup Instructions

### 1. Clone Repository
```bash
git clone https://github.com/yuvraj-thakur1311/shopping-cart.git
cd shopping-cart
```

### 2. Backend Setup
```bash
cd backend
npm install
npm run dev   # starts server on http://localhost:5000
```

**Available endpoints:**

```
GET http://localhost:5000/api/products - Get all products
POST http://localhost:5000/api/checkout - Process checkout
```

### 3. Frontend Setup
Open a new terminal in the root directory (shopping-cart/) :
```bash
npm install
npm start  # starts React app on http://localhost:3000
```
### 4. Running Tests
Backend API tests use Jest + Supertest.
From backend/ directory:
```bash
npm test
```

## 🚀 Usage Flow

1. **Browse Products** - View all available products on the home page
2. **Add to Cart** - Click "Add to Cart" on any product
3. **View Cart** - Navigate to cart page to see selected items
4. **Update Cart** - Remove unwanted items
5. **Checkout** - Click "CheckOut Now" to place order
6. **Confirmation** - Receive order confirmation with order ID

## 📌 Design Choices & Assumptions

- **No Database** – Products are hardcoded in backend for simplicity
- **Client-Side Cart** – Cart state managed with Redux Toolkit
- **Simulated Checkout** – Orders logged to backend console with confirmation response
- **Separated Architecture** – Clear API boundaries between frontend and backend
- **Responsive Design** – Mobile-first approach with Tailwind CSS
- **Production Ready** – Easy to extend with real database and payment integration

## 🌟 Key Features Implemented

- ✅ Product listing with real product data
- ✅ Add/Remove items from cart
- ✅ Real-time cart count badge
- ✅ Cart subtotal calculation
- ✅ Checkout with backend integration
- ✅ Order confirmation
- ✅ Toast notifications for user feedback
- ✅ Responsive design for all devices
- ✅ Clean console logging for order tracking

### Frontend
Update API endpoint in `src/pages/Home.jsx` and `src/pages/Cart.jsx`:
```javascript
const API_URL = "http://localhost:5000/api/products";
```

## 📝 API Documentation


### -> POST /api/checkout
Processes cart checkout.


**Response:**

```json
{
  "cart": [
    {
      "id": 1,
      "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      "category": "men's clothing",
      "quantity": 1,
      "price": 109.95
    },
    {
      "id": 2,
      "title": "Mens Casual Premium Slim Fit T-Shirts",
      "category": "men's clothing",
      "quantity": 1,
      "price": 22.30
    }
  ]
}
```

##  🔮 Future Enhancements:

- User authentication
- Database integration (MongoDB/PostgreSQL)
- Payment gateway (Stripe/PayPal)
- Order history
- Product search and filtering
- Wishlist functionality
- Product reviews and ratings
- Admin dashboard
- Email notifications
- Inventory management

