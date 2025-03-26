"use client";

import React from "react";
import TopNavbar from "./TopNavbar";
import Link from "next/link";
import { Menu, MenuItem, Button, IconButton } from "@mui/material";
import { FaShoppingCart, FaUser, FaHeart } from "react-icons/fa";
import { useState } from "react";
import Image from "next/image";

const Navbar: React.FC = () => {
  const [helpAnchor, setHelpAnchor] = useState<null | HTMLElement>(null);
  const handleHelpClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setHelpAnchor(event.currentTarget);
  };
  const handleHelpClose = () => {
    setHelpAnchor(null);
  };

  // Rooms Dropdown
  const [roomsAnchor, setRoomsAnchor] = useState<null | HTMLElement>(null);
  const handleRoomsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setRoomsAnchor(event.currentTarget);
  };
  const handleRoomsClose = () => {
    setRoomsAnchor(null);
  };
  return (
    <div className="">
      {/* Top Navbar */}
      <TopNavbar />
      {/* Main Navbar Placeholder */}
      <div className="py-5 bg-background">
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-red-500">
            <Image
              src="/images/logo.png"
              alt="rsdecor"
              width={80}
              height={80}
            />
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6 text-text-primary font-medium">
            <Link href="/" className="hover:text-red-500 transition">
              Home
            </Link>
            <Link href="/about" className="hover:text-red-500 transition">
              About Us
            </Link>

            {/* Help Dropdown */}
            <div>
              <Button
                onClick={handleHelpClick}
                sx={{ color: "white" }}
                className="hover:text-primary"
              >
                Help
              </Button>
              <Menu
                anchorEl={helpAnchor}
                open={Boolean(helpAnchor)}
                onClose={handleHelpClose}
              >
                <MenuItem onClick={handleHelpClose}>FAQs</MenuItem>
                <MenuItem onClick={handleHelpClose}>Contact Support</MenuItem>
                <MenuItem onClick={handleHelpClose}>
                  Shipping & Returns
                </MenuItem>
              </Menu>
            </div>

            {/* Rooms Dropdown */}
            <div>
              <Button
                onClick={handleRoomsClick}
                className="capitalize text-gray-800 hover:text-red-500"
              >
                Rooms
              </Button>
              <Menu
                anchorEl={roomsAnchor}
                open={Boolean(roomsAnchor)}
                onClose={handleRoomsClose}
              >
                <MenuItem onClick={handleRoomsClose}>Living Room</MenuItem>
                <MenuItem onClick={handleRoomsClose}>Bedroom</MenuItem>
                <MenuItem onClick={handleRoomsClose}>Office</MenuItem>
              </Menu>
            </div>
          </div>

          {/* Right Section: Icons & Login */}
          <div className="flex items-center space-x-4">
            {/* Cart Icon */}
            <IconButton color="inherit" className="text-gray-800">
              <FaShoppingCart className="text-xl" />
            </IconButton>

            {/* Wishlist Icon */}
            <IconButton color="inherit" className="text-gray-800">
              <FaHeart className="text-xl" />
            </IconButton>

            {/* Login Button */}
            <Button
              variant="contained"
              color="primary"
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600"
            >
              <FaUser />
              Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
