import "./DeckViewer.css";
import Navbar from "../../../components/navbar/Navbar";
import CardSearch from "../../../components/cardSearch/cardSearch";
import CardViewer from "../../../components/cardViewer/CardViewer";
import axios from "axios";
import CardInformation from "../../../components/cardInformation/CardInformation";
import { useState, useEffect } from "react";

const saveDataToLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Function to get data from localStorage
const getDataFromLocalStorage = (key) => {
  const jsonData = localStorage.getItem(key);
  return jsonData ? JSON.parse(jsonData) : null;
};

const DeckViewer = () => {
  const [data, setData] = useState(null);
  const [deck, setDeck] = useState([]);
  // const list = {}
  useEffect(() => {
    const savedDeck = getDataFromLocalStorage("deck");
    if (savedDeck) {
      setDeck(savedDeck);
    }
  }, []);

  const addCardToDeck = (card) => {
    card = {
      id:data[0].id,
      image:data[0].card_images[0].image_url_small,
    }
    const newDeck = [...deck, card];
    const len  = deck.filter(d => d.id === card.id).length;
    var maxCopiesAllowed = 3;
    // console.log('banlist_info' in data[0]);
    if('banlist_info ' in data[0]){
    if (data[0].banlist_info.ban_tcg == 'Banned'){
      maxCopiesAllowed = 0;
    }
    if (data[0].banlist_info.ban_tcg == 'Limited'){
      maxCopiesAllowed = 1;
    }
    if (data[0].banlist_info.ban_tcg == 'Semi-Limited'){
      maxCopiesAllowed = 2;
    }
  }
    if (maxCopiesAllowed!=0 && len < 3 && deck.length < 60 ){
      setDeck(newDeck);
    }
    else{
      alert("Exceeding Limit!!");
    }
    // const id = data[0].id 
    // if (list.id){
    //   list.id += 1;
    // }
    // else{
    //   list[id] = 0
    // }
    // console.log(deck)
    saveDataToLocalStorage("deck", newDeck);
  };

  const removeCardFromDeck = (index)=>{
    if (index == 1000){
      setDeck([]);
    }
    else{
    const newDeck = deck.filter((_, i) => i !== index);
    setDeck(newDeck);
    saveDataToLocalStorage("deck", newDeck);
    }
  }
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
  const example = {image:"https://images.ygoprodeck.com/images/cards_small/46986421.jpg",id:46986421}
  return (
    <div className="main-container">
      <Navbar></Navbar>
      <div className="sub-container">
        <div className="card-viewer">
          <div>
            <CardViewer data={data}></CardViewer>
          </div>
          <div>
            <CardInformation data={data}></CardInformation>
          </div>
          <div className="functionButton">
            <button onClick={() => addCardToDeck(data)}>Add to deck</button>
            <button  onClick={() => removeCardFromDeck(1000)}>Delete all</button>
          </div>
        </div>
        <div className="deck-viewer-background">
        <ul >
        {deck.map((card, index) => (
          <li key={index} onContextMenu={(e)=>{e.preventDefault(); removeCardFromDeck(index);console.log(index);}}>{<img src={card.image}/>}</li>
        ))}
      </ul>
        </div>
        <div className="card-search">
          <CardSearch getData={getData}></CardSearch>
        </div>
      </div>
    </div>
  );
};

export default DeckViewer;
