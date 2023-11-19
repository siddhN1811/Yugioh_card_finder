import PropTypes from 'prop-types';

import './CardViewer.css';

const CardViewer = ({ data }) => {
  console.log(data)
  if (!data || !Array.isArray(data) || data.length === 0) {
    return null;
  }

  const cardImages = data[0].card_images;
  
 
  if (!cardImages || !Array.isArray(cardImages) || cardImages.length === 0) {
    return null;
  }
  
  if(cardImages[0].image_url == "https://images.ygoprodeck.com/images/cards/80117527.jpg"){
    var imageUrl ='src/assests/80117527.png'
  }
  else{
    imageUrl = cardImages[0].image_url;

  }
  return (
    
    <div className="card-viewer-container">
      <img src={imageUrl} alt="Card" />
    </div>
  );
};

CardViewer.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      card_images: PropTypes.arrayOf(
        PropTypes.shape({
          image_url: PropTypes.string,
        })
      ),
    })
  ),
};

export default CardViewer;
