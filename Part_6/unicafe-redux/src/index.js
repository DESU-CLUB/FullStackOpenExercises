import React from 'react';
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {

  const total = () =>{
    const values =store.getState()
    return  Object.values(values).reduce((acc,val) => acc+val,0)

  }
  const getAvg = () =>{
    const values = store.getState()
    console.log(values)
    const all = total()
    const score = values.good-values.bad
    return all===0?0:score/all
  }

  const posPercent = () =>{
    const values = store.getState()
    const all = total()
    return values.good===0?0:values.good/all*100

  }

  return (
    <div>
      <h1>Feedback</h1>
      <Button store = {store} type = 'GOOD' label = 'good'/>
      <Button store = {store} type = 'OK' label = 'ok'/>
      <Button store = {store} type = 'BAD' label = 'bad'/>
      <Button store = {store} type = 'ZERO' label = 'reset stats'/>
      <h1>Statistics</h1>
      {total() === 0? <p>No Feedback</p>:<Statistics store = {store} total = {total} getAvg = {getAvg} posPercent = {posPercent}/>}
    </div>
  )
  
}

const Button = ({store,type,label}) =>{
  return(
    <button onClick={e => store.dispatch({ type: type })}>{label}</button>

  )
}


const Statistics = ({store,total,getAvg,posPercent}) =>{
  return(
    <div>
      <table>
      <tbody>
      <StatisticsLine label = 'good'  stat = {store.getState().good}/>
      <StatisticsLine label = 'ok' stat = {store.getState().ok}/> 
      <StatisticsLine label = 'bad' stat = {store.getState().bad}/> 
      <StatisticsLine label = 'all' stat = {total()}/>  
      <StatisticsLine label = 'Average' stat = {getAvg()}/> 
      <StatisticsLine label = 'Positive' stat = {posPercent()}/>  
      </tbody>
      </table>
    </div>
  )
}

const StatisticsLine = ({label,stat}) =>{
  return(
  <tr>
  <td>{label}</td><td>{stat}{label === 'Positive'?'%':''}</td>
  </tr>
)}

const root = ReactDOM.createRoot(document.getElementById('root'))
const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
