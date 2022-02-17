import './index.css'
import './Card.css'

function Card(props) {
  const {imageUrl, cardName, authorName, created, locationName} = props
  const finalUrl = `https://test-front.framework.team${imageUrl}`
  
  return (
    <div className='card'>
      <img className='card__img' src={finalUrl} alt="painting"/>
      <div className='card__info'>
        <h2 className='card__name'>{cardName}</h2>
        <h3 className='card__heading3'>
          Autor: <span className='card__description'>{authorName}</span>
        </h3>
        <h3 className='card__heading3'>
          Created: <span className='card__description'>{created}</span>
        </h3>
        <h3 className='card__heading3'>
          Location: <span className='card__description'>{locationName}</span>
        </h3>
      </div>
    </div>
  )
}

export default Card