import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import landingImage from "./Landing.png";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "90vh",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: { xs: 3, md: 12 },
        py: 6,
        backgroundColor: "#f5f5f5",
        flexWrap: "wrap",
      }}
    >
      {/* Left Section - Text */}
      <Box sx={{ maxWidth: "600px", mb: { xs: 5, md: 0 } }}>
        <Typography
          variant="h3"
          fontWeight="bold"
          color="#5e35b1"
          gutterBottom
        >
          Welcome to QuickPost 📝
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ mb: 4, lineHeight: 1.7 }}
        >
          A space where your words matter. Share ideas, stories, thoughts 
          freely and beautifully. Start creating your Buzz today!
        </Typography>

        <Box>
          <Button
            variant="contained"
            size="large"
            sx={{
              mr: 2,
              px: 4,
              background: "linear-gradient(45deg, #7e57c2, #b39ddb)",
              borderRadius: "10px",
              fontWeight: "bold",
              textTransform: "uppercase",
              "&:hover": {
                background: "linear-gradient(45deg, #6a1b9a, #9575cd)",
              },
            }}
            onClick={() => navigate("/register")}
          >
            Create Buzz
          </Button>

          <Button
            variant="outlined"
            size="large"
            sx={{
              px: 4,
              borderRadius: "10px",
              fontWeight: "bold",
              color: "#5e35b1",
              borderColor: "#5e35b1",
              textTransform: "uppercase",
              "&:hover": {
                borderColor: "#6a1b9a",
                color: "#6a1b9a",
              },
            }}
            onClick={() => navigate("/blogs")}
          >
            Explore Posts
          </Button>
        </Box>
      </Box>

      {/* Right Section - Image */}
      <Box
        component="img"
        src={landingImage}
        alt="Landing"
        sx={{
          width: { xs: "100%", sm: "80%", md: "450px" },
          maxWidth: "100%",
          borderRadius: "12px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
          objectFit: "contain",
        }}
      />
    </Box>
  );
};

export default LandingPage;
