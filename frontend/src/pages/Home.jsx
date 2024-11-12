//import React from "react";
//import CustomNavbar from "../components/Navbar";
import CarouselComponent from "../components/CarouselComponent";
import CategoryCards from "../components/CategoryCards";
import FeaturedProducts from "../components/FeaturedProducts";
import BrandBanner from "../components/BrandBanner";

const Home = () => {
  return (
    <div>
      <h1>Bienvenido a nuestro Marketplace</h1>
      <CarouselComponent />
      <CategoryCards />
      <FeaturedProducts />
      <BrandBanner />
    </div>
  );
};

export default Home;

// cambio en el home para probar push
