import DefaultPage from "@/themes/default/app/my-account/dashboard/page";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function ProxyPage(props: any) {
  

  // if (themeName === "premium") return <PremiumPage {...props} />;

  return <DefaultPage {...props} />;
}
