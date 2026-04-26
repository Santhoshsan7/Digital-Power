import Link from "next/link";

export default function NavMenu() {
  return (
    <nav>
      <ul className="flex flex-wrap gap-6 py-3 list-none">
        <li>
          <Link className="block px-4 py-2 text-white font-semibold hover:bg-brand-orange transition rounded" href="/">
            HOME
          </Link>
        </li>
        <li>
          <Link className="block px-4 py-2 text-white font-semibold hover:bg-brand-orange transition rounded" href="/inverter">
            INVERTER
          </Link>
        </li>
        <li>
          <Link className="block px-4 py-2 text-white font-semibold hover:bg-brand-orange transition rounded" href="/batteries">
            BATTERIES
          </Link>
        </li>
        <li>
          <Link className="block px-4 py-2 text-white font-semibold hover:bg-brand-orange transition rounded" href="/online-ups">
            ONLINE UPS
          </Link>
        </li>
        <li>
          <Link className="block px-4 py-2 text-white font-semibold hover:bg-brand-orange transition rounded" href="/combo-offer">
            COMBO OFFER
          </Link>
        </li>
        <li>
          <Link className="block px-4 py-2 text-white font-semibold hover:bg-brand-orange transition rounded" href="/services">
            SERVICES
          </Link>
        </li>
        <li>
          <Link className="block px-4 py-2 text-white font-semibold hover:bg-brand-orange transition rounded" href="/contact">
            CONTACT US
          </Link>
        </li>
      </ul>
    </nav>
  );
}
