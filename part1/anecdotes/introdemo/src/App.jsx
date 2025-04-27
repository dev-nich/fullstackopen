import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(8).fill(0))

  const randomSelect = () => {
    setSelected(getRandomNumber(7,0))
  }

  const getRandomNumber = (max, min) => Math.floor(Math.random() * (max - min + 1) + min)

  const addVote =  (selected) =>  {
    let copy = [...votes]
    const selectedItem = copy[selected]
    copy[selected] = selectedItem+1
    setVotes(copy)
  }

  const getMostVotes =  () => {
    const maxValue = Math.max(...votes);
    return votes.indexOf(maxValue); 
  }

  const AnecdoteSection = ({title, count}) => {
    return (
      <>
        <h2>{title}</h2>
        <p>{anecdotes[count]}</p>
        <p>has {votes[count]} votes</p>
      </>
    )
  }


  return (
    <div>
      <AnecdoteSection title="Anecdote of the Day" count={selected} />
      <button onClick={() => addVote(selected)}>vote</button>
      <button onClick={randomSelect}>next anecdote</button>
      <AnecdoteSection title="Anecdote with most votes" count={getMostVotes()} />
    </div>
  )
}

export default App