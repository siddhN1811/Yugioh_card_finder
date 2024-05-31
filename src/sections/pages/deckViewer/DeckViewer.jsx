import "./DeckViewer.css";
import Navbar from "../../../components/navbar/Navbar";
import CardSearch from "../../../components/cardSearch/cardSearch";
import CardViewer from "../../../components/cardViewer/CardViewer";
import axios from "axios";
import CardInformation from "../../../components/cardInformation/CardInformation";
import { useState, useEffect } from "react";
import { Reorder } from "framer-motion";
import { saveAs } from "file-saver";

const saveDataToLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const getDataFromLocalStorage = (key) => {
  const jsonData = localStorage.getItem(key);
  return jsonData ? JSON.parse(jsonData) : null;
};

const DeckViewer = () => {
  const [data, setData] = useState(null);
  const [mainDeckMonster, setMainDeckMonster] = useState([]);
  const [extraDeckMonster, setExtraDeckMonster] = useState([]);
  const [sideDeckMonster, setSideDeckMonster] = useState([]);


  const generateYdkFile = () => {
    const MMID = mainDeckMonster.map((entity) => entity.id);
    const EMID = extraDeckMonster.map((entity) => entity.id);
    const SMID = sideDeckMonster.map((entity) => entity.id);

    let fileContent = "#main\n";
    fileContent += MMID.join("\n") + "\n";
    fileContent += "#extra\n";
    fileContent += EMID.join("\n") + "\n";
    fileContent += "!side\n";
    fileContent += SMID.join("\n") + "\n";

    const blob = new Blob([fileContent], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "deck.ydk");
  };

  // console.log(fileData);

  const cardTypes = [
    "Fusion Monster",
    "Link Monster",
    "Pendulum Effect Fusion Monster",
    "Synchro Monster",
    "Synchro Pendulum Effect Monster",
    "Synchro Tuner Monster",
    "XYZ Monster",
    "XYZ Pendulum Effect Monster",
  ];

  useEffect(() => {
    const savedDeckMD = getDataFromLocalStorage("MainDeck");
    const savedDeckED = getDataFromLocalStorage("ExtraDeck");
    const savedDeckSD = getDataFromLocalStorage("SideDeck");

    if (savedDeckMD) {
      setMainDeckMonster(savedDeckMD);
    }
    if (savedDeckED) {
      setExtraDeckMonster(savedDeckED);
    }
    if (savedDeckED) {
      setSideDeckMonster(savedDeckSD);
    }
  }, []);

  const addCardToDeck = (card, toSide) => {
    const isExtraDeckCard = cardTypes.includes(card[0].type);

    const newCard = {
      id: data[0].id,
      image: data[0].card_images[0].image_url_small,
      cardData: data,
    };

    const lenMD = mainDeckMonster.filter((d) => d.id === newCard.id).length;
    let maxCopiesAllowedMD = 3;
    const lenED = extraDeckMonster.filter((d) => d.id === newCard.id).length;
    let maxCopiesAllowedED = 3;
    const lenSD = sideDeckMonster.filter((d) => d.id === newCard.id).length;
    let maxCopiesAllowedSD = 3;
    const combinedLenSDMD = lenSD + lenMD;
    const combinedLenSDED = lenED + lenSD;
    console.log(lenED, lenMD, lenSD,sideDeckMonster);

    if (data[0].banlist_info) {
      if (data[0].banlist_info.ban_tcg === "Banned") {
        maxCopiesAllowedMD = 0;
        maxCopiesAllowedED = 0;
        maxCopiesAllowedSD = 0;
      }
      if (data[0].banlist_info.ban_tcg === "Limited") {
        maxCopiesAllowedMD = 1;
        maxCopiesAllowedED = 1;
        maxCopiesAllowedSD = 1;
      }
      if (data[0].banlist_info.ban_tcg === "Semi-Limited") {
        maxCopiesAllowedMD = 2;
        maxCopiesAllowedED = 2;
        maxCopiesAllowedSD = 2;
      }
    }

    if (
      !isExtraDeckCard &&
      maxCopiesAllowedMD !== 0 &&
      mainDeckMonster.length < 60 &&
      combinedLenSDMD < maxCopiesAllowedMD &&
      toSide == 0
    ) {
      const newDeck = [...mainDeckMonster, newCard];
      setMainDeckMonster(newDeck);
      saveDataToLocalStorage("MainDeck", newDeck);
    } else if (
      isExtraDeckCard &&
      maxCopiesAllowedED !== 0 &&
      lenED < maxCopiesAllowedED &&
      extraDeckMonster.length < 15 &&
      combinedLenSDED < maxCopiesAllowedSD &&
      toSide != 1
    ) {
      const newDeck = [...extraDeckMonster, newCard];
      setExtraDeckMonster(newDeck);
      saveDataToLocalStorage("ExtraDeck", newDeck);
    } else if (
      isExtraDeckCard &&
      maxCopiesAllowedSD !== 0 &&
      mainDeckMonster.length < 15 &&
      combinedLenSDED < maxCopiesAllowedSD &&
      toSide == 1
    ) {
      const newDeck = [...sideDeckMonster, newCard];
      setSideDeckMonster(newDeck);
      saveDataToLocalStorage("SideDeck", newDeck);
    } else if (
      !isExtraDeckCard &&
      maxCopiesAllowedSD !== 0 &&
      mainDeckMonster.length < 60 &&
      combinedLenSDMD < maxCopiesAllowedSD &&
      toSide == 1
    ) {
      const newDeck = [...sideDeckMonster, newCard];
      setSideDeckMonster(newDeck);
      saveDataToLocalStorage("SideDeck", newDeck);
    } else {
      alert("Exceeding limit!");
    }
  };

  const removeCardFromDeck = (index, fromWhich) => {
    if (index === 1000) {
      setMainDeckMonster([]);
      setExtraDeckMonster([]);
      setSideDeckMonster([]);

      saveDataToLocalStorage("MainDeck", []);
      saveDataToLocalStorage("ExtraDeck", []);
      saveDataToLocalStorage("SideDeck", []);
    } else {
      if (fromWhich === 0) {
        const newDeck = mainDeckMonster.filter((_, i) => i !== index);
        setMainDeckMonster(newDeck);
        saveDataToLocalStorage("MainDeck", newDeck);
      }
      if (fromWhich === 1) {
        const newDeck = extraDeckMonster.filter((_, i) => i !== index);
        setExtraDeckMonster(newDeck);
        saveDataToLocalStorage("ExtraDeck", newDeck);
      }
      if (fromWhich === 2) {
        const newDeck = sideDeckMonster.filter((_, i) => i !== index);
        setSideDeckMonster(newDeck);
        saveDataToLocalStorage("SideDeck", newDeck);
      }
    }
  };

  const cardClickHandler = (data) => {
    setData(data);
  };

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
            <button onClick={() => addCardToDeck(data, 1)}>
              Add to Side-deck
            </button>
            <button onClick={() => addCardToDeck(data, 0)}>Add to deck</button>
            <div className="deleteButton">
              <button onClick={() => removeCardFromDeck(1000)}>
                Delete all
              </button>
            </div>
          </div>
        </div>
        <div className="deck-viewer-background">
          <div className="main-deck">
            <ul>
              <Reorder.Group
                values={mainDeckMonster}
                onReorder={setMainDeckMonster}
              >
                {mainDeckMonster.map((mainDeckMonster, index) => (
                  <li
                    draggable="true"
                    key={index}
                    onClick={() => cardClickHandler(mainDeckMonster.cardData)}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      removeCardFromDeck(index, 0);
                    }}
                  >
                    <img src={mainDeckMonster.image} alt={`Card ${index}`} />
                  </li>
                ))}
              </Reorder.Group>
            </ul>
          </div>
          <div className="extra-deck">
            <ul>
              {extraDeckMonster.map((extraDeckMonster, index) => (
                <li
                  key={index}
                  onClick={() => cardClickHandler(extraDeckMonster.cardData)}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    removeCardFromDeck(index, 1);
                  }}
                >
                  <img src={extraDeckMonster.image} alt={`Card ${index}`} />
                </li>
              ))}
            </ul>
          </div>
          <div className="side-deck">
            <ul>
              {sideDeckMonster.map((sideDeckMonster, index) => (
                <li
                  key={index}
                  onClick={() => cardClickHandler(sideDeckMonster.cardData)}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    removeCardFromDeck(index, 2);
                  }}
                >
                  <img src={sideDeckMonster.image} alt={`Card ${index}`} />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="card-search">
          <div className="ydk-button">
            <button onClick={() => generateYdkFile()}>
              Generate .ydk file
            </button>
          </div>
          <CardSearch getData={getData}></CardSearch>
        </div>
      </div>
    </div>
  );
};

export default DeckViewer;
