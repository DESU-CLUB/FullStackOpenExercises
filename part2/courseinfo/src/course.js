const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p><strong>total of {sum} exercises</strong></p>

const Part = ({ part }) =>
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) =>
  <>
    {parts.map(value => <Part key={value.id} part={value} />)}
  </>

const Course = ({ course }) => {


  const sum = course.parts.reduce((s, p) => {
    return s + p.exercises
  }, 0)
  //reduce((accumulator,current element) => some function, initial value )
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total sum={sum} />
    </div>
  )
}

export default Course;