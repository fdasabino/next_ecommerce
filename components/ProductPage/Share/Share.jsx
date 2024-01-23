import { Tooltip } from "@mui/material";
import { useMediaQuery } from "react-responsive";
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
    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
    return (
        <div className={styles.share}>
            <Tooltip
                title="Share via email"
                placement={isMobile ? "top" : "left"}>
                <EmailShareButton
                    url={window?.location.href}
                    subject={"ShoppyFlow Sweden"}
                    body="I think you will love this: ">
                    <EmailIcon round />
                </EmailShareButton>
            </Tooltip>

            <Tooltip
                title="Share via Facebook"
                placement={isMobile ? "top" : "left"}>
                <FacebookShareButton
                    url={window?.location.href}
                    quote={"Facebook share button"}>
                    <FacebookIcon round />
                </FacebookShareButton>
            </Tooltip>

            <Tooltip
                title="Share via Facebook Messenger"
                placement={isMobile ? "top" : "left"}>
                <FacebookMessengerShareButton
                    url={window?.location.href}
                    appId={"521270401588372"}>
                    <FacebookMessengerIcon round />
                </FacebookMessengerShareButton>
            </Tooltip>

            <Tooltip
                title="Share via Twitter"
                placement={isMobile ? "top" : "left"}>
                <TwitterShareButton url={window?.location.href}>
                    <TwitterIcon round />
                </TwitterShareButton>
            </Tooltip>

            <Tooltip
                title="Share via WhatsApp"
                placement={isMobile ? "top" : "left"}>
                <WhatsappShareButton url={window?.location.href}>
                    <WhatsappIcon round />
                </WhatsappShareButton>
            </Tooltip>

            <Tooltip
                title="Share via Pinterest"
                placement={isMobile ? "top" : "left"}>
                <PinterestShareButton url={window?.location.href}>
                    <PinterestIcon round />
                </PinterestShareButton>
            </Tooltip>
        </div>
    );
};

export default Share;
