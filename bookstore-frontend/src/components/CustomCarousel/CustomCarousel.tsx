import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { FC, ReactNode } from "react";
import useTheme from "@mui/material/styles/useTheme";
import classes from "../CustomCarousel/CustomCarousel.module.css";

export interface ICustomCarousel {
  children: ReactNode;
  responsive?: ICarouselResponsive;
  visibilityGutter?: ICarouselVisibilityGutter;
}

export interface ICarouselResponsive {
  mobile: number;
  tablet: number;
  desktop: number;
  superLargeDesktop: number;
}

export interface ICarouselVisibilityGutter {
  mobile: number;
  tablet: number;
  desktop: number;
  superLargeDesktop: number;
}

const CustomCarousel: FC<ICustomCarousel> = ({
  children = [],
  responsive = {
    mobile: 3,
    tablet: 4,
    desktop: 5,
    superLargeDesktop: 6,
  },
  visibilityGutter = {
    mobile: 8,
    tablet: 10,
    desktop: 12,
    superLargeDesktop: 15,
  },
}) => {
  const theme = useTheme();
  const defaultResponsive = {
    superLargeDesktop: {
      breakpoint: {
        max: 50000,
        min: theme.breakpoints.values.lg,
      },
      items: responsive.superLargeDesktop,
      partialVisibilityGutter: visibilityGutter.superLargeDesktop,
    },
    desktop: {
      breakpoint: {
        max: theme.breakpoints.values.lg,
        min: theme.breakpoints.values.md,
      },
      items: responsive.desktop,
      partialVisibilityGutter: visibilityGutter.desktop,
    },
    tablet: {
      breakpoint: {
        max: theme.breakpoints.values.md,
        min: theme.breakpoints.values.sm,
      },
      items: responsive.tablet,
      partialVisibilityGutter: visibilityGutter.tablet,
    },
    mobile: {
      breakpoint: { max: theme.breakpoints.values.sm, min: 0 },
      items: responsive.mobile,
      partialVisibilityGutter: visibilityGutter.mobile,
    },
  };

  return (
    <Carousel
      responsive={defaultResponsive}
      removeArrowOnDeviceType={["tablet", "mobile"]}
      containerClass={classes["carousel-container"]}
      partialVisible
    >
      {children}
    </Carousel>
  );
};

export default CustomCarousel;
