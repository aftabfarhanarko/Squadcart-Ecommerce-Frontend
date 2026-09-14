import DefaultPage from "@/themes/default/app/flashSell/[id]/page";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function ProxyPage(props: any) {
  

  // if (themeName === "premium") return <PremiumPage {...props} />;

  return <DefaultPage {...props} />;
}
