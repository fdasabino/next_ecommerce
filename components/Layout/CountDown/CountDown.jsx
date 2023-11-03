import { useEffect, useState } from "react";
import styles from "./CountDown.module.scss";

const CountDown = ({ date }) => {
    const [remainingTime, setRemainingTime] = useState({
        seconds: 0,
        hours: 0,
        minutes: 0,
        days: 0,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = date.getTime() - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setRemainingTime({
                seconds,
                hours,
                minutes,
                days,
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [date]);

    return (
        <div className={styles.countdown}>
            <div className={styles.countdown__days}>
                <span>{remainingTime.days}</span>
                <span>Days</span>
            </div>

            <b>:</b>

            <div className={styles.countdown__hours}>
                <span>{remainingTime.hours.toString().padStart(2, "0")}</span>
                <span>Hours</span>
            </div>

            <b>:</b>

            <div className={styles.countdown__minutes}>
                <span>{remainingTime.minutes.toString().padStart(2, "0")}</span>
                <span>Minutes</span>
            </div>

            <b>:</b>

            <div className={styles.countdown__seconds}>
                <span>{remainingTime.seconds.toString().padStart(2, "0")}</span>
                <span>Seconds</span>
            </div>
        </div>
    );
};

export default CountDown;

/* This code is used to calculate the time remaining between two dates.

The distance variable represents the time difference between the two dates in milliseconds.

The first line of code calculates the number of days left by dividing the distance by the number of milliseconds in a day (1000 * 60 * 60 * 24). The result is rounded down using the Math.floor() function and stored in the days variable.

The second line of code calculates the number of hours left by taking the modulus of the distance with the number of milliseconds in a day, which gives the remaining milliseconds after all the days have been accounted for. This value is then divided by the number of milliseconds in an hour (1000 * 60 * 60), rounded down with Math.floor(), and stored in the hours variable.

The third line of code calculates the number of minutes left by taking the modulus of the distance with the number of milliseconds in an hour, which gives the remaining milliseconds after all the hours have been accounted for. This value is then divided by the number of milliseconds in a minute (1000 * 60), rounded down with Math.floor(), and stored in the minutes variable.

Finally, the fourth line of code calculates the number of seconds left by taking the modulus of the distance with the number of milliseconds in a minute, which gives the remaining milliseconds after all the minutes have been accounted for. This value is then divided by 1000, rounded down with Math.floor(), and stored in the seconds variable.

These variables can be used to display the remaining time in a countdown timer, for example. */
