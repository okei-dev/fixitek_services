interface MenuOverlayProps {
  isClosing?: boolean;
  onClick: () => void;
}

const MenuOverlay = ({ isClosing, onClick }: MenuOverlayProps) => (
  <div
    className={`fixed inset-0 bg-black bg-opacity-50 z-40 ${isClosing ? "animate-fadeOut" : "animate-fadeIn"
      } `}
    onClick={onClick}
  />
);

export default MenuOverlay;
