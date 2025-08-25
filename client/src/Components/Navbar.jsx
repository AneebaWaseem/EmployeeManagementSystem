import React, { useEffect, useRef, useState } from "react";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";

const navigationItems = [
  { name: "Users", href: "/users" },
  { name: "Tasks", href: "/tasks" },
];

function Navbar() {
  const location = useLocation();
  const [hoverTab, setHoverTab] = useState(null);
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  const navRefs = useRef([]);

  // Get active tab from path
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

  return (
    <Disclosure
      as="nav"
      className="bg-gray-900 text-white rounded-md shadow-sm py-4 fixed top-0 left-0 w-full z-50 opacity-95"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-15 items-center justify-between">
          {/* Brand */}
          <div className="font-bold text-3xl">EMS</div>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white">
              <Bars3Icon className="block h-6 w-6 ui-open:hidden" />
              <XMarkIcon className="hidden h-6 w-6 ui-open:block" />
            </DisclosureButton>
          </div>

          {/* Desktop nav with animated double underline */}
          <div className="hidden lg:flex space-x-6 relative">
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
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}

export default Navbar;
