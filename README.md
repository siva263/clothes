# 🛍️ Premium Clothing Brand E-Commerce Platform

A modern, full-stack clothing brand e-commerce website built with 100% FREE services.

## 🏗️ Tech Stack

### Frontend
- **Next.js 14** (App Router)
- **Tailwind CSS** for styling
- **TypeScript** for type safety
- **Vercel** for hosting (Free Tier)

### Backend
- **FastAPI** (Python)
- **PostgreSQL** via Supabase
- **Render** for hosting (Free Tier)

### Services
- **Supabase**: Database & Authentication (Free Tier)
- **Razorpay**: Payment Gateway (Test Mode)
- **Cloudinary**: Image Storage (Free Tier)
- **GitHub**: Version Control

## 🚀 Features

### Customer Features
- ✨ Modern, responsive UI with mobile-first design
- 🛍️ Product browsing with categories (Men, Women, Accessories)
- 🔍 Advanced filtering (Price, Size, Color)
- 🛒 Shopping cart with quantity management
- 💳 Secure checkout with Razorpay
- 👤 User authentication & profiles
- 📦 Order history tracking
- 🌟 SEO-optimized pages

### Admin Features
- 📊 Admin dashboard
- ➕ Add/Edit/Delete products
- 📸 Image upload to Cloudinary
- 📈 Order management
- 🎨 Product categorization

## 📁 Project Structure

```
windsurf-project/
├── frontend/                 # Next.js 14 App
│   ├── src/
│   │   ├── app/             # App Router pages
│   │   ├── components/      # Reusable components
│   │   ├── lib/            # Utilities & API clients
│   │   └── types/          # TypeScript definitions
│   ├── public/
│   ├── package.json
│   └── tailwind.config.js
├── backend/                  # FastAPI Backend
│   ├── app/
│   │   ├── api/            # API routers
│   │   ├── core/           # Core configuration
│   │   ├── models/         # Database models
│   │   ├── schemas/        # Pydantic schemas
│   │   └── services/       # Business logic
│   ├── alembic/            # Database migrations
│   ├── requirements.txt
│   └── main.py
├── database/                # SQL schemas & seeds
├── docs/                   # Documentation
└── README.md
```

## 🛠️ Local Setup

### Prerequisites
- Node.js 18+
- Python 3.9+
- Git

### Environment Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd windsurf-project
```

2. **Backend Setup**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

3. **Frontend Setup**
```bash
cd frontend
npm install
```

4. **Environment Variables**

Create `.env` files in both directories:

**Backend/.env**
```env
DATABASE_URL=your_supabase_database_url
SUPABASE_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_supabase_service_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
SECRET_KEY=your_fastapi_secret_key
```

**Frontend/.env.local**
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
```

### Running Locally

1. **Start Backend**
```bash
cd backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

2. **Start Frontend**
```bash
cd frontend
npm run dev
```

3. **Access the Application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

## 🌐 Deployment

### Frontend (Vercel)
1. Connect GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Backend (Render)
1. Connect GitHub repository to Render
2. Configure build command: `pip install -r requirements.txt`
3. Configure start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. Set environment variables in Render dashboard

## 📊 Database Schema

### Core Tables
- **users**: User accounts & profiles
- **categories**: Product categories (Men, Women, Accessories)
- **products**: Product information with variants
- **orders**: Customer orders
- **order_items**: Individual order line items
- **cart_items**: Shopping cart items

## 🎨 Design Principles

- **Minimal & Clean**: Focus on products, reduce clutter
- **Mobile-First**: Optimized for all screen sizes
- **Performance**: Fast loading with optimized images
- **Accessibility**: WCAG compliant design
- **SEO**: Meta tags, structured data, sitemaps

## 🔐 Security Features

- JWT-based authentication via Supabase
- Secure payment processing with Razorpay
- Input validation & sanitization
- CORS configuration
- Environment variable protection

## 🧪 Testing

- Frontend: Jest & React Testing Library
- Backend: Pytest
- E2E: Playwright (optional)

## 📈 Performance

- Image optimization via Cloudinary
- Code splitting in Next.js
- Database indexing
- Caching strategies
- CDN distribution

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For issues and questions:
- Create GitHub issue
- Check documentation
- Review setup instructions

---

**Built with ❤️ using 100% free services**
