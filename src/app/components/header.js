'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const IconHouse = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
);
const IconChevronDown = ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
);

export default function SoftHeaderWithUnderline() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownTimerRef = useRef(null);
  const pathname = usePathname();

  const menuItems = [
    { href: '/', label: 'Inicio' },
    { href: '/pages/tienda-gym', label: 'Oportunidades', isDropdown: true },
    { href: '/pages/como-funciona', label: '¿Cómo Funciona?' },
    { href: '/pages/servicios-legales', label: 'Servicios Legales' },
  ];
  const dropdownCategories = [
    { href: '/pages/tienda-gym', label: 'Todas las Oportunidades' },
    { href: '/pages/tienda-gym?category=casas', label: 'Casas' },
    { href: '/pages/tienda-gym?category=departamentos', label: 'Departamentos' },
    { href: '/pages/tienda-gym?category=terrenos', label: 'Terrenos' },
    { href: '/pages/tienda-gym?category=comercial', label: 'Comercial' },
  ];
  
  const handleDropdownEnter = () => {
    if (dropdownTimerRef.current) clearTimeout(dropdownTimerRef.current);
    setIsDropdownOpen(true);
  };
  const handleDropdownLeave = () => {
    dropdownTimerRef.current = setTimeout(() => setIsDropdownOpen(false), 200);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Función para determinar si un link está activo
  const isActive = (href) => {
    // Para la página principal
    if (href === '/') return pathname === href;
    // Para las demás páginas que no son la principal
    return pathname.startsWith(href) && href !== '/';
  };

  return (
    <>
<header className="fixed top-0 left-0 right-0 z-[9999] bg-stone-200 backdrop-blur-md border-b border-stone-400/80 shadow-md">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center gap-2 group">
                <IconHouse className="w-7 h-7 text-yellow-600 group-hover:text-yellow-500 transition-colors" />
                <span className="text-xl font-bold text-stone-800 tracking-tight group-hover:text-black transition-colors">
                  InvertiMax
                </span>
              </Link>
            </div>
<nav className="hidden lg:flex items-center justify-center gap-2">
  {menuItems.map((item) => {
    const active = isActive(item.href);
    return item.isDropdown ? (
      <div key={item.label} className="relative" onMouseEnter={handleDropdownEnter} onMouseLeave={handleDropdownLeave}>
        <Link
          href={item.href}
          className={`flex items-center gap-1.5 px-4 py-2 font-bold transition-colors relative group ${
            isActive('/pages/tienda-gym') ? 'text-stone-900' : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          {item.label}
          <IconChevronDown className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
          {/* --- LÍNEA DE SUBRAYADO --- */}
          <span
            className={`absolute bottom-0 left-0 w-full h-0.5 bg-yellow-500 transition-transform origin-center duration-300 ${
              isActive('/pages/tienda-gym') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
            }`}
          ></span>
        </Link>
        {isDropdownOpen && (
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-60 bg-white rounded-lg shadow-xl border border-stone-100 overflow-hidden">
            <div className="p-2">
              {dropdownCategories.map((subItem) => (
                <Link
                  key={subItem.label}
                  href={subItem.href}
                  className="block px-4 py-2 text-stone-700 rounded-md hover:bg-yellow-500/10 hover:text-yellow-700 font-bold transition-colors"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  {subItem.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    ) : (
      <Link
        key={item.label}
        href={item.href}
        className={`px-4 py-2 font-bold transition-colors relative group ${
          active ? 'text-stone-900' : 'text-stone-600 hover:text-stone-900'
        }`}
      >
        {item.label}
        {/* --- LÍNEA DE SUBRAYADO --- */}
        <span
          className={`absolute bottom-0 left-0 w-full h-0.5 bg-yellow-500 transition-transform origin-center duration-300 ${
            active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
          }`}
        ></span>
      </Link>
    );
  })}
</nav>

            <div className="flex items-center gap-4">
              <div className="hidden lg:block">
                <Link href="/pages/contacto" className="px-5 py-2.5 bg-stone-800 text-white font-semibold rounded-full hover:bg-stone-700 transition-colors duration-300">
                  Contacto
                </Link>
              </div>
              <div className="lg:hidden">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
                  <div className="w-6 h-6 flex flex-col items-center justify-center">
                    <span className={`block w-6 h-0.5 bg-stone-800 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
                    <span className={`block w-6 h-0.5 bg-stone-800 my-1 transition-all duration-200 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`block w-6 h-0.5 bg-stone-800 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-stone-200">
            <div className="px-4 pt-2 pb-4 space-y-1">
              {menuItems.map((item) => (
                  <Link key={item.label} href={item.href} className="block px-3 py-2 rounded-md text-base font-medium text-center text-stone-700 hover:text-stone-900 hover:bg-stone-100" onClick={() => setIsMenuOpen(false)}>
                    {item.label}
                  </Link>
              ))}
              <div className="pt-4">
                 <Link href="/pages/contacto" className="w-full flex justify-center px-5 py-3 bg-stone-800 text-white font-semibold rounded-lg hover:bg-stone-700 transition-colors">
                  Contacto
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
      <div className="h-18"></div>
    </>
  );
}