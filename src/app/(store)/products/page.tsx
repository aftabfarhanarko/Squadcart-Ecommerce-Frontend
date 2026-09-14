import { getSystemUserByCompanyId } from "@/lib/api-services";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function ProxyPage({ searchParams }: any) {
  const demoTheme = searchParams?.theme;
  const cookieStore = await cookies();
  const previewTheme = cookieStore.get("preview_theme")?.value;
  const tenant = await getSystemUserByCompanyId();
  const themeName = demoTheme || previewTheme || tenant?.theme?.name || "default";

  switch (themeName) {
    case "luxury-fashion": {
      const { default: LuxuryFashionShop } = await import("@/themes/luxury-fashion/pages/Shop");
      return <LuxuryFashionShop searchParams={searchParams} />;
    }
    case "minimal-tech": {
      const { default: MinimalTechShop } = await import("@/themes/minimal-tech/pages/Shop");
      return <MinimalTechShop searchParams={searchParams} />;
    }
    case "organic-grocery": {
      const { default: OrganicGroceryShop } = await import("@/themes/organic-grocery/pages/Shop");
      return <OrganicGroceryShop searchParams={searchParams} />;
    }
    case "urban-streetwear": {
      const { default: UrbanStreetwearShop } = await import("@/themes/urban-streetwear/pages/Shop");
      return <UrbanStreetwearShop searchParams={searchParams} />;
    }
    case "cozy-home": {
      const { default: CozyHomeShop } = await import("@/themes/cozy-home/pages/Home"); // Assuming Home has the list or themed
      return <CozyHomeShop searchParams={searchParams} />;
    }
    default: {
      const { default: DefaultShop } = await import("@/themes/default/app/products/page");
      return <DefaultShop searchParams={searchParams} />;
    }
  }
}
