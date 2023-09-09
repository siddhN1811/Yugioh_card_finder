import { useState } from "react";
import "./LPCounter.css";

const LPCounter = () => {
  const [lpValue, setLpValue] = useState(8000);
  const [inputValue, setInputValue] = useState("");

  const setLp = (e)=>{
    setLpValue(e.target.value)
  }

  const DecreaseLp = () => {
    setLpValue(lpValue - parseInt(inputValue));
  };

  const IncreaseLP = () => {
    setLpValue(lpValue + parseInt(inputValue));
  };

  const TakeInput = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="lp-counter-container">
      <input
        type="number"
        value={lpValue}
        onChange={setLp}
      />

      <div className="lp-changer">
        <button onClick={IncreaseLP}>+</button>
        <input
          type="number"
          onChange={TakeInput}
          value={inputValue}
        />
        <button onClick={DecreaseLp}>-</button>
      </div>
      <button onClick={() => setLpValue(8000)}>Reset</button>
    </div>
  );
};

export default LPCounter;
