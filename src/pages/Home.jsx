import { Link } from "react-router";
import ContactSection from "../component/ContactSection";
import HeroSection from "../component/HeroSection";
import RecentBlog from "../component/RecentBlog";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <Box component="main" sx={{ mt: 10 }}>
      <HeroSection />
      <RecentBlog />
    </Box>
  );
}
