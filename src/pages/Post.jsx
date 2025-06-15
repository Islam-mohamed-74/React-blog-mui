"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { toast } from "react-toastify";
import ModalDelete from "../component/ModalDelete";
import AddIcon from "@mui/icons-material/Add";
// mui
import {
  Box,
  CircularProgress,
  createTheme,
  Fab,
  ThemeProvider,
  Typography,
} from "@mui/material";
import PostsDetails from "../component/PostsDetails";
import HeroSection from "../component/HeroSection";

export default function Post(props) {
  const { users, user } = props;
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/posts");
        setPosts(res.data);
        setLoading(false);
      } catch (error) {
        toast.error(error.response.data);
      }
    };
    getPosts();
  }, []);

  const handelDelete = async (post) => {
    // Store the posts before the delete in case of an error
    const postsBeforeDelete = [...posts];

    try {
      // Delete the post from the state
      const newPosts = posts.filter((p) => p.id !== post.id);
      setPosts(newPosts);

      // Delete the post from the server
      await axios.delete(`http://localhost:3000/posts/${post.id}`);

      // Show a success message
      toast.success("Post deleted successfully");

      // Close the modal
      setShowModal(false);
    } catch (error) {
      // If there is an error, restore the previous posts
      setPosts(postsBeforeDelete);
      // Show an error message
      toast.error(error.response?.data || "Error deleting post");
    }
  };

  const openModal = (post) => {
    setPostToDelete(post);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setPostToDelete(null);
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#000000",
      },
      secondary: {
        main: "#ffffff",
      },
      text: {
        primary: "#021010",
        secondary: "#666666",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Link to="/post/new">
          <Fab
            color="secondary"
            sx={{ position: "fixed", bottom: 16, right: 16 }}
            aria-label="add"
          >
            <AddIcon />
          </Fab>
        </Link>

        {/* Loading State */}
        {loading && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "400px",
            }}
          >
            <CircularProgress />
          </Box>
        )}

        {/* Posts Content */}
        {!loading && (
          <Box component="main" sx={{ px: 4, py: 14 }}>
            {/* Header Section */}
            <HeroSection />
            {/* Posts  */}
            <Box component={"section"}>
              <Typography
                variant="h2"
                sx={{
                  fontSize: "2.5rem",
                  color: "#9e9e9e",
                  mb: 6,
                  fontWeight: 700,
                }}
              >
                Recent Articles
              </Typography>

              <PostsDetails
                posts={posts}
                users={users}
                user={user}
                openModal={openModal}
              />

              {/* Empty State */}
              {posts.length === 0 && (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-12 h-12 text-gray-400"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h6.75"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    No articles yet
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Be the first to share your story with the community.
                  </p>
                  <Link
                    to="/post/new"
                    className="bg-black text-white hover:bg-gray-800 rounded-full px-6 py-2 transition-colors inline-flex items-center space-x-2"
                  >
                    <span>Create Article</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                  </Link>
                </div>
              )}
            </Box>
          </Box>
        )}

        {/* Delete Modal */}
        {showModal && (
          <ModalDelete
            handelDelete={() => handelDelete(postToDelete)}
            closeModal={closeModal}
          />
        )}
      </Box>
    </ThemeProvider>
  );
}
