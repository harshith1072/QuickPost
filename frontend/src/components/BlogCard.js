import * as React from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Avatar,
  Typography,
  Box,
  IconButton,
  Grid,
} from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { deepPurple } from "@mui/material/colors";

export default function BlogCard({
  title,
  description,
  image,
  username,
  time,
  id,
  isUser,
  onDelete, // NEW prop
}) {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/blog-details/${id}`);
  };

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`http://localhost:8080/api/v1/blog/delete-blog/${id}`);
      if (data?.success) {
        alert("Blog Deleted");
        if (onDelete) onDelete(id); // ✅ Trigger deletion in parent
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        paddingY: 4,
        minHeight: "100vh",
      }}
    >
      <Card
        sx={{
          width: { xs: "95%", sm: "85%", md: "70%", lg: "50%" },
          margin: "20px auto",
          padding: 2,
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
          transition: "0.3s",
          ":hover": {
            boxShadow: "0 10px 24px rgba(0,0,0,0.1)",
          },
        }}
      >
        {isUser && (
          <Box display="flex">
            <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
              <ModeEditIcon sx={{ color: "#6c5ce7" }} />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteIcon sx={{ color: "#d63031" }} />
            </IconButton>
          </Box>
        )}

        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <CardHeader
              avatar={
                <Avatar
                  sx={{
                    bgcolor: deepPurple[300],
                    color: "#4b0082",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                  }}
                >
                  {username?.charAt(0)}
                </Avatar>
              }
              title={
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: "18px",
                    color: "#4b0082",
                  }}
                >
                  {username}
                </Typography>
              }
              subheader={
                <Typography sx={{ fontSize: "13px", color: "#888" }}>
                  {time}
                </Typography>
              }
            />
            <CardContent>
              <Typography
                variant="h6"
                color="#333"
                sx={{ fontWeight: 600, mb: 1 }}
              >
                {title}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                component="div"
                sx={{
                  whiteSpace: "pre-line",
                  lineHeight: 1.6,
                  fontSize: "15px",
                }}
                dangerouslySetInnerHTML={{
                  __html: description.replace(/\n/g, "<br />"),
                }}
              />
            </CardContent>
          </Grid>

          <Grid item xs={12} md={4}>
            <CardMedia
              component="img"
              height="100%"
              image={image}
              alt="Blog Image"
              sx={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
                borderRadius: "12px",
              }}
            />
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}
