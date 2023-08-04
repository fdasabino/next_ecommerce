import ShippingInput from "@/components/Layout/Input/ShippingInput";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import styles from "./Shipping.module.scss";

const initialValues = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  state: "",
  city: "",
  zipCode: "",
  address1: "",
  address2: "",
  country: "",
};

const Shipping = ({ selectedAddress, setSelectedAddress, user }) => {
  const [address, setAddress] = useState(user?.addresses || []);
  const [newAddress, setNewAddress] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAddress({ ...newAddress, [name]: value });
    console.log(name, value);
  };

  const validateAddress = Yup.object().shape({
    firstName: Yup.string()
      .min(3, "First name must be at least 3 characters long")
      .max(20, "First name must not exceed 20 characters")
      .required("First name is required"),
    lastName: Yup.string()
      .min(3, "Last name must be at least 3 characters long")
      .max(20, "Last name must not exceed 20 characters")
      .required("Last name is required"),
    phoneNumber: Yup.string()
      .matches(/^\+?[0-9]+$/, "Invalid phone number format") // Allows numbers with an optional '+' sign at the beginning
      .required("Phone number is required"),
    state: Yup.string().required("State is required"),
    city: Yup.string().required("City is required"),
    zipCode: Yup.string()
      .matches(
        /^[0-9]{5}(?:-[0-9]{4})?$|^(?:(?:[A-PR-UWYZa-pr-uwyz][0-9][0-9A-HJKP-Za-hjkp-z]?)\s?[0-9][ABD-HJLNP-UW-Zabd-hjlnp-uw-z]{2}|GIR\s?0AA)$/i,
        "Invalid zip code format"
      )
      .required("Zip code is required"),

    address1: Yup.string().required("Address line 1 is required"),
    address2: Yup.string(), // Address line 2 is optional, no validation required
    country: Yup.string().required("Country is required"),
  });

  return (
    <div className={styles.shipping}>
      <Formik enableReinitialize initialValues={newAddress} validationSchema={validateAddress}>
        {(form) => (
          <Form>
            <ShippingInput
              type="text"
              icon="firstName"
              name="firstName"
              placeholder="First name"
              onChange={handleChange}
            />
            <ShippingInput
              type="text"
              icon="lastName"
              name="lastName"
              placeholder="Last name"
              onChange={handleChange}
            />
            <ShippingInput
              type="number"
              icon="phoneNumber"
              name="phoneNumber"
              placeholder="Phone including area code"
              onChange={handleChange}
            />
            <ShippingInput
              type="text"
              icon="state"
              name="state"
              placeholder="State/province"
              onChange={handleChange}
            />
            <ShippingInput
              type="text"
              icon="city"
              name="city"
              placeholder="City"
              onChange={handleChange}
            />
            <ShippingInput
              type="text"
              icon="zipCode"
              name="zipCode"
              placeholder="Zipcode/postcode"
              onChange={handleChange}
            />
            <ShippingInput
              type="text"
              icon="address1"
              name="address1"
              placeholder="Address"
              onChange={handleChange}
            />
            <ShippingInput
              type="text"
              icon="address2"
              name="address2"
              placeholder="Address 2"
              onChange={handleChange}
            />
            <ShippingInput
              type="text"
              icon="country"
              name="country"
              placeholder="Country"
              onChange={handleChange}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Shipping;
