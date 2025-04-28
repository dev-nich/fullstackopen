
const Part = ({part}) => <p>{part.name} {part.exercises}</p>

const Content = ({parts}) => parts.map(item=><Part key={item.id} part={item}/>)

const Header = ({title}) => <h2>{title}</h2>

const Course = ({course}) => {
  const total = course.parts.reduce((total, current) => total + current.exercises, 0)
  return (
    <>
      <Header title={course.name} />
      <Content parts={course.parts} />
      <strong>Total of {total} exercises</strong>
    </>
  )
}

export default Course