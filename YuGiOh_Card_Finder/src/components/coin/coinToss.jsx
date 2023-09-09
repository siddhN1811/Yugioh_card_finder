import { useState } from "react";
import "./coinToss.css";

const CoinToss = ()=>{

    const [coinState, setCoinState] =useState(1);

    const tossCoin =()=>{

        setCoinState(Math.floor(Math.random() * 2)); 
        console.log(coinState)
        
    }
    return(

        <div className="coin-image-container">
            <img onClick={tossCoin} src={`assests/coin${coinState==1?"Heads":"Tails"}.png`} ></img>
            
        </div>
    );
}

export default CoinToss;