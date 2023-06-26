import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { BsChevronDown } from "react-icons/bs";
import styles from "./ProductAccordion.module.scss";

const ProductAccordion = ({ details }) => {
  console.log(details);

  return (
    <div className={styles.product_accordion}>
      <Accordion className={styles.product_accordion__wrapper}>
        <AccordionSummary
          expandIcon={<BsChevronDown />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className={styles.product_accordion__title}
        >
          <h3>Product details</h3>
        </AccordionSummary>

        {details.map((detail, i) => (
          <AccordionDetails key={detail._id}>
            <div className={styles.product_accordion__details}>
              <div className={styles.product_accordion__details_left}>
                <h3>{detail.name}:</h3>
              </div>
              <div className={styles.product_accordion__details_right}>
                <h3>{detail.value}</h3>
              </div>
            </div>
          </AccordionDetails>
        ))}
      </Accordion>
    </div>
  );
};

export default ProductAccordion;
