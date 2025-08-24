import { NAVIGATION_LINKS, SOCIAL_LINKS_DARK } from "../constants";

const DesktopNav = ({ handleLinkClick }) => {
  return (
    <div className="hidden lg:flex h-full items-center">
      <ul className="flex items-center gap-4">
        {NAVIGATION_LINKS.map((item, index) => (
          <li key={index}>
            <a
              className="nav-hover-btn"
              href={item.href}
              onClick={(e) => handleLinkClick(e, item.href)}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
      <div className="ml-10 flex items-center space-x-5.5">
        {SOCIAL_LINKS_DARK.map((item, index) => (
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
  );
};

export default DesktopNav;
