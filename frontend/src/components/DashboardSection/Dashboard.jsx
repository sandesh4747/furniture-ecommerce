import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Dashboard() {
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  return (
    <div className="flex bg-gray-100 pb-20 ">
      {/* Desktop Sidebar */}
      <div>
        <span className="hidden xl:block">
          <Sidebar onLinkClick={() => setShowMobileSidebar(false)} />
        </span>
      </div>

      {/* Mobile Menu Button */}
      <div className="p-4 xl:hidden absolute top-6 left-4 z-30">
        <button onClick={() => setShowMobileSidebar(true)}>
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Sidebar with Framer Motion */}
      <AnimatePresence>
        {showMobileSidebar && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileSidebar(false)}
              className="fixed top-0 left-0 w-full h-full bg-black/20 backdrop-blur-[2px] bg-opacity-50 z-40"
            >
              {/* Sidebar */}
              <motion.div
                initial={{ x: -100 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                transition={{ type: "spring", damping: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="absolute top-0 left-0 h-full bg-white z-50"
              >
                <Sidebar onLinkClick={() => setShowMobileSidebar(false)} />
                <button
                  onClick={() => setShowMobileSidebar(false)}
                  className="absolute top-4 right-4"
                >
                  <X size={24} />
                </button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
}
