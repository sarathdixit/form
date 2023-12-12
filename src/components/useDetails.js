import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { updateUser } from "../features/userSlice";

const UserDetailsSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  phone: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

const UserDetails = ({ handleNext }) => {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{ firstName: "", lastName: "", phone: "", email: "" }}
      validationSchema={UserDetailsSchema}
      onSubmit={(values) => {
        dispatch(updateUser({ ...values }));
        handleNext();
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <Field
            as={TextField}
            name="firstName"
            label="First Name"
            helperText={touched.firstName && errors.firstName}
            error={touched.firstName && Boolean(errors.firstName)}
          />
          <Field
            as={TextField}
            name="lastName"
            label="Last Name"
            helperText={touched.lastName && errors.lastName}
            error={touched.lastName && Boolean(errors.lastName)}
          />
          <Field
            as={TextField}
            name="phone"
            label="Phone"
            helperText={touched.phone && errors.phone}
            error={touched.phone && Boolean(errors.phone)}
          />
          <Field
            as={TextField}
            name="email"
            label="Email"
            helperText={touched.email && errors.email}
            error={touched.email && Boolean(errors.email)}
          />
          <Button type="submit">Next</Button>
        </Form>
      )}
    </Formik>
  );
};

export default UserDetails;
