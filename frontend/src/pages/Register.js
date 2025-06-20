import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
import toast from "react-hot-toast";
import axios from "axios";
 import server from "./environment";
const Register = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   try {
  const { data } = await axios.post(
    `${server}/api/v1/user/register`,
    {
      username: inputs.name,
      email: inputs.email,
      password: inputs.password,
    },
    { withCredentials: true }
  );
      if (data.success) {
        toast.success("User registered successfully!");
        navigate("/login");
      } else {
        toast.error(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 5,
      }}
    >
      <form onSubmit={handleSubmit}>
        <Box
          width="420px"
          display="flex"
          flexDirection="column"
          alignItems="center"
          bgcolor="white"
          borderRadius="12px"
          boxShadow="0 8px 24px rgba(0,0,0,0.1)"
          px={4}
          py={5}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            color="#5e35b1"
            gutterBottom
          >
            Register
          </Typography>

          <TextField
            placeholder="Name"
            value={inputs.name}
            onChange={handleChange}
            name="name"
            margin="normal"
            fullWidth
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: "10px",
              },
            }}
          />
          <TextField
            placeholder="Email"
            value={inputs.email}
            onChange={handleChange}
            name="email"
            margin="normal"
            type="email"
            fullWidth
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: "10px",
              },
            }}
          />
          <TextField
            placeholder="Password"
            value={inputs.password}
            onChange={handleChange}
            name="password"
            margin="normal"
            type="password"
            fullWidth
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: "10px",
              },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              background: "linear-gradient(45deg, #7e57c2, #b39ddb)",
              color: "white",
              fontWeight: "bold",
              borderRadius: "10px",
              textTransform: "uppercase",
              letterSpacing: "1px",
              "&:hover": {
                background: "linear-gradient(45deg, #6a1b9a, #9575cd)",
              },
            }}
          >
            Submit
          </Button>

          <Button
            onClick={() => navigate("/login")}
            sx={{
              mt: 2,
              fontSize: "14px",
              color: "#5e35b1",
              textTransform: "none",
            }}
          >
            Already Registered? Please Login
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Register;
