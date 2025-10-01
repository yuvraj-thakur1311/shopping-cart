# E-Commerce Project

A minimal full-stack e-commerce site where users can browse products, add them to a cart, and simulate checkout.

This project demonstrates frontend + backend integration, API usage, state management, and testing.

### Project Goal

Build a simple shopping cart flow with a backend API and frontend UI.

### Core Features

#### Backend

Products API – Returns a JSON list of products (hardcoded or fetched from Fake Store API
).

Orders API – Accepts a list of product IDs and quantities, calculates totals, logs the order, and returns a success message.

Frontend

Fetch and display products in a grid.

Add items to a cart.

Manage cart state (client-side).

Show a cart view with items, quantities, and total price.

Checkout button → sends cart data to backend API.

🛠️ Tech Stack

Backend: Node.js, Express, CORS, node-fetch

Frontend: React, Redux Toolkit (for cart state), Fetch API

Testing: Jest, Supertest (backend API tests)

📂 Project Structure
project-root/
│
├── backend/
│   ├── server.js       # Express app (routes defined here)
│   ├── start.js        # Entry point (starts server on PORT 5000)
│   ├── package.json
│   └── tests/
│       └── products.test.js   # Example Jest/Supertest test
│
├── frontend/
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── redux/      # Cart slice + store
│   │   ├── pages/      # Home, Cart pages
│   │   └── App.js
│   ├── public/
│   │   └── index.html
│   ├── package.json
│
└── README.md

⚙️ Setup Instructions
1. Clone Repository
git clone https://github.com/<your-username>/minimal-ecommerce.git
cd minimal-ecommerce

2. Backend Setup
cd backend
npm install
npm run dev   # starts server with nodemon (http://localhost:5000)

3. Frontend Setup
cd ../frontend
npm install
npm start     # starts frontend React app (http://localhost:3000)

✅ Running Test Cases

We use Jest + Supertest for backend API tests.

From backend/ directory:

npm test


Example test (tests/products.test.js):

const request = require('supertest');
const app = require('../server');

describe("GET /api/products", () => {
  it("should return a list of products", async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

📌 Assumptions & Design Choices

No database → Products are hardcoded or fetched from Fake Store API.

Cart state is client-side only (with optional localStorage persistence).

The backend is separated from the frontend for clear API boundaries.

Checkout is simulated → orders are logged to console and returned in API response.

🌟 Bonus Features

Update item quantities directly in cart.

Persist cart in localStorage (so items survive refresh).

Extendable API → easily replaced with a real DB later.

🔗 Repo Link Placeholder

👉 GitHub Repository
