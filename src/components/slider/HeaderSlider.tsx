import React from "react";
import { Carousel, CarouselItem } from "react-bootstrap";

function HeaderSlider() {
  return (
    <div>
      <Carousel variant="dark">
        <Carousel.Item>
          <img
            className="d-block w-100"
            style={{ height: "80vh", objectFit: "cover" }}
            src="../image/slider/women.jpg"
            alt="women"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            style={{ height: "80vh", objectFit: "cover" }}
            src="../image/slider/mens.jpg"
            alt="men"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            style={{ height: "80vh", objectFit: "cover" }}
            src="../image/slider/kids.jpg"
            alt="kids"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            style={{ height: "80vh", objectFit: "cover" }}
            src="../image/slider/bag.jpg"
            alt="bag"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            style={{ height: "80vh", objectFit: "cover" }}
            src="../image/slider/accessories.jpg"
            alt="accessories"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default HeaderSlider;
