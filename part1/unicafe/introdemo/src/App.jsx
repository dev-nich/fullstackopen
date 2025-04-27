import { useState } from 'react'

const Button = ({text, count, setCount}) => {

  const addCount = () => setCount(count + 1)
  
  return (
    <>
    <button onClick={addCount}>{text}</button>
    </>
  )
}

const Statistics = ({good, neutral, bad}) => {

  const getAll = () => good + neutral + bad
  
  const getAverage = () => (good + (bad * -1))/getAll()

  const getPositive = () => (good / getAll()) * 100

  return (
    <>
      <h2>Statistics</h2>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {getAll()}</p>
      <p>average {getAverage()}</p>
      <p>positive {getPositive()}%</p>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>Give Feedback</h2>
      <Button text="good" count={good} setCount={setGood}/>
      <Button text="neutral" count={neutral} setCount={setNeutral}/>
      <Button text="bad" count={bad} setCount={setBad}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App