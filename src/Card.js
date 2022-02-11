import './index.css'

function Card(props) {
  const {imageUrl, cardName} = props
  const finalUrl = `https://test-front.framework.team${imageUrl}`
  
  return (
    <div className='card'>
      <img className='card__img' src={finalUrl} alt="painting"/>
      <h2 className='card__name'>{cardName}</h2>
    </div>
  )
}

export default Card