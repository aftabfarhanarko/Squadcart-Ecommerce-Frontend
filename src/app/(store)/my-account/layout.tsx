import DefaultLayout from "@/themes/default/app/my-account/layout";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function ProxyLayout(props: any) {
  

  // if (themeName === "premium") return <PremiumLayout {...props} />;

  return <DefaultLayout {...props} />;
}
