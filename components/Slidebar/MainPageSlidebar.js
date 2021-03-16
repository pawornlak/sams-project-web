import React from "react";
import { Slide } from "react-slideshow-image";
import { Fade } from "react-slideshow-image";
import Slideimg1 from "../../Image/slideimg5.jpg";
import Slideimg2 from "../../Image/slideimg2.jpg";
import Slideimg3 from "../../Image/slideimg6.jpg";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const MainPageSlidebar = () => {
  return (
    <div className="Main-Page-Slidebar">
      <Carousel showArrows={true}>
        <div className="Main-Page-Slidebar-Img">
          <img src={Slideimg1} />
          
        </div>
        <div className="Main-Page-Slidebar-Img">
          <img src={Slideimg2} />
          
        </div>
        <div className="Main-Page-Slidebar-Img">
          <img src={Slideimg3} />
          
        </div>
      </Carousel>
    </div>
  );
};

export default MainPageSlidebar;
