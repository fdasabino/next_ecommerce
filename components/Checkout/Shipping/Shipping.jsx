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
  const { firstName, lastName, phoneNumber, state, city, zipCode, address1, address2, country } =
    newAddress;

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
      .matches(/^[0-9]{5}(?:-[0-9]{4})?$/, "Invalid zip code format") // Matches "12345" and "12345-6789" formats
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
            <ShippingInput type="text" icon="firstName" name="firstName" placeholder="First name" />
            <ShippingInput type="text" icon="lastName" name="lastName" placeholder="Last name" />
            <ShippingInput
              type="number"
              icon="phoneNumber"
              name="phoneNumber"
              placeholder="Phone including area code"
            />
            <ShippingInput type="text" icon="state" name="state" placeholder="State/province" />
            <ShippingInput type="text" icon="city" name="city" placeholder="City" />
            <ShippingInput
              type="text"
              icon="zipCode"
              name="zipCode"
              placeholder="Zipcode/postcode"
            />
            <ShippingInput type="text" icon="address1" name="address1" placeholder="Address" />
            <ShippingInput type="text" icon="address2" name="address2" placeholder="Address 2" />
            <ShippingInput type="text" icon="country" name="country" placeholder="Country" />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Shipping;
