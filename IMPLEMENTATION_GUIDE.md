# FinCommand - Implementation & Integration Guide

This guide provides detailed instructions for extending FinCommand with real backend integration, authentication, and additional features.

## 🔗 Phase 6: Backend Integration Checklist

### 1. Authentication Setup

**Objective**: Implement Supabase Auth for user registration and login.

```typescript
// src/lib/db/auth.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Sign up
export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
}

// Sign in
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
}

// Get current user
export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}
```

**Tasks**:
- [ ] Create `/api/auth/sign-up` endpoint
- [ ] Create `/api/auth/sign-in` endpoint
- [ ] Create `/api/auth/sign-out` endpoint
- [ ] Add auth middleware to protected routes
- [ ] Create auth context for global state
- [ ] Add login/register pages to `(landing)` route group

### 2. User Profile & Settings

**Objective**: Enable users to create and manage their financial profiles.

```typescript
// src/api/user/route.ts
import { createClient } from '@supabase/supabase-js';

export async function POST(request: Request) {
  const supabase = createClient(...);
  const { data: { user } } = await supabase.auth.getUser();
  
  const { currentBalance, monthlyIncome, monthlyExpenses } = await request.json();
  
  const { data, error } = await supabase
    .from('financial_settings')
    .upsert({
      userId: user!.id,
      currentBalance,
      monthlyIncome,
      monthlyExpenses,
      updatedAt: new Date(),
    });
  
  return Response.json({ data, error });
}
```

**Tasks**:
- [ ] Create `/api/user/profile` GET/POST endpoints
- [ ] Create user settings update UI component
- [ ] Add profile page at `/settings`
- [ ] Implement financial metrics recalculation on profile update

### 3. Debt Management

**Objective**: Create full CRUD operations for debts.

```typescript
// src/api/debts/route.ts
export async function GET(request: Request) {
  const { data, error } = await supabase
    .from('debts')
    .select('*')
    .eq('userId', userId);
  return Response.json({ data, error });
}

export async function POST(request: Request) {
  const debtData = await request.json();
  const { data, error } = await supabase
    .from('debts')
    .insert([{ ...debtData, userId }]);
  return Response.json({ data, error });
}

export async function PUT(request: Request) {
  const { id, ...updates } = await request.json();
  const { data, error } = await supabase
    .from('debts')
    .update(updates)
    .eq('id', id)
    .eq('userId', userId);
  return Response.json({ data, error });
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  const { data, error } = await supabase
    .from('debts')
    .delete()
    .eq('id', id)
    .eq('userId', userId);
  return Response.json({ data, error });
}
```

**Tasks**:
- [ ] Implement GET all debts endpoint
- [ ] Implement POST create debt endpoint
- [ ] Implement PUT update debt endpoint
- [ ] Implement DELETE debt endpoint
- [ ] Add "Add Debt" button to `/debt` page
- [ ] Add debt editing modal
- [ ] Add debt deletion confirmation
- [ ] Replace demo data with real database queries

### 4. Transaction Management

**Objective**: Store and retrieve recurring transactions.

```typescript
// src/api/transactions/route.ts
export async function POST(request: Request) {
  const transaction = await request.json();
  const { data, error } = await supabase
    .from('recurring_transactions')
    .insert([{ ...transaction, userId }]);
  return Response.json({ data, error });
}
```

**Tasks**:
- [ ] Implement transaction CRUD endpoints
- [ ] Create "Add Transaction" modal component
- [ ] Add transaction list management UI
- [ ] Link transactions to cash flow calendar calculations

### 5. Real Data Integration

**Objective**: Replace all demo data with real database queries.

```typescript
// src/app/(app)/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/db/client';

export default function DashboardPage() {
  const [debts, setDebts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      const [debtsData, transactionsData] = await Promise.all([
        supabase
          .from('debts')
          .select('*')
          .eq('userId', user!.id),
        supabase
          .from('recurring_transactions')
          .select('*')
          .eq('userId', user!.id),
      ]);
      
      setDebts(debtsData.data || []);
      setTransactions(transactionsData.data || []);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <SkeletonMetricsRow count={4} />;
  }

  // Render with real data
}
```

**Tasks**:
- [ ] Replace demo data in `/dashboard`
- [ ] Replace demo data in `/calendar`
- [ ] Replace demo data in `/debt`
- [ ] Replace demo data in `/advisor`
- [ ] Add loading skeletons to all pages
- [ ] Add error boundaries for failed queries

### 6. Onboarding Integration

**Objective**: Connect onboarding modal to user profile creation.

```typescript
// src/app/(app)/onboarding/page.tsx
const handleComplete = async (data: Record<string, string | number>) => {
  const { data: { user } } = await supabase.auth.getUser();
  
  // Save to financial_settings
  await supabase
    .from('financial_settings')
    .insert([{
      userId: user!.id,
      currentBalance: data.currentBalance,
      monthlyIncome: data.monthlyIncome,
      monthlyExpenses: data.monthlyExpenses,
      safetyBuffer: data.currentBalance * 0.3, // 30% default
      createdAt: new Date(),
    }]);
  
  // Redirect to dashboard
  window.location.href = '/dashboard';
};
```

**Tasks**:
- [ ] Connect onboarding form submission to Supabase
- [ ] Create first debt if user indicated debt in onboarding
- [ ] Create financial_settings record
- [ ] Show confirmation message after setup
- [ ] Redirect to dashboard on success

## 🎯 Phase 7: Feature Expansion

### 1. Charts & Visualizations

```typescript
// Install recharts if not done
npm install recharts

// src/components/dashboard/DebtChart.tsx
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';

export function DebtChart({ debts }: { debts: Debt[] }) {
  const data = debts.map((debt) => ({
    name: debt.name,
    balance: debt.balance,
    rate: debt.rate * 100,
  }));

  return (
    <LineChart width={500} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Line type="monotone" dataKey="balance" stroke="#10b981" />
    </LineChart>
  );
}
```

**Tasks**:
- [ ] Add debt balance chart to `/debt` page
- [ ] Add cash flow projection chart to `/dashboard`
- [ ] Add wealth growth projection chart to `/advisor`
- [ ] Add interest savings visualization

### 2. Notifications

```typescript
// src/lib/hooks/useNotification.ts
import { useState, useCallback } from 'react';

export function useNotification() {
  const [notifications, setNotifications] = useState([]);

  const notify = useCallback((type: 'success' | 'error' | 'info', message: string) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, type, message }]);
    
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 3000);
  }, []);

  return { notifications, notify };
}
```

**Tasks**:
- [ ] Create notification component
- [ ] Add success notification after debt creation
- [ ] Add error notifications for failed operations
- [ ] Add warning for danger days

### 3. Export & Reporting

```typescript
// src/lib/utils/export.ts
export function exportToCSV(data: any[], filename: string) {
  const csv = convertToCSV(data);
  const element = document.createElement('a');
  element.setAttribute('href', `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`);
  element.setAttribute('download', filename);
  element.click();
}
```

**Tasks**:
- [ ] Add "Export as PDF" button to Dashboard
- [ ] Add "Export as CSV" button to Debts page
- [ ] Create monthly financial report
- [ ] Add email report scheduling

### 4. Mobile App (React Native)

**Tasks**:
- [ ] Create Expo project for iOS/Android
- [ ] Share TypeScript types with mobile app
- [ ] Implement same API endpoints for mobile
- [ ] Add mobile-specific optimizations
- [ ] Deploy to App Store and Google Play

## 🔔 Phase 8: Advanced Features

### 1. AI-Powered Insights

```typescript
// src/api/advisor/ai-insights.ts
export async function getAIInsights(metrics: FinancialMetrics) {
  // Call OpenAI API for personalized advice
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [{
        role: 'user',
        content: `Based on these financial metrics: ${JSON.stringify(metrics)}, provide 3 specific actionable recommendations.`,
      }],
    }),
  });

  return response.json();
}
```

**Tasks**:
- [ ] Integrate OpenAI API for personalized advice
- [ ] Add AI-powered debt recommendations
- [ ] Add budget optimization suggestions
- [ ] Add investment recommendations

### 2. Recurring Transactions Automation

**Tasks**:
- [ ] Add transaction scheduling (weekly, monthly, yearly)
- [ ] Implement automatic transaction import from bank (Plaid)
- [ ] Add transaction categorization (AI or manual)
- [ ] Add spending analysis by category

### 3. Goal Tracking

```typescript
// Database schema
interface Goal {
  id: string;
  userId: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: Date;
  category: 'emergency-fund' | 'vacation' | 'car' | 'home' | 'other';
}
```

**Tasks**:
- [ ] Create goals table in Supabase
- [ ] Build Goals page with progress tracking
- [ ] Add goal-based savings recommendations
- [ ] Add milestone celebrations

### 4. Team Features (Family Budgeting)

**Tasks**:
- [ ] Add shared account functionality
- [ ] Implement permission levels (viewer, editor, admin)
- [ ] Add expense sharing calculation
- [ ] Add notification for account changes

## 📱 Testing Strategy

### Unit Tests
```typescript
// src/__tests__/lib/utils/calculations.test.ts
import { calculateMonthlyInterest } from '@/lib/utils/calculations';

describe('calculateMonthlyInterest', () => {
  it('calculates monthly interest correctly', () => {
    const result = calculateMonthlyInterest(3500, 0.22);
    expect(result).toBeCloseTo(64.17, 2);
  });
});
```

**Tasks**:
- [ ] Set up Jest testing framework
- [ ] Write tests for calculation utilities
- [ ] Write tests for hooks
- [ ] Achieve 80%+ code coverage

### E2E Tests
```typescript
// e2e/dashboard.spec.ts
import { test, expect } from '@playwright/test';

test('dashboard loads with demo data', async ({ page }) => {
  await page.goto('/dashboard');
  await expect(page.locator('h1')).toContainText('Dashboard');
  await expect(page.locator('text=Safety Gauge')).toBeVisible();
});
```

**Tasks**:
- [ ] Set up Playwright for E2E testing
- [ ] Write dashboard flow tests
- [ ] Write authentication tests
- [ ] Write debt creation flow tests

## 🚢 Production Checklist

- [ ] All API endpoints implemented
- [ ] Authentication fully integrated
- [ ] Real data replacing all demo data
- [ ] Error handling on all endpoints
- [ ] Loading states on all pages
- [ ] Responsive design tested on mobile
- [ ] Performance optimized (Lighthouse 90+)
- [ ] All linting errors resolved
- [ ] All tests passing
- [ ] Environment variables configured
- [ ] Database backups configured
- [ ] Error tracking (Sentry) configured
- [ ] Analytics configured
- [ ] Security audit completed
- [ ] Privacy policy created
- [ ] Terms of service created

## 📞 Common Tasks

### Adding a New Page

1. Create folder: `src/app/(app)/new-feature/`
2. Create file: `src/app/(app)/new-feature/page.tsx`
3. Add navigation link to Sidebar
4. Add TypeScript types to `src/types/financial.ts`
5. Create components in `src/components/new-feature/`
6. Test in browser at `/new-feature`

### Adding a New API Endpoint

1. Create folder: `src/api/new-feature/`
2. Create file: `src/api/new-feature/route.ts`
3. Implement GET/POST/PUT/DELETE handlers
4. Add TypeScript interfaces for request/response
5. Test with curl or API client
6. Document in API specification

### Deploying to Vercel

1. Push code to GitHub
2. Import repository in Vercel dashboard
3. Add environment variables
4. Vercel auto-deploys on push
5. Test production URL

---

**Next Developer Notes**: Start with Phase 6 authentication, then move to real data integration. Each phase builds on the previous one.
