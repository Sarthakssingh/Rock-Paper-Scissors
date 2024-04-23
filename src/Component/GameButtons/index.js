import './index.css'

const GameButtons = props => {
  const {eachItem, chooseOne} = props
  const {id, imageUrl} = eachItem

  const onChooseOne = () => {
    chooseOne(id)
  }
  return (
    <button
      className="img-btn"
      type="button"
      onClick={onChooseOne}
      data-testid={`${id.toLowerCase()}Button`}
    >
      <img src={imageUrl} alt={id} className="rock-paper-img" />
    </button>
  )
}

export default GameButtons
