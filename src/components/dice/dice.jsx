import { useState } from "react";
import "./dice.css";
useState
const Dice = ()=>{
    const [diceNumber1, setDiceNumber1] =useState(6);
    const [diceNumber2, setDiceNumber2] =useState(6);

    const rollDice =()=>{
        setDiceNumber1(Math.floor(Math.random() * 5)+1); 
        setDiceNumber2(Math.floor(Math.random() * 5)+1); 
        console.log(diceNumber1,diceNumber2)
    }
    return(

        <div className="dice-image-container">
            <img onClick={rollDice} src={`assests/dice-${diceNumber1}.png`}></img>
            <img onClick={rollDice} src={`assests/dice-${diceNumber2}.png`}></img>
        </div>
    );
}
export default Dice;