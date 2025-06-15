"use client";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Avatar,
  IconButton,
  Box,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { Link } from "react-router";

export default function PostsDetails(props) {
  const { posts, user, users, openModal } = props;

  return (
    <Grid container spacing={3}>
      {posts.map((post, index) => (
        <Grid xs={12} sm={6} lg={4} key={post.id}>
          <Card
            sx={{
              height: "400px",
              width: "300px",
              display: "flex",
              flexDirection: "column",
              cursor: "pointer",
              transition: "all 0.3s ease",
              border: "1px solid",
              borderColor: "grey.100",
              boxShadow: 1,
              "&:hover": {
                boxShadow: 4,
                transform: "translateY(-2px)",
              },
            }}
          >
            {/* Post Image */}
            {post.url && (
              <CardMedia
                component="img"
                image={
                  post.url || `https://picsum.photos/800/450?random=${index}`
                }
                alt="green iguana"
                sx={{ height: 200 }}
              />
            )}

            {/* Post Content */}
            <CardContent sx={{ flexGrow: 1, p: 3 }}>
              <Typography
                variant="h6"
                component="h3"
                sx={{
                  fontWeight: 600,
                  color: "text.primary",
                  mb: 2,
                  WebkitLineClamp: 2,
                  overflow: "hidden",
                }}
              >
                {post.title}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                gutterBottom
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  lineHeight: "1.4em",
                  minHeight: "60px",
                  wordWrap: "break-word",
                }}
              >
                {post.content?.trim() || "No content available"}
              </Typography>

              {/* Author and Actions */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  pt: 2,
                  borderTop: "1px solid",
                  borderColor: "grey.100",
                }}
              >
                {/* Author Info */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      background:
                        "linear-gradient(135deg, #9c27b0 0%, #2196f3 100%)",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                    }}
                  >
                    {
                      (users.find((u) => u.id === post.authorId)?.name ||
                        "U")[0]
                    }
                  </Avatar>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 500,
                      color: "text.primary",
                      fontSize: "0.875rem",
                    }}
                  >
                    {users.find((u) => u.id === post.authorId)?.name ||
                      "Unknown"}
                  </Typography>
                </Box>

                {/* Action Buttons */}
                {post.authorId === user.id && (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <IconButton
                      component={Link}
                      to={`/post/${post.id}`}
                      size="small"
                      sx={{
                        color: "grey.500",
                        transition: "all 0.2s ease",
                        "&:hover": {
                          backgroundColor: "grey.100",
                          color: "primary.main",
                        },
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      onClick={() => openModal(post)}
                      size="small"
                      sx={{
                        color: "grey.500",
                        transition: "all 0.2s ease",
                        "&:hover": {
                          backgroundColor: "grey.100",
                          color: "error.main",
                        },
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
