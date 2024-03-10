import React from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  Box,
  Link,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
// Define a validation schema using Yup for the Login form
const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});

const Login = () => {
  const navigate = useNavigate();
  const { isLoggedIn, login } = useAuth();
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(
        "http://localhost:5001/api/login",
        values,
        { withCredentials: true }
      );

      if (response.status === 200) {
        login();
        localStorage.setItem("_id", response.data._id);
        localStorage.setItem("username", response.data.username);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(
        "Login failed:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    fullWidth
                    variant="outlined"
                    label="Username"
                    name="username"
                    error={errors.username && touched.username}
                    helperText={
                      errors.username && touched.username && errors.username
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    fullWidth
                    variant="outlined"
                    label="Password"
                    name="password"
                    type="password"
                    error={errors.password && touched.password}
                    helperText={
                      errors.password && touched.password && errors.password
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="inherit"
                    fullWidth
                    disabled={isSubmitting}
                  >
                    Login
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2">
                    Not a user?{" "}
                    <Link component={RouterLink} to="/signup">
                      Sign up
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Container>
    </Box>
  );
};

export default Login;
