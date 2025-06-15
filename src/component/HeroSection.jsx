import React from "react";
import { Box, Typography } from "@mui/material";

export default function HeroSection() {
  return (
    <Box sx={{ textAlign: "center", mb: 8 }}>
      <Typography
        variant="h1"
        sx={{ fontSize: { xs: "4rem", md: "6rem", color: "#99a1af" } }}
      >
        Global Stories
        <br />& Articles
      </Typography>
      <Typography component={"p"} sx={{ color: "#6a7282", fontSize: 18 }}>
        Discover insights, stories, and knowledge from our <br />
        community
      </Typography>
    </Box>
  );
}
