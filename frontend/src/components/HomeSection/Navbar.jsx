import React, { use, useEffect, useState } from "react";
import { Heart, ShoppingCart, Search, User } from "lucide-react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import CartSlider from "../CartSlider/CartSlider";
import { useDispatch, useSelector } from "react-redux";
import { useUserLogoutMutation } from "../../pages/Auth-Page/authApi";
import toast from "react-hot-toast";
import { setUser } from "../../features/user/userSlice";
import SearchBar from "./SearchBar";
import { useGetSearchResultsQuery } from "../../features/product/productApi";

export default function Navbar({ userDropDownOpen, setUserDropDownOpen }) {
  const navLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Shop",
      path: "/shop",
    },
    {
      name: "About",
      path: "/about",
    },
    {
      name: "Contact",
      path: "/contact-page",
    },
  ];
  const { user } = useSelector((state) => state.userSlice);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");

  const { data: searchResults } = useGetSearchResultsQuery(debouncedTerm, {
    skip: !debouncedTerm,
  });
  // console.log("data", serachResults);
  const favouritesCount = user?.favourites?.length || 0;
  const cartCount = user?.cart?.length || 0;

  const [userLogout] = useUserLogoutMutation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartSelected, setCartSelected] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getActiveLink = () => {
    if (location.pathname === "/") return "Home";
    if (location.pathname.startsWith("/shop")) return "Shop";
    if (location.pathname.startsWith("/about")) return "About";
    if (location.pathname.startsWith("/contact")) return "Contact";
    return "";
  };
  const isActive = getActiveLink();

  // List of paths where white background is required

  const isWhiteBg =
    [
      "/shop",
      "/about",
      "/contact-page",
      "/auth-page",
      "/checkout",
      "/blog-page",
      "/cart-page",
      "/favourites",
    ].includes(location.pathname) ||
    location.pathname.startsWith("/product-details/") ||
    location.pathname.startsWith("/order-confirmation/");

  const IsHomePage = location.pathname === "/";
  const navbarBgClass = IsHomePage
    ? isScrolled
      ? "bg-white"
      : "bg-[#FBEBB5]"
    : "bg-white";

  const handleLogout = async () => {
    try {
      const response = await userLogout().unwrap();
      dispatch(setUser(null));

      toast.success("Logout Successful");
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setDebouncedTerm(searchTerm.trim());
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  return (
    <div className="text-sm text-white w-full fixed top-0 left-0 right-0 z-50 ">
      {/* Main Navbar */}
      <nav
        className={`relative h-[70px] flex items-center justify-between px-4 sm:px-6 md:px-5 lg:px-16 py-4 
  ${navbarBgClass} text-gray-900 z-50 ${isScrolled ? "shadow-md" : ""}`}
      >
        {/* Logo Placeholder */}
        <div
          onClick={() => navigate("/")}
          className="text-2xl font-bold text-gray-800 hidden md:block cursor-pointer"
        >
          MyShop
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center  px-5 md:gap-8 lg:gap-15  ">
          {navLinks.map((item, i) => (
            <li key={item.name}>
              <NavLink
                onClick={() => {
                  setUserDropDownOpen(false);
                }}
                to={item.path}
                className={`text-lg hover:text-[#c27d00] font-medium transition-colors duration-200 ${
                  isActive === item.name
                    ? "text-[#c27d00] border-b-2 border-[#c27d00]"
                    : "text-gray-800"
                }`}
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Desktop Icons */}
        <div className="hidden md:flex items-center space-x-6 ">
          {[
            { icon: User, onClick: () => setUserDropDownOpen((prev) => !prev) },

            {
              icon: Search,
              onClick: () => {
                setUserDropDownOpen(false);
                setShowSearch(!showSearch);
              },
            },

            {
              icon: Heart,
              onClick: () => {
                setUserDropDownOpen(false);
                navigate("/favourites");
              },
              badge: favouritesCount,
            },

            {
              icon: ShoppingCart,
              onClick: () => {
                setUserDropDownOpen(false);
                setCartSelected(true);
              },
              badge: cartCount,
            },
          ].map(({ icon: Icon, onClick, badge }, idx) => (
            <div className="relative" key={idx}>
              {" "}
              <button
                onClick={onClick}
                key={idx}
                className="bg-[#FBEBB5] md:p-1 lg:p-2 rounded-full hover:bg-[#f3db89] transition duration-200 active:scale-95"
              >
                <Icon className="w-6 h-6 text-gray-800" />
              </button>
              <div className="z-55 absolute -top-1 right-12 ">
                {showSearch && Icon === Search && (
                  <div className="w-full xl:min-w-[300px] lg:min-w-[250px] min-w-[200px]">
                    {" "}
                    <SearchBar
                      setShowSearch={setShowSearch}
                      searchTerm={searchTerm}
                      setSearchTerm={setSearchTerm}
                    />
                  </div>
                )}
                {searchTerm &&
                  searchResults?.product?.length > 0 &&
                  Icon === Search &&
                  showSearch === true && (
                    <div className="bg-white border border-gray-200 rounded-lg shadow-lg  w-full max-h-72 z-100 overflow-y-auto">
                      {searchResults?.product?.map((product) => (
                        <Link
                          onClick={() => {
                            setSearchTerm("");
                            setShowSearch(false);
                          }}
                          to={`/product-details/${product._id}`}
                          key={product._id}
                          className="flex items-center gap-4 px-4 py-2 hover:bg-gray-100"
                        >
                          <img
                            src={product?.images[0]?.url}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <span className="text-sm">{product?.name}</span>
                        </Link>
                      ))}
                    </div>
                  )}
              </div>
              {/* Badge for Heart icon */}
              {badge > 0 && Icon === Heart && (
                <span className="absolute -top-0 right-0 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                  {badge}
                </span>
              )}
              {badge > 0 && Icon === ShoppingCart && (
                <span className="absolute -top-0 right-0 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                  {badge}
                </span>
              )}
              {Icon === User && userDropDownOpen && (
                <div className="absolute right-0 w-40 bg-[#f3db89] text-gray-800 rounded shadow-md z-50">
                  <div className="py-1 text-sm text-gray-700">
                    <div
                      onClick={() => {
                        if (user) {
                          navigate("/dashboard");
                        } else {
                          navigate("/auth-page");
                        }

                        setUserDropDownOpen(false);
                      }}
                      className=" hover:bg-[#e3cb6f] px-4 py-2 cursor-pointer"
                    >
                      {user ? "Dashboard" : "Login"}
                    </div>
                    <div
                      onClick={() => {
                        if (user) {
                          handleLogout();
                        }
                        navigate("/auth-page");
                        setUserDropDownOpen(false);
                      }}
                      className="hover:bg-[#e3cb6f] px-4 py-2 cursor-pointer"
                    >
                      {user ? "Logout" : "Signup"}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          aria-label="menu-btn"
          type="button"
          className="inline-block md:hidden active:scale-90 transition"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30">
            <path d="M3 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2zm0 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2zm0 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2z" />
          </svg>
        </button>
      </nav>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div
          className={`absolute top-[70px] left-0 w-full shadow-md p-6 md:hidden z-40 ${
            isWhiteBg ? "bg-white" : "bg-[#f2edda] "
          }`}
        >
          <ul className="flex flex-col space-y-4 text-lg text-gray-800">
            {navLinks.map((item, i) => (
              <li key={i}>
                <NavLink
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setUserDropDownOpen(false);
                  }}
                  to={item.path}
                  className="hover:text-[#c27d00] transition-colors duration-200"
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-start space-x-6 mt-6 ">
            {[
              {
                icon: User,
                onClick: () => setUserDropDownOpen((prev) => !prev),
              },

              {
                icon: Search,
                onClick: () => {
                  setUserDropDownOpen(false);
                  setShowSearch(!showSearch);
                },
              },

              {
                icon: Heart,
                onClick: () => {
                  setUserDropDownOpen(false);
                  navigate("/favourites");
                },
                badge: favouritesCount,
              },

              {
                icon: ShoppingCart,
                onClick: () => {
                  setUserDropDownOpen(false);
                  setCartSelected(true);
                },
              },
            ].map(({ icon: Icon, onClick, badge }, idx) => (
              <div className="relative">
                <button
                  onClick={onClick}
                  key={idx}
                  className="bg-[#FBEBB5] p-2 rounded-full hover:bg-[#f3db89] transition duration-200 active:scale-95"
                >
                  <Icon className="w-6 h-6 text-gray-800" />
                </button>
                <div className="text-black absolute mt-2 -left-10      ">
                  {showSearch && Icon === Search && (
                    <div className=" w-full min-w-70 sm:min-w-100">
                      {" "}
                      <SearchBar
                        setShowSearch={setShowSearch}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                      />
                    </div>
                  )}
                  {searchTerm &&
                    searchResults?.product?.length > 0 &&
                    Icon === Search &&
                    showSearch === true && (
                      <div className="bg-white border border-gray-200 rounded-lg shadow-lg  w-full max-h-72 z-100 overflow-y-auto">
                        {searchResults?.product?.map((product) => (
                          <Link
                            onClick={() => {
                              setSearchTerm("");
                              setShowSearch(false);
                              isMobileMenuOpen(false);
                            }}
                            to={`/product-details/${product._id}`}
                            key={product._id}
                            className="flex items-center gap-4 px-4 py-2 hover:bg-gray-100"
                          >
                            <img
                              src={product?.images[0]?.url}
                              alt={product.name}
                              className="w-12 h-12 object-cover rounded"
                            />
                            <span className="text-sm">{product?.name}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                </div>
                {badge > 0 && Icon === Heart && (
                  <span className="absolute -top-0 right-0 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                    {badge}
                  </span>
                )}
                {Icon === User && userDropDownOpen && (
                  <div className="absolute left-0 mt-2  w-40 bg-white rounded shadow-md z-50 ">
                    <div className="py-1 text-sm text-gray-700">
                      <div
                        onClick={() => {
                          if (user) {
                            navigate("/dashboard");
                          } else {
                            navigate("/auth-page");
                          }

                          setUserDropDownOpen(false);
                        }}
                        className="hover:bg-gray-100 px-4 py-2 cursor-pointer"
                      >
                        {user ? "Dashboard" : "Login"}
                      </div>
                      <div
                        onClick={() => {
                          if (user) {
                            handleLogout();
                          }
                          navigate("/auth-page");
                          setUserDropDownOpen(false);
                        }}
                        className="hover:bg-gray-100 px-4 py-2 cursor-pointer"
                      >
                        {user ? "Logout" : "Signup"}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {cartSelected && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-xs bg-opacity-50 z-50 flex justify-end">
          <div className="h-[746px] w-[417px] bg-white shadow-lg z-50 text-black">
            <CartSlider setCartSelected={setCartSelected} />
          </div>
        </div>
      )}
    </div>
  );
}
