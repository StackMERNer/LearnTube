"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import React, { useEffect } from "react";
import Link from "next/link";
import { toast, Toaster } from "react-hot-toast";
import useUserStore from "../stores/useUserStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Search, Bell } from "lucide-react"; // Icons from lucide-react
import { Button } from "./ui/button";

const NavBar = () => {
  const { user, error, isLoading } = useUser();
  const { setUser } = useUserStore();

  useEffect(() => {
    const sendUserData = async () => {
      if (user) {
        try {
          const response = await fetch("/api/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              auth0Id: user.sub,
              email: user.email,
              name: user.name,
              picture: user.picture,
            }),
          });

          if (!response.ok) {
            throw new Error("Failed to send user data");
          }

          const data = await response.json();
          setUser(data.user);
          toast.success("Welcome!");
        } catch (error: any) {
          toast.error(`Error sending user data: ${error.message}`);
        }
      }
    };

    if (!isLoading && user) {
      sendUserData();
    }
  }, [user, isLoading, setUser]);

  return (
    <>
      <Toaster />
      <nav className="backdrop-blur-xl fixed top-0 right-0 left-0 z-10 w-full ">
        <div className="container mx-auto flex items-center justify-between p-4">
          {/* Left Section: Dropdown Menu and Topics Link */}
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h7"
                    />
                  </svg>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link href="/">Homepage</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/portfolio">Portfolio</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/about">About</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="/topics" className="text-gray-700 hover:text-gray-900">
              Topics
            </Link>
          </div>

          {/* Center Section: Logo */}
          <Link href="/" className="text-2xl font-semibold text-gray-800">
            LearnTube
          </Link>

          {/* Right Section: User Profile and Icons */}
          <div className="flex items-center space-x-4">
            {error ? (
              <div>Error loading user data</div>
            ) : user ? (
              <div className="flex items-center space-x-2">
                <span className="text-gray-700">Welcome, {user.name}!</span>
                <Link href="/api/auth/logout">
                  <Button variant="ghost">Logout</Button>
                </Link>
              </div>
            ) : (
              <Link href="/api/auth/login">
                <Button variant="ghost">Login</Button>
              </Link>
            )}

            {/* Search Icon */}
            <Button variant="ghost" className="p-2">
              <Search className="h-5 w-5 text-gray-700" />
            </Button>

            {/* Notifications Icon */}
            <Button variant="ghost" className="p-2 relative">
              <Bell className="h-5 w-5 text-gray-700" />
              <span className="absolute top-0 right-0 inline-flex h-2 w-2 bg-red-600 rounded-full" />
            </Button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
