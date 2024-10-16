import { useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, matchPath, useLocation, useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";

import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { getAllCategory } from "../../services/operations/CategoryAPI.js";
import { logout } from "../../services/operations/authAPI.js";
import { ACCOUNT_TYPE } from "../../utils/constants.js";
import ConfirmationModal from "../common/ConfirmationModal.js";

function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    const categories = await getAllCategory();
    setSubLinks(categories);
    setLoading(false);
  };

  const handleLogout = () => {
    dispatch(logout(navigate));
    setConfirmationModal(null);
    navigate("/login");
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(()=>{
    setOpen(false)
  },[location.pathname])

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div
      className={`flex lg:flex-row flex-col h-14 items-center justify-center border-b-[1px] border-b-richblack-700 sm:flex-col md:flex-col ${
        location.pathname !== "/" ? "bg-richblack-800" : ""
      } transition-all duration-200`}
    >
      <div className="relative flex lg:flex-row w-11/12 max-w-maxContent items-center justify-between">
        <Link to="/">
          <img
            src={logo}
            alt="Logo"
            className="sm:w-[160px] sm:h-[32px] w-[85px] sm:block"
            loading="lazy"
          />
        </Link>
        <nav className="hidden md:flex sm:mr-0 mr-4">
          <ul className="flex sm:gap-x-6 gap-x-2 text-richblack-25 sm:text-[18px] sm:mr-0 mr-4 text-[10px]">
            {NavbarLinks?.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div
                    className={`group relative flex cursor-pointer items-center gap-1 ${
                      matchRoute("/catalog/:catalogName")
                        ? "text-yellow-25"
                        : "text-richblack-25"
                    }`}
                  >
                    <p>{link.title}</p>
                    <BsChevronDown />
                    <div className="invisible absolute sm:left-[50%] left-[30%] top-[50%] z-[1000] flex translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 sm:w-[300px] w-[160px]">
                      <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                      {loading ? (
                        <p className="text-center">Loading...</p>
                      ) : subLinks?.length ? (
                        subLinks?.map((subLink, i) => (
                          <Link
                            to={`/catalog/${subLink.name
                              .split(" ")
                              .join("-")
                              .toLowerCase()}`}
                            className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                            key={i}
                          >
                            <p>{subLink.name}</p>
                          </Link>
                        ))
                      ) : (
                        <p className="text-center">No Courses Found</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className="hidden sm:gap-x-4 gap-x-2 sm:mr-0 mr-4 md:flex items-center ">
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="sm:text-2xl text-sm text-richblack-100" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center sm:text-xs text-[7px] font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {token === null ? (
            <>
              <Link to="/login">
                <button className="rounded-[8px] md:text-lg sm:text-lg hover:scale-110 hover:text-yellow-300 transition-all duration-300 border border-richblack-700 bg-richblack-800 px-[12px] py-[7px] text-richblack-100">
                  Log in
                </button>
              </Link>
              <Link to="/signup">
                <button className="rounded-[8px] md:text-lg sm:text-lg hover:scale-110 hover:text-yellow-300 transition-all duration-300 border border-richblack-700 bg-richblack-800 sm:px-[12px] sm:py-[8px] text-richblack-100">
                  Sign up
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashboard/my-profile">
                <button className="rounded-[8px] md:text-lg sm:text-lg hover:scale-110 hover:text-yellow-300 transition-all duration-300 border border-richblack-700 bg-richblack-800 sm:px-[12px] sm:py-[8px] text-richblack-100">
                  Dashboard
                </button>
              </Link>
              <button
                className="rounded-[8px] sm:text-lg text-[8px] border border-richblack-700 bg-richblack-800 sm:px-[12px] sm:py-[8px] px-[4px] py-[3px] text-richblack-100 sm:mt-0 mt-[2px]"
                onClick={() =>
                  setConfirmationModal({
                    text1: "Logout",
                    text2: "Are You Sure, You Will be Logged Out?",
                    btn1Text: "Logout",
                    btn2Text: "Cancel",
                    btn1Handle: handleLogout,
                    btn2Handle: () => setConfirmationModal(null),
                  })
                }
              >
                Logout
              </button>
            </>
          )}
        </div>
        <div className="flex md:hidden pr-6">
          <RxHamburgerMenu
            className="text-xl text-white cursor-pointer transition-all duration-500"
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>

        {open && (
          <div className="w-full z-[20] text-gray-800 absolute bg-richblack-600 rounded-md shadow-xl h-fit p-4 top-8 left-0 transition-all duration-300 ease-in-out transform">
            <nav className="flex flex-col gap-4 sm:mr-0 mr-4">
              <ul className="flex flex-col gap-2 gap-x-6 text-richblack-25 text-sm">
                {NavbarLinks?.map((link, index) => (
                  <li key={index}>
                    {link.title === "Catalog" ? (
                      <div
                        className={`group text-sm flex cursor-pointer items-center gap-1 ${
                          matchRoute("/catalog/:catalogName")
                            ? "text-yellow-25"
                            : "text-richblack-25"
                        }`}
                      >
                        <p>{link.title}</p>
                        <BsChevronDown />
                        <div className="invisible absolute sm:left-[50%] left-[20%] top-[20%] z-[1000] flex translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 sm:w-[300px] w-[160px]">
                          <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                          {loading ? (
                            <p className="text-center">Loading...</p>
                          ) : subLinks.length ? (
                            subLinks?.map((subLink, i) => (
                              <Link
                                to={`/catalog/${subLink.name
                                  .split(" ")
                                  .join("-")
                                  .toLowerCase()}`}
                                className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                key={i}
                              >
                                <p>{subLink.name}</p>
                              </Link>
                            ))
                          ) : (
                            <p className="text-center">No Courses Found</p>
                          )}
                        </div>
                      </div>
                    ) : (
                      <Link to={link?.path}>
                        <p
                          className={`${
                            matchRoute(link?.path)
                              ? "text-yellow-25"
                              : "text-richblack-25"
                          }`}
                        >
                          {link.title}
                        </p>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
            <div className="flex flex-col gap-4 sm:gap-6 items-center">
              {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
                <Link to="/dashboard/cart" className="relative">
                  <AiOutlineShoppingCart className="text-2xl text-richblack-100 hover:scale-110 hover:text-yellow-300 transition-all duration-300" />
                  {totalItems > 0 && (
                    <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-[7px] font-bold text-yellow-100">
                      {totalItems}
                    </span>
                  )}
                </Link>
              )}
              {token === null ? (
                <>
                  <Link to="/login">
                    <button className="rounded-[8px] text-sm sm:text-lg  border border-richblack-700 bg-richblack-800 px-[12px] py-[7px] text-richblack-100">
                      Log in
                    </button>
                  </Link>
                  <Link to="/signup">
                    <button className="rounded-[8px] text-sm sm:text-lg text-[8px]  border border-richblack-700 bg-richblack-800 px-[12px] py-[7px] text-richblack-100">
                      Sign up
                    </button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/dashboard/my-profile">
                    <button className="rounded-[8px] text-sm sm:text-lg text-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[7px] text-richblack-100">
                      Dashboard
                    </button>
                  </Link>
                  <button
                    className="rounded-[8px] text-sm  border border-richblack-700 bg-richblack-800 px-[12px] py-[7px] text-richblack-100 sm:mt-0 mt-[2px]"
                    onClick={() =>
                      setConfirmationModal({
                        text1: "Logout",
                        text2: "Are You Sure, You Will be Logged Out?",
                        btn1Text: "Logout",
                        btn2Text: "Cancel",
                        btn1Handle: handleLogout,
                        btn2Handle: () => setConfirmationModal(null),
                      })
                    }
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
}

export default Navbar;
