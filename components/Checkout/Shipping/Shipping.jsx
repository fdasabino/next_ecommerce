import Button from "@/components/Layout/Button/Button";
import ShippingInput from "@/components/Layout/Input/ShippingInput";
import SingleSelectInput from "@/components/Layout/Select/SingleSelectInput";
import { countries } from "@/data/countries";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Form, Formik, useField } from "formik";
import React, { useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
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
      .matches(/^\+?[0-9]+$/, "Invalid phone number format")
      .required("Phone number is required"),
    state: Yup.string().required("State/province is required"),
    city: Yup.string().required("City is required"),
    zipCode: Yup.string()
      .matches(
        /^[0-9]{5}(?:-[0-9]{4})?$|^(?:(?:[A-PR-UWYZa-pr-uwyz][0-9][0-9A-HJKP-Za-hjkp-z]?)\s?[0-9][ABD-HJLNP-UW-Zabd-hjlnp-uw-z]{2}|GIR\s?0AA)$/i,
        "Invalid zip code format"
      )
      .required("Zip code is required"),

    address1: Yup.string().required("Address line 1 is required"),
    address2: Yup.string(),
    country: Yup.string().required("Country is required"),
  });

  return (
    <div className={styles.shipping}>
      <h2>Shipping address</h2>

      <Formik enableReinitialize initialValues={newAddress} validationSchema={validateAddress}>
        {(form) => (
          <Form>
            <p>
              <AiOutlineArrowRight /> Start by entering your details
            </p>
            <SingleSelectInput
              name="country"
              value={newAddress.country}
              placeholder="Select country *"
              onChange={handleChange}
              data={countries}
            />
            <ShippingInput
              type="text"
              icon="firstName"
              name="firstName"
              placeholder="First name *"
              onChange={handleChange}
            />
            <ShippingInput
              type="text"
              icon="lastName"
              name="lastName"
              placeholder="Last name *"
              onChange={handleChange}
            />
            <ShippingInput
              type="number"
              icon="phoneNumber"
              name="phoneNumber"
              placeholder="Phone including area code *"
              onChange={handleChange}
            />
            <ShippingInput
              disabled={!newAddress.country}
              type="text"
              icon="state"
              name="state"
              placeholder="State/province *"
              onChange={handleChange}
            />
            <ShippingInput
              disabled={!newAddress.country}
              type="text"
              icon="city"
              name="city"
              placeholder="City *"
              onChange={handleChange}
            />
            <ShippingInput
              disabled={!newAddress.country}
              type="text"
              icon="zipCode"
              name="zipCode"
              placeholder="Zip-code/postcode *"
              onChange={handleChange}
            />
            <ShippingInput
              disabled={!newAddress.country}
              type="text"
              icon="address1"
              name="address1"
              placeholder="Address *"
              onChange={handleChange}
            />
            <ShippingInput
              disabled={!newAddress.country}
              type="text"
              icon="address2"
              name="address2"
              placeholder="Apartment, etc. (optional)"
              onChange={handleChange}
            />
            <Button style="primary" type="submit">
              Save address
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Shipping;
