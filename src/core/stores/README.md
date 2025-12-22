# Core Stores

This directory is reserved for **global MobX stores** that are shared across multiple features in the application.

## 📋 Purpose

Core stores should contain application-wide state that doesn't belong to any specific feature. They represent cross-cutting concerns that multiple features need to access.

## 🎯 What Should Go Here

### Examples of Core Stores:

1. **`uiStore.ts`** - Global UI state

   ```typescript
   // Theme, sidebar, global modals, toast notifications
   class UiStore {
     theme: 'light' | 'dark' = 'light';
     sidebarOpen: boolean = true;
     notifications: Notification[] = [];
   }
   ```

2. **`appStore.ts`** - Application configuration

   ```typescript
   // Global settings, feature flags, language
   class AppStore {
     language: 'en' | 'es' = 'en';
     isOnline: boolean = true;
     featureFlags: Record<string, boolean> = {};
   }
   ```

3. **`routerStore.ts`** - Navigation state (if using MobX with router)
   ```typescript
   class RouterStore {
     currentPath: string = '/';
     history: string[] = [];
   }
   ```

## ❌ What Should NOT Go Here

### Feature-Specific Stores

Stores that belong to a specific feature should stay in their feature directory:

- ✅ `features/auth/stores/auth.store.ts` - Authentication state
- ✅ `features/users/stores/users.store.ts` - User management state
- ✅ `features/cart/stores/cart.store.ts` - Shopping cart state

## 🏗️ Current Architecture

```
src/
├── core/
│   ├── api/              ✅ Shared HTTP client
│   └── stores/           📁 Global stores (currently empty - correct!)
├── features/
│   ├── auth/
│   │   └── stores/       ✅ authStore (feature-specific)
│   └── users/
│       └── hooks/        ✅ React Query hooks (server state)
```

## 🎯 When to Add a Store Here

Only add a store to `core/stores/` when:

1. **Multiple features need it** - Used by 2+ different features
2. **Not feature-specific** - Doesn't belong to any single feature
3. **Global configuration** - App-wide settings or state
4. **Cross-cutting concern** - Affects the entire application

## 💡 Current Status

**This directory is intentionally empty** because:

- ✅ `authStore` is feature-specific (in `features/auth/stores/`)
- ✅ Server state is managed by React Query (in `features/users/hooks/`)
- ✅ No global UI state is needed yet
- ✅ No cross-feature shared state exists

This follows the **feature-first architecture** principle: keep things in features until they truly need to be global.

## 📚 Example: When to Move a Store Here

**Scenario:** You add a theme toggle that's used in:

- Login page (auth feature)
- Home page (home feature)
- User list (users feature)

**Then create:**

```typescript
// core/stores/theme.store.ts
import { makeAutoObservable } from 'mobx';

class ThemeStore {
  mode: 'light' | 'dark' = 'light';

  constructor() {
    makeAutoObservable(this);
    this.loadTheme();
  }

  private loadTheme() {
    const saved = localStorage.getItem('theme');
    if (saved) this.mode = saved as 'light' | 'dark';
  }

  toggleTheme() {
    this.mode = this.mode === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', this.mode);
  }
}

export const themeStore = new ThemeStore();
```
