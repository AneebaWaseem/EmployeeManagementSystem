import React, { useEffect, useRef, useState } from "react";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/auths/authSlice"; 
import { Icon } from "@iconify/react";

const navigationItems = [
  { name: "Users", href: "/users" },
  { name: "Tasks", href: "/tasks" },
  { name: "Settings", href: "/settings"}
];

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [hoverTab, setHoverTab] = useState(null);
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  const navRefs = useRef([]);

  const currentPath = location.pathname;
  const activeTabByPath = navigationItems.find(
    (item) => item.href === currentPath
  )?.name;
  const activeOrHoverTab = hoverTab || activeTabByPath;

  useEffect(() => {
    const index = navigationItems.findIndex(
      (item) => item.name === activeOrHoverTab
    );
    const el = navRefs.current[index];
    if (el) {
      const { offsetLeft, offsetWidth } = el;
      setUnderlineStyle({ left: offsetLeft, width: offsetWidth });
    }
  }, [activeOrHoverTab, location.pathname]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <Disclosure
      as="nav"
      className="bg-gray-900 text-white rounded-b-sm shadow-sm py-4 fixed top-0 left-0 w-full z-50 opacity-95"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-15 items-center justify-between">
          {/* Brand */}
          <Link
            to="/users"
            className="font-bold text-3xl hover:text-blue-400 transition"
          >
            EMS
          </Link>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white">
              <Bars3Icon className="block h-6 w-6 ui-open:hidden" />
              <XMarkIcon className="hidden h-6 w-6 ui-open:block" />
            </DisclosureButton>
          </div>

          {/* Desktop nav with animated double underline */}
          <div className="hidden lg:flex space-x-6 relative items-center">
            {navigationItems.map((item, index) => {
              const isCurrent = currentPath === item.href;

              return (
                <div
                  key={item.name}
                  ref={(el) => (navRefs.current[index] = el)}
                  onMouseEnter={() => setHoverTab(item.name)}
                  onMouseLeave={() => setHoverTab(null)}
                  className={`px-3 py-2 font-medium text-lg cursor-pointer transition-colors ${
                    isCurrent ? "text-blue-400" : "hover:text-blue-300"
                  }`}
                >
                  <Link to={item.href}>{item.name}</Link>
                </div>
              );
            })}

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 px-3 py-2 font-medium text-lg text-gray-900 hover:text-gray-700 transition-colors bg-[#569eb8] rounded-md"
            >
              <Icon icon="mdi:logout" className="w-5 h-5" />
              Logout
            </button>

            {/* Bottom underline */}
            <span
              className="absolute bottom-0 h-[2px] bg-blue-400 transition-all duration-300 ease-in-out"
              style={{
                left: `${underlineStyle.left}px`,
                width: `${underlineStyle.width}px`,
              }}
            />

            {/* Top underline */}
            <span
              className="absolute top-0 h-[2px] bg-blue-400 transition-all duration-300 ease-in-out"
              style={{
                left: `${underlineStyle.left}px`,
                width: `${underlineStyle.width}px`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <DisclosurePanel className="lg:hidden flex">
        <div className="px-2 pt-2 pb-3 space-y-1 w-full">
          {navigationItems.map((item) => (
            <DisclosureButton
              key={item.name}
              as={Link}
              to={item.href}
              className={`block px-4 py-2 font-medium rounded-md ${
                currentPath === item.href
                  ? "bg-blue-500 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              {item.name}
            </DisclosureButton>
          ))}

          {/* Mobile Logout Button */}
          <DisclosureButton
            as="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2 font-medium rounded-md text-red-400 hover:bg-gray-800 hover:text-red-300"
          >
            <Icon icon="mdi:logout" className="w-5 h-5" />
            Logout
          </DisclosureButton>
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}

export default Navbar;
