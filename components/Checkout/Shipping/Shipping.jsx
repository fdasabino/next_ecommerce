import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { AiOutlineArrowDown, AiOutlineArrowRight, AiOutlineArrowUp } from "react-icons/ai";
import { FaCheck, FaIdBadge, FaPhoneAlt, FaPlus, FaTimes, FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";

import Button from "@/components/Layout/Button/Button";
import ShippingInput from "@/components/Layout/Input/ShippingInput";
import SingleSelectInput from "@/components/Layout/Select/SingleSelectInput";
import { countries } from "@/data/countries";
import { deleteAddressFromDb } from "@/utils/deleteAddressFromDb";
import { saveAddress } from "@/utils/saveAddressToDb";

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

const Shipping = ({ selectedAddress, setSelectedAddress, user }) => {
  const [addresses, setAddresses] = useState(user?.address || []);
  const [newAddress, setNewAddress] = useState(initialValues);
  const [showForm, setShowForm] = useState(false);
  const country = useSelector((state) => state.country);

  useEffect(() => {
    setAddresses(user?.address || []);
    setSelectedAddress(user?.address[0]);
  }, [user.address, setSelectedAddress]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleDelete = async (addressId, userId) => {
    try {
      const res = await deleteAddressFromDb(addressId, userId);

      if (res && res.ok) {
        setAddresses((prevAddresses) => prevAddresses.filter((item) => item._id !== addressId));
        toast.success(res.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };

  const handleSubmit = async () => {
    const res = await saveAddress(newAddress, user?._id);

    if (res && res.addressFound === true) {
      toast.info("Address already exists, please select it from the list above");
      return;
    }

    if (res && res.ok) {
      const newAddressList = [...addresses, res.address];
      setAddresses(newAddressList);
      setNewAddress(initialValues);
      setShowForm(false);
      setSelectedAddress(res.address);
      toast.success("Address saved successfully");
    }
  };

  const isCountrySelected = !!newAddress.country;

  return (
    <div className={styles.shipping}>
      <div className={styles.shipping_header}>
        <h2>Shipping address</h2>
        <p>Add address or select an existing one from the list below</p>
      </div>
      <div className={styles.addresses}>
        {addresses.length > 0 ? (
          addresses.map((item, i) => {
            const {
              _id,
              firstName,
              lastName,
              phoneNumber,
              state,
              city,
              zipCode,
              address1,
              address2,
            } = item;

            const formattedPhoneNumber =
              country.name === item.country
                ? `(+${country.calling_code})${phoneNumber}`
                : phoneNumber;

            return (
              <div
                key={_id || i}
                className={`${styles.address} ${selectedAddress?._id === _id && styles.selected}`}
              >
                <div className={styles.ctas}>
                  <div className={styles.check}>
                    <FaCheck
                      className={`${styles.check_icon} ${
                        selectedAddress._id === item._id ? styles.green : styles.black
                      }`}
                      onClick={() => setSelectedAddress(item)}
                    />
                    {selectedAddress._id === item._id && <small>Selected address</small>}
                  </div>

                  {selectedAddress._id !== item._id && (
                    <FaTrash
                      className={styles.delete}
                      onClick={() => handleDelete(item._id, user?._id)}
                    />
                  )}
                </div>
                <div className={styles.row}>
                  <hr />
                  <p>
                    <FaIdBadge /> {firstName} {lastName}
                  </p>
                  <p>
                    <FaPhoneAlt />
                    {formattedPhoneNumber}
                  </p>
                  <hr />
                  <p>
                    {address1}, {state}, {city}, {zipCode} {item.country} {address2 ? address2 : ""}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <p>You don&apos;t have any saved addresses</p>
        )}
        <Button style={showForm ? "danger" : "primary"} onClick={() => setShowForm(!showForm)}>
          {showForm ? <FaTimes /> : <FaPlus />}
        </Button>
      </div>
      {showForm && (
        <div className={styles.forms}>
          <Formik
            enableReinitialize
            initialValues={newAddress}
            validationSchema={validateAddress}
            onSubmit={handleSubmit}
          >
            {(form) => (
              <Form>
                <p>
                  <AiOutlineArrowRight /> Start by selecting your country
                </p>
                <SingleSelectInput
                  name="country"
                  value={newAddress.country}
                  placeholder="Select country *"
                  onChange={handleChange}
                  data={countries}
                />
                {!isCountrySelected ? (
                  <p>
                    <AiOutlineArrowUp /> Select a country
                  </p>
                ) : (
                  <p>
                    <AiOutlineArrowDown /> Fill in your address details
                  </p>
                )}
                <div className={styles.row}>
                  <ShippingInput
                    disabled={!isCountrySelected}
                    type="text"
                    icon="firstName"
                    name="firstName"
                    placeholder="First name *"
                    onChange={handleChange}
                  />
                  <ShippingInput
                    disabled={!isCountrySelected}
                    type="text"
                    icon="lastName"
                    name="lastName"
                    placeholder="Last name *"
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.row}>
                  <ShippingInput
                    disabled={!isCountrySelected}
                    type="text"
                    icon="phoneNumber"
                    name="phoneNumber"
                    min="0"
                    placeholder="Phone including area code *"
                    onChange={handleChange}
                  />
                  <ShippingInput
                    disabled={!isCountrySelected}
                    type="text"
                    icon="address1"
                    name="address1"
                    placeholder="Address *"
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.row}>
                  <ShippingInput
                    disabled={!isCountrySelected}
                    type="text"
                    icon="state"
                    name="state"
                    placeholder="State/province *"
                    onChange={handleChange}
                  />
                  <ShippingInput
                    disabled={!isCountrySelected}
                    type="text"
                    icon="city"
                    name="city"
                    placeholder="City *"
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.row}>
                  <ShippingInput
                    disabled={!isCountrySelected}
                    type="text"
                    icon="zipCode"
                    name="zipCode"
                    placeholder="Zip-code/postcode *"
                    onChange={handleChange}
                  />
                  <ShippingInput
                    disabled={!isCountrySelected}
                    type="text"
                    icon="address2"
                    name="address2"
                    placeholder="Apartment, etc. (optional)"
                    onChange={handleChange}
                  />
                </div>
                <Button style="primary" type="submit" disabled={!isCountrySelected}>
                  Save address
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
};

export default Shipping;
