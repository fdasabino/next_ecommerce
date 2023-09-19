import { toast } from "react-toastify";

export const validateEmail = (email) => {
  const regexSt =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regexSt.test(email);
};

export const validateCreateProduct = (product, images) => {
  let sizes = product.sizes;
  let details = product.details;
  let questions = product.questions;

  if (images.length < 4 || images.length === 0) {
    toast.error(`Please upload at least 4 images. \n (${4 - images.length} remaining)`);
    return;
  }

  if (!product.color.color) {
    toast.error(`Please select a color.`);
    return;
  }

  if (!product.color.image) {
    toast.error(`Please upload a style image.`);
    return;
  }

  // Perform additional validation here
  if (!product.name) {
    toast.error(`Please enter a name.`);
    return;
  }

  if (!product.description) {
    toast.error(`Please enter a description.`);
    return;
  }

  if (!product.sku) {
    toast.error(`Please enter a SKU.`);
    return;
  }

  if (!product.discount) {
    toast.error(`Please enter a discount.`);
    return;
  }

  if (sizes.some((size) => size.size === "" || size.qty === "" || size.price === "")) {
    toast.error(`Please fill all information on size or remove field.`);
    return;
  }

  if (details.some((detail) => detail.name === "" || detail.value === "")) {
    toast.error(`Please fill all information on details or remove field.`);
    return;
  }

  if (questions.some((question) => question.question === "" || question.answer === "")) {
    toast.error(`Please fill information on questions or remove field.`);
    return;
  }

  return true;
};
