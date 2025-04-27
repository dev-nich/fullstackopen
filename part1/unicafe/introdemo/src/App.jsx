import { useState } from 'react'

const Button = ({text, count, setCount}) => {

  const addCount = () => setCount(count + 1)
  
  return (
    <>
    <button onClick={addCount}>{text}</button>
    </>
  )
}

const StatisticLine = ({text, value}) => <p>{text} {value}</p>

const Statistics = ({good, neutral, bad}) => {

  const getAll = () => good + neutral + bad
  
  const getAverage = () => (good + (bad * -1))/getAll()

  const getPositive = () => (good / getAll()) * 100

  if(good > 0 || neutral > 0 || bad > 0 ){
    return (
      <>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <p>all {getAll()}</p>
        <p>average {getAverage()}</p>
        <p>positive {getPositive()}%</p>
      </>
    )
  }

  return (
    <>
      <p>No feedback given</p>
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
      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App