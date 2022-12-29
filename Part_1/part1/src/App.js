import logo from './logo.svg';
import './App.css';

function App() {
  console.log("Hello from component")// outside of return, can use js funcs
 let a = 2
 let b = 3
 let age = 35 // props that use js need curly braces
 //react uses jsx inside return
 //JSX is XML like, so every tag must be closed
  return (
    <div className="App">
      <p> Hello World!</p>
      <Hello name = 'Warren' age = '20' />{/*In main component specify which prop and value of prop via prop.[var_name] = [value]*/}
      <Hello name = 'Jorge' age = {age}/>
      <p>{a+b}</p>{/*can refer to dynamic content in return i.e variables*/}
    {/*Any js code in curly braces will be evaluated in return*/ }
   {/*/Can also use fragments <> to wrap components*/}
    </div> 
  );
}

function Hello (props){ //Component, only can export one component, so this one used under app, main component
  console.log("This is from the hello component")
  return(
    <div>
    <p>Hello World this is {props.name}, age {props.age}</p>{/*Props is like input component takes*/}
    </div>
  )// Alternative is to use const Hello = ()=>{.....}

}

export default App;//React component names are always capitalised

