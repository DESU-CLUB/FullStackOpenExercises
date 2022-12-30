import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClickGood = () =>{
    setGood(good+1)
  }

  const handleClickNeutral =()=>{
    setNeutral(neutral+1)
  }

  const handleClickBad =()=>{
    setBad(bad+1)
  }
  const total = () => good+neutral+bad
  const all = total()
  const averageScore = (all)=> (good-bad)/(all)
  const avg = averageScore(all)

  const positivePercentage = (all) => good/all*100
  const pp = positivePercentage(all)
  
  return (
    <div>
    <Feedback clickGood = {handleClickGood} clickNeutral = {handleClickNeutral} clickBad = {handleClickBad}/>
    <Statistics good = {good} neutral = {neutral} bad = {bad} score = {all} avg = {avg} pp = {pp}/>
    </div>
  )
}

const Feedback = (props) =>{
  return(
  <div>
  <h1>Give Feedback</h1>
  <Button handleClick = {props.clickGood} text = "good"/>
  <Button handleClick = {props.clickNeutral} text = "neutral"/>
  <Button handleClick = {props.clickBad} text = "bad"/>

  </div>
  );
}

const Button = (props) =>{
  return(
    <button onClick = {props.handleClick}>{props.text}</button>
  )

}


const Statistics =({good,neutral,bad,score,pp,avg})=>{
  if (good ===0 && neutral ===0 && bad ==0){
    return(
      <div>
      <h1>Statistics</h1>
      <p>No feedback given</p>
      </div>
    )
  }
  return(
    <div>
    <h1>Statistics</h1>
    <table>
     <tbody>
    <StatisticLine text = "good" result = {good}/>
    <StatisticLine text = "neutral" result = {neutral}/>
    <StatisticLine text = "bad" result = {bad}/>
    <StatisticLine text = "all" result = {score}/>
    <StatisticLine text = "average" result = {avg}/>
    <StatisticLine text = "positive" result = {pp+"%"}/>
    </tbody>
    </table>
    </div>
  )
}

const StatisticLine = ({text,result}) =>{
  return(
    <tr>
      <td>{text}</td> 
      <td>{result}</td>
    </tr>
    
  )

}

export default App