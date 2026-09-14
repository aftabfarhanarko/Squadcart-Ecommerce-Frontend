import { getSystemUserByCompanyId } from "@/lib/api-services";
import { cookies, headers } from "next/headers";
import ThemesGallery from "../themes/page";
import Navbar from "@/components/Navbar";

// Force specific rendering mode
export const dynamic = 'force-dynamic';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function ProxyPage({ searchParams }: any) {
  try {
    const reqHeaders = await headers();
    const host = reqHeaders.get("x-forwarded-host") || reqHeaders.get("host") || "";
    
    // Check if we are on the main marketplace domain
    const isMarketplace = [
      "squadcart.com",
      "www.squadcart.com",
      "squadcart.app",
      "www.squadcart.app",
      "squadcart-themes-production.up.railway.app",
      "localhost:3003",
    ].includes(host.toLowerCase());

    const demoTheme = searchParams?.theme;
    const cookieStore = await cookies();
    const previewTheme = cookieStore.get("preview_theme")?.value;

    // If on the marketplace domain and not previewing any specific theme, render the gallery
    if (isMarketplace && !demoTheme && !previewTheme) {
      return (
        <div className="themes-root">
          <Navbar />
          <ThemesGallery />
        </div>
      );
    }

    const tenant = await getSystemUserByCompanyId().catch(() => null);
    const themeName = demoTheme || previewTheme || tenant?.theme?.name || "default";

    switch (themeName) {
      case "luxury-fashion": {
        const { default: LuxuryFashionHome } = await import("@/themes/luxury-fashion/pages/Home");
        return <LuxuryFashionHome searchParams={searchParams} />;
      }
      case "minimal-tech": {
        const { default: MinimalTechHome } = await import("@/themes/minimal-tech/pages/Home");
        return <MinimalTechHome searchParams={searchParams} />;
      }
      case "organic-grocery": {
        const { default: OrganicGroceryHome } = await import("@/themes/organic-grocery/pages/Home");
        return <OrganicGroceryHome searchParams={searchParams} />;
      }
      case "urban-streetwear": {
        const { default: UrbanStreetwearHome } = await import("@/themes/urban-streetwear/pages/Home");
        return <UrbanStreetwearHome searchParams={searchParams} />;
      }
      case "cozy-home": {
        const { default: CozyHomeHome } = await import("@/themes/cozy-home/pages/Home");
        return <CozyHomeHome searchParams={searchParams} />;
      }
      default: {
        const { default: DefaultPage } = await import("@/themes/default/app/page");
        return <DefaultPage searchParams={searchParams} />;
      }
    }
  } catch (error) {
    console.error("Theme Proxy Error:", error);
    // Fallback to the default theme physically if import fails
    const { default: DefaultPage } = await import("@/themes/default/app/page");
    return <DefaultPage searchParams={searchParams} />;
  }
}


