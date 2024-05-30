import CardFinder from "../cardFinder/CardFinder";
import CardViewer from "../../components/cardViewer/CardViewer";
import DuelHelper from "../duelHelper/DuelHelper";
import Navbar from "../../components/navbar/Navbar";
const CardFinderPage = ()=>{

    return(
        <>
        <Navbar/>
        <CardFinder/>
        <CardViewer/>
        <DuelHelper></DuelHelper>
        </>
        

        
    );
}

export default CardFinderPage;