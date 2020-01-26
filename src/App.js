import React, {useState, useEffect} from 'react'

export default function App(){
  const STARTING_TIME = 5
  const STARTING_NUM = 0

  const [text, setText] = useState('')
  const [timeRemaining, setTimeRemaining] = useState(STARTING_TIME)
  const [isStarted, setIsStarted] = useState(false)
  const [numWords, setNumWords] = useState(STARTING_NUM)

  function handleChange(e){
    const {value} = e.target
    setText(value)
  }

  function wordCount(string){
    const wordArr = string.trim().split(' ')
    return wordArr.filter(word => word !== '').length
  }

  function startGame(){
    setIsStarted(true)
    setTimeRemaining(STARTING_TIME)
    setText('')
    setNumWords(STARTING_NUM)
  }

  function endGame(){
    setIsStarted(false)
    setNumWords(wordCount(text))
  }

  useEffect(()=>{
    if(isStarted && timeRemaining > 0){
      setTimeout(()=>{
        setTimeRemaining(prevTime => prevTime - 1)
      }, 1000)
    }
    else{
      endGame()
    }
  },[timeRemaining, isStarted])
  
  return(
    <div>
      <h1>How fast can you type?</h1>
      <textarea 
        onChange={handleChange}
        value={text}
      />
      <h4>Time Remaining: {timeRemaining}</h4>
      <button onClick={startGame}>Start</button>
      <h1>Word Count: {numWords}</h1>
    </div>
  )
}