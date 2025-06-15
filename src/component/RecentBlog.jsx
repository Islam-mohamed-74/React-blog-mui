"use client";
import { Box, Container, Typography, Chip } from "@mui/material";

export default function RecentBlog() {
  const categories = [
    { id: 1, name: "Hobbies" },
    { id: 2, name: "Gaming" },
    { id: 3, name: "Automotive" },
    { id: 4, name: "Pet Care" },
    { id: 5, name: "Science" },
    { id: 6, name: "Work Life" },
    { id: 7, name: "Social Issues" },
    { id: 8, name: "Entertainment" },
    { id: 9, name: "Travel & Culture" },
    { id: 10, name: "Technology" },
    { id: 11, name: "Lifestyle" },
  ];

  return (
    <Box component="section" sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          component="h2"
          align="center"
          sx={{
            fontSize: { xs: "2rem", md: "3rem" },
            fontWeight: 700,
            mb: 6,
          }}
        >
          Blog Categories
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 2,
            maxWidth: 1200,
            mx: "auto",
          }}
        >
          {categories.map((category) => (
            <Chip
              key={category.id}
              label={category.name}
              clickable
              sx={{
                px: 3,
                py: 3,
                borderRadius: "100px",
                fontSize: "1rem",
                fontWeight: 500,
                border: "1px solid",
                borderColor: "grey.200",
                backgroundColor: "white",
                color: "grey.800",
                "&:hover": {
                  backgroundColor: "grey.50",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                },
                "& .MuiChip-label": {
                  px: 1.5,
                },
              }}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
}
