import { Disclosure } from "@headlessui/react";
import React from "react";
import { HiMiniBars3, HiMiniBars3CenterLeft } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { logoutUser } from "../../features/auth/authSlice";
import { toggleDarkMode } from "../../features/theme/themeSlice";
import { AppDispatch, RootState } from "../../app/store";
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";
import Swal from 'sweetalert2';

const navigation = (user: any) => [
  ...(user
    ? [
        { name: "Home", to: "/", current: false },
        { name: "Add Book", to: "add-book", current: false },
        { name: "Logout", to: "/login", action: "logout" },
      ]
    : [
        { name: "Register", to: "/register" },
        { name: "Login", to: "/login" },
      ]),
];

const Navbar: React.FC = () => {
  const logo = require("../../assets/logo.png");
  const mode = useSelector((state: RootState) => state.theme.mode);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: { auth: { user: any } }) => state.auth.user);

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#5D9D0B",
      cancelButtonColor: "#c2410c",
      confirmButtonText: "Yes, log out!",
    });

    if (result.isConfirmed) {
      dispatch(logoutUser());
      navigate("/login");
    }
  };

  return (
    <div className="!h-[56px] z-50 fixed top-0 left-0 right-0 translate-y-0 transform transition-transform duration-300 ease-in-out font-medium text-sm">
      <Disclosure
        as="nav"
        className="bg-lime-green-20 dark:bg-lime-green-250 px-2 sm:px-6 lg:px-32"
      >
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-full p-1 text-gray-400 hover:bg-lime-green-100 hover:text-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? <HiMiniBars3CenterLeft /> : <HiMiniBars3 />}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-start sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <Link to="/" className="dark:text-lime-green-100">
                      <div className="flex justify-center items-center gap-2">
                        <img src={logo} alt="logo" className="w-12 h-12" />
                        <span className="font-extrabold uppercase">
                          Book Collection
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-7 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigation(user).map((item) => (
                        <Link
                          key={item.name}
                          to={item.to}
                          className={twMerge([
                            item.current
                              ? "bg-gray-900 text-lime-green-50"
                              : "hover:dark:text-lime-green-50 hover:text-lime-green-200 dark:text-lime-green-100",
                            "rounded-md px-3 py-2 text-sm font-medium",
                          ])}
                          aria-current={item.current ? "page" : undefined}
                          onClick={
                            item.action === "logout" ? handleLogout : undefined
                          }
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => dispatch(toggleDarkMode())}
                    className="text-black ml-5"
                  >
                    {mode ? (
                      <MdOutlineDarkMode className="text-lime-green-100 hover:text-lime-green-50 transition-colors duration-200 hover:scale-110" />
                    ) : (
                      <MdDarkMode className="dark:text-lime-green-100 hover:dark:text-lime-green-50 transition-colors duration-200 hover:scale-110" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation(user).map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as={Link}
                    to={item.to}
                    className={twMerge([
                      item.current
                        ? "bg-gray-900 text-lime-green-50"
                        : "hover:dark:text-lime-green-50 hover:text-lime-green-200 dark:text-lime-green-100",
                      "block rounded-md px-3 py-2 text-sm font-medium",
                    ])}
                    aria-current={item.current ? "page" : undefined}
                    onClick={
                      item.action === "logout" ? handleLogout : undefined
                    }
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default Navbar;
