/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";

import { usePathname, useRouter } from "next/navigation";
import { Avatar } from "@nextui-org/avatar";
import { logOut } from "@/src/services/AuthService";
import { useUser } from "@/src/context/user.provider";
import { useChangePasswordModal } from "../store/showChangePassword";
import { protectedRoute } from "../constant";
import { useGetMe } from "../hooks/profile";
import { Badge } from "@nextui-org/badge";
import { CheckIcon } from "lucide-react";
import { Button } from "@nextui-org/button";

export default function NavbarDropdown() {
  const { data: myData } = useGetMe();
  const [_changePassword, setChangePassword] = useChangePasswordModal();
  const router = useRouter();
  const pathname = usePathname();
  const { setIsLoading: userLoading, user } = useUser();

  const handleLogout = () => {
    logOut();
    userLoading(true);
    if (protectedRoute.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };

  const handleNavigation = (pathname: string) => {
    router.push(pathname);
  };

  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          {myData?.data?.isVerified ? (
            <div>
              <Badge
                className="cursor-pointer rounded-full"
                content={<CheckIcon size={11} />}
                color="success"
                size="sm"
              >
                <Avatar
                  className="cursor-pointer"
                  isBordered
                  radius="full"
                  color="success"
                  src={user?.profilePhoto}
                />
              </Badge>
            </div>
          ) : (
            <Avatar
              className="cursor-pointer"
              isBordered
              radius="full"
              src={user?.profilePhoto}
            />
          )}
        </DropdownTrigger>
        {user?.role === "USER" ? (
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem onClick={() => handleNavigation("/profile")}>
              Profile
            </DropdownItem>

            <DropdownItem
              onClick={() => setChangePassword(true)}
              key="change password"
            >
              Change Password
            </DropdownItem>

            <DropdownItem
              onClick={handleLogout}
              key="delete"
              className="text-danger"
              color="danger"
            >
              Logout
            </DropdownItem>
          </DropdownMenu>
        ) : (
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem onClick={() => handleNavigation("/dashboard")}>
              Dashboard
            </DropdownItem>
            <DropdownItem
              onClick={() => setChangePassword(true)}
              key="change password"
            >
              Change Password
            </DropdownItem>

            <DropdownItem
              onClick={handleLogout}
              key="delete"
              className="text-danger"
              color="danger"
            >
              Logout
            </DropdownItem>
          </DropdownMenu>
        )}
      </Dropdown>
    </>
  );
}
