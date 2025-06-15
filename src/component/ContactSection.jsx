"use client";

import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
  Stack,
} from "@mui/material";

export default function ContactSection() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "grey.900",
        color: "white",
        py: 6,
        mt: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent={"space-around"}>
          {/* Left Section - Logo and Newsletter */}
          <Grid item xs={12} lg={6}>
            <Stack spacing={3}>
              {/* Logo */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Global Stories
                </Typography>
              </Box>

              {/* Newsletter Section */}
              <Box>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                  Join the newsletter
                </Typography>
                <Typography variant="body2" sx={{ color: "grey.400", mb: 2 }}>
                  Subscribe for weekly updates. No spams ever!
                </Typography>

                {/* Email Input and Subscribe Button */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    gap: 1,
                    maxWidth: 400,
                  }}
                >
                  <TextField
                    placeholder="Your email address"
                    variant="outlined"
                    size="small"
                    sx={{
                      flex: 1,
                      "& .MuiOutlinedInput-root": {
                        bgcolor: "grey.800",
                        color: "white",
                        "& fieldset": {
                          borderColor: "grey.700",
                        },
                        "&:hover fieldset": {
                          borderColor: "grey.600",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "primary.main",
                        },
                      },
                      "& .MuiInputBase-input::placeholder": {
                        color: "grey.500",
                        opacity: 1,
                      },
                    }}
                  />
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: "white",
                      color: "grey.900",
                      "&:hover": {
                        bgcolor: "grey.100",
                      },
                      textTransform: "none",
                      px: 3,
                    }}
                  >
                    Subscribe
                  </Button>
                </Box>
              </Box>
            </Stack>
          </Grid>

          {/* Right Section - Links */}
          <Grid item xs={12} lg={6} alignItems={"center"}>
            <Grid container spacing={4}>
              {/* Product Column */}
              <Grid item xs={12} sm={4}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Product
                </Typography>
                <Stack spacing={1}>
                  <Link
                    href="#"
                    color="grey.400"
                    underline="none"
                    sx={{
                      fontSize: "0.875rem",
                      "&:hover": { color: "white" },
                      transition: "color 0.2s",
                    }}
                  >
                    Features
                  </Link>
                  <Link
                    href="#"
                    color="grey.400"
                    underline="none"
                    sx={{
                      fontSize: "0.875rem",
                      "&:hover": { color: "white" },
                      transition: "color 0.2s",
                    }}
                  >
                    Testimonials
                  </Link>
                  <Link
                    href="#"
                    color="grey.400"
                    underline="none"
                    sx={{
                      fontSize: "0.875rem",
                      "&:hover": { color: "white" },
                      transition: "color 0.2s",
                    }}
                  >
                    Highlights
                  </Link>
                  <Link
                    href="#"
                    color="grey.400"
                    underline="none"
                    sx={{
                      fontSize: "0.875rem",
                      "&:hover": { color: "white" },
                      transition: "color 0.2s",
                    }}
                  >
                    Pricing
                  </Link>
                  <Link
                    href="#"
                    color="grey.400"
                    underline="none"
                    sx={{
                      fontSize: "0.875rem",
                      "&:hover": { color: "white" },
                      transition: "color 0.2s",
                    }}
                  >
                    FAQs
                  </Link>
                </Stack>
              </Grid>

              {/* Company Column */}
              <Grid item xs={12} sm={4}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Company
                </Typography>
                <Stack spacing={1}>
                  <Link
                    href="#"
                    color="grey.400"
                    underline="none"
                    sx={{
                      fontSize: "0.875rem",
                      "&:hover": { color: "white" },
                      transition: "color 0.2s",
                    }}
                  >
                    About us
                  </Link>
                  <Link
                    href="#"
                    color="grey.400"
                    underline="none"
                    sx={{
                      fontSize: "0.875rem",
                      "&:hover": { color: "white" },
                      transition: "color 0.2s",
                    }}
                  >
                    Careers
                  </Link>
                  <Link
                    href="#"
                    color="grey.400"
                    underline="none"
                    sx={{
                      fontSize: "0.875rem",
                      "&:hover": { color: "white" },
                      transition: "color 0.2s",
                    }}
                  >
                    Press
                  </Link>
                </Stack>
              </Grid>

              {/* Legal Column */}
              <Grid item xs={12} sm={4}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Legal
                </Typography>
                <Stack spacing={1}>
                  <Link
                    href="#"
                    color="grey.400"
                    underline="none"
                    sx={{
                      fontSize: "0.875rem",
                      "&:hover": { color: "white" },
                      transition: "color 0.2s",
                    }}
                  >
                    Terms
                  </Link>
                  <Link
                    href="#"
                    color="grey.400"
                    underline="none"
                    sx={{
                      fontSize: "0.875rem",
                      "&:hover": { color: "white" },
                      transition: "color 0.2s",
                    }}
                  >
                    Privacy
                  </Link>
                  <Link
                    href="#"
                    color="grey.400"
                    underline="none"
                    sx={{
                      fontSize: "0.875rem",
                      "&:hover": { color: "white" },
                      transition: "color 0.2s",
                    }}
                  >
                    Contact
                  </Link>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
