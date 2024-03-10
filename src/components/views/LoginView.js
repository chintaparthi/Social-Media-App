// Import React and other necessary modules
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../api/users";
import { loginUser } from "../../helpers/authHelper";
import ErrorAlert from "../ErrorAlert";
import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import InstagramImage from "../../assets/instagram_image.png";
import { Card } from "@mui/material";
import "./LoginView.css"; // Import CSS file

// Define the LoginView component
const LoginView = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [serverError, setServerError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await login(formData);
    if (data.error) {
      setServerError(data.error);
    } else {
      loginUser(data);
      navigate("/");
    }
  };

  return (
    <Container maxWidth="sm">
      <Grid container spacing={3}>
        {/* Left Column: Image */}
        <Grid item xs={12} sm={6}>
          <img src={InstagramImage} alt="Instagram" style={{ width: "100%" }} />
        </Grid>
        {/* Right Column: Login Form */}
        <Grid item xs={12} sm={6}>
          <Box p={2} className="form-container"> {/* Add className */}
            <Typography variant="h4" align="center" gutterBottom>
              Welcome to Instachat
            </Typography>
            <Box mt={2} mb={2} textAlign="center">
            </Box>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Phone number, username, or email"
                fullWidth
                margin="normal"
                autoComplete="email"
                autoFocus
                required
                id="email"
                name="email"
                onChange={handleChange}
              />
              <TextField
                label="Password"
                fullWidth
                required
                margin="normal"
                id="password"
                name="password"
                onChange={handleChange}
                type="password"
              />
              <ErrorAlert error={serverError} />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
                Log In
              </Button>
            </form>
            <Box mt={2} mb={2} textAlign="center">
              <Typography variant="body2" color="textSecondary">
                Forgot your password?
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Box mt={2} textAlign="center">
        <Typography variant="body2" color="textSecondary">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default LoginView;