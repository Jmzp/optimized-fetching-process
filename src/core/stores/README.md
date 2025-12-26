# Almacenes globales

Este directorio está reservado para **almacenes globales de MobX** que se comparten entre múltiples características de la aplicación.

## 📋 Propósito

Los almacenes centrales deben contener el estado de la aplicación a nivel global que no pertenece a ninguna característica específica. Representan preocupaciones transversales a las que necesitan acceder varias características.

## 🎯 Qué debe ir aquí

### Ejemplos de almacenes centrales:

1. **`uiStore.ts`** - Estado global de la UI

   ```typescript
   // Tema, barra lateral, modales globales, notificaciones toast
   class UiStore {
     theme: 'light' | 'dark' = 'light';
     sidebarOpen: boolean = true;
     notifications: Notification[] = [];
   }
   ```

2. **`appStore.ts`** - Configuración de la aplicación

   ```typescript
   // Ajustes globales, flags de características, idioma
   class AppStore {
     language: 'en' | 'es' = 'en';
     isOnline: boolean = true;
     featureFlags: Record<string, boolean> = {};
   }
   ```

3. **`routerStore.ts`** - Estado de navegación (si se usa MobX con router)
   ```typescript
   class RouterStore {
     currentPath: string = '/';
     history: string[] = [];
   }
   ```

## ❌ Qué NO debe ir aquí

### Almacenes específicos de una característica

Los almacenes que pertenecen a una característica específica deben permanecer en el directorio de esa característica:

- ✅ `features/auth/stores/auth.store.ts` - Estado de autenticación
- ✅ `features/users/stores/users.store.ts` - Estado de gestión de usuarios
- ✅ `features/cart/stores/cart.store.ts` - Estado del carrito de compras

## 🏗️ Arquitectura actual

```
src/
├── core/
│   ├── api/              ✅ Cliente HTTP compartido
│   └── stores/           📁 Almacenes globales (¡actualmente vacío - correcto!)
├── features/
│   ├── auth/
│   │   └── stores/       ✅ authStore (específico de la característica)
│   └── users/
│       └── hooks/        ✅ Hooks de React Query (estado del servidor)
```

## 🎯 Cuándo añadir un almacén aquí

Sólo añade un almacén a `core/stores/` cuando:

1. **Lo necesiten varias características** - Lo usan 2 o más características distintas
2. **No es específico de una característica** - No pertenece a una sola característica
3. **Configuración global** - Ajustes o estado a nivel de aplicación
4. **Preocupación transversal** - Afecta a toda la aplicación

## 💡 Estado actual

**Este directorio está intencionalmente vacío** porque:

- ✅ `authStore` es específico de la característica (en `features/auth/stores/`)
- ✅ El estado del servidor se gestiona con React Query (en `features/users/hooks/`)
- ✅ Aún no se necesita estado global de UI
- ✅ No existe estado compartido entre características

Esto sigue el principio de arquitectura **feature-first**: mantener las cosas en las características hasta que realmente necesiten ser globales.

## 📚 Ejemplo: Cuándo mover un almacén aquí

**Escenario:** Añades un selector de tema que se usa en:

- Página de inicio de sesión (feature auth)
- Página principal (feature home)
- Lista de usuarios (feature users)

**Entonces crea:**

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
