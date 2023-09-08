import CoinToss from "../../components/coin/coinToss";
import Dice from "../../components/dice/dice";
import "./DuelHelper.css";

const DuelHelper = () => {
  return (
    <div className="duel-helper-container">
      <Dice />
      <CoinToss />
    </div>
  );
};

export default DuelHelper;
