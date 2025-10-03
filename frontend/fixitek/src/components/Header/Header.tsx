import { Link } from "react-router-dom";
import { Cross as Hamburger } from "hamburger-react";
import { useCartItemCount } from "@/hooks/useCartItemCount";
import { useMenuToggle } from "@/hooks/useMenuToggle";
import MenuItems from "./MenuItems";

const Header = () => {
  const itemCount = useCartItemCount();
  const {
    menuRef,
    isOpen,
    setOpen,
    isSubMenuOpen,
    setIsSubMenuOpen,
    menuHeight,
  } = useMenuToggle();

  return (
    <header>
      <nav className="flex justify-between items-center px-4 py-3">
        <Link
          to="/"
          >
            <img src="/img/fix_logo.svg" alt="Fixitek Logo" className="w-32" />
          </Link>

          <div className="flex items-center gap-2 text-[var(--neutral--800)]">
            <span>Cart ({itemCount})</span>
            <button className="lg:hidden text-2xl">
              <Hamburger toggled={isOpen} toggle={setOpen} />
            </button>
          </div>

          <ul
            ref={menuRef}
            style={{
              maxHeight: isOpen ? `${menuHeight}px` : "0px",
              opacity: isOpen ? 1 : 0,
              padding: isOpen ? "1rem" : "0",
              transition: "max-height 0.3s ease-in-out, opacity 0.3s ease-in-out, padding 0.3s ease-in-out",
              overflow: "hidden",
            }}
            className={`absolute top-28 left-0 right-0 lg:flex gap-6 text-neutral-700 z-50 bg-[var(--neutral--100)] flex flex-col`}
            >
              <MenuItems
                isSubMenuOpen={isSubMenuOpen}
                setIsSubMenuOpen={setIsSubMenuOpen}
                setOpen={setOpen}
                />
            </ul>
      </nav>
    </header>
  );
};

export default Header;
