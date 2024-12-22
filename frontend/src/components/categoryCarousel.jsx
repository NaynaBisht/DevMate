import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Fullstack Developer",
  "React Developer",
  "DevOps Engineer",
  "Data Scientist",
  "Machine Learning Engineer",
];

const CategoryCarousel = () => {
  return (
    <div className="relative w-full flex justify-center items-center py-10">
      <Carousel className="w-full max-w-4xl">
        {/* Carousel Content */}
        <CarouselContent className="flex justify-center items-center gap-4">
          {category.map((cat, index) => (
            <CarouselItem
              key={index}
              className="flex-shrink-0 w-full sm:w-auto md:basis-1/2 lg:basis-1/3 text-center"
            >
              <Button
                variant="outline"
                className="w-full sm:w-auto px-6 py-3 rounded-full"
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Previous Button */}
        <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 text-white p-2 rounded-full shadow-lg">
          &#9664; {/* Left Arrow */}
        </CarouselPrevious>

        {/* Next Button */}
        <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 text-white p-2 rounded-full shadow-lg">
          &#9654; {/* Right Arrow */}
        </CarouselNext>
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
