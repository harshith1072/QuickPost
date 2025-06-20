import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import { Box, Typography } from "@mui/material";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  // Fetch all blogs
  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/blog/all-blog");
      if (data?.success) {
        setBlogs(data.blogs);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        paddingY: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {blogs && blogs.length > 0 ? (
        blogs.map((blog) => {
          const dateOnly = new Date(blog.createdAt).toISOString().split("T")[0];
          return (
            <Box key={blog._id} sx={{ marginBottom: 4, width: "100%" }}>
              <BlogCard
                id={blog._id}
                isUser={localStorage.getItem("userId") === blog?.user?._id}
                title={blog.title}
                description={blog.description}
                image={blog.image}
                username={blog.user?.username || "Unknown"}
                time={dateOnly}
              />
            </Box>
          );
        })
      ) : (
        <Typography
          variant="h5"
          sx={{ marginTop: "50px", color: "#888", fontWeight: 500 }}
        >
          No blogs found. Be the first to post!
        </Typography>
      )}
    </Box>
  );
};

export default Blogs;
