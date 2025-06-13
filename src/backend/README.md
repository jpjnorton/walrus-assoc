# 🛠️ Backend API (TypeScript + Express)

This is a simple backend API built with **TypeScript** and **Express**. It currently supports a single `POST` endpoint that returns a hardcoded list of products. The project is ready to scale with additional routes, controllers, validation, and database integration.

---

## 🚀 Getting Started

### ✅ Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

---

### 📦 1. Install dependencies

From the `src/backend/` directory:

```bash
npm install
```

### 🚀 2. Run the development server

```bash
npm run dev
```

You should see
✅ Server running at http://localhost:{port}
from the console.

### 🧪 3. Test the API

Use Postman or curl to send a request:

Endpoint:

```bash
POST http://localhost:3002/products
```

it should return

```bash
{
  "success": true,
  "products": [
    { "id": 1, "name": "Laptop", "price": 1000 },
    { "id": 2, "name": "Phone", "price": 500 },
    { "id": 3, "name": "Headphones", "price": 150 }
  ]
}

```
