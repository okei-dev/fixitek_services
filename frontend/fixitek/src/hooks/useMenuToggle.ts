import { useEffect, useRef, useState } from "react"


export const useMenuToggle = () => {
    const [isOpen, setOpen] = useState(false);
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
    const [menuHeight, setMenuHeight] = useState(0);
    const menuRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        if (isOpen && menuRef.current) {
            setMenuHeight(menuRef.current.scrollHeight);
        } else {
            setMenuHeight(0);
        }
    }, [isOpen, isSubMenuOpen]);

    return {
        menuRef,
        isOpen,
        setOpen,
        isSubMenuOpen,
        setIsSubMenuOpen,
        menuHeight
    };
};