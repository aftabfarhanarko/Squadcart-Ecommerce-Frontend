# Chitrokormo Backend Integration Notes

## Completed Integration

### 1. Environment Configuration
- Created `.env.example` with `COMPANY_ID=chitrokormo`
- Created API configuration utility (`src/lib/api-config.ts`)
- Backend API URL: `http://localhost:8000` (configurable via `NEXT_PUBLIC_API_URL`)

### 2. Authentication Integration
- ✅ Updated `src/auth-option.ts` to use `/systemuser/login` endpoint
- ✅ Updated `src/app/api/register/route.ts` to use backend registration
- Authentication now uses JWT tokens from the backend

### 3. Cart Integration
- ✅ Completely replaced GraphQL cart with REST API
- ✅ Updated `src/context/CartContext.tsx` to use `/cartproducts` endpoints
- Cart now uses:
  - `GET /cartproducts/user/:userId` - Get user cart
  - `POST /cartproducts` - Add item to cart
  - `DELETE /cartproducts/user/:userId` - Clear cart

### 4. API Services
- ✅ Created `src/lib/api-services.ts` with REST API functions:
  - `getProducts()` - Get all products
  - `getProduct(id)` - Get single product
  - `getTrendingProducts()` - Get trending products
  - `getFlashSaleProducts()` - Get flash sale products
  - `getCategories()` - Get all categories
  - `getBanners()` - Get banners

### 5. Component Updates
- ✅ Removed Apollo Client provider from `src/app/layout.tsx`
- ✅ Updated `src/app/_components/Category.tsx` to use REST API
- ✅ Updated `src/app/products/_components/Products/products_layout/ShopByCategory.tsx` to use REST API

## Remaining Components to Update

The following components still use GraphQL and need to be updated to use REST API:

1. `src/app/products/[id]/page.tsx` - Uses `GET_PRODUCT`
2. `src/app/_components/TrendingProducts.tsx` - Uses `GET_TRENDING_PRODUCTS`
3. `src/app/_components/HeroCarousel.tsx` - Uses `GET_BANNERS`
4. `src/app/_components/ForYou.tsx` - Uses `GET_PRODUCTS`
5. `src/app/_components/Flash Sale/FlashSaleProduct.tsx` - Uses `GET_FLASH_SALE_PRODUCTS`
6. `src/app/_components/Flash Sale/FlashSale.tsx` - Uses `GET_FLASH_SALE_INFO`

## Important Notes

### Authentication Requirements
The backend requires JWT authentication for most endpoints. For public pages, you may need to:
1. Create public endpoints in the backend, OR
2. Use a public/system token for unauthenticated requests, OR
3. Make endpoints public by removing guards

### CompanyId Usage
The `companyId` is stored in `.env` as `COMPANY_ID=chitrokormo` and is available via `API_CONFIG.companyId` in the API config utility. The backend automatically filters data by `companyId` when authenticated requests include it in the JWT token.

### Cart Item Update/Delete
The current backend doesn't have individual update/delete endpoints for cart items. The CartContext uses a workaround (clear and re-add). Consider adding these endpoints to the backend:
- `PATCH /cartproducts/:id` - Update cart item quantity
- `DELETE /cartproducts/:id` - Delete individual cart item

## Next Steps

1. Update remaining components to use REST API (see list above)
2. Test authentication flow end-to-end
3. Ensure backend CORS allows requests from frontend
4. Add public endpoints or handle authentication for public pages
5. Test cart functionality with authenticated users
6. Update product display components to match new product data structure





