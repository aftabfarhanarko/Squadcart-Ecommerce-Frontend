import SideBar from "./_components/side_bar/SideBar";

const Dashboardlayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-pink-50/40 to-white">
      <div className="max-w-7xl mx-auto px-5 py-6 md:py-8">
        <div className="grid gap-4 md:gap-6 lg:gap-8 md:grid-cols-[260px,minmax(0,1fr)]">
          <div className="md:pt-2">
            <SideBar />
          </div>
          <div className="rounded-2xl border border-pink-100 bg-white/90 shadow-sm px-4 py-4 md:px-6 md:py-6 lg:px-7 lg:py-7">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboardlayout;
