import "./App.css";

import Navbar from "./components/navbar/Navbar";
import CardFinder from "./sections/cardFinder/CardFinder";
import DuelHelper from "./sections/duelHelper/DuelHelper";

function App() {
 

  return (
    <>
      <Navbar />
      <CardFinder />
      
    <DuelHelper/>
    </>
  );
}

export default App;
