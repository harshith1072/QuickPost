import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import toast from "react-hot-toast";
 import server from "./environment";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
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
  const { data } = await axios.post(`${server}/api/v1/user/login`, {
    email: inputs.email,
    password: inputs.password,
  });

      if (data.success) {
        localStorage.setItem("userId", data?.user._id);
        dispatch(authActions.login());
        toast.success("User login successful!");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error("Login failed. Please check your credentials.");
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
            Login
          </Typography>

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
            onClick={() => navigate("/register")}
            sx={{
              mt: 2,
              fontSize: "14px",
              color: "#5e35b1",
              textTransform: "none",
            }}
          >
            Not a user? Please Register
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Login;
