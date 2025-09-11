export const menuData = [
  { name: "Home", url: "/" },
  { name: "About", url: "/About" },
  { name: "Services", url: "/Services" },
  { name: "Contact", url: "/Contact" },
  {
    name: "Pages", subMenu: [
      {
        name: "Login", url: "/login"
      },
      { name: "Signup", url: "/register" }
    ],
  }
];
