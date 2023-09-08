import { useState } from "react";
import "./LPCounter.css";

const LPCounter = () => {
  const [lpValue,setLpValue] = useState(8000);
  const [inputValue,setInputValue] = useState(0);

  const DecreaseLp = (value)=>{
    setLpValue(lpValue-value);
  }
  const IncreaseLP = (value)=>{
    setLpValue(lpValue+parseInt(value));
   
  }
  const TakeInput=(e)=>{
    setInputValue(e.target.value)
  }
  return (
    <div className="lp-counter-container">
      <input type="number"  value={lpValue}/>
      
      <div className="lp-changer">
        <button onClick={()=>IncreaseLP(inputValue) }>+</button>
        <input type="number"  onChange={TakeInput} value={inputValue}/>
        <button onClick={()=>DecreaseLp(inputValue)}>-</button>
      </div><button onClick={()=>setLpValue(8000)}>Reset</button>
    </div>
  );
};

export default LPCounter;
