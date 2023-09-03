import Order from "@/models/Order";
import styles from "@/styles/pages/OrderPage.module.scss";

const OrderPage = ({ order }) => {
  console.log(order);

  return <div>OrderPage</div>;
};

export default OrderPage;

// server side
export async function getServerSideProps(context) {
  const { query } = context;
  const id = query?.id;
  const order = await Order.findById(id).populate("user").lean().exec();

  return {
    props: { order: JSON.parse(JSON.stringify(order)) },
  };
}
