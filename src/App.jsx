import "./App.css";

import Navbar from "./components/navbar/Navbar";
import CardFinder from "./sections/cardFinder/CardFinder";
import DuelHelper from "./sections/duelHelper/DuelHelper";
import CardFinderPage from "./sections/pages/CardFinderPage";
import DeckViewer from "./sections/pages/deckViewer/DeckViewer"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
 

  return (
  
    
    <Router>
      <Routes>
        <Route exact path="/" element={<CardFinderPage/>}></Route>
        <Route exact path="/deckBuilder" element = {<DeckViewer/>}></Route>
       
      </Routes>
    </Router>
  );
}

export default App;
