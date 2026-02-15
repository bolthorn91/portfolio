# Bolthorn Makers - Agent Guidelines

This file contains coding standards and conventions for Bolthorn Makers projects.

## Build, Lint, and Test Commands

### Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

### Testing
```bash
# Run tests
npm test

# Run tests with coverage
npm run test -- --coverage
```

## Vercel Deployment Best Practices

### Node.js Version
- Set Node.js version in `package.json` using `engines` field:
```json
"engines": {
  "node": "24.x"
}
```
- Do NOT use `vercel.json` for Node.js version - it's not a valid property

### Environment Variables
- Never hardcode secrets in code
- Use `.env.local` for local development
- Add environment variables in Vercel Dashboard > Settings > Environment Variables

### Build Configuration
- Vercel auto-detects Next.js projects - usually no extra config needed
- Default build command: `next build`
- Default output directory: `.next`

### Production Checklist
- Test build locally first: `npm run build && npm start`
- Check deployment logs for errors
- Verify environment variables are set
- Test with custom domain

### Domain Configuration
- Add custom domains in Vercel Dashboard > Settings > Domains
- Configure DNS records in IONOS/your provider
- Use CNAME for subdomains, A record for root domain

## React 19 + Next.js Best Practices

### Server vs Client Components
- **Server Components** (default): Use for static content, data fetching, reduce bundle size
- **Client Components**: Add `'use client'` directive for interactive components (forms, buttons, state)
- Prefer Server Components by default, add interactivity only when needed

```typescript
// Server Component (default in App Router)
async function BlogPage() {
  const posts = await fetchPosts();
  return <PostList posts={posts} />;
}

// Client Component - for interactivity
'use client';
function LikeButton() {
  const [liked, setLiked] = useState(false);
  return <button onClick={() => setLiked(!liked)}>Like</button>;
}
```

### Data Fetching
- Use `fetch()` with proper caching strategies
- Use absolute URLs for external API calls
- Implement proper error handling and fallback data

```typescript
// Good - with caching
const data = await fetch('https://api.example.com/data', {
  next: { revalidate: 3600 } // Cache for 1 hour
});

// Good - no cache for dynamic data
const data = await fetch('https://api.example.com/data', {
  cache: 'no-store'
});
```

### Forms & Actions (React 19)
- Use Server Actions for form submissions when possible
- Use `useActionState` for managing form state
- Validate inputs on both client and server

```typescript
'use client';
import { useActionState } from 'react';

async function submitForm(prevState, formData) {
  // Server action
  const result = await createUser(formData);
  return result;
}

function CreateUser() {
  const [state, action] = useActionState(submitForm, null);
  return <form action={action}>...</form>;
}
```

### use() Hook (React 19)
- Use `use()` for reading Promises in Server Components
- Works with fetch and async functions directly

```typescript
async function UserProfile({ userId }) {
  const user = use(fetch(`/api/users/${userId}`));
  return <div>{user.name}</div>;
}
```

### Performance
- Use `next/image` for optimized images
- Use `next/font` for font optimization
- Implement lazy loading with `next/dynamic`
- Monitor bundle size with `@next/bundle-analyzer`

### State Management
- Keep state local when possible
- Use Context for truly global state (theme, auth)
- Consider custom hooks for reusable logic

## Code Style Guidelines

### General
- **2 spaces indentation**
- **Single quotes** for strings
- **Trailing commas**
- **Semicolons** required
- **TypeScript** required

### Naming
- Use descriptive names
- PascalCase for components, camelCase for variables
- Boolean prefixes: `isActive`, `hasPermission`

### Component Structure
- Keep components focused and small
- Use early returns
- Extract reusable logic into custom hooks

```typescript
// Good - focused component with early return
function UserProfile({ user }) {
  if (!user) return null;
  
  return (
    <div>
      <h1>{user.name}</h1>
    </div>
  );
}
```

## TailwindCSS Guidelines

### Dark Mode
- Use CSS variables for theming
- Background: `#030712` (dark slate)
- Primary: `#3b82f6` (blue)
- Secondary: `#8b5cf6` (purple)
- Accent: `#06b6d4` (cyan)

### Classes
- Use utility classes: `bg-background`, `text-foreground`, `border-border`
- Use semantic colors: `bg-primary`, `text-primary`
- Responsive: `md:`, `lg:` prefixes

## Project Structure

```
project/
├── src/
│   ├── app/           # Next.js App Router
│   ├── components/    # Reusable components
│   │   ├── sections/  # Page sections
│   │   └── ui/        # UI components
│   ├── lib/           # Utilities
│   └── styles/        # Global styles
├── public/            # Static assets
└── package.json
```

## Error Handling

- Always handle async operations with try/catch
- Show user-friendly error messages
- Use error boundaries for component failures
- Log errors for debugging

## SEO & Metadata

- Use Next.js Metadata API in `layout.tsx` and `page.tsx`
- Include Open Graph tags for social sharing
- Use semantic HTML elements

```typescript
export const metadata: Metadata = {
  title: 'Bolthorn Makers | Desarrollo de Software',
  description: 'Empresa de consultoría y desarrollo de software',
  openGraph: {
    title: 'Bolthorn Makers',
    description: 'Desarrollo de software profesional',
    url: 'https://bolthornmakers.com',
    siteName: 'Bolthorn Makers',
  },
};
```
