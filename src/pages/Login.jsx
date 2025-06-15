"use client";

import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";

// mui
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import {
  Button,
  Checkbox,
  Collapse,
  Container,
  Divider,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

export default function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handelLogin = (data) => {
    const loginUser = async () => {
      try {
        const user = await axios.post("http://localhost:3000/login", data);
        console.log(user.data);
        localStorage.setItem("token", user.data.accessToken);
        toast.success("logged in successfully");
        navigate("/");
      } catch (error) {
        toast.error(error.response.data);
      }
    };
    loginUser();
  };

  const loginOptions = {
    email: { required: "Email is required" },
    password: { required: "Password is required" },
  };

  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          marginTop: 7,

          "& > :not(style)": {
            m: 1,
            width: 450,
            height: 450,
          },
        }}
      >
        <Paper elevation={3} sx={{ width: "auto !important" }}>
          <Container>
            <Typography variant="h4" sx={{ fontWeight: "bold", my: 5 }}>
              Login
            </Typography>
            <Stack
              component={"form"}
              spacing={4}
              onSubmit={handleSubmit(handelLogin)}
            >
              <Box position={"relative"}>
                <TextField
                  error={!!errors.email}
                  id="outlined-basic"
                  label="email"
                  variant="outlined"
                  fullWidth
                  size="small"
                  color="black"
                  {...register("email", loginOptions.email)}
                />

                <Collapse in={!!errors.email}>
                  <Typography
                    sx={{
                      color: "red",
                      fontSize: "0.875rem",
                      position: "absolute",
                    }}
                  >
                    {errors.email?.message}
                  </Typography>
                </Collapse>
              </Box>

              <Box position={"relative"}>
                <TextField
                  error={!!errors.password}
                  id="outlined-basic"
                  label="password"
                  variant="outlined"
                  fullWidth
                  size="small"
                  color="black"
                  type="password"
                  {...register("password", loginOptions.password)}
                />

                <Collapse in={!!errors.password}>
                  <Typography
                    sx={{
                      color: "red",
                      fontSize: "0.875rem",
                      position: "absolute",
                    }}
                  >
                    {errors.password?.message}
                  </Typography>
                </Collapse>
              </Box>

              <Box m={2}>
                <Button
                  type="submit"
                  sx={{
                    color: "white",
                    bgcolor: "black",
                    ":hover": { bgcolor: "black" },
                    marginBottom: 2,
                  }}
                  variant="contained"
                  fullWidth
                >
                  Login
                </Button>
              </Box>
            </Stack>
            <Divider>or</Divider>
            <Box m={2} sx={{ display: "flex", justifyContent: "center" }}>
              <Typography>Don't have an account? </Typography>
              <Link
                to="/register"
                className="font-medium mx-2 text-black hover:text-gray-800"
              >
                create a new account
              </Link>
            </Box>
          </Container>
        </Paper>
      </Box>
    </Box>
  );
}
