import Button from "@/components/Layout/Button/Button";
import { clearCart } from "@/redux-store/cartSlice";
import { IconButton, Tooltip } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { toast } from "react-toastify";
import styles from "./CartHeader.module.scss";

const CartHeader = () => {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isMobile ? 300 : 400,
    bgcolor: "#FAFAFA",
    boxShadow: 24,
    borderRadius: 2,
    p: isMobile ? 2 : 4,
  };

  const handleSignIn = () => {
    signIn();
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.info("Cart cleared successfully");
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div className={styles.cart_header}>
        <div className={styles.left}>
          <Tooltip title="Clear cart">
            <IconButton onClick={handleOpen}>
              <FaTrash />
            </IconButton>
          </Tooltip>
          <h2>
            My shopping cart {cart.cartItems.length > 0 && <span>({cart.cartItems.length})</span>}
          </h2>
        </div>
        <div className={styles.right}>
          {!session && (
            <Button onClick={handleSignIn} style="secondary">
              Sign in to checkout <AiOutlineArrowRight />
            </Button>
          )}
        </div>
      </div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className={styles.modal_body}>
              <h2>Clear shopping cart?</h2>
              <small>This action will remove your entire shopping cart.</small>
              <Button style="danger" onClick={handleClearCart}>
                Clear my cart
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default CartHeader;
