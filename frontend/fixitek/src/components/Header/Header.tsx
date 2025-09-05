import { useEffect, useRef, useState } from "react";
import { Link, useAsyncError } from "react-router-dom";
import logo from "@/assets/img/fix_logo.svg";
import { menus } from "./menuData";
import { Cross as Hamburger } from "hamburger-react";
import { SlArrowDown } from "react-icons/sl";
import { getOrderItemCount } from "@/features/order/orderApi";
import { getStoredCartId } from "@/lib/helper";
import { GoArrowRight } from "react-icons/go";

const Header = () => {
  const [itemCount, setItemCount] = useState<number>(0)
  const [isOpen, setOpen] = useState<boolean>(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState<boolean>(false);
  const [menuHeight, setMenHeight] = useState<number>(0);

  const menuRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const orderItems = async () => {
      const cartId = getStoredCartId()
      if (!cartId) return;

      try {
        const count = await getOrderItemCount(cartId);
        setItemCount(prev => prev ? prev : count);
      } catch (error) {
        console.error("Failed to get Order items quantity.", error);
      }
    }
    orderItems();
  }, [])

  useEffect(() => {
    if (isOpen && menuRef.current) {
      setMenHeight(menuRef.current.scrollHeight);
    } else {
      setMenHeight(0);
    }
  }, [isOpen, isSubMenuOpen])

  return (
    <header className="">
      <nav className="flex justify-between items-center px-4 py-3">
        <Link to="/"><img src="/img/fix_logo.svg" alt="Fixitek Logo" className="w-32" /></Link>
        <div className="flex items-center gap-2 text-[var(--neutral--800)]">
          <span>Cart{`(${itemCount})`}</span>
          <button
            className="lg:hidden text-2xl"
          >
            <Hamburger
              toggled={isOpen}
              toggle={setOpen}

            />
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
          className={`absolute top-28 left-0 right-0  lg:flex gap-6 text-neutral-700 font-medium z-50
           bg-[var(--neutral--100)] flex flex-col`}>
          {menus.map((menu, idx) => (
            <li key={idx}
              className={``}
            >
              {menu.subMenu ? (
                <div className="inline-flex items-center gap-2">
                  <span>{menu.name}</span>
                  <SlArrowDown
                    onClick={() => setIsSubMenuOpen(prev => !prev)}
                    aria-label="Toggle submenu"
                  />
                </div>
              ) : (
                <Link to={menu.url}
                  className="hover:text-[var(--accent--primary-1)]"
                  onClick={() => setOpen(prev => !prev)}
                >
                  {menu.name}
                </Link>
              )}

              {menu.subMenu && isSubMenuOpen && (
                <ul className="pl-4 mt-2 flex flex-col gap-2">
                  {menu.subMenu.map((sub, subId) => (
                    <li key={subId} className="px-4 py-2">
                      <Link to={sub.url} className="hover:text-[var(--accent-primary-1)]"
                        onClick={() => setOpen(prev => !prev)}
                        onMouseLeave={() => setIsSubMenuOpen(false)}
                      >
                        {sub.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
          <div className="mt-2 pb-4 ">
            <Link
              to="/about"
              className="btn-primary-small w-full inline-flex justify-center items-center gap-2"
            >
              <button>Get a Quote </button>
              <GoArrowRight />
            </Link>
          </div>
        </ul>

      </nav>
    </header>
  );
};

export default Header;
