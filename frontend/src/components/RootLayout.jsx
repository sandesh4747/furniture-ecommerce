import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./HomeSection/Navbar";
import Footer from "./Footer/Footer";
import ScrollToTop from "./Scroll";

export default function RootLayout() {
  const [userDropDownOpen, setUserDropDownOpen] = useState(false);
  const location = useLocation();

  const hidePaths = ["/dashboard"];
  const noPaddingPaths = ["/", "/dashboard"];
  const shouldHideLayout = hidePaths.some((path) =>
    location.pathname.startsWith(path)
  );

  const shouldApplyPadding = !noPaddingPaths.some(
    (path) =>
      location.pathname.startsWith(path + "/") || location.pathname === path
  );
  return (
    <div className=" min-h-screen">
      <ScrollToTop />
      {!shouldHideLayout && (
        <Navbar
          userDropDownOpen={userDropDownOpen}
          setUserDropDownOpen={setUserDropDownOpen}
        />
      )}
      <main
        className={`${shouldApplyPadding ? "pt-20" : ""}`}
        onClick={() => {
          // Only close if dropdown is open
          if (userDropDownOpen) {
            setUserDropDownOpen(false);
          }
        }}
      >
        <Outlet />
      </main>
      <footer className="bg-white shadow-lg">
        <div className="container mx-auto px-4 py-8">
          <Footer />
        </div>
      </footer>
    </div>
  );
}
