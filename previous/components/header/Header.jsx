import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-brand-navy shadow-md sticky top-0 z-50 w-full">
      {/* Main Header - Full Width Left-Right Alignment */}
      <div className="w-full px-6 md:px-10 py-4 flex items-center justify-between">

        {/* LEFT CONTAINER - Company Branding */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-3 group">
            {/* Logo Icon */}
            <div className="w-10 h-10 md:w-11 md:h-11 bg-gradient-to-br from-brand-orange to-brand-accent rounded-lg flex items-center justify-center text-white text-xl shadow-lg group-hover:scale-110 transition-transform">
              ⚡
            </div>
            {/* Brand Text - REMOVED */}
            {/* <div className="flex flex-col">
              <span className="text-white font-extrabold text-lg md:text-xl tracking-tight group-hover:text-brand-orange transition-colors">
                DigitalPower
              </span>
              <span className="text-gray-400 text-[10px] md:text-xs font-medium tracking-wide hidden sm:block">
                Power Solutions Partner
              </span>
            </div> */}
          </Link>
        </div>

        {/* RIGHT CONTAINER - Navigation */}
        <nav className="flex items-center gap-2 md:gap-4">
          <Link
            href="/"
            className="px-3 py-2 text-white text-sm md:text-base font-medium hover:text-brand-orange transition-colors"
          >
            Home
          </Link>
          <Link
            href="/inverter"
            className="px-3 py-2 text-white text-sm md:text-base font-medium hover:text-brand-orange transition-colors"
          >
            Menu
          </Link>
          <Link
            href="/about"
            className="px-3 py-2 text-white text-sm md:text-base font-medium hover:text-brand-orange transition-colors"
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className="px-3 py-2 text-white text-sm md:text-base font-medium hover:text-brand-orange transition-colors"
          >
            Contact Us
          </Link>
          {/* Cart Button */}
          <Link
            href="/cart"
            className="ml-2 px-3 py-2 text-amber-400 text-sm md:text-base font-bold rounded-lg hover:text-white transition-colors flex items-center gap-1"
          >
            🛒 <span className="hidden sm:inline">Cart</span>
          </Link>
          {/* Login Button */}
          <Link
            href="/login"
            className="px-4 py-2 bg-brand-orange text-white text-sm md:text-base font-semibold rounded-lg hover:bg-brand-orange-dark transition-colors"
          >
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
}
