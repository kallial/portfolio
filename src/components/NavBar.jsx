import { useRef } from "react";
import DesktopNav from "./DesktopNav";

const NavBar = () => {
  const navContainerRef = useRef(null);

  const handleLinkClick = (e, href) => {
    if (href.startsWith("http")) return;

    e.preventDefault();

    const targetElement = document.querySelector(href);
    if (targetElement) {
      const offset = -85;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY + offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div ref={navContainerRef} className="fixed inset-x-0 z-50 h-16 border-none transition-all duration-700">
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          <div className="flex items-center gap-7">
            <img src="/img/logo-black.svg" alt="logo" className="w-10" />
          </div>
            <DesktopNav handleLinkClick={handleLinkClick} />
          <div className="lg:hidden">
          </div>
        </nav>
      </header>
    </div>
  );
};

export default NavBar;
