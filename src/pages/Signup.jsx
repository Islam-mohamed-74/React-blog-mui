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
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const handelRegister = (data) => {
    const createUser = async () => {
      try {
        const user = await axios.post("http://localhost:3000/register", data);
        console.log(user.data);
        toast.success("User created successfully");
        navigate("/login");
      } catch (error) {
        toast.error(error.response.data);
      }
    };
    createUser();
  };

  const handelErrors = (errors) => {
    console.error(errors);
  };

  const registerOptions = {
    name: {
      required: "Name is required",
      minLength: { value: 3, message: "Name must have at least 3 characters" },
    },
    email: {
      required: "Email is required",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "invalid email address",
      },
    },
    password: {
      required: "Password is required",
      minLength: {
        value: 6,
        message: "Password must have at least 6 characters",
      },
    },
    terms: { required: "You must accept the terms and conditions" },
  };

  // mui

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
            height: 500,
          },
        }}
      >
        <Paper elevation={3} sx={{ width: "auto !important" }}>
          <Container>
            <Typography variant="h4" sx={{ fontWeight: "bold", my: 5 }}>
              Signup
            </Typography>
            <Stack
              component={"form"}
              spacing={4}
              onSubmit={handleSubmit(handelRegister, handelErrors)}
            >
              <Box position={"relative"}>
                <TextField
                  error={!!errors.name}
                  id="outlined-basic"
                  label="full name"
                  variant="outlined"
                  fullWidth
                  size="small"
                  color="black"
                  {...register("name", registerOptions.name)}
                />

                <Collapse in={!!errors.name}>
                  <Typography
                    sx={{
                      color: "red",
                      fontSize: "0.875rem",
                      position: "absolute",
                    }}
                  >
                    {errors.name?.message}
                  </Typography>
                </Collapse>
              </Box>
              <Box position={"relative"}>
                <TextField
                  error={!!errors.email}
                  id="outlined-basic"
                  label="email"
                  variant="outlined"
                  fullWidth
                  size="small"
                  color="black"
                  {...register("email", registerOptions.email)}
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
                  {...register("password", registerOptions.password)}
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
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <FormControlLabel
                  control={<Checkbox color="black" defaultChecked />}
                  label="I accept the terms and conditions"
                />
              </Box>
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
                Create account
              </Button>
            </Stack>
          </Container>
        </Paper>
      </Box>
    </Box>
  );
}
