import { Label, Margin } from "@mui/icons-material";
import {
  Box,
  Button,
  Collapse,
  Stack,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { Add as AddIcon, Check as CheckIcon } from "@mui/icons-material";

export default function PostsForm(props) {
  const { user } = props;
  const { id } = useParams();
  const mode = id === "new" ? "add" : id ? "edit" : "add";
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    if (mode === "edit") {
      const getPost = async () => {
        try {
          const token = localStorage.getItem("token");
          const res = await axios.get(`http://localhost:3000/posts/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setValue("title", res.data.title);
          setValue("url", res.data.url);
          setValue("content", res.data.content);
        } catch (error) {
          toast.error(error.response?.data?.message || error.message);
        }
      };
      getPost();
    }
  }, [mode, id, setValue]);

  const newPost = {
    title: {
      required: "Title is required",
      minLength: { value: 3, message: "Title must have at least 3 characters" },
      maxLength: {
        value: 30,
        message: "Title must have at least 3 characters and less than 30",
      },
    },
    url: {
      required: "Image is required",
    },
    content: {
      required: "Content is required",
      minLength: {
        value: 10,
        message: "Content must have at least 10 characters and less than 100",
      },
      maxLength: {
        value: 100,
        message: "Content must have at least 10 characters and less than 100",
      },
    },
  };

  const editPost = async (data) => {
    try {
      const token = localStorage.getItem("token");
      const post = await axios.put(
        `http://localhost:3000/posts/${id}`,
        {
          ...data,
          authorId: user.id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(post.data);
      toast.success("Post updated successfully");
      navigate("/post");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const addPost = async (data) => {
    try {
      const token = localStorage.getItem("token");
      const post = await axios.post(
        "http://localhost:3000/posts",
        {
          ...data,
          authorId: user.id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(post.data);
      toast.success("Post created successfully");
      navigate("/post");
    } catch (error) {
      toast.error(error.response?.data?.message || "فشل إضافة البوست");
    }
  };

  const handlePosts = (data) => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        data.url = reader.result;
        if (mode === "add") {
          addPost(data);
        } else {
          editPost(data);
        }
      };
      reader.readAsDataURL(selectedFile);
    } else {
      if (mode === "add") {
        addPost(data);
      } else {
        editPost(data);
      }
    }
  };
  return (
    <Box sx={{ py: 12 }}>
      <Box>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h3">Wordcraft</Typography>
          <Typography>Global Stories & Articles</Typography>
        </Box>
        <Typography
          variant="h4"
          sx={{ textAlign: "center", mt: 3, fontWeight: "bold" }}
        >
          {mode === "add" ? "Create New Article" : "Edit Article"}
        </Typography>
        <Typography variant="body1" sx={{ textAlign: "center", mt: 1 }}>
          {mode === "add"
            ? "Share your story with the world"
            : "Update your article content"}
        </Typography>
      </Box>

      <Box sx={{ mt: 4, maxWidth: "sm", mx: "auto" }}>
        <Box sx={{ p: 4, borderRadius: 2 }} boxShadow={1}>
          <Stack
            component="form"
            spacing={2}
            onSubmit={handleSubmit(handlePosts)}
          >
            {/* Title Field */}
            <Box position={"relative"}>
              <Typography
                variant="body1"
                htmlFor="outlined-basic"
                component={"label"}
              >
                Article Title
              </Typography>

              <TextField
                error={!!errors.title}
                id="outlined-basic"
                // label="Title"
                fullWidth
                size="small"
                color="black"
                name="Title"
                sx={{ mt: 1, borderRadius: 2, boxShadow: 1 }}
                placeholder="the title of your article"
                {...register("title", newPost.title)}
              />
              <Collapse in={!!errors.title} sx={{ mb: 1 }}>
                <Typography
                  sx={{
                    color: "error.main",
                    fontSize: "0.875rem",
                    fontWeight: "none",
                    position: "absolute",
                    textTransform: "lowercase",
                  }}
                >
                  {errors.title?.message}
                </Typography>
              </Collapse>
            </Box>

            {/* Image URL Field */}
            <Box sx={{ my: 2 }} position={"relative"}>
              <Typography
                htmlFor="url"
                variant="body1"
                component={"label"}
                sx={{ my: 1 }}
              >
                Article Image
              </Typography>
              <TextField
                error={!!errors.url}
                id="url"
                name="url"
                type="file"
                size="small"
                fullWidth
                color="black"
                accept="image/*"
                sx={{ mt: 1, borderRadius: 2, boxShadow: 1 }}
                // {...register("url", newPost.url)}
                required={mode === "add"}
                onChange={(e) => setSelectedFile(e.target.files[0])}
              />
              <Collapse in={!!errors.url} sx={{ mb: 1 }}>
                <Typography
                  sx={{
                    color: "error.main",
                    fontSize: "0.875rem",
                    fontWeight: "none",
                    position: "absolute",
                    textTransform: "lowercase",
                  }}
                >
                  {errors.url?.message}
                </Typography>
              </Collapse>
            </Box>

            {/* Content Field */}
            <Box>
              <Typography
                component={"label"}
                htmlFor="content"
                className="block text-sm font-medium text-gray-700"
                sx={{ my: 1 }}
              >
                Article Content
              </Typography>
              <Box sx={{ mt: 1 }}>
                <TextareaAutosize
                  id="content"
                  name="content"
                  minRows={4}
                  style={{ width: "100%" }}
                  placeholder="Write your article content here. Share your thoughts, insights, and stories..."
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm resize-vertical"
                  {...register("content", newPost.content)}
                />
                <Collapse in={!!errors.content} sx={{ mb: 1 }}>
                  <Typography
                    sx={{
                      color: "error.main",
                      fontSize: "0.875rem",
                      fontWeight: "none",
                      position: "absolute",
                      textTransform: "lowercase",
                    }}
                  >
                    {errors.content?.message}
                  </Typography>
                </Collapse>
                <Typography sx={{ mt: 3, fontSize: "0.875rem", color: "gray" }}>
                  Write between 10-100 characters to give readers a preview of
                  your article
                </Typography>
              </Box>
            </Box>

            {/* Action Buttons */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Button
                type="button"
                onClick={() => navigate("/post")}
                variant="outlined"
                fullWidth
                sx={{
                  py: 1.5,
                  px: 3,
                  borderRadius: "50px",
                  textTransform: "none",
                  fontWeight: 500,
                  fontSize: "0.875rem",
                  color: "text.secondary",
                  borderColor: "grey.300",
                  backgroundColor: "white",
                  "&:hover": {
                    backgroundColor: "grey.50",
                    borderColor: "grey.400",
                  },
                  "&:focus": {
                    outline: "2px solid black",
                    outlineOffset: "2px",
                  },
                }}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                startIcon={
                  mode === "add" ? (
                    <AddIcon sx={{ width: 16, height: 16 }} />
                  ) : (
                    <CheckIcon sx={{ width: 16, height: 16 }} />
                  )
                }
                sx={{
                  py: 1.5,
                  px: 3,
                  borderRadius: "50px",
                  textTransform: "none",
                  fontWeight: 500,
                  fontSize: "0.875rem",
                  backgroundColor: "black",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "grey.800",
                  },
                  "&:focus": {
                    outline: "2px solid black",
                    outlineOffset: "2px",
                  },
                }}
              >
                {mode === "add" ? "Create Article" : "Update Article"}
              </Button>
            </Box>
          </Stack>

          {/* Preview Section */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Writing Tips
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <svg
                    className="w-4 h-4 text-green-500 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Use a clear, descriptive title</span>
                </div>
                <div className="flex items-start space-x-2">
                  <svg
                    className="w-4 h-4 text-green-500 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Choose high-quality images</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <svg
                    className="w-4 h-4 text-green-500 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Write engaging content</span>
                </div>
                <div className="flex items-start space-x-2">
                  <svg
                    className="w-4 h-4 text-green-500 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Keep it concise and clear</span>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Box>
    </Box>
  );
}
