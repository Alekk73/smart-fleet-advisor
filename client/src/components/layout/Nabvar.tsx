import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/navbar-logo.png";

const NAV_LINKS = [{ label: "Inicio", href: "/" }];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const user = useAuth();

  // Inical del usuario
  const userInitial = user?.user?.name
    ? user.user.name.charAt(0).toUpperCase()
    : "U";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed w-full top-0 z-50">
      <nav
        className={`transition-all duration-300 border-b ${
          scrolled
            ? "bg-white/80 backdrop-blur-md border-gray-200 shadow-sm py-3"
            : "bg-transparent border-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <img
              src={logo}
              alt="Smart Fleet Advisor Logo"
              className="h-8 md:h-10 w-auto object-contain transition-transform duration-300 hover:scale-105"
            />
          </a>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="hover:text-black transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all group-hover:w-full rounded-full"></span>
                </a>
              </li>
            ))}
          </ul>

          {/* User section in navbar */}
          <div className="hidden md:flex items-center gap-4">
            {!user ? (
              <>
                <button className="text-sm font-medium text-gray-600 hover:text-black px-3 py-2 transition-colors">
                  Iniciar sesión
                </button>
                <button className="text-sm font-medium px-5 py-2.5 rounded-full bg-black text-white hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 transition-all">
                  Registrarse
                </button>
              </>
            ) : (
              <div className="flex items-center gap-3 pl-4 border-l border-gray-200 cursor-pointer group">
                <div className="flex flex-col items-end">
                  <span className="text-sm font-semibold text-gray-900 leading-none capitalize">
                    {user.user?.name}
                  </span>
                  <span className="text-xs text-gray-500 mt-1">Mi Cuenta</span>
                </div>
                <div className="w-9 h-9 rounded-full bg-gray-100 border border-gray-200 text-gray-800 flex items-center justify-center text-sm font-bold group-hover:bg-gray-200 transition-colors">
                  {userInitial}
                </div>
              </div>
            )}
          </div>

          {/* Hamburger Menu Toggle */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 -mr-2 rounded-md hover:bg-gray-100 transition-colors"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menú"
          >
            <span
              className={`w-5 h-0.5 bg-gray-900 rounded-full transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`w-5 h-0.5 bg-gray-900 rounded-full transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-5 h-0.5 bg-gray-900 rounded-full transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-xl transition-all duration-300 origin-top ${
          menuOpen
            ? "scale-y-100 opacity-100 visible"
            : "scale-y-0 opacity-0 invisible"
        }`}
      >
        <div className="flex flex-col px-6 py-6 gap-6">
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-base font-medium text-gray-700 hover:text-black transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3 pt-6 border-t border-gray-100">
            {!user ? (
              <>
                <button className="w-full text-center text-sm font-medium px-4 py-3 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition">
                  Iniciar sesión
                </button>
                <button className="w-full text-center text-sm font-medium px-4 py-3 rounded-xl bg-black text-white hover:bg-gray-800 transition shadow-md">
                  Registrarse
                </button>
              </>
            ) : (
              <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
                <div className="w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-800 flex items-center justify-center font-bold shadow-sm">
                  {userInitial}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-900">
                    {user.user?.name || "Usuario"}
                  </span>
                  <a
                    href="#"
                    className="text-xs text-blue-600 font-medium mt-0.5"
                  >
                    Ver perfil
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
