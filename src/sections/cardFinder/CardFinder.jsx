import { useState, useEffect } from "react";
import CardInformation from "../../components/cardInformation/CardInformation";
import CardSearch from "../../components/cardSearch/cardSearch";
import CardViewer from "../../components/cardViewer/CardViewer";
import "./CardFinder.css";
import axios from "axios";

const CardFinder = () => {
  const [data, setData] = useState(null);

  const onLoad = async () => {
    try {
      const response = await axios.get(
        `https://db.ygoprodeck.com/api/v7/cardinfo.php?name=Dark%20Magician`
      );
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching card data:", error);
    }
  };

  useEffect(() => {
    onLoad();
  }, []);

  const getData = (data) => {
    setData(data.data);
  };

  return (
    <div className="card-finder-container">
      <CardViewer data={data} />
      <CardInformation data={data} />
      <div>
        <CardSearch getData={getData} />
      </div>
    </div>
  );
};

export default CardFinder;
