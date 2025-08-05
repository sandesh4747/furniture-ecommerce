import React, { useState } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Alert,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  CubeTransparentIcon,
} from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { useUserLogoutMutation } from "../../pages/Auth-Page/authApi";
import { setUser } from "../../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import logo from "../../assets/img/logo.png";

export function Sidebar({ onLinkClick }) {
  const [open, setOpen] = React.useState(0);
  const [openAlert, setOpenAlert] = React.useState(true);
  const [openProducts, setOpenProducts] = useState(false);
  const [openOrders, setOpenOrders] = useState(false);
  const [userLogout, { isLoading }] = useUserLogoutMutation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userSlice);

  const handleLogout = async () => {
    try {
      const response = await userLogout().unwrap();
      dispatch(setUser(null));

      navigate("/");

      toast.success("Logout Successful");
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const navigate = useNavigate();

  return (
    <Card className="h-screen w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 ">
      <div
        onClick={() => navigate("/")}
        className="mb-2 flex items-center gap-2 p-4 cursor-pointer"
      >
        <img src={logo} alt="brand" className="h-12 w-12" />
        <Typography variant="h6" color="blue-gray">
          Sidebar
        </Typography>
      </div>
      <List>
        <Accordion
          open={open === 1}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === 1 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 1}>
            <AccordionHeader
              onClick={() => handleOpen(1)}
              className="border-b-0 p-3"
            >
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal ">
                Dashboard
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <Link to="/dashboard">
                <ListItem onClick={onLinkClick}>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Analytics
                </ListItem>
              </Link>
              <ListItem onClick={onLinkClick}>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Reporting
              </ListItem>
              <ListItem onClick={onLinkClick}>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Projects
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>
        <Accordion
          open={open === 2}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === 2 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 2}>
            <AccordionHeader
              onClick={() => handleOpen(2)}
              className="border-b-0 p-3"
            >
              <ListItemPrefix>
                <ShoppingBagIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                E-Commerce
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              {/* Orders Menu */}
              <div>
                <ListItem
                  className="cursor-pointer"
                  onClick={() => setOpenOrders(!openOrders)}
                >
                  <ListItemPrefix>
                    <ChevronRightIcon
                      strokeWidth={3}
                      className={`h-3 w-5 transition-transform ${
                        openOrders ? "rotate-90" : ""
                      }`}
                    />
                  </ListItemPrefix>
                  Orders
                </ListItem>
                {openOrders && (
                  <List className="pl-8">
                    <Link to="/dashboard/order-list">
                      <ListItem
                        onClick={onLinkClick}
                        className="cursor-pointer"
                      >
                        Order List
                      </ListItem>
                    </Link>
                  </List>
                )}
              </div>

              {/* Products Menu */}
              {user?.role === "admin" && (
                <div>
                  <ListItem
                    className="cursor-pointer"
                    onClick={() => setOpenProducts(!openProducts)}
                  >
                    <ListItemPrefix>
                      <ChevronRightIcon
                        strokeWidth={3}
                        className={`h-3 w-5 transition-transform ${
                          openProducts ? "rotate-90" : ""
                        }`}
                      />
                    </ListItemPrefix>
                    Products
                  </ListItem>
                  {openProducts && (
                    <List className="pl-8">
                      <Link to="/dashboard/add-product">
                        <ListItem
                          onClick={onLinkClick}
                          className="cursor-pointer"
                        >
                          Add Product
                        </ListItem>
                      </Link>
                      <Link to="/dashboard/product-list">
                        <ListItem
                          onClick={onLinkClick}
                          className="cursor-pointer"
                        >
                          Product List
                        </ListItem>
                      </Link>
                    </List>
                  )}
                </div>
              )}
            </List>
          </AccordionBody>
        </Accordion>
        <hr className="my-2 border-blue-gray-50" />

        <Link onClick={onLinkClick} to="/dashboard/profile">
          <ListItem>
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            Profile
          </ListItem>
        </Link>

        <Link onClick={onLinkClick} to="/dashboard/settings">
          <ListItem>
            <ListItemPrefix>
              <Cog6ToothIcon className="h-5 w-5" />
            </ListItemPrefix>{" "}
            Settings
          </ListItem>
        </Link>
        <ListItem
          onClick={handleLogout}
          className="cursor-pointer hover:text-red-500"
        >
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
}
