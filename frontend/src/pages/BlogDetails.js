import React, { useEffect, useState, useCallback } from 'react';
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";

const BlogDetails = () => {
  const [blog, setBlog] = useState({});
  const id = useParams().id;
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});

  const getBlogDetail = useCallback(async () => {
    try {
      const { data } = await axios.get(`http://localhost:8080/api/v1/blog/get-blog/${id}`);
      if (data?.success) {
        setBlog(data.blog);
        setInputs({
          title: data.blog.title,
          description: data.blog.description,
          image: data.blog.image,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  useEffect(() => {
    getBlogDetail();
  }, [getBlogDetail]);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`http://localhost:8080/api/v1/blog/update-blog/${id}`, {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: id,
      });
      if (data?.success) {
        toast.success("Blog Updated");
        navigate("/my-blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && event.shiftKey) {
      event.preventDefault();
      const { selectionStart, selectionEnd, value } = event.target;
      const newValue = value.substring(0, selectionStart) + '\n' + value.substring(selectionEnd);
      handleChange({
        target: {
          name: event.target.name,
          value: newValue,
        },
      });
    }
  };

  return (
    <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh", py: 5 }}>
      <form onSubmit={handleSubmit}>
        <Box
          width={{ xs: "90%", sm: "80%", md: "60%", lg: "45%" }}
          bgcolor="#fff"
          borderRadius="16px"
          padding={5}
          margin="auto"
          boxShadow="0 8px 20px rgba(0,0,0,0.08)"
          display="flex"
          flexDirection="column"
        >
          <Typography
            variant="h3"
            textAlign="center"
            fontWeight="bold"
            color="#8a2be2"
            fontFamily="Segoe UI, sans-serif"
            mb={3}
          >
            Update Post
          </Typography>

          <InputLabel sx={{ fontSize: "18px", fontWeight: "600", color: "#4b0082", mt: 2 }}>
            Title
          </InputLabel>
          <TextField
            name="title"
            value={inputs.title}
            onChange={handleChange}
            variant="outlined"
            required
            sx={{
              mt: 1,
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#d0bfff" },
                "&:hover fieldset": { borderColor: "#8a2be2" },
                "&.Mui-focused fieldset": { borderColor: "#8a2be2" },
              },
            }}
          />

          <InputLabel sx={{ fontSize: "18px", fontWeight: "600", color: "#4b0082", mt: 3 }}>
            Description
          </InputLabel>
          <TextField
            name="description"
            value={inputs.description}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            variant="outlined"
            required
            multiline
            minRows={4}
            fullWidth
            sx={{
              mt: 1,
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#d0bfff" },
                "&:hover fieldset": { borderColor: "#8a2be2" },
                "&.Mui-focused fieldset": { borderColor: "#8a2be2" },
              },
            }}
          />

          <InputLabel sx={{ fontSize: "18px", fontWeight: "600", color: "#4b0082", mt: 3 }}>
            Image URL
          </InputLabel>
          <TextField
            name="image"
            value={inputs.image}
            onChange={handleChange}
            variant="outlined"
            required
            sx={{
              mt: 1,
              mb: 3,
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#d0bfff" },
                "&:hover fieldset": { borderColor: "#8a2be2" },
                "&.Mui-focused fieldset": { borderColor: "#8a2be2" },
              },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 3,
              py: 1.5,
              background: "linear-gradient(to right, #f6d365, #fda085)",
              color: "#4b0082",
              fontWeight: "bold",
              fontSize: "16px",
              borderRadius: "12px",
              letterSpacing: "1px",
              "&:hover": {
                background: "linear-gradient(to right, #fda085, #f6d365)",
              },
            }}
          >
            UPDATE
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default BlogDetails;
