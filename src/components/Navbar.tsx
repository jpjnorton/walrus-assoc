import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import CartDrawer from "../components/CartDrawer";
import { useCart } from "../context/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faInfoCircle,
  faCalendarAlt,
  faStore,
  faUser,
  faShoppingCart,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
export default function Navbar() {
  const { pathname } = useRouter();
  const { cart } = useCart();
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navItem = (
    href: string,
    icon: any,
    label: string,
    exactMatch: boolean = true,
    onClick?: () => void,
  ) => (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 transition ${
        exactMatch
          ? pathname === href
            ? "font-bold text-black"
            : "text-gray-700"
          : pathname.startsWith(href)
            ? "font-bold text-black"
            : "text-gray-700"
      }`}
    >
      <FontAwesomeIcon icon={icon} className="text-base" />
      <span className="text-sm">{label}</span>
    </Link>
  );

  return (
    <>
      {/* Login Bar at Top */}
      <div
        className="w-full text-white text-sm py-2 px-6"
        style={{ backgroundColor: "rgb(227, 182, 124)" }}
      >
        <div className="max-w-6xl mx-auto flex justify-end">
          <Link href="/login" className="hover:underline">
            Login
          </Link>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="top-0 w-full z-50 backdrop-blur bg-white/80 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-black">
            Walrus Association
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-4">
            {navItem("/", faHome, "Home")}
            {navItem("/#about", faInfoCircle, "About", false)}
            {navItem("/events", faCalendarAlt, "Events")}
            {navItem("/shop", faStore, "Shop")}

            <button
              onClick={() => setCartOpen(true)}
              className=" flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-md hover:bg-gray-200 transition text-gray-800"
            >
              <FontAwesomeIcon icon={faShoppingCart} />
              <span className="text-sm">Cart</span>
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2 py-0.5">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>

          {/* Hamburger Icon */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-xl text-gray-700"
            >
              <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {menuOpen && (
          <div className="md:hidden px-6 pb-4 space-y-2 bg-white shadow-sm">
            {navItem("/", faHome, "Home", true, () => setMenuOpen(false))}
            {navItem("/#about", faInfoCircle, "About", false, () =>
              setMenuOpen(false),
            )}
            {navItem("/events", faCalendarAlt, "Events", true, () =>
              setMenuOpen(false),
            )}
            {navItem("/shop", faStore, "Shop", true, () => setMenuOpen(false))}
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="block w-full text-center px-4 py-2 rounded-md text-white text-sm font-medium transition"
              style={{ backgroundColor: "rgb(227, 182, 124)" }}
            >
              Login / SignUp
            </Link>
            <button
              onClick={() => {
                setCartOpen(true);
                setMenuOpen(false);
              }}
              className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-md hover:bg-gray-200 transition w-full text-gray-800"
            >
              <FontAwesomeIcon icon={faShoppingCart} />
              <span className="text-sm">Cart</span>
              {cartItemsCount > 0 && (
                <span className="ml-auto bg-red-600 text-white text-xs rounded-full px-2 py-0.5">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>
        )}
      </nav>

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
