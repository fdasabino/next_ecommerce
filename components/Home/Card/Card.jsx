import Button from "@/components/Layout/Button/Button";
import Image from "next/image";
import Link from "next/link";
import { BsEye } from "react-icons/bs";
import styles from "./Card.module.scss";

const Card = ({ item }) => {
    const renderCard = () => {
        return (
            <div className={styles.card}>
                <Image
                    src={item.image}
                    width={1000}
                    height={1000}
                    alt="placeholder"
                    priority
                />
                <div className={styles.overlay}>
                    <span>{(item.price - item.discount).toFixed(0)}$</span>
                    <small>
                        -
                        {(
                            ((item.price - (item.price - item.discount) / 2) / item.price) *
                            100
                        ).toFixed(0)}
                        %
                    </small>
                    <Link href={item.link}>
                        <Button style="secondary">
                            <BsEye />
                        </Button>
                    </Link>
                    <div className={styles.card__bar}>
                        <div
                            className={styles.card__bar__inner}
                            style={{ width: `${item.sold}%` }}
                        />
                    </div>
                </div>
            </div>
        );
    };
    return renderCard();
};

export default Card;
