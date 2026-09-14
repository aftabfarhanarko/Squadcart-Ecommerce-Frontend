/**
 * API Service functions for backend integration
 */
import axios from "axios";
import { getApiUrl, getApiHeaders, API_CONFIG } from "./api-config";
import { Review } from "@/types/review";
import { ReturnPolicy } from "@/types/return-policy";
import { SystemUser } from "@/types/system-user";
import { Category } from "@/types/category";
import { PolicyPage } from "@/types/policy";
import { MOCK_BANNERS, MOCK_PRODUCTS, MOCK_CATEGORIES } from "./mockData";

// Types
export interface Product {
    id: number;
    name: string;
    sku: string;
    price: number;
    discountPrice?: number;
    description?: string;
    images?: { url: string; alt?: string; isPrimary?: boolean }[];
    thumbnail?: string;
    isActive: boolean;
    isFlashSell: boolean;
    flashSellStartTime?: Date;
    flashSellEndTime?: Date;
    flashSellPrice?: number;
    category: Category;
    createdAt: Date;
    updatedAt: Date;
}

export interface Banner {
    id: number;
    title: string;
    subtitle: string;
    imageUrl: string;
    buttonText?: string;
    buttonLink?: string;
    isActive: boolean;
    order: number;
    companyId: string;
    createdAt: string;
    updatedAt: string;
}

export interface ApiResponse<T> {
    statusCode: number;
    message?: string;
    data: T;
}

export interface CartItem {
    id: number;
    product: Product;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    companyId?: string;
}

export interface CartData {
    items: CartItem[];
    totalItems: number;
    totalPrice: number;
}

export interface PromoCode {
    id: number;
    code: string;
    description?: string;
    discountType: "percentage" | "fixed";
    discountValue: number;
    minOrderAmount?: number;
    startsAt?: string;
    expiresAt?: string;
    isActive: boolean;
    companyId: string;
}

/**
 * Get terms & conditions
 */
export async function getTerms(companyId?: string): Promise<PolicyPage[]> {
    try {
        const companyIdParam = companyId || API_CONFIG.companyId;
        const params = new URLSearchParams();
        if (companyIdParam) params.append("companyId", companyIdParam);

        const response = await axios.get<ApiResponse<PolicyPage[]> | PolicyPage[]>(
            getApiUrl(`/trems-condetions?${params.toString()}`),
        );

        const payload: ApiResponse<PolicyPage[]> | PolicyPage[] = response.data;
        const data = Array.isArray(payload) ? payload : (payload && typeof payload === 'object' && 'data' in payload && Array.isArray(payload.data)) ? payload.data : [];
        return Array.isArray(data) ? data : [];
    } catch (error: unknown) {
        console.error("Error fetching terms:", error);
        return [];
    }
}

/**
 * Get privacy policy
 */
export async function getPrivacyPolicies(companyId?: string): Promise<PolicyPage[]> {
    try {
        const companyIdParam = companyId || API_CONFIG.companyId;
        const params = new URLSearchParams();
        if (companyIdParam) params.append("companyId", companyIdParam);

        const response = await axios.get<ApiResponse<PolicyPage[]> | PolicyPage[]>(
            getApiUrl(`/privecy-policy?${params.toString()}`),
        );

        const payload: ApiResponse<PolicyPage[]> | PolicyPage[] = response.data;
        const data = Array.isArray(payload) ? payload : (payload && typeof payload === 'object' && 'data' in payload && Array.isArray(payload.data)) ? payload.data : [];
        return Array.isArray(data) ? data : [];
    } catch (error: unknown) {
        console.error("Error fetching privacy policy:", error);
        return [];
    }
}

/**
 * Get system user info by companyId
 */
export async function getSystemUserByCompanyId(
    companyId?: string,
): Promise<SystemUser | null> {
    try {
        const companyIdParam = companyId || API_CONFIG.companyId;
        const params = new URLSearchParams();
        if (companyIdParam) params.append("companyId", companyIdParam);

        const response = await axios.get<ApiResponse<SystemUser[]> | SystemUser>(
            getApiUrl(`/systemuser?${params.toString()}`),
        );

        const payload: ApiResponse<SystemUser[]> | SystemUser = response.data;
        const data = Array.isArray(payload) ? payload : (payload && typeof payload === 'object' && 'data' in payload) ? payload.data : payload;
        const users: SystemUser[] = Array.isArray(data) ? data : data ? [data as SystemUser] : [];
        const matched = users.find((user) => user.companyId === companyIdParam);

        return matched ?? users[0] ?? null;
    } catch (error: unknown) {
        console.error("Error fetching system user:", error);
        const err = error as { code?: string; message?: string; cause?: { code?: string } };
        if (
            err.code === 'ECONNREFUSED' ||
            err.code === 'ETIMEDOUT' ||
            err.code === 'ENOTFOUND' ||
            err.message?.includes('ECONNREFUSED') ||
            err.message?.includes('ETIMEDOUT') ||
            err.message?.includes('ENOTFOUND') ||
            err.message?.includes('Network Error') ||
            err.message?.includes('fetch failed') ||
            (err.cause && err.cause.code === 'ECONNREFUSED')
        ) {
            console.warn("Backend server is not running or not accessible. Please start the backend server.");
            return null;
        }
        return null;
    }
}

/**
 * Get all products
 */
export async function getProducts(
    companyId?: string,
): Promise<Product[]> {
    try {
        const params = new URLSearchParams();
        const companyIdParam = companyId || API_CONFIG.companyId;
        if (companyIdParam) params.append("companyId", companyIdParam);

        const response = await axios.get<ApiResponse<Product[]>>(
            getApiUrl(`/products/all?companyId=${companyIdParam}`),
        );
        return response.data.data && response.data.data.length > 0 ? response.data.data : MOCK_PRODUCTS;
    } catch (error: unknown) {
        console.error("Error fetching products:", error);
        return MOCK_PRODUCTS;
        const err = error as {
            code?: string;
            message?: string;
            cause?: { code?: string } | AggregateError;
            name?: string;
            errors?: unknown[];
        };
        // Handle various connection errors including AggregateError
        const isConnectionError =
            err.code === 'ECONNREFUSED' ||
            err.code === 'ETIMEDOUT' ||
            err.code === 'ENOTFOUND' ||
            err.message?.includes('ECONNREFUSED') ||
            err.message?.includes('ETIMEDOUT') ||
            err.message?.includes('ENOTFOUND') ||
            err.message?.includes('Network Error') ||
            err.message?.includes('fetch failed') ||
            err.message?.includes('AggregateError') ||
            (err.cause && (err.cause as { code?: string }).code === 'ECONNREFUSED') ||
            err.name === 'AggregateError' ||
            (err.name === 'AggregateError' && err.errors && Array.isArray(err.errors));

        if (isConnectionError) {
            console.warn("Backend server is not running or not accessible. Please start the backend server.");
            return [];
        }
        // For other errors, still return empty array to prevent app crash
        return [];
    }
}

/**
 * Get reviews for a product
 */
export async function getProductReviews(
    productId: number,
    companyId?: string,
): Promise<Review[]> {
    try {
        const params = new URLSearchParams();
        const companyIdParam = companyId || API_CONFIG.companyId;
        if (companyIdParam) params.append("companyId", companyIdParam);

        const response = await axios.get<ApiResponse<Review[]> | Review[]>(
            getApiUrl(`/reviews/product/${productId}?${params.toString()}`),
        );

        const payload: ApiResponse<Review[]> | Review[] = response.data;
        const data = Array.isArray(payload) ? payload : (payload && typeof payload === 'object' && 'data' in payload) ? payload.data : [];
        return Array.isArray(data) ? data : [];
    } catch (error: unknown) {
        console.error("Error fetching product reviews:", error);
        return [];
    }
}

/**
 * Get refund/return policies
 */
export async function getRefundPolicies(
    companyId?: string,
): Promise<ReturnPolicy[]> {
    try {
        const params = new URLSearchParams();
        const companyIdParam = companyId || API_CONFIG.companyId;
        if (companyIdParam) params.append("companyId", companyIdParam);

        const response = await axios.get<ApiResponse<ReturnPolicy[]> | ReturnPolicy[]>(
            getApiUrl(`/refund-policy/public?${params.toString()}`),
        );

        const payload: ApiResponse<ReturnPolicy[]> | ReturnPolicy[] = response.data;
        const data = Array.isArray(payload) ? payload : (payload && typeof payload === 'object' && 'data' in payload) ? payload.data : [];
        return Array.isArray(data) ? data : [];
    } catch (error: unknown) {
        console.error("Error fetching refund policies:", error);
        return [];
    }
}

/**
 * Get products by category
 */
export async function getProductsByCategory(
    companyId?: string,
    categoryName?: string,
    categoryId?: number
): Promise<Product[]> {
    try {
        const params = new URLSearchParams();
        const companyIdParam = companyId || API_CONFIG.companyId;
        if (companyIdParam) params.append("companyId", companyIdParam);
        if (categoryName) params.append("categories", categoryName);
        if (categoryId) params.append("categoryId", categoryId.toString());

        const response = await axios.get<ApiResponse<Product[]>>(
            // Use public endpoint to avoid auth/guards (theme/storefront)
            getApiUrl(`/products/public/category?${params.toString()}`),
        );
        const payload = response.data;
        if (Array.isArray(payload)) return payload as unknown as Product[];
        if (payload && typeof payload === "object" && "data" in payload && Array.isArray(payload.data)) return payload.data as Product[];
        return [];
    } catch (error: unknown) {
        console.error("Error fetching products by category:", error);
        const err = error as {
            code?: string;
            message?: string;
            cause?: { code?: string } | AggregateError;
            name?: string;
            errors?: unknown[];
        };
        // Handle various connection errors including AggregateError
        const isConnectionError =
            err.code === 'ECONNREFUSED' ||
            err.code === 'ETIMEDOUT' ||
            err.code === 'ENOTFOUND' ||
            err.message?.includes('ECONNREFUSED') ||
            err.message?.includes('ETIMEDOUT') ||
            err.message?.includes('ENOTFOUND') ||
            err.message?.includes('Network Error') ||
            err.message?.includes('fetch failed') ||
            err.message?.includes('AggregateError') ||
            (err.cause && (err.cause as { code?: string }).code === 'ECONNREFUSED') ||
            err.name === 'AggregateError' ||
            (err.name === 'AggregateError' && err.errors && Array.isArray(err.errors));

        if (isConnectionError) {
            console.warn("Backend server is not running or not accessible. Please start the backend server.");
            return [];
        }
        // For other errors, still return empty array to prevent app crash
        return [];
    }
}

/**
 * Get a single product by ID (uses public endpoint so storefront works without auth)
 */
export async function getProduct(id: number, companyId?: string): Promise<Product> {
    try {
        const companyIdParam = companyId || API_CONFIG.companyId;
        const params = new URLSearchParams();
        if (companyIdParam) params.append("companyId", companyIdParam);
        const response = await axios.get<ApiResponse<Product>>(
            getApiUrl(`/products/public/${id}?${params.toString()}`),
        );
        return response.data.data;
    } catch (error) {
        console.error("Error fetching product:", error);
        throw error;
    }
}

/**
 * Get a single product by slug/SKU (public endpoint, identifier can be non-numeric)
 */
export async function getProductBySlug(slug: string, companyId?: string): Promise<Product> {
    try {
        const companyIdParam = companyId || API_CONFIG.companyId;
        const params = new URLSearchParams();
        if (companyIdParam) params.append("companyId", companyIdParam);
        const response = await axios.get<ApiResponse<Product>>(
            getApiUrl(`/products/public/${encodeURIComponent(slug)}?${params.toString()}`),
        );
        return response.data.data;
    } catch (error) {
        console.error("Error fetching product by slug:", error);
        throw error;
    }
}

/**
 * Get trending products
 */
export async function getTrendingProducts(
    days?: number,
    limit?: number,
    companyId?: string
): Promise<Product[]> {
    try {
        const params = new URLSearchParams();
        if (days) params.append("days", days.toString());
        if (limit) params.append("limit", limit.toString());
        const companyIdParam = companyId || API_CONFIG.companyId;
        if (companyIdParam) params.append("companyId", companyIdParam);

        const response = await axios.get<ApiResponse<Product[]>>(
            getApiUrl(`/products/trending?${params.toString()}`),
        );
        return response.data.data && response.data.data.length > 0 ? response.data.data : MOCK_PRODUCTS;
    } catch (error: unknown) {
        console.error("Error fetching trending products:", error);
        return MOCK_PRODUCTS;
        const err = error as {
            code?: string;
            message?: string;
            cause?: { code?: string } | AggregateError;
            name?: string;
            errors?: unknown[];
        };
        // Handle various connection errors including AggregateError
        const isConnectionError =
            err.code === 'ECONNREFUSED' ||
            err.code === 'ETIMEDOUT' ||
            err.code === 'ENOTFOUND' ||
            err.message?.includes('ECONNREFUSED') ||
            err.message?.includes('ETIMEDOUT') ||
            err.message?.includes('ENOTFOUND') ||
            err.message?.includes('Network Error') ||
            err.message?.includes('fetch failed') ||
            err.message?.includes('AggregateError') ||
            (err.cause && (err.cause as { code?: string }).code === 'ECONNREFUSED') ||
            err.name === 'AggregateError' ||
            (err.name === 'AggregateError' && err.errors && Array.isArray(err.errors));

        if (isConnectionError) {
            console.warn("Backend server is not running or not accessible. Please start the backend server.");
            return [];
        }
        // For other errors, still return empty array to prevent app crash
        return [];
    }
}

/**
 * Get active flash sell products
 */
export async function getFlashSaleProducts(companyId?: string): Promise<Product[]> {
    try {
        const params = new URLSearchParams();
        const companyIdParam = companyId || API_CONFIG.companyId;
        if (companyIdParam) params.append("companyId", companyIdParam);

        const response = await axios.get<ApiResponse<Product[]>>(
            getApiUrl(`/products/flash-sell/active?${params.toString()}`),
        );
        return response.data.data && response.data.data.length > 0 ? response.data.data : MOCK_PRODUCTS.filter(p => p.isFlashSell);
    } catch (error: unknown) {
        console.error("Error fetching flash sale products:", error);
        return MOCK_PRODUCTS.filter(p => p.isFlashSell);
        const err = error as {
            code?: string;
            message?: string;
            cause?: { code?: string } | AggregateError;
            name?: string;
            errors?: unknown[];
        };
        // Handle various connection errors including AggregateError
        const isConnectionError =
            err.code === 'ECONNREFUSED' ||
            err.code === 'ETIMEDOUT' ||
            err.code === 'ENOTFOUND' ||
            err.message?.includes('ECONNREFUSED') ||
            err.message?.includes('ETIMEDOUT') ||
            err.message?.includes('ENOTFOUND') ||
            err.message?.includes('Network Error') ||
            err.message?.includes('fetch failed') ||
            err.message?.includes('AggregateError') ||
            (err.cause && (err.cause as { code?: string }).code === 'ECONNREFUSED') ||
            err.name === 'AggregateError' ||
            (err.name === 'AggregateError' && err.errors && Array.isArray(err.errors));

        if (isConnectionError) {
            console.warn("Backend server is not running or not accessible. Please start the backend server.");
            return [];
        }
        // For other errors, still return empty array to prevent app crash
        return [];
    }
}

/**
 * Get all categories
 */
export async function getCategories(companyId?: string): Promise<Category[]> {
    try {
        const params = new URLSearchParams();
        const companyIdParam = companyId || API_CONFIG.companyId;
        if (companyIdParam) params.append("companyId", companyIdParam);

        const response = await axios.get<ApiResponse<Category[]>>(
            getApiUrl(`/categories/public?${params.toString()}`),
        );
        const payload = response.data;
        const data = Array.isArray(payload) ? payload : (payload && typeof payload === "object" && "data" in payload && Array.isArray(payload.data)) ? payload.data : [];
        return data.length > 0 ? data : MOCK_CATEGORIES;
    } catch (error: unknown) {
        console.error("Error fetching categories:", error);
        return MOCK_CATEGORIES;
        const err = error as {
            code?: string;
            message?: string;
            cause?: { code?: string } | AggregateError;
            name?: string;
            errors?: unknown[];
        };
        // Handle various connection errors including AggregateError
        const isConnectionError =
            err.code === 'ECONNREFUSED' ||
            err.code === 'ETIMEDOUT' ||
            err.code === 'ENOTFOUND' ||
            err.message?.includes('ECONNREFUSED') ||
            err.message?.includes('ETIMEDOUT') ||
            err.message?.includes('ENOTFOUND') ||
            err.message?.includes('Network Error') ||
            err.message?.includes('fetch failed') ||
            err.message?.includes('AggregateError') ||
            (err.cause && (err.cause as { code?: string }).code === 'ECONNREFUSED') ||
            err.name === 'AggregateError' ||
            (err.name === 'AggregateError' && err.errors && Array.isArray(err.errors));

        if (isConnectionError) {
            console.warn("Backend server is not running or not accessible. Please start the backend server.");
            return [];
        }
        // For other errors, still return empty array to prevent app crash
        return [];
    }
}

/**
 * Get a single category by ID
 */
export async function getCategory(
    id: number,
    companyId?: string
): Promise<Category> {
    try {
        const params = new URLSearchParams();
        const companyIdParam = companyId || API_CONFIG.companyId;
        if (companyIdParam) params.append("companyId", companyIdParam);
        const response = await axios.get<ApiResponse<Category>>(
            getApiUrl(`/categories/public/${id}?${params.toString()}`),

        );
        return response.data.data;
    } catch (error) {
        console.error("Error fetching category:", error);
        throw error;
    }
}

/**
 * Create a review for a product
 */
export async function createReview(
    payload: { productId: number; rating: number; title?: string; comment: string },
    token: string,
    companyId?: string
): Promise<Review> {
    const params = new URLSearchParams();
    const companyIdParam = companyId || API_CONFIG.companyId;
    if (companyIdParam) params.append("companyId", companyIdParam);

    const response = await axios.post<ApiResponse<Review> | Review>(
        getApiUrl(`/reviews?${params.toString()}`),
        payload,
        {
            headers: getApiHeaders(token),
        }
    );

    const payloadData: ApiResponse<Review> | Review = response.data;
    const data = (payloadData && typeof payloadData === 'object' && 'data' in payloadData) ? payloadData.data : payloadData;
    return data as Review;
}

/**
 * Cart APIs
 */
export async function getCart(
    userId: number,
    token: string,
    companyId?: string,
): Promise<CartData> {
    const companyIdParam = companyId || API_CONFIG.companyId;
    const response = await axios.get<ApiResponse<CartItem[]> | CartItem[]>(
        getApiUrl(`/cartproducts/user/${userId}?companyId=${companyIdParam}`),
        { headers: getApiHeaders(token) },
    );
    const payload: ApiResponse<CartItem[]> | CartItem[] = response.data;
    const data = Array.isArray(payload) ? payload : (payload && typeof payload === 'object' && 'data' in payload) ? payload.data : [];
    const items: CartItem[] = Array.isArray(data) ? data : [];
    const totalItems = items.reduce((sum, i) => sum + (i.quantity || 0), 0);
    const totalPrice = items.reduce((sum, i) => sum + Number(i.totalPrice || 0), 0);
    return { items, totalItems, totalPrice };
}

export async function addCartItemApi(
    userId: number,
    productId: number,
    quantity: number,

    companyId?: string,
): Promise<CartItem> {
    const companyIdParam = companyId || API_CONFIG.companyId;
    const response = await axios.post<ApiResponse<CartItem> | CartItem>(
        getApiUrl("/cartproducts"),
        { userId, productId, quantity, companyId: companyIdParam },

    );
    const payload: ApiResponse<CartItem> | CartItem = response.data;
    return (payload && typeof payload === 'object' && 'data' in payload) ? payload.data : payload as CartItem;
}

export async function updateCartItemApi(
    cartItemId: number,
    quantity: number,

    companyId?: string,
): Promise<CartItem> {
    const companyIdParam = companyId || API_CONFIG.companyId;
    const response = await axios.patch<ApiResponse<CartItem> | CartItem>(
        getApiUrl(`/cartproducts/${cartItemId}?companyId=${companyIdParam}`),
        { quantity },

    );
    const payload: ApiResponse<CartItem> | CartItem = response.data;
    return (payload && typeof payload === 'object' && 'data' in payload) ? payload.data : payload as CartItem;
}

export async function deleteCartItemApi(
    cartItemId: number,

    companyId?: string,
): Promise<void> {
    const companyIdParam = companyId || API_CONFIG.companyId;
    await axios.delete(
        getApiUrl(`/cartproducts/${cartItemId}?companyId=${companyIdParam}`),

    );
}

export async function clearCartApi(
    userId: number,
    token: string,
    companyId?: string,
): Promise<void> {
    const companyIdParam = companyId || API_CONFIG.companyId;
    await axios.delete(
        getApiUrl(`/cartproducts/user/${userId}?companyId=${companyIdParam}`),
        { headers: getApiHeaders(token) },
    );
}

/**
 * Promo codes
 */
export async function getPromocodes(token: string, companyId?: string): Promise<PromoCode[]> {
    const companyIdParam = companyId || API_CONFIG.companyId;
    const response = await axios.get<ApiResponse<PromoCode[]> | PromoCode[]>(
        getApiUrl(`/promocode?companyId=${companyIdParam}`),
        { headers: getApiHeaders(token) }
    );
    const payload: ApiResponse<PromoCode[]> | PromoCode[] = response.data;
    const data = Array.isArray(payload) ? payload : (payload && typeof payload === 'object' && 'data' in payload) ? payload.data : [];
    return Array.isArray(data) ? data : [];
}

/**
 * Orders
 */
export async function createOrder(
    payload: {
        customerId?: number;
        customerName?: string;
        customerPhone?: string;
        customerAddress?: string;
        shippingAddress?: string;
        paymentMethod?: "DIRECT" | "COD";
        deliveryType?: "INSIDEDHAKA" | "OUTSIDEDHAKA";
        items: { productId: number; quantity: number }[];
    },
    token: string,
    companyId?: string,
): Promise<unknown> {
    const companyIdParam = companyId || API_CONFIG.companyId;
    const response = await axios.post(
        getApiUrl(`/orders?companyId=${companyIdParam}`),
        payload,
        { headers: getApiHeaders(token) }
    );
    const responseData: ApiResponse<unknown> | unknown = response.data;
    return (responseData && typeof responseData === 'object' && 'data' in responseData)
        ? (responseData as ApiResponse<unknown>).data
        : responseData;
}

/**
 * Get all banners
 */
export async function getBanners(companyId?: string): Promise<Banner[]> {
    try {
        const params = new URLSearchParams();
        const companyIdParam = companyId || API_CONFIG.companyId;
        if (companyIdParam) params.append("companyId", companyIdParam);

        const response = await axios.get<ApiResponse<Banner[]>>(
            getApiUrl(`/banners?${params.toString()}`),

        );
        return response.data.data && response.data.data.length > 0 ? response.data.data : MOCK_BANNERS;
    } catch (error: unknown) {
        console.error("Error fetching banners:", error);
        return MOCK_BANNERS;
        const err = error as {
            code?: string;
            message?: string;
            cause?: { code?: string } | AggregateError;
            name?: string;
            errors?: unknown[];
        };
        // Handle various connection errors including AggregateError
        const isConnectionError =
            err.code === 'ECONNREFUSED' ||
            err.code === 'ETIMEDOUT' ||
            err.code === 'ENOTFOUND' ||
            err.message?.includes('ECONNREFUSED') ||
            err.message?.includes('ETIMEDOUT') ||
            err.message?.includes('ENOTFOUND') ||
            err.message?.includes('Network Error') ||
            err.message?.includes('fetch failed') ||
            err.message?.includes('AggregateError') ||
            (err.cause && (err.cause as { code?: string }).code === 'ECONNREFUSED') ||
            err.name === 'AggregateError' ||
            (err.name === 'AggregateError' && err.errors && Array.isArray(err.errors));

        if (isConnectionError) {
            console.warn("Backend server is not running or not accessible. Please start the backend server.");
            return [];
        }
        // For other errors, still return empty array to prevent app crash
        return [];
    }
}

