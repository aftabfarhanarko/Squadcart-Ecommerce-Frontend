import { getSystemUserByCompanyId, getProduct } from "@/lib/api-services";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function ProxyPage({ params, searchParams }: any) {
  const { id } = params;
  const demoTheme = searchParams?.theme;
  const cookieStore = await cookies();
  const previewTheme = cookieStore.get("preview_theme")?.value;
  const tenant = await getSystemUserByCompanyId();
  const themeName = demoTheme || previewTheme || tenant?.theme?.name || "default";

  // Fetch product data on server for better SEO and performance
  const product = await getProduct(Number(id));

  switch (themeName) {
    case "luxury-fashion": {
      const { default: LuxuryFashionProduct } = await import("@/themes/luxury-fashion/pages/Product");
      return <LuxuryFashionProduct product={product} relatedProducts={[]} />;
    }
    case "minimal-tech": {
      const { default: MinimalTechProduct } = await import("@/themes/minimal-tech/pages/Product");
      return <MinimalTechProduct product={product} relatedProducts={[]} />;
    }
    case "organic-grocery": {
      const { default: OrganicGroceryProduct } = await import("@/themes/organic-grocery/pages/Product");
      return <OrganicGroceryProduct product={product} relatedProducts={[]} />;
    }
    case "urban-streetwear": {
      const { default: UrbanStreetwearProduct } = await import("@/themes/urban-streetwear/pages/Product");
      return <UrbanStreetwearProduct product={product} relatedProducts={[]} />;
    }
    case "cozy-home": {
      const { default: CozyHomeProduct } = await import("@/themes/cozy-home/pages/Home"); // Fallback
      return <CozyHomeProduct searchParams={searchParams} />;
    }
    default: {
      const { default: DefaultProduct } = await import("@/themes/default/app/products/[id]/page");
      return <DefaultProduct params={params} searchParams={searchParams} />;
    }
  }
}
