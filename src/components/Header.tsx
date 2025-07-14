import logobranco from "../assets/logobranco.png";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerClose,
} from "@/components/ui/drawer";

const Header = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Cursos",
      href: "/cursos",
    },
    {
      label: "Catálogo",
      href: "/catalogo",
    },
    {
      label: "Sobre nós",
      href: "/sobre-nos",
    },
    {
      label: "Gestão de Cultura",
      href: "/gestao-de-cultura",
    },
    {
      label: "História",
      href: "/historia",
    },
    {
      label: "Admin",
      href: "/admin",
    },
  ];

  return (
    <header className="fixed top-0 w-full bg-black/90 backdrop-blur-3xl z-50 y-2 py-4">
      <div className="container flex gap-10 items-center justify-between">
        <div>
          <Link to="/">
            <img
              src={logobranco}
              alt="logo"
              className="h-16 mt-4 cursor-pointer"
            />
          </Link>
        </div>
        <div className="flex items-center justify-center h-16">
          <div className="flex items-center space-x-8">
            <nav className="hidden md:flex space-x-6">
              {navItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`transition-colors duration-200 tracking-wide border-b-2 pb-1 text-md ${
                      isActive
                        ? "text-yellow-400 border-yellow-400"
                        : "text-gray-300 hover:text-yellow-400 border-transparent hover:border-yellow-400"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
          <Drawer open={mobileOpen} onOpenChange={setMobileOpen}>
            <DrawerTrigger
              asChild
              className="w-full flex items-center justify-between"
            >
              <button
                className="md:hidden text-white z-50"
                aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
              >
                {mobileOpen ? <X size={28} /> : <Menu size={24} />}
              </button>
            </DrawerTrigger>
            <DrawerContent
              className={`max-w-xs w-full h-full fixed right-0 top-0 rounded-2xl shadow-2xl p-0 bg-black flex flex-col pt-24 z-50`}
            >
              <DrawerClose className="absolute top-4 right-4 z-10 text-black rounded-full p-2 transition-colors">
                <span className="text-3xl">&times;</span>
              </DrawerClose>
              <nav className="flex flex-col space-y-6 w-full items-center">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      className={`text-xl font-semibold transition-colors duration-200 tracking-wide border-b-2 pb-1 w-4/5 text-center ${
                        isActive
                          ? "text-yellow-400 border-yellow-400"
                          : "text-gray-100 hover:text-yellow-400 border-transparent hover:border-yellow-400"
                      }`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </header>
  );
};

export default Header;
