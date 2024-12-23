import { useState } from "react";
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import logo from "../../assets/Logo/Logo-Full-Light.png";
import NavbarLinks from "../../data/navbar-links.js";
import { ACCOUNT_TYPE } from "../../utils/constants";
import ProfileDropdown from "../core/Auth/ProfileDropDown";

function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const location = useLocation(); // Fix: import and define location

  const [menuOpen, setMenuOpen] = useState(false); // Handle mobile menu state

  const toggleMenu = () => setMenuOpen((prev) => !prev); // Toggle menu visibility

  return (
    <div
      className={`flex h-14 items-center justify-center border-b-[1px] border-b-slate-700 ${
        location.pathname !== "/" ? "bg-slate-800" : ""
      } transition-all duration-200`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Logo" width={160} height={32} loading="lazy" />
        </Link>
        
        {/* Navigation links */}
        <nav className="hidden md:block">
          <ul className="flex gap-x-6 text-slate-100">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                <Link to={link.path}>{link.title}</Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Login / Signup / Dashboard */}
        <div className="hidden items-center gap-x-4 md:flex">
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-slate-100" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-slate-600 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {/* Conditional rendering for login and signup buttons */}
          {token === null ? (
            <>
              <Link to="/login">
                <button className="rounded-md bg-slate-800 px-[12px] py-[6px] text-slate-100">
                  Log in
                </button>
              </Link>
              <Link to="/signup">
                <button className="rounded-md bg-slate-800 px-[12px] py-[6px] text-slate-100">
                  Sign up
                </button>
              </Link>
            </>
          ) : (
            <ProfileDropdown />
          )}
        </div>

        {/* Hamburger menu for mobile */}
        <button className="mr-4 md:hidden" onClick={toggleMenu}>
          <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
        </button>
        {menuOpen && (
          <div className="absolute top-14 right-0 w-48 bg-slate-800 text-slate-100 p-4 rounded-lg">
            <ul>
              {NavbarLinks.map((link, index) => (
                <li key={index} className="py-2">
                  <Link to={link.path}>{link.title}</Link>
                </li>
              ))}
              {token === null ? (
                <>
                  <li>
                    <Link to="/login">
                      <button className="w-full py-2 text-center">Log in</button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/signup">
                      <button className="w-full py-2 text-center">Sign up</button>
                    </Link>
                  </li>
                </>
              ) : (
                <ProfileDropdown />
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
