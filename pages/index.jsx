import FlashDeals from "@/components/Home/FlashDeals/FlashDeals";
import MainSection from "@/components/Home/MainSection/MainSection";
import { setCountry } from "@/redux-store/countrySlice";
import styles from "@/styles/pages/Home.module.scss";
import axios from "axios";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";

const Home = ({ country }) => {
  const dispatch = useDispatch();
  // Set country in redux store
  const setCountryToStore = useCallback(() => {
    dispatch(setCountry(country));
  }, [country, dispatch]);

  // Set country in redux store on page load
  useEffect(() => {
    setCountryToStore();
  }, [setCountryToStore]);

  return (
    <div className={styles.home}>
      <div className={styles.container}>
        <MainSection />
        {/* <FlashDeals /> */}
      </div>
    </div>
  );
};
export default Home;

export async function getServerSideProps() {
  try {
    const { data } = await axios.get(
      `https://api.ipregistry.co/?key=${process.env.NEXT_APP_IP_REGISTRY_API}`
    );
    const country = data.location.country;

    return {
      props: {
        country,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {},
    };
  }
}
