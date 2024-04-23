import {Component} from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

import GameButtons from '../GameButtons'
import './index.css'

const choicesList = [
  {
    id: 'ROCK',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png',
  },
  {
    id: 'SCISSORS',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png',
  },
  {
    id: 'PAPER',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png',
  },
]

const gameStatusConstants = {
  inProgress: 'IN_PROGRESS',
  win: 'WIN',
  lost: 'LOST',
  draw: 'DRAW',
}

class RockPaperScissors extends Component {
  state = {
    score: 0,
    userChoice: '',
    gameChoice: '',
    gameStatus: gameStatusConstants.inProgress,
  }

  getGameChoice = () => {
    const gameChoicesList = choicesList.map(choice => choice.id)
    const randomIndex = Math.floor(Math.random() * 3)
    return gameChoicesList[randomIndex]
  }

  chooseOne = id => {
    this.setState(
      {userChoice: id, gameChoice: this.getGameChoice()},
      this.evaluateGame,
    )
  }

  onClickGoToGameView = () => {
    this.setState({gameStatus: gameStatusConstants.inProgress})
  }

  evaluateGame = () => {
    const {userChoice, gameChoice} = this.state
    if (
      (userChoice === 'ROCK' && gameChoice === 'PAPER') ||
      (userChoice === 'PAPER' && gameChoice === 'SCISSORS') ||
      (userChoice === 'SCISSORS' && gameChoice === 'ROCK')
    ) {
      this.setState(prevState => ({
        gameStatus: gameStatusConstants.lost,
        score: prevState.score - 1,
      }))
    } else if (userChoice === gameChoice) {
      this.setState({gameStatus: gameStatusConstants.draw})
    } else {
      this.setState(prevState => ({
        gameStatus: gameStatusConstants.win,
        score: prevState.score + 1,
      }))
    }
  }

  renderInitialGame = () => (
    <div className="initialContainer">
      {choicesList.map(eachItem => (
        <GameButtons eachItem={eachItem} chooseOne={this.chooseOne} />
      ))}
    </div>
  )

  renderGameWon = () => {
    const {gameChoice, userChoice} = this.state
    const userChoiceObjectLIST = choicesList.filter(
      choice => choice.id === userChoice,
    )
    const userChoiceObject = userChoiceObjectLIST[0]
    const gameChoiceObjectLIST = choicesList.filter(
      choice => choice.id === gameChoice,
    )
    const gameChoiceObject = gameChoiceObjectLIST[0]
    console.log(gameChoiceObject)

    return (
      <div className="game-mid-container">
        <div className="game-contents">
          <div className="you-other">
            <p>You</p>
            <img
              className="choice-image"
              src={`${userChoiceObject.imageUrl}`}
              alt="your choice"
            />
          </div>
          <div className="you-other">
            <p>Other</p>
            <img
              className="choice-image"
              src={`${gameChoiceObject.imageUrl}`}
              alt="opponent choice"
            />
          </div>
        </div>
        <p>YOU WON</p>
        <button
          className="playAgain-btn"
          type="button"
          onClick={this.onClickGoToGameView}
        >
          Play Again
        </button>
      </div>
    )
  }

  renderGameLost = () => {
    const {gameChoice, userChoice} = this.state
    const userChoiceObjectLIST = choicesList.filter(
      choice => choice.id === userChoice,
    )
    const userChoiceObject = userChoiceObjectLIST[0]
    const gameChoiceObjectLIST = choicesList.filter(
      choice => choice.id === gameChoice,
    )
    const gameChoiceObject = gameChoiceObjectLIST[0]

    return (
      <div className="game-mid-container">
        <div className="game-contents">
          <div className="you-other">
            <p>You</p>
            <img
              src={`${userChoiceObject.imageUrl}`}
              alt="your choice"
              className="choice-image"
            />
          </div>
          <div className="you-other">
            <p>Other</p>
            <img
              src={`${gameChoiceObject.imageUrl}`}
              alt="opponent choice"
              className="choice-image"
            />
          </div>
        </div>
        <p>YOU LOSE</p>
        <button
          className="playAgain-btn"
          type="button"
          onClick={this.onClickGoToGameView}
        >
          Play Again
        </button>
      </div>
    )
  }

  renderGameDraw = () => {
    const {gameChoice, userChoice} = this.state
    const userChoiceObjectLIST = choicesList.filter(
      choice => choice.id === userChoice,
    )
    const userChoiceObject = userChoiceObjectLIST[0]
    const gameChoiceObjectLIST = choicesList.filter(
      choice => choice.id === gameChoice,
    )
    const gameChoiceObject = gameChoiceObjectLIST[0]

    return (
      <div className="game-mid-container">
        <div className="game-contents">
          <div className="you-other">
            <p>You</p>
            <img
              src={`${userChoiceObject.imageUrl}`}
              alt="your choice"
              className="choice-image"
            />
          </div>
          <div className="you-other">
            <p>Other</p>
            <img
              src={`${gameChoiceObject.imageUrl}`}
              alt="opponent choice"
              className="choice-image"
            />
          </div>
        </div>
        <p>IT IS DRAW</p>
        <button
          className="playAgain-btn"
          type="button"
          onClick={this.onClickGoToGameView}
        >
          Play Again
        </button>
      </div>
    )
  }

  renderGameView = () => {
    const {gameStatus} = this.state
    // console.log(gameStatus)
    // return this.renderInitialGame()
    switch (gameStatus) {
      case gameStatusConstants.inProgress:
        return this.renderInitialGame()
      case gameStatusConstants.win:
        return this.renderGameWon()
      case gameStatusConstants.lost:
        return this.renderGameLost()
      case gameStatusConstants.draw:
        return this.renderGameDraw()
      default:
        return null
    }
  }

  render() {
    const {score} = this.state
    return (
      <div className="container">
        <div className="score-box">
          <div className="text-contents">
            <h1>
              ROCK <br />
              PAPER
              <br /> SCISSORS
            </h1>
          </div>
          <div className="score-in-box">
            <p>SCORE</p>
            <p className="score">{score}</p>
          </div>
        </div>
        <div>{this.renderGameView()}</div>
        <div className="bottom-container">
          <Popup
            modal
            trigger={
              <button className="button" type="button">
                RULES
              </button>
            }
          >
            {close => (
              <div className="popup">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png "
                  alt="rules"
                  className="rules"
                />
                <button
                  type="button"
                  className="trigger-button"
                  onClick={() => close()}
                >
                  X
                </button>
              </div>
            )}
          </Popup>
        </div>
      </div>
    )
  }
}
export default RockPaperScissors
