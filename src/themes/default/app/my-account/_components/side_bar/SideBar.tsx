import { MdLogout } from "react-icons/md";
import Menu from "./Menu";
import UserInfo from "./UserInfo";

const SideBar = () => {
  return (
    <div className="sticky top-24">
      <div className="min-h-[80vh] rounded-2xl bg-gradient-to-b from-pink-50 via-white to-pink-50 border border-pink-100 shadow-sm p-3 md:p-4 flex flex-col gap-4 justify-between">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-3">
            <UserInfo />
          </div>
          <div className="w-full h-px bg-pink-100" />
          <Menu />
        </div>
        <div>
          <div className="w-full h-px bg-pink-100 mb-3" />
          <button className="flex items-center gap-2 rounded-full bg-primary text-white px-4 py-2 w-full justify-center text-sm font-medium hover:bg-primary/90 transition-colors">
            <MdLogout />
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
