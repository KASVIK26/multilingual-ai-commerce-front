# 🛒 Multilingual AI Commerce Platform

> **Technology that listens. Support that understands.**

An intelligent, AI-powered e-commerce platform that combines multilingual chat capabilities with real-time product discovery and smart recommendations. Built with modern web technologies and advanced AI features.



## 🌟 Key Features

### 🤖 AI-Powered Intelligence
- **Advanced NLP Processing** - HuggingFace integration for sophisticated natural language understanding
- **Intent Classification** - Automatically detects search, compare, and recommendation intents
- **Entity Recognition** - Extracts brands, categories, prices, and specifications from natural language
- **Smart Fallbacks** - Local processing when external AI services are unavailable

### 🌐 Multilingual Support
- **100+ Languages** - Real-time translation and multilingual interface
- **Localized Experience** - Language-specific product recommendations and pricing
- **Regional Preferences** - Timezone and currency support

### 🛍️ E-Commerce Integration
- **Real-time Product Scraping** - Live data from major e-commerce platforms (Amazon, etc.)
- **Smart Search** - AI-extracted features for precise product matching
- **Price Comparison** - Range filtering and best deal identification
- **Product Recommendations** - Personalized suggestions based on user behavior

### 💬 Conversational Interface
- **Chat History** - Persistent conversation tracking and management
- **Suggested Actions** - Quick access to common queries and operations
- **Product Display** - Rich product cards with images, prices, and specifications
- **Interactive Components** - Add to cart, wishlist, and comparison features

### 👤 User Management
- **Secure Authentication** - Supabase-powered user management
- **Profile Customization** - Language preferences, timezone settings, and personal info
- **Order Tracking** - View order history and delivery status
- **Wishlist Management** - Save and organize favorite products

## 🏗️ Architecture

### Frontend (React + TypeScript)
```
src/
├── components/          # Reusable UI components
│   ├── chat/           # Chat interface components
│   ├── dashboard/      # Dashboard widgets
│   └── ui/             # Base UI components (shadcn/ui)
├── pages/              # Route components
├── hooks/              # Custom React hooks
├── contexts/           # React contexts (Auth, etc.)
└── lib/                # Utilities and configurations
```

### Backend Services
```
backend/
└── scraper/            # Python-based product scraper
    ├── amazon_scraper.py
    ├── database.py
    └── requirements.txt

supabase/
├── functions/          # Edge functions
│   ├── process-chat/   # AI chat processing
│   └── scrape-products/# Product data fetching
└── schema.sql          # Database schema
```

### Database Schema
- **User Management** - Profiles, preferences, authentication
- **Chat System** - Conversations, messages, history
- **Product Catalog** - Products, categories, pricing
- **E-commerce** - Cart, orders, wishlists
- **Analytics** - Search queries, interactions, recommendations

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Python 3.8+
- Supabase account
- Git

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/KASVIK26/multilingual-ai-commerce-front.git
   cd multilingual-ai-commerce-front
   ```

2. **Install Frontend Dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd backend/scraper
   pip install -r requirements.txt
   ```

4. **Environment Setup**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_service_role_key
   HUGGINGFACE_API_KEY=your_huggingface_api_key
   ```

5. **Database Setup**
   - Create a new Supabase project
   - Run the SQL schema from `supabase_setup.sql`
   - Deploy the edge functions from `supabase/functions/`

6. **Start Development**
   ```bash
   # Frontend
   npm run dev
   
   # Backend scraper (separate terminal)
   cd backend/scraper
   python main.py "test query"
   ```

### Deployment

#### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy the `dist` folder
```

#### Backend (Supabase Functions)
```bash
supabase functions deploy process-chat
supabase functions deploy scrape-products
```

## 🧪 Testing

### Frontend Testing
```bash
# Development server
npm run dev

# Navigate to http://localhost:8080
# Test authentication flow
# Try sample queries: "show me samsung phones under 50000"
```

### Backend Testing
```bash
cd backend/scraper
python test_scraper.py
python demo_ai_chat.py
```

### Sample Test Queries
- "Show me Samsung smartphones under ₹50,000"
- "Compare iPhone 15 vs Samsung Galaxy S24"
- "Recommend budget laptops for programming"
- "Find wireless headphones with good bass"

## 📚 API Documentation

### Chat Processing Endpoint
```javascript
POST /functions/v1/process-chat
{
  "message": "user query",
  "user_id": "uuid",
  "chat_id": "uuid" // optional
}
```

### Product Scraping Endpoint
```javascript
POST /functions/v1/scrape-products
{
  "query": "search terms",
  "extracted_features": {...},
  "user_id": "uuid"
}
```

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and context
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Beautiful, accessible component library
- **React Router** - Client-side routing
- **React Query** - Server state management

### Backend
- **Supabase** - Backend-as-a-Service
- **PostgreSQL** - Relational database with RLS
- **Edge Functions** - Serverless compute (Deno)
- **Python** - Scraping and data processing
- **Selenium** - Web scraping with anti-bot detection

### AI & ML
- **HuggingFace** - NLP and entity recognition
- **Custom NLP** - Fallback processing algorithms
- **Intent Classification** - Query understanding
- **Feature Extraction** - Smart product matching

### DevOps
- **Git** - Version control
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **GitHub Actions** - CI/CD (configurable)

## 🔧 Configuration

### Environment Variables

#### Environment Variables (.env in root)
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_service_role_key
SUPABASE_SERVICE_KEY=your_service_role_key
HUGGINGFACE_API_KEY=your_huggingface_api_key
```

### Supabase Configuration
- Row Level Security (RLS) enabled
- Edge functions deployed
- Storage buckets configured
- Authentication providers set up

## 📖 User Guide

### Getting Started
1. **Sign Up** - Create an account with email verification
2. **Set Preferences** - Choose language, timezone, and currency
3. **Start Chatting** - Use natural language to search for products
4. **Explore Features** - Try suggested actions and advanced queries

### Sample Conversations
```
User: "I need a gaming laptop under 100k"
AI: "I found 12 gaming laptops under ₹100,000. Here are the best options with dedicated graphics cards..."

User: "Compare iPhone 15 vs Samsung S24"  
AI: "Here's a detailed comparison of both flagship phones..."

User: "Show my recent orders"
AI: "Here are your recent orders and their delivery status..."
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Code Style
- Follow TypeScript best practices
- Use Prettier for formatting
- Follow conventional commit messages
- Add JSDoc comments for complex functions

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Common Issues
- **Authentication Problems** - Check Supabase configuration
- **Scraping Issues** - Verify Python dependencies and environment variables
- **Chat Not Working** - Check edge function deployment and logs

### Getting Help
- 📧 Email: support@multilingual-ai.com
- 💬 Discord: [Join our community](https://discord.gg/multilingual-ai)
- 📚 Documentation: [Full docs](https://docs.multilingual-ai.com)
- 🐛 Bug Reports: [GitHub Issues](https://github.com/your-username/multilingual-ai-commerce-front/issues)

## 🎯 Roadmap

### Phase 1 (Current)
- ✅ Core chat functionality
- ✅ Product scraping
- ✅ User authentication
- ✅ Basic multilingual support

### Phase 2 (Q3 2025)
- 🔄 Advanced translation features
- 🔄 Voice chat integration
- 🔄 Mobile app development
- 🔄 Payment gateway integration

### Phase 3 (Q4 2025)
- 🔄 AR product visualization
- 🔄 Marketplace integration
- 🔄 Advanced analytics
- 🔄 Enterprise features

## 🏆 Acknowledgments

- [HuggingFace](https://huggingface.co/) for AI/ML infrastructure
- [Supabase](https://supabase.com/) for backend services
- [shadcn/ui](https://ui.shadcn.com/) for beautiful components
- [Tailwind CSS](https://tailwindcss.com/) for styling system
- Open source community for various libraries and tools

---

<div align="center">

**Built with ❤️ for the future of e-commerce**

</div>
