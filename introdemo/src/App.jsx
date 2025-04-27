const Hello = (props) => {
  console.log(props)
  const friends = [ 'Peter', 'Maya']
  return (
    <div>
      <p>Hello {friends}</p>
    </div>
  )
}

const App = () => {
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name='Nich'/>
    </div>
  )
}

export default App