import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Header />
      <main className="container bg-white mt-2">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
