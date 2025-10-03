import { SlArrowDown } from "react-icons/sl";
import { menuData } from "./menuData";
import { Link } from "react-router-dom";
import { GoArrowRight } from "react-icons/go";



interface Props {
    isSubMenuOpen: boolean;
    setIsSubMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MenuItems = ({ isSubMenuOpen, setIsSubMenuOpen, setOpen }: Props) => (
    <>
        {menuData.map((menu, idx) => (
            <li key={idx}>
                {menu.subMenu ? (
                    <div className="inline-flex items-center gap-2">
                        <span>{menu.name}</span>
                        <SlArrowDown
                            onClick={() => setIsSubMenuOpen(prev => !prev)}
                            aria-label="Toggle submenu"
                            />
                    </div>
                ) : (
                    <Link
                        to={menu.url}
                        className="hover:text-[var(--accent--primary-1)]"
                        onClick={() => setOpen(false)}
                        >
                            {menu.name}
                        </Link>
                )}

                {menu.subMenu && isSubMenuOpen && (
                    <ul className="pl-4 mt-2 flex flex-col gap-2">
                        {menu.subMenu.map((sub, subId) => (
                            <li key={subId} className="px-4 py-2">
                                <Link
                                    to={sub.url}
                                    className="hover:text-[var(--accent--primary-1)]"
                                    onClick={() => setOpen(false)}
                                    onMouseLeave={() => setIsSubMenuOpen(false)}
                                    >
                                        {sub.name}
                                    </Link>
                            </li>
                        ))}

                        <div className="mt-2 pb-4">
                            <Link
                                to="/about"
                                className="btn-primary w-full inline-flex items-center gap-2"
                                >
                                    Get a Quote
                                    <GoArrowRight />
                                </Link>
                        </div>
                    </ul>
                )}
            </li>
        ))}
    </>
);

export default MenuItems;