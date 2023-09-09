
import { useEffect, useState } from "react";
import PropTypes from "prop-types"; 
import "./CardInformation.css";

const CardInformation = ({ data }) => {
  const [carddata, setData] = useState(null);

  let atk = null;
  let desc = null;
  let type = null;
  let race = null;
  let level = null;
  let def = null;
  let name = null;

  if (data && data[0]) {
    const cardData = data[0];

    atk = cardData.atk;
    desc = cardData.desc;
    type = cardData.type;
    race = cardData.race;
    level = cardData.level;
    def = cardData.def;
    name = cardData.name;
  }

//   console.log("ATK:", atk);
//   console.log("Description:", desc);
//   console.log("Type:", type);
//   console.log("Race:", race);
//   console.log("Level:", level);
//   console.log("Defense:", def);
//   console.log("Name:", name);

  return (
    <div className="card-information-container">
      <div className="stats">
        <li>Atk: {atk}</li>
        <li>Def: {def}</li>
        <li>Attribute: {race}</li>
        <li>Type: {type}</li>
        <li>Level: {level}</li>
      </div>
      <div className="name">
        Name: {name}
      </div>
      <div className="desc">
        Description: {desc}
      </div>
    </div>
  );
};

CardInformation.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      atk: PropTypes.number,
      desc: PropTypes.string,
      type: PropTypes.string, 
      race: PropTypes.string,
      level: PropTypes.number,
      def: PropTypes.number,
      name: PropTypes.string,
    })
  ),
};

export default CardInformation;

