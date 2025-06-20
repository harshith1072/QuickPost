import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import { Box, Typography } from "@mui/material";
 import server from "./environment";
const UserBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  const getUserBlogs = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

     const { data } = await axios.get(`${server}/api/v1/blog/user-blog/${userId}`);
      if (data?.success) {
        setBlogs(data.userBlog.blogs);
      }
    } catch (error) {
      console.error("Error fetching user blogs:", error);
    }
  };

  useEffect(() => {
    getUserBlogs();
  }, []);

  const handleDeleteFromUI = (deletedId) => {
    setBlogs((prev) => prev.filter((blog) => blog._id !== deletedId));
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        py: 5,
        px: 2,
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
                isUser={true}
                title={blog.title}
                description={blog.description}
                image={blog.image}
                username={blog.user?.username || "Unknown"}
                time={dateOnly}
                onDelete={handleDeleteFromUI}
              />
            </Box>
          );
        })
      ) : (
        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            marginTop: "60px",
            color: "#888",
            fontWeight: 500,
          }}
        >
          You have no posts — create a BuZZ 🐝
        </Typography>
      )}
    </Box>
  );
};

export default UserBlogs;
