export const menuData = [
  { name: "Home", url: "/" },
  { name: "About", url: "/About" },
  { name: "Services", url: "/Services" },
  { name: "Contact", url: "/Contact" },
  { name: "Dashboard", url: "/dashboard" },
  {
    name: "Pages", subMenu: [
      {
        name: "Login", url: "/login"
      },
      { name: "Signup", url: "/register" }
    ],
  }
];
