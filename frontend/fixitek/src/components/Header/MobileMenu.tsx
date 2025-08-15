import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { menus } from "./menuData";

interface MobileMenuProps {
  isOpen: boolean;
  isClosing?: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, isClosing, onClose }: MobileMenuProps) => {
  return (
    <div
      className={`fixed top-30 left-0 right-0 bg-[var(--neutral--200)] shadow-lg z-50 ${isClosing ? "animate-slideOut" : "animate-slideIn"
        } `}
    >
      <div className="flex justify-between items-center px-4 py-3 border-b">
        <span className="font-bold text-lg">Menu</span>
        <button onClick={onClose} className="text-2xl">
          <FaTimes />
        </button>
      </div>

      <ul className="flex flex-col gap-4 p-4 text-neutral-700 font-medium">
        {menus.map((menu, idx) => (
          <li key={idx}>
            <Link
              to={menu.url}
              onClick={onClose}
              className="block hover:text-[var(--accent--primary-1)]"
            >
              {menu.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MobileMenu;
