import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import Autocomplete from "react-google-autocomplete";
import { updateAddress } from "../features/userSlice";

const AddressSchema = Yup.object().shape({
  line1: Yup.string().required("Required"),
  line2: Yup.string(),
  city: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
  country: Yup.string().required("Required"),
  pincode: Yup.string().required("Required"),
});

const AddressDetails = ({ handleNext, handleBack }) => {
  const dispatch = useDispatch();

  const handlePlaceSelected = (place, setFieldValue) => {
    const addressComponents = place.address_components;
    const addressMap = {
      street_number: "short_name",
      route: "long_name",
      locality: "long_name",
      administrative_area_level_1: "short_name",
      country: "long_name",
      postal_code: "short_name",
    };

    let line1 = "";
    let city = "";
    let state = "";
    let country = "";
    let pincode = "";

    addressComponents.forEach((component) => {
      const addressType = component.types[0];
      if (addressMap[addressType]) {
        const val = component[addressMap[addressType]];
        switch (addressType) {
          case "street_number":
            line1 = `${val} `;
            break;
          case "route":
            line1 += val;
            break;
          case "locality":
            city = val;
            break;
          case "administrative_area_level_1":
            state = val;
            break;
          case "country":
            country = val;
            break;
          case "postal_code":
            pincode = val;
            break;
          default:
            break;
        }
      }
    });

    setFieldValue("line1", line1);
    setFieldValue("city", city);
    setFieldValue("state", state);
    setFieldValue("country", country);
    setFieldValue("pincode", pincode);
  };

  return (
    <Formik
      initialValues={{
        line1: "",
        line2: "",
        city: "",
        state: "",
        country: "",
        pincode: "",
      }}
      validationSchema={AddressSchema}
      onSubmit={(values) => {
        dispatch(updateAddress({ ...values }));
        handleNext();
      }}
    >
      {({ errors, touched, setFieldValue }) => (
        <Form>
          <Autocomplete
            apiKey="YOUR_GOOGLE_MAPS_API_KEY"
            onPlaceSelected={(place) =>
              handlePlaceSelected(place, setFieldValue)
            }
            fields={["address_components", "formatted_address"]}
          />
          <Field
            as={TextField}
            name="line1"
            label="Address Line 1"
            helperText={touched.line1 && errors.line1}
            error={touched.line1 && Boolean(errors.line1)}
          />
          <Field
            as={TextField}
            name="line2"
            label="Address Line 2"
            helperText={touched.line2 && errors.line2}
            error={touched.line2 && Boolean(errors.line2)}
          />
          <Field
            as={TextField}
            name="city"
            label="City"
            helperText={touched.city && errors.city}
            error={touched.city && Boolean(errors.city)}
          />
          <Field
            as={TextField}
            name="state"
            label="State"
            helperText={touched.state && errors.state}
            error={touched.state && Boolean(errors.state)}
          />
          <Field
            as={TextField}
            name="country"
            label="Country"
            helperText={touched.country && errors.country}
            error={touched.country && Boolean(errors.country)}
          />
          <Field
            as={TextField}
            name="pincode"
            label="Pincode"
            helperText={touched.pincode && errors.pincode}
            error={touched.pincode && Boolean(errors.pincode)}
          />
          <Button onClick={handleBack}>Back</Button>
          <Button type="submit">Next</Button>
        </Form>
      )}
    </Formik>
  );
};

export default AddressDetails;
