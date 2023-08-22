import React, { useRef, useState } from "react";

import Button from "@/components/Layout/Button/Button";
import ShippingInput from "@/components/Layout/Input/ShippingInput";
import SingleSelectInput from "@/components/Layout/Select/SingleSelectInput";
import { countries } from "@/data/countries";
import { deleteAddressFromDb } from "@/utils/deleteAddressFromDb";
import { saveAddress } from "@/utils/saveAddressToDb";
import { setAddressActive } from "@/utils/setActiveAddress";
import { Button as MuiButton, Tooltip } from "@mui/material";
import { Form, Formik } from "formik";
import Image from "next/image";
import { AiFillCheckSquare, AiOutlineArrowUp } from "react-icons/ai";
import { FaCheck, FaIdBadge, FaMapPin, FaPhoneAlt, FaPlus, FaTimes, FaTrash } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { toast } from "react-toastify";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
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

const Shipping = ({ selectedAddress, setSelectedAddress, addresses, setAddresses, user }) => {
  const [newAddress, setNewAddress] = useState(initialValues);
  const [showForm, setShowForm] = useState(false);
  const country = useSelector((state) => state.country);

  const isLarge = useMediaQuery({ query: "(max-width: 1000px)" });
  const isMedium = useMediaQuery({ query: "(max-width: 850px)" });
  const isSmall = useMediaQuery({ query: "(max-width: 600px)" });

  const swiperRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleDelete = async (addressId) => {
    try {
      const res = await deleteAddressFromDb(addressId);

      if (res && res.ok) {
        setAddresses((prevAddresses) => prevAddresses.filter((item) => item._id !== addressId));
        toast.info(res.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };

  const handleSubmit = async () => {
    const formattedPhoneNumber =
      country.name === newAddress.country
        ? `(+${country.calling_code})${newAddress.phoneNumber}`
        : newAddress.phoneNumber.startsWith("+")
        ? newAddress.phoneNumber
        : `(${country.calling_code})${newAddress.phoneNumber}`;

    const updatedAddress = { ...newAddress, phoneNumber: formattedPhoneNumber };
    const res = await saveAddress(updatedAddress);

    if (res?.addressFound === true) {
      toast.info(res.message);
      setShowForm(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (res?.ok) {
      const newAddressList = [...addresses, res.address];
      setSelectedAddress(res.address);
      setAddresses(newAddressList);
      setNewAddress(initialValues);
      setShowForm(false);

      toast.success("Address saved successfully");
      history.go(0);
    }
  };

  const handleSelectAddress = async (address) => {
    try {
      const res = await setAddressActive(address);

      // Move the selected address to the first position in the array
      const updatedAddresses = [
        res.address,
        ...addresses.filter((item) => item._id !== res.address._id),
      ];

      setAddresses(updatedAddresses);
      setSelectedAddress(res.address);
      setShowForm(false);
      toast.success(res.message);
      swiperRef.current.swiper.slideTo(0);
    } catch (error) {
      toast.error("An error occurred while setting address as active");
    }
  };

  const isCountrySelected = !!newAddress.country;

  return (
    <div className={styles.shipping}>
      <div className={styles.shipping_header}>
        <div className={styles.btn_header}>
          <h2>
            Shipping address <TbTruckDelivery />
          </h2>
          <div className={styles.header_wrapper}>
            {user?.address.length > 0 && (
              <small>Select an existing address or click + to add a new one</small>
            )}
            <Tooltip title={showForm ? "Hide fields" : "Add address"}>
              <MuiButton
                style={{
                  width: isSmall ? "100%" : "50px",
                  border: "1px solid #e7e7e7",
                }}
                color={!showForm ? "primary" : "error"}
                onClick={() => setShowForm(!showForm)}
              >
                {showForm ? <FaTimes /> : <FaPlus />}
              </MuiButton>
            </Tooltip>
          </div>
        </div>
      </div>
      {showForm && (
        <div style={showForm ? { opacity: 1 } : { opacity: 0 }} className={styles.forms}>
          <Formik
            enableReinitialize
            initialValues={newAddress}
            validationSchema={validateAddress}
            onSubmit={handleSubmit}
          >
            {(form) => (
              <Form>
                <h4>
                  <FaPlus /> Add new address
                </h4>
                <SingleSelectInput
                  name="country"
                  value={newAddress.country}
                  placeholder="Select country *"
                  onChange={handleChange}
                  data={countries}
                />
                {!isCountrySelected ? (
                  <h4 style={{ color: "grey" }}>
                    <AiOutlineArrowUp /> Select a country
                  </h4>
                ) : (
                  <h4 style={{ color: "green" }}>
                    <AiFillCheckSquare /> Fill in your address details below
                  </h4>
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
      <Swiper
        ref={swiperRef}
        slidesPerView={isSmall ? 1 : isMedium ? 2 : isLarge ? 4 : 4}
        spaceBetween={5}
        pagination={{
          clickable: true,
        }}
        grabCursor={true}
        modules={[Pagination]}
        style={{ width: "100%", padding: "1.5rem 0" }}
      >
        {addresses.length > 0 ? (
          addresses.map((item, i) => {
            return (
              <SwiperSlide
                style={
                  selectedAddress?._id === item._id
                    ? { order: -1 } // Move selected address to the first position
                    : null
                }
                className={styles.addresses}
                key={item._id || i}
              >
                <div
                  className={`${styles.address} ${
                    selectedAddress?._id === item._id && styles.selected
                  }`}
                >
                  <div className={styles.left}>
                    <div className={styles.img}>
                      <Image src={user.image} width={300} height={300} alt={user.name} />
                    </div>

                    <div className={styles.ctas}>
                      <div className={styles.btns}>
                        {selectedAddress?._id !== item._id && (
                          <Tooltip title="Select address">
                            <MuiButton
                              style={{ border: "1px solid #e7e7e7" }}
                              color={selectedAddress?._id === item._id ? "primary" : "success"}
                              onClick={() => handleSelectAddress(item)}
                            >
                              <FaCheck />
                            </MuiButton>
                          </Tooltip>
                        )}

                        {selectedAddress?._id === item._id && <small>Selected address</small>}
                        {selectedAddress?._id !== item._id && (
                          <Tooltip title="Delete address">
                            <MuiButton
                              style={{ border: "1px solid #e7e7e7" }}
                              color="error"
                              onClick={() => handleDelete(item._id)}
                            >
                              <FaTrash />
                            </MuiButton>
                          </Tooltip>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className={styles.right}>
                    <div className={styles.row}>
                      {!isMedium && <hr />}
                      <p>
                        <FaIdBadge /> {item.firstName} {item.lastName}
                      </p>
                      <p>
                        <FaPhoneAlt />
                        {item.phoneNumber}
                      </p>
                      <hr />
                      <p>
                        <FaMapPin /> {item.address1}, {item.state}, {item.city}, {item.zipCode}{" "}
                        {item.country} {item.address2 ? item.address2 : ""}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })
        ) : (
          <p>You don&apos;t have any saved addresses.</p>
        )}
      </Swiper>
    </div>
  );
};

export default Shipping;
