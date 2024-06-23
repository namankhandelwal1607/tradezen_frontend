import React from "react";
import { Outlet } from "react-router-dom";
import Filters from "../components/Filters";
import Port from "../components/Port";

const Stock = () => {
  return (
    <section className="w-[80%] h-full flex flex-col mt-16 mb-24 relative">
      <Filters />
      <Port />
      <Outlet />
    </section>
  );
};

export default Stock;
