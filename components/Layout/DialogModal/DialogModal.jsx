import { hideDialog, showDialog } from "@/redux-store/dialogSlice";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Link from "next/link";
import { forwardRef } from "react";
import { AiFillMessage } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import styles from "./DialogModal.module.scss";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const DialogModal = ({ type }) => {
  const dispatch = useDispatch();
  const dialog = useSelector((state) => state.dialog);
  const test = dialog.msgs.find((x) => x.type === "error");

  const handleClose = () => {
    dispatch(hideDialog());
  };

  return (
    <div
      style={{
        position: "fixed",
        zIndex: "1000",
      }}
    >
      <Dialog
        open={dialog.show}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        disableScrollLock={true}
        aria-describedby="alert-dialog-slide-description"
        fullWidth={true}
      >
        <DialogTitle className={`${styles.header} ${!test ? styles.dialog_success : ""}`}>
          {dialog.header}
        </DialogTitle>
        <DialogContent className={styles.body}>
          {dialog.msgs &&
            dialog.msgs.map((msg, i) => (
              <DialogContentText className={styles.msg} id="alert-dialog-slide-description" key={i}>
                <AiFillMessage />
                <span>{msg.msg}</span>
              </DialogContentText>
            ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          {dialog.link?.link && (
            <Button>
              <Link href={dialog.link.link}>
                <span>{dialog.link.text}</span>
              </Link>
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogModal;
