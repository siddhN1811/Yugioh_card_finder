import CardInformation from "../../components/cardInformation/CardInformation";
import Cardviewer from "../../components/cardViewer/CardViewer";
import "./CardFinder.css"

const CardFinder =()=>{

    return(

        <div className="card-finder-container">
        <Cardviewer />
        <CardInformation />
        </div>

    );
}

export default CardFinder;