import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import toast from "react-hot-toast";

const Header = () => {
  let isLogin = useSelector((state) => state.isLogin);
  isLogin = isLogin || localStorage.getItem("userId");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [value, setValue] = useState();

  const handleLogout = () => {
    try {
      dispatch(authActions.logout());
      toast.success("Logout Successfully");
      navigate("/login");
      localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          background: "linear-gradient(to right, #ffecd2, #fcb69f)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <Toolbar>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: "#4b0082",
              fontFamily: "Segoe UI, sans-serif",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            QuickPost
          </Typography>
          {isLogin && (
            <Box display={"flex"} marginLeft="auto" marginRight={"auto"}>
              <Tabs
                textColor="secondary"
                indicatorColor="secondary"
                value={value}
                onChange={(e, val) => setValue(val)}
                sx={{
                  "& .MuiTab-root": {
                    fontWeight: "600",
                    fontSize: "16px",
                    color: "#4b4b4b",
                  },
                  "& .Mui-selected": {
                    color: "#8a2be2",
                  },
                }}
              >
                <Tab label="Blogs" LinkComponent={Link} to="/blogs" />
                <Tab label="My Blogs" LinkComponent={Link} to="/my-blogs" />
                <Tab label="Create BuZZ" LinkComponent={Link} to="/create-blog" />
              </Tabs>
            </Box>
          )}
          <Box display={"flex"} marginLeft="auto">
            {!isLogin && (
              <>
                <Button
                  sx={{
                    margin: 1,
                    backgroundColor: "#ffe0ac",
                    color: "#4b0082",
                    fontWeight: "bold",
                    ":hover": {
                      backgroundColor: "#ffd580",
                    },
                  }}
                  LinkComponent={Link}
                  to="/login"
                >
                  Login
                </Button>
                <Button
                  sx={{
                    margin: 1,
                    backgroundColor: "#ffb6b9",
                    color: "#4b0082",
                    fontWeight: "bold",
                    ":hover": {
                      backgroundColor: "#ffa1a4",
                    },
                  }}
                  LinkComponent={Link}
                  to="/register"
                >
                  Register
                </Button>
              </>
            )}
            {isLogin && (
              <Button
                onClick={handleLogout}
                sx={{
                  margin: 1,
                  backgroundColor: "#b2f7ef",
                  color: "#4b0082",
                  fontWeight: "bold",
                  ":hover": {
                    backgroundColor: "#90f0e8",
                  },
                }}
              >
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
