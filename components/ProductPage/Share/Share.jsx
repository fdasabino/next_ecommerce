import { Tooltip } from "@mui/material";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  PinterestIcon,
  PinterestShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import styles from "./Share.module.scss";

const Share = () => {
  return (
    <div className={styles.share}>
      <Tooltip title="Share via email" placement="top">
        <EmailShareButton
          url={window?.location.href}
          subject={"ShoppyFlow Sweden"}
          body="I think you will love this: "
        >
          <EmailIcon round />
        </EmailShareButton>
      </Tooltip>

      <Tooltip title="Share via Facebook" placement="top">
        <FacebookShareButton url={window?.location.href} quote={"Facebook share button"}>
          <FacebookIcon round />
        </FacebookShareButton>
      </Tooltip>

      <Tooltip title="Share via Facebook Messenger" placement="top">
        <FacebookMessengerShareButton url={window?.location.href} appId={"521270401588372"}>
          <FacebookMessengerIcon round />
        </FacebookMessengerShareButton>
      </Tooltip>

      <Tooltip title="Share via Twitter" placement="top">
        <TwitterShareButton url={window?.location.href}>
          <TwitterIcon round />
        </TwitterShareButton>
      </Tooltip>

      <Tooltip title="Share via WhatsApp" placement="top">
        <WhatsappShareButton url={window?.location.href}>
          <WhatsappIcon round />
        </WhatsappShareButton>
      </Tooltip>

      <Tooltip title="Share via Pinterest" placement="top">
        <PinterestShareButton url={window?.location.href}>
          <PinterestIcon round />
        </PinterestShareButton>
      </Tooltip>
    </div>
  );
};

export default Share;
