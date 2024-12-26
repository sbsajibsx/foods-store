import { Helmet } from "react-helmet-async";
import Banner from "../components/Banner";
import SliderSwiper from "../components/SliderSwiper";
import TopFood from "../components/TopFood";
import Work from "../components/Work";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Food | Home</title>
      </Helmet>
      {/* banner */}
      <div>
        <Banner></Banner>
      </div>
      {/* how to work section */}
      <Work></Work>
      {/* Top Foods section */}
      <div>
        <TopFood></TopFood>
      </div>
      {/* swiper */}
      <SliderSwiper></SliderSwiper>
    </div>
  );
};

export default Home;
