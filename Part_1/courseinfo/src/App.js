

function App() {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  
  
  return (
    <div className="App">
      <Header course = {course}/>
      <Content parts = {course}/>
      <Total parts = {course}/>
    </div>
  );
}

function Header(props){
  return(
    <h1>{props.course.name}</h1>
  );
}

function Content(props){
  let arr = []
  let idx = 1
  props.parts.parts.forEach(value => {arr = arr.concat(<Part key = {idx++} part = {value.name} exercise = {value.exercises} />)})

  return(
    <div>
      {arr}
    </div>

  );
}

function Part(props){
  return(
    <p>{props.part} {props.exercise}</p>
  )
}

function Total(props){
  function getSum(arr){
    let sum = 0
    arr.forEach(value => sum+=value.exercises)
    return sum

  }
  const total = getSum(props.parts.parts)
  return(
    <p>{total}</p>
  );
}

export default App;
