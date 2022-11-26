import React, { useRef, useEffect, useState } from "react";
import styled from 'styled-components'
import PropTypes from "prop-types";

const Clock = styled.div`
display: flex;
flex-direction: row;
align-items: flex-start;
justify-content: center;
`

const Digit = styled.div`
background-color: black;
color: white;
border-radius: 2px;
padding: 0 4px;
`

const ClockDays = styled(Digit)`
`

const ClockHours = styled(Digit)`
`

const ClockMinutes = styled(Digit)`
`

const ClockSeconds = styled(Digit)`
`

const Colon = styled.div`
padding: 0 2px;
`

const DigitalCoundown = ({
  serverNowTime,
  dueTime,
  interval = 1000,
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
    if(typeof startCallback === "function"){
      startCallback();
    }
    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, []);

  const getTimeUntil = () => {
    const timeLeft =
      Date.parse(dueTime||new Date()) - Date.parse(new Date()) - clientTimeLag.current;
    let timerId;
    if (timeLeft > 0) {
      const seconds = Math.floor((timeLeft / 1000) % 60);
      const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
      const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      updateState({ days, hours, minutes, seconds });
      timerId = setTimeout(getTimeUntil, interval);
      if(typeof progressCallBack === "function"){
        progressCallBack(timeLeft);
      }
    } else {
      updateState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      if(typeof finishCallBack === 'function'){
        finishCallBack();
      }
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
    <Clock>
      {days > 0 && (
        <ClockDays>
          {leading0(days)}
        </ClockDays>
      )}
      {days > 0 && <Colon>天 </Colon>}
      <ClockHours>
        {leading0(hours)}
      </ClockHours>
      <Colon>: </Colon>
      <ClockMinutes>
        {leading0(minutes)}
      </ClockMinutes>
      <Colon>: </Colon>
      {days === 0 && (
        <ClockSeconds>
          {leading0(seconds)}
        </ClockSeconds>
      )}
    </Clock>
  );
};

DigitalCoundown.propTypes = {
  serverNowTime: PropTypes.string,
  dueTime: PropTypes.string,
  interval: PropTypes.number,
  startCallback: PropTypes.func,
  progressCallBack: PropTypes.func,
  finishCallBack: PropTypes.func,
}

export default DigitalCoundown;
