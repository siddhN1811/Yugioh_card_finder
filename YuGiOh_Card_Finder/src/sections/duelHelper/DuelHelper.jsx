import CoinToss from "../../components/coin/coinToss";
import Dice from "../../components/dice/dice";
import LPCounter from "../../components/lpCounter/LPCounter";
import "./DuelHelper.css";

const DuelHelper = () => {
  return (
    <div className="duel-helper-container">
      <Dice />
      <LPCounter />
      <LPCounter />
      <CoinToss />
    </div>
  );
};

export default DuelHelper;
