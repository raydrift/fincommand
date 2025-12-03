# FinCommand - Quick Start Guide

Get FinCommand running in 5 minutes!

## 📋 Prerequisites

- **Node.js 18+** - [Download](https://nodejs.org/)
- **npm or yarn** - Comes with Node.js
- **Supabase Account** (optional for demo) - [Sign up](https://supabase.com)
- **Git** - For cloning the repo

## ⚡ Quick Start

### Step 1: Clone & Install
```bash
cd /path/to/fin-ai-ops/fincommand
npm install
```

### Step 2: Set Up Environment
```bash
# Copy example env file
cp .env.example .env.local

# Add your Supabase credentials (or leave empty for demo mode)
# NEXT_PUBLIC_SUPABASE_URL=your_url
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
```

### Step 3: Start Development Server
```bash
npm run dev
```

### Step 4: Open in Browser
Navigate to **[http://localhost:3000](http://localhost:3000)**

## 🎯 What to Explore

### Landing Page
- Homepage with feature highlights
- Click "Get Started" to begin onboarding

### Onboarding (`/onboarding`)
- 4-step financial profile setup
- Demo data pre-filled (modify if you want)
- Click "Complete" to enter the app

### Dashboard (`/dashboard`)
- Main financial health overview
- Safety gauge showing financial status
- Immediate action recommendations
- Emergency fund progress
- Key metrics (surplus, debt, savings, timeline)

### Calendar (`/calendar`)
- 31-day cash flow projection
- Interactive grid showing daily transactions
- Color-coded by income (green) and expenses (red)

### Debt Strategy (`/debt`)
- Snowball debt elimination plan
- Individual debt cards
- Lump sum payoff simulator
- Try different payoff amounts to see results

### Smart Advisor (`/advisor`)
- Personalized financial guidance
- Guaranteed return from debt elimination
- 5-year wealth projection
- Step-by-step action plans

## 🔧 Available Commands

```bash
# Development
npm run dev              # Start dev server (localhost:3000)
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Check code quality
npm run lint --fix       # Auto-fix linting issues

# Database
npm run db:seed          # Seed demo data (if configured)
npm run db:migrate       # Run migrations (if configured)
```

## 📂 Project Structure at a Glance

```
fincommand/
├── src/
│   ├── app/              # Next.js pages and routes
│   ├── components/       # React components
│   ├── lib/             # Utilities, hooks, constants
│   ├── types/           # TypeScript interfaces
│   └── api/             # API routes (future)
├── public/              # Static assets
├── package.json
└── tsconfig.json
```

## 🎨 Key Pages

| Path | Purpose | Demo Data |
|------|---------|-----------|
| `/` | Landing page | ✅ |
| `/onboarding` | Setup wizard | ✅ |
| `/dashboard` | Financial overview | ✅ |
| `/calendar` | Cash flow calendar | ✅ |
| `/debt` | Debt management | ✅ |
| `/advisor` | Financial guidance | ✅ |

## 🔐 Demo Credentials

All data is demo/sample data. No real financial data is stored:

- **Current Balance**: $5,200
- **Monthly Income**: $3,500
- **Monthly Expenses**: $1,800
- **Safety Buffer**: $1,500
- **Sample Debts**: 3 demo debts with various rates

## 🌐 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🆘 Troubleshooting

### Port 3000 Already in Use
```bash
# Find and kill the process
lsof -i :3000
kill -9 <PID>

# Or use a different port
PORT=3001 npm run dev
```

### Node Modules Issues
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors
```bash
# Rebuild TypeScript
npm run build

# Check specific file
npx tsc src/components/dashboard/SafetyGauge.tsx
```

### Build Fails
```bash
# Check for linting issues
npm run lint

# Fix auto-fixable issues
npm run lint --fix

# Rebuild
npm run build
```

## 📱 Responsive Design

The app is fully responsive:
- **Mobile**: All features work on mobile (320px+)
- **Tablet**: Optimized layout for tablets (768px+)
- **Desktop**: Full feature set on desktop (1024px+)

## 🎯 Try These Actions

1. **View Debt Strategy**: Go to `/debt` and try the payoff simulator
   - Enter different lump sum amounts (e.g., $500, $1000, $2000)
   - See how it affects debt elimination timeline

2. **Check Cash Flow**: Go to `/calendar` and explore the 31-day projection
   - Red days show when expenses exceed income
   - See the minimum balance and danger zones

3. **Get Advisor Tips**: Go to `/advisor` and read personalized recommendations
   - Shows different guidance based on debt status
   - Displays wealth building strategies

4. **Try Onboarding**: Go to `/onboarding` and modify the demo data
   - See how different financial situations affect recommendations

## 📚 Documentation

For detailed documentation, see:
- **[FINCOMMAND_README.md](./FINCOMMAND_README.md)** - Full project documentation
- **[IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md)** - Backend integration guide
- **[ARCHITECTURE.md](../instructions.md)** - Original architecture document

## 🚀 Next Steps

### For Users
1. Set up your real financial profile in `/onboarding`
2. Add your actual debts in `/debt`
3. Set up recurring transactions in the calendar
4. Check the Smart Advisor for personalized tips

### For Developers
1. Read **[IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md)**
2. Implement Phase 6: Backend Authentication
3. Connect to real Supabase database
4. Replace demo data with real data
5. Deploy to Vercel

## 🆘 Need Help?

Check these resources:
- **[Next.js Documentation](https://nextjs.org/docs)**
- **[TypeScript Handbook](https://www.typescriptlang.org/docs/)**
- **[Tailwind CSS Docs](https://tailwindcss.com/docs)**
- **[Supabase Docs](https://supabase.com/docs)**
- **[Framer Motion](https://www.framer.com/motion/)**

## 🎉 You're All Set!

You're now ready to explore FinCommand. Happy coding! 🚀

---

**Questions?** Check the implementation guide or reach out to the development team.
