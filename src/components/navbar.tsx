"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";

import { SearchIcon, Logo } from "../components/icons";
import { siteConfig } from "../config/site";
import { ThemeSwitch } from "./theme-switch";
import Login from "./modal/Login";
import { useUser } from "../context/user.provider";
import { usePathname, useRouter } from "next/navigation";
import { logOut } from "../services/AuthService";
import NavbarDropdown from "./navbarDropdown";
import { useShowRegisterModal } from "../store/showRegister";
import Register from "./modal/Register";
import { useShowLoginModal } from "../store/showLogin";
import CreatePost from "./modal/CreatePost";
import ChangePassword from "./modal/ChangePassword";
import { useChangePasswordModal } from "../store/showChangePassword";
import { protectedRoute } from "../constant";

export const Navbar = () => {
  const [changePassword, setChangePassword] = useChangePasswordModal();
  const [showLogin, setShowLogin] = useShowLoginModal();
  const [showRegister] = useShowRegisterModal();
  const pathname = usePathname();
  const router = useRouter();
  const { user, setIsLoading: setUserLoading } = useUser();

  const handleLogout = () => {
    logOut();
    setUserLoading(true);
    if (protectedRoute.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };

  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <>
      {changePassword && <ChangePassword />}
      {showRegister && <Register />}
      {showLogin && <Login />}
      <div className="container-box">
        <NextUINavbar maxWidth="full" position="sticky">
          <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
            <NavbarBrand as="li" className="gap-3 max-w-fit">
              <NextLink
                className="flex justify-start items-center gap-1"
                href="/"
              >
                <Logo />
                <p className="font-bold text-inherit">Gardening</p>
              </NextLink>
            </NavbarBrand>
            <ul className="hidden lg:flex gap-4 justify-start ml-2">
              {siteConfig.navItems.map((item) => (
                <NavbarItem key={item.href}>
                  <NextLink
                    className={clsx(
                      linkStyles({ color: "foreground" }),
                      "data-[active=true]:text-primary data-[active=true]:font-medium"
                    )}
                    color="foreground"
                    href={item.href}
                  >
                    {item.label}
                  </NextLink>
                </NavbarItem>
              ))}
            </ul>
            <CreatePost />
          </NavbarContent>

          <NavbarContent
            className="hidden sm:flex basis-1/5 sm:basis-full"
            justify="end"
          >
            <NavbarItem className="hidden sm:flex gap-2">
              <ThemeSwitch />
            </NavbarItem>
            <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
            <NavbarItem className="hidden md:flex">
              {user?.email ? (
                <NavbarDropdown />
              ) : (
                <Button
                  onClick={() => setShowLogin(true)}
                  className="text-sm font-normal text-default-600 bg-default-100"
                  variant="flat"
                >
                  Login
                </Button>
              )}
            </NavbarItem>
          </NavbarContent>

          <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
            <ThemeSwitch />
            <NavbarMenuToggle />
          </NavbarContent>

          <NavbarMenu>
            {searchInput}
            <div className="mx-4 mt-2 flex flex-col gap-2">
              {user?.role === "ADMIN" ? (
                <>
                  <NavbarMenuItem key={`dashboard`}>
                    <Link
                      color={
                        pathname === "/dashboard" ? "primary" : "foreground"
                      }
                      href="/dashboard"
                      size="lg"
                    >
                      Dashboard
                    </Link>
                  </NavbarMenuItem>
                </>
              ) : (
                <>
                  <NavbarMenuItem key={`profile`}>
                    <Link
                      color={pathname === "/profile" ? "primary" : "foreground"}
                      href="/profile"
                      size="lg"
                    >
                      Profile
                    </Link>
                  </NavbarMenuItem>
                </>
              )}
              <NavbarMenuItem key={`dashboard`}>
                <Link
                  onClick={() => setChangePassword(true)}
                  color={"foreground"}
                  size="lg"
                  className="cursor-pointer"
                >
                  Change Password
                </Link>
              </NavbarMenuItem>
              {user?.email ? (
                <Link onClick={handleLogout} size="lg" color="danger">
                  Logout
                </Link>
              ) : (
                <Button
                  className="text-sm font-normal text-default-600 bg-default-100"
                  variant="flat"
                  onClick={() => setShowLogin(true)}
                >
                  Login
                </Button>
              )}
            </div>
          </NavbarMenu>
        </NextUINavbar>
      </div>
    </>
  );
};
