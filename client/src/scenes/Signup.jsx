import React from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

// Define a validation schema using Yup
const SignupSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  contactNumber: Yup.string().required("Required"),
  fullName: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
});

const Signup = () => {
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
          Signup
        </Typography>
        <Formik
          initialValues={{
            username: "",
            password: "",
            email: "",
            contactNumber: "",
            fullName: "",
            address: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            // Handle form submission, e.g., send to server
            setSubmitting(false); // Set submitting to false to finish the process
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form noValidate>
              <Grid container spacing={2}>
                {Object.keys(SignupSchema.fields).map((key) => (
                  <Grid item xs={12} key={key}>
                    <Field
                      as={TextField}
                     
                      fullWidth
                      variant="outlined"
                      label={key.charAt(0).toUpperCase() + key.slice(1)}
                      name={key}
                      error={errors[key] && touched[key]}
                      helperText={errors[key] && touched[key] && errors[key]}
                    />
                  </Grid>
                ))}
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="inherit"
                    fullWidth
                    disabled={isSubmitting}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Container>
    </Box>
  );
};

export default Signup;
