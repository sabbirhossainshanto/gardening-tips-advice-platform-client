export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Gardening Tips",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },

    {
      label: "About",
      href: "/about-us",
    },
    {
      label: "Contact",
      href: "/contact-us",
    },
    {
      label: "Garden Journal",
      href: "/garden-journal",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
  ],
};
