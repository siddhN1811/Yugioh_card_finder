import CardInformation from "../../components/cardInformation/CardInformation";
import CardSearch from "../../components/cardSearch/cardSearch";
import Cardviewer from "../../components/cardViewer/CardViewer";
import "./CardFinder.css"

const CardFinder =()=>{

    return(

        <div className="card-finder-container">
        <Cardviewer />
        <CardInformation />
        <div><CardSearch  /></div>
        </div>

    );
}

export default CardFinder;