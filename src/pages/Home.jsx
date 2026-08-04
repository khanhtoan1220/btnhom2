import React from "react";
import Banner from "../components/Banner";
import QuickSearch from "../components/QuickSearch";
import ServiceList from "../components/ServiceList";
import FeaturedServices from "../components/FeaturedServices";
import PromotionList from "../components/PromotionList";
import FeaturedBranches from "../components/FeaturedBranches";
import BookingProcess from "../components/BookingProcess";
import Testimonials from "../components/Testimonials";
import PetBlogs from "../components/PetBlogs";
import Newsletter from "../components/Newsletter";

const Home = () => {
  return (
    <div>
      <Banner />
      <QuickSearch />
      <ServiceList />
      <FeaturedServices />
      <PromotionList />
      <FeaturedBranches />
      <BookingProcess />
      <Testimonials />
      <PetBlogs />
      <Newsletter />
    </div>
  );
};

export default Home;
