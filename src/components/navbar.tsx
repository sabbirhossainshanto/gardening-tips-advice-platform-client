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
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";

import { SearchIcon, Logo } from "../components/icons";
import { useUser } from "../context/user.provider";
import { usePathname, useRouter } from "next/navigation";
import { logOut } from "../services/AuthService";
import NavbarDropdown from "./navbarDropdown";
import { useShowRegisterModal } from "../store/showRegister";
import Register from "./modal/Register";
import CreatePost from "./modal/CreatePost";
import ChangePassword from "./modal/ChangePassword";
import { useChangePasswordModal } from "../store/showChangePassword";
import { useGetUpvoters } from "../hooks/post";
import { useGetMe } from "../hooks/profile";
import { useShowForgotPasswordModal } from "../store/showForgotPassword";
import ForgotPassword from "./modal/ForgotPassword";
import { Home } from "lucide-react";
import { FaBookmark, FaUserFriends } from "react-icons/fa";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { useEffect } from "react";

export const Navbar = () => {
  const [changePassword, setChangePassword] = useChangePasswordModal();
  const [showRegister] = useShowRegisterModal();
  const [showForgotPassword] = useShowForgotPasswordModal();
  const pathname = usePathname();
  const router = useRouter();
  const {
    user,
    setIsLoading: setUserLoading,
    setQuery,
    query,
    isLoading,
  } = useUser();
  const { data: myData } = useGetMe(user?.email as string);
  const { data: upvoters } = useGetUpvoters(user?.email as string);

  const handleLogout = () => {
    logOut();
    setUserLoading(true);
    router.push("/login");
  };

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/login");
      }
    }
  }, [user, isLoading]);

  const searchInput = (
    <Input
      onChange={(e) =>
        setQuery({
          ...query,
          sort: "upvotes",
          searchTerm: e.target.value,
          // page: 0,
          // limit: 0,
        })
      }
      radius="none"
      aria-label="Search"
      size="lg"
      className="w-[300px]"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      labelPlacement="outside"
      placeholder="Search Posts..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <div className="bg-white shadow-md fixed top-0 right-0 left-0 z-40 h-[90px] px-4 md:px-6 lg:px-10">
      {changePassword && <ChangePassword />}
      {showRegister && <Register />}
      {showForgotPassword && <ForgotPassword />}
      <div className="h-full flex flex-col items-center">
        <NextUINavbar
          maxWidth="full"
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          position="sticky"
        >
          <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
            <NavbarBrand as="li" className="gap-3 max-w-fit">
              <NextLink
                className="flex justify-start items-center gap-1"
                href="/"
              >
                <Logo />
                <p className="font-extrabold text-inherit text-2xl text-[#05f]">
                  GardenBook
                </p>
              </NextLink>
            </NavbarBrand>
          </NavbarContent>
          <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
            <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
            <ul className="hidden lg:flex gap-6 justify-start items-center  ml-2">
              <NavbarItem className="flex items-center gap-3">
                <NextLink
                  className={clsx(
                    linkStyles({ color: "foreground" }),
                    `rounded-full p-5 ${pathname === "/" ? "bg-[#d2e3ff] " : "bg-gray-200 "}`
                  )}
                  color="foreground"
                  href="/"
                >
                  <Home color={`${pathname === "/" ? "#1e74fd" : "gray"}`} />
                </NextLink>
                <NextLink
                  className={clsx(
                    linkStyles({ color: "foreground" }),
                    `rounded-full p-5 ${pathname === "/friends" ? "bg-[#d2e3ff] " : "bg-gray-200 "}`
                  )}
                  color="foreground"
                  href="/friends"
                >
                  <FaUserFriends
                    size={25}
                    color={`${pathname === "/friends" ? "#1e74fd" : "gray"}`}
                  />
                </NextLink>
                <NextLink
                  className={clsx(
                    linkStyles({ color: "foreground" }),
                    `rounded-full p-5 ${pathname === "/followers" ? "bg-[#d2e3ff] " : "bg-gray-200 "}`
                  )}
                  color="foreground"
                  href="/followers"
                >
                  <LiaUserFriendsSolid
                    size={30}
                    color={`${pathname === "/followers" ? "#1e74fd" : "gray"}`}
                  />
                </NextLink>
                <NextLink
                  className={clsx(
                    linkStyles({ color: "foreground" }),
                    `rounded-full p-5 ${pathname === "/bookmarked" ? "bg-[#d2e3ff] " : "bg-gray-200 "}`
                  )}
                  color="foreground"
                  href="/bookmarked"
                >
                  <FaBookmark
                    size={23}
                    color={`${pathname === "/bookmark" ? "#1e74fd" : "gray"}`}
                  />
                </NextLink>
              </NavbarItem>
              {upvoters?.data &&
                upvoters?.data?.length > 0 &&
                !myData?.data?.isVerified && (
                  <NavbarItem key="verify">
                    <NextLink className="text-success" href={"/verify-profile"}>
                      Verify Account
                    </NextLink>
                  </NavbarItem>
                )}
            </ul>
            {user?.email && pathname.startsWith("/profile") && <CreatePost />}
          </NavbarContent>

          <NavbarContent
            className="hidden sm:flex basis-1/5 sm:basis-full"
            justify="end"
          >
            <NavbarItem className="hidden md:flex">
              {user?.email && <NavbarDropdown />}
            </NavbarItem>
          </NavbarContent>

          <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
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

                  <NavbarMenuItem key={`profile`}>
                    <Link
                      color={
                        pathname === "/profile/favorite"
                          ? "primary"
                          : "foreground"
                      }
                      href="/profile/favorite"
                      size="lg"
                    >
                      Favorite
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

              {user?.email && (
                <Link onClick={handleLogout} size="lg" color="danger">
                  Logout
                </Link>
              )}
            </div>
          </NavbarMenu>
        </NextUINavbar>
      </div>
    </div>
  );
};
