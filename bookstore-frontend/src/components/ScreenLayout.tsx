import * as React from "react";
import { useOutlet } from "react-router-dom";
import Header from "./Header/Header";
import {
  AppBar,
  Box,
  Container,
  Slide,
  Toolbar,
  useScrollTrigger,
} from "@mui/material";
import NavigationBar from "./NavigationBar/NavigationBar";
import CustomBottomNavigation from "./CustomBottomNavigation/CustomBottomNavigation";

export interface IScreenLayout {}

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: React.ReactElement;
}

function HideOnScroll(props: Props) {
  const { children, window } = props;

  const triggerForScroll = useScrollTrigger({
    target: window ? window() : undefined,
  });

  const triggerForElevation = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!triggerForScroll}>
      {React.cloneElement(children, {
        elevation: triggerForElevation ? 4 : 0,
      })}
    </Slide>
  );
}

export default function ScreenLayout(props: IScreenLayout) {
  const pageOutlet = useOutlet();

  return (
    <>
      <HideOnScroll {...props}>
        <AppBar>
          <Header></Header>
        </AppBar>
      </HideOnScroll>
      <Toolbar sx={{ height: 66 }} />
      <Container
        maxWidth="xl"
        sx={{
          paddingX: {
            xs: "0px",
            sm: "0px",
            md: "0px",
            lg: "72px",
            xl: "2rem",
          },
          paddingY: {
            xs: "0.7rem",
            sm: "1rem",
            lg: "1.5",
          },
        }}
      >
        {pageOutlet}
      </Container>
      <Toolbar
        sx={{ height: 66, display: { xs: "flex", sm: "flex", md: "none" } }}
      />
      <Box
        sx={{
          display: { xs: "flex", sm: "none", md: "none" },
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
        }}
      >
        <CustomBottomNavigation></CustomBottomNavigation>
      </Box>
    </>
  );
}
