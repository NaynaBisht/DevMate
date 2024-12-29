import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "lucide-react";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Machine Learning",
  "Software Developer",
  "Full Stack Developer"
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="relative w-1/2 max-w-xl mx-auto my-20">
      <Carousel>
        {/* Left Arrow */}
        <CarouselPrevious className="absolute left-[-40px] top-1/2 transform -translate-y-1/2">
          <ArrowLeftCircleIcon size={32} className="cursor-pointer" />
        </CarouselPrevious>

        <CarouselContent>
          {category.map((cat, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/2 lg-basis-1/3 text-center"
            >
              <Button
                variant="outline"
                onClick={() => searchJobHandler(cat)}
                className="rounded-full"
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Right Arrow */}
        <CarouselNext className="absolute right-[-40px] top-1/2 transform -translate-y-1/2">
          <ArrowRightCircleIcon size={32} className="cursor-pointer" />
        </CarouselNext>
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
