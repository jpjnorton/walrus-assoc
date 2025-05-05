import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
  const { pathname } = useRouter();

  const linkClass = (path: string) =>
    `hover:text-black transition-colors ${
      pathname === path ? "font-bold text-black underline" : "text-gray-700"
    }`;

  return (
    <nav className=" top-0 w-full z-50 backdrop-blur bg-white/80 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-black">
          Walrus Association
        </Link>
        <div className="space-x-6 text-lg">
          <Link href="/" className={linkClass("/")}>
            Home
          </Link>
          <Link href="/#about" className={linkClass("/#about")}>
            About
          </Link>
          <Link href="/shop" className={linkClass("/shop")}>
            Shop
          </Link>
        </div>
      </div>
    </nav>
  );
}
