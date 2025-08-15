import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

  return (
    <header className="flow-root bg-[var(--neutral--100)]">
      <nav className="relative flex justify-between items-center px-4 py-3">
        <img src={logo} alt="Fixitek Logo" className="w-32" />
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

        <ul className={`absolute left-0 top-28 right-0 lg:flex gap-6 text-neutral-700 font-medium
          overflow-hidden transition-[max-height, opacity, padding] duration-300 ease-in-out
            ${isOpen ? "max-h-100 p-4 opacity-100" : "max-h-0 p-0 opacity-0"} bg-[var(--neutral--100)] flex flex-col`}>
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
          <div className="mt-2 ">
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
