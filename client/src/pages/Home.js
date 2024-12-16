import React from "react";
import { CategoryList } from "../components/CategoryList";
import BannerProduct from "../components/BannerProduct";
import HorizontalCartProduct from "../components/HorizontalCartProduct";
import VerticalCartProduct from "../components/VerticalCartProduct";
import CategoryProducts from "./CategoryProducts";

export const Home = () => {
  return (
    <div>
      <CategoryList />
      <BannerProduct />
      <HorizontalCartProduct category={"airpodes"} heading={"Top Products"} />
      <HorizontalCartProduct category={"refrigerator"} heading={"Top Products"} />
      <HorizontalCartProduct category={"earphones"} heading={"Top Products"} />
      <HorizontalCartProduct category={"Mouse"} heading={"Top Products"} />
      <HorizontalCartProduct category={"printers"} heading={"Top Products"} />
      <HorizontalCartProduct category={"processor"} heading={"Top Products"} />
      <VerticalCartProduct category={"airpodes"} heading={"Top Products"} />
    </div>
  );
};
