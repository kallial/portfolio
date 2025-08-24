import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import CustomEase from "gsap/CustomEase";
import { NAVIGATION_LINKS, SOCIAL_LINKS_LIGHT } from "../constants";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(CustomEase);
CustomEase.create("hop", "M0, 0 C0.354, 0 0.464, 0.133 0.498, 0.502 0.532, 0.872 0.651, 1 1, 1");

const MobileNav = ({ handleLinkClick }) => {
  const menuRef = useRef(null);
  const toggleRef = useRef(null);
  const linkRef = useRef(null);
  const socialRef = useRef(null);
  const [isAnimating, setAnimating] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useGSAP(() => {
    gsap.set(menuRef.current, { opacity: 0, pointerEvents: "none" });
    gsap.set(linkRef.current.children, { opacity: 0 });
  }, []);

  const toggleMenu = () => {
    if (isAnimating) return;
    setAnimating(true);

    const menu = menuRef.current;
    const links = linkRef.current;

    if (!menuOpen) {
      setMenuOpen(true);
      gsap.fromTo(menu,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          onStart: () => {
            menu.style.pointerEvents = "all";
          },
          onComplete: () => setAnimating(false),
        }
      );

      gsap.to(links.children, {
        opacity: 1,
        stagger: 0.1,
        delay: 0.3,
        duration: 0.8,
        ease: "power2.out",
      });

    } else {
      setMenuOpen(false);
      gsap.to(menu, {
        opacity: 0,
        duration: 0.6,
        ease: "power2.inOut",
        onComplete: () => {
          menu.style.pointerEvents = "none";
          gsap.set(links.children, { opacity: 0 });
          setAnimating(false);
        },
      });
    }
  };

  return (
    <div className="relative overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full h-[100px] px-8 bg-[#121212] shadow-md flex items-center justify-between z-40">
        <div className="h-full flex items-center">
          <img src="/img/logo-light.svg" alt="logo" className="w-10"></img>
        </div>
        <div
          className={`relative w-[60px] h-[60px] cursor-pointer flex items-center justify-center z-40 ${menuOpen ? "opened" : "closed"}`}
          ref={toggleRef}
          onClick={toggleMenu}
        >
          <div className="relative w-[30px] h-[30px] flex items-center justify-center transition-all duration-300 ease-in-out">
            <div
              className={`absolute w-[25px] h-[1.5px] bg-white transition-all duration-250 ease-out ${
                menuOpen ? "rotate-45 scale-x-[1.05]" : "translate-y-[-3px]"
              }`}
              data-position="top"
            ></div>
            <div
              className={`absolute w-[25px] h-[1.5px] bg-white transition-all duration-250 ease-out ${
                menuOpen ? "-rotate-45 scale-x-[1.05]" : "translate-y-[3px]"
              }`}
              data-position="bottom"
            ></div>
          </div>
        </div>
      </header>

      {/* Menu */}
      <div
        className="fixed top-0 left-0 w-screen h-screen bg-[#121212] pointer-events-none z-30 overflow-x-hidden"
        ref={menuRef}>
        <div className="flex-1 relative h-full px-8 pt-[120px] pb-8 flex flex-col justify-between items-center text-center">
          <div className="flex flex-col items-center gap-8" ref={linkRef}>
            {NAVIGATION_LINKS.map((item, index) => (
              <div key={index} className="transform translate-y-[30px] opacity-0">
                <a
                  href={item.href}
                  className="text-white text-2xl font-light tracking-tight leading-[125%]"
                  onClick={(e) => {
                    handleLinkClick(e, item.href);
                    toggleMenu();
                  }}>
                  {item.label}
                </a>
              </div>
            ))}
            <div className="flex flex-col items-center gap-6 mt-8" ref={socialRef}>
              {SOCIAL_LINKS_LIGHT.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  target="_blank"
                  rel="noopener noreferrer">
                  <img className="w-5.5" src={item.src} alt={item.alt} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileNav;
