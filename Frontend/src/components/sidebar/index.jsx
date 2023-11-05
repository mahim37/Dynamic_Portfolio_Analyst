/* eslint-disable */

import { HiX } from "react-icons/hi";
import Links from "./components/Links";

import SidebarCard from "components/sidebar/componentsrtl/SidebarCard";
import routes from "routes.js";

const Sidebar = ({ open, onClose }) => {
  return (
    <div
      className={`sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${open ? "translate-x-0" : "-translate-x-96"
        }`}
    >
      <span
        className="absolute top-4 right-4 block cursor-pointer xl:hidden"
        onClick={onClose}
      >
        <HiX />
      </span>

      <div className={`mx-[56px] mt-[50px] flex items-center`}>
        {/* <div className="mt-1 ml-1 h-2.5 font-poppins text-[20px] font-bold uppercase text-navy-700 dark:text-white">
        Dynamic Portfolio <br/>
        <span class="font-medium ">Analyst</span>
        </div> */}
        <div className="mt-0 ml-0 h-6 font-poppins text-36 font-bold uppercase text-navy-700 dark:text-white">
          <div className="text-center">
            <span style={{ fontSize: '20px' }}>Dynamic Portfolio</span>
            <br />
            <span className="font-medium" style={{ fontSize: '22px' }}>Analyst</span>
          </div>
        </div>



      </div>
      <div class="mt-[58px] mb-7 h-px bg-gray-300 dark:bg-white/30" />
      {/* Nav item */}

      <ul className="mb-auto pt-1">
        <Links routes={routes} />
      </ul>

      {/* Free Horizon Card */}
      <div className="flex justify-center">
        <SidebarCard />
      </div>

      {/* Nav item end */}
    </div>
  );
};

export default Sidebar;
