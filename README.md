# ThemeForest Clone

A full-stack marketplace for themes and templates built with Next.js, Node.js, and MongoDB.

## Features

- User authentication with JWT
- Product marketplace with search and filtering
- Live preview system
- Seller dashboard
- Admin panel
- Payment integration with Stripe
- Image storage with Cloudinary

## Tech Stack

- Frontend: Next.js 14, Tailwind CSS, Shadcn UI, Zustand
- Backend: Node.js, Express, MongoDB, Mongoose
- Auth: JWT, bcrypt
- Payments: Stripe
- Images: Cloudinary

## Setup

1. Clone the repository
2. Install dependencies for both client and server

### Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the server directory with:

```
MONGO_URI=mongodb://localhost:27017/themeforest
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
STRIPE_SECRET_KEY=your_stripe_secret
```

Start MongoDB and run:

```bash
npm run dev
```

### Frontend Setup

```bash
cd client
npm install
```

Create a `.env.local` file in the client directory with:

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable
```

Run:

```bash
npm run dev
```

## Usage

- Visit http://localhost:3000 for the frontend
- Backend runs on http://localhost:5000

## API Endpoints

- POST /api/auth/register - Register user
- POST /api/auth/login - Login user
- GET /api/products - Get products
- POST /api/products - Create product (seller only)
- And more...

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to branch
5. Create a Pull Request