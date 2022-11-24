import React, { useRef, useEffect, useState } from "react";
import styles from "./style.css";

const DigitalCoundown = ({
  serverNowTime,
  dueTime,
  startCallback,
  progressCallBack,
  finishCallBack,
}) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const clientTimeLag = useRef(0);

  useEffect(() => {
    if (serverNowTime) {
        let clientNowTime = new Date();
      clientTimeLag.current = Date.parse(new Date(serverNowTime)) - Date.parse(clientNowTime);
      console.log('clientTimeLag.current',clientTimeLag.current);
    }
  }, []);

  useEffect(() => {
    let timerId = getTimeUntil();
    console.log("timerId", timerId);
    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, []);

  const getTimeUntil = () => {
    console.log('clientTimeLag.current2',clientTimeLag.current);
    const timeLeft =
      Date.parse(dueTime) - Date.parse(new Date()) - clientTimeLag.current;
    console.log("timeLeft", Date.parse(dueTime) - Date.parse(new Date()));
    console.log("timeLeft2", Date.parse(dueTime) - Date.parse(new Date())- clientTimeLag.current);
    let timerId;
    if (timeLeft > 0) {
      const seconds = Math.floor((timeLeft / 1000) % 60);
      const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
      const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      updateState({ days, hours, minutes, seconds });
      timerId = setTimeout(getTimeUntil, 1000);
    } else {
      updateState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    }
    return timerId;
  };
  const leading0 = (num) => {
    return num < 10 ? `0${num}` : num;
  };

  const updateState = ({ days, hours, minutes, seconds }) => {
    setDays(days);
    setHours(hours);
    setMinutes(minutes);
    setSeconds(seconds);
  };

  return (
    <div className={styles.clock}>
      {days > 0 && (
        <div className={`${styles.digit} ${styles.clockDays}`}>
          {leading0(days)}
        </div>
      )}
      {days > 0 && <div className={styles.colon}>天 </div>}
      <div className={`${styles.digit} ${styles.clockHours}`}>
        {leading0(hours)}
      </div>
      <div className={styles.colon}>: </div>
      <div className={`${styles.digit} ${styles.clockMinutes}`}>
        {leading0(minutes)}
      </div>
      <div className={styles.colon}>: </div>
      {days === 0 && (
        <div className={`${styles.digit} ${styles.clockSeconds}`}>
          {leading0(seconds)}
        </div>
      )}
    </div>
  );
};

export default DigitalCoundown;
