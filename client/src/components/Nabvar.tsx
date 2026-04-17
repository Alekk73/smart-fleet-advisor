import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Inicio", href: "#" },
  { label: "Producto", href: "#" },
  { label: "Precios", href: "#" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed w-full top-0 z-50">
      <nav
        className={`transition-all duration-300 ${
          scrolled ? "bg-white/80 backdrop-blur-lg shadow-md" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 text-xl font-semibold">
            <span className="w-3 h-3 bg-black rounded-full" />
            Smart Fleet Advisor
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="hover:text-gray-600 transition">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button className="text-sm px-4 py-2 rounded-lg hover:bg-gray-100 transition">
              Iniciar sesión
            </button>
            <button className="text-sm px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition">
              Registrarse
            </button>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menú"
          >
            <span
              className={`w-6 h-0.5 bg-black transition ${
                menuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-black transition ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-black transition ${
                menuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } bg-white shadow-md`}
      >
        <div className="flex flex-col px-6 py-4 gap-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium hover:text-gray-600"
            >
              {link.label}
            </a>
          ))}

          <div className="flex flex-col gap-2 pt-4 border-t">
            <button className="text-sm px-4 py-2 rounded-lg hover:bg-gray-100 transition">
              Iniciar sesión
            </button>
            <button className="text-sm px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition">
              Registrarse
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
