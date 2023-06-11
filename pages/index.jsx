import Button from "@/components/Layout/Button/Button";
import styles from "@/styles/Home.module.scss";

const Home = () => {
  return (
    <div className={styles.home}>
      <h1>Home Page</h1>
      <Button type="primary">Text here</Button>
      <Button type="secondary">Text here</Button>
      <Button type="tertiary">Text here</Button>
      <Button type="danger">Text here</Button>
    </div>
  );
};

export default Home;
