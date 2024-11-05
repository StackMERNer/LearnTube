"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import React, { useEffect } from "react";
import Link from "next/link"; // Import Link for navigation
import { toast, Toaster } from "react-hot-toast"; // Import toast and Toaster

const NavBar = () => {
  const { user, error, isLoading } = useUser();

  useEffect(() => {
    const sendUserData = async () => {
      if (user) {
        try {
          const response = await fetch("/api/user", {
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
          console.log("User data processed:", data.message); // Log the success message
          console.log("User information:", data.user); // Log the user data
          toast.success("User data sent successfully!"); // Show success message
        } catch (error) {
          console.error("Error sending user data:", error);
          toast.error("Error sending user data."); // Show error message
        }
      }
    };

    // Call the function to send user data after checking if user is loaded
    if (!isLoading && user) {
      sendUserData();
    }
  }, [user, isLoading]); // Dependency array to trigger useEffect when user or loading state changes

  if (isLoading) {
    return <div>Loading...</div>; // Show loading state while fetching user data
  }

  return (
    <>
      <Toaster /> {/* Include Toaster here */}
      <div className="navbar bg-base-100 container mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
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
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link href="/">Homepage</Link>
              </li>
              <li>
                <Link href="/portfolio">Portfolio</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <a className="btn btn-ghost text-xl">LearnTube</a>
        </div>
        <div className="navbar-end">
          {error ? (
            <div>Error loading user data</div>
          ) : user ? (
            <div className="flex items-center">
              <span className="mr-2">Welcome, {user.name}!</span>
              <Link href="/api/auth/logout" className="btn btn-ghost">
                Logout
              </Link>
            </div>
          ) : (
            <div>
              <Link href="/api/auth/login" className="btn btn-ghost">
                Login
              </Link>
            </div>
          )}
          <button className="btn btn-ghost btn-circle">
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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          <button className="btn btn-ghost btn-circle">
            <div className="indicator">
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
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="badge badge-xs badge-primary indicator-item"></span>
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default NavBar;