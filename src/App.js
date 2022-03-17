import { useReducer } from "react";
import "./style.css"
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButton";


export  const ACTIONS = {

  ADD: 'add',
  OPERATION:'operation',
  CLEAR: 'clear',
  DELETE: 'delete',
  EVALUATE: 'evaluate'
}

function reducer(state,{type, payload} ){

  switch(type){

    case ACTIONS.ADD:
    
    // while adding new number or next calcuation
    if(state.overwrite){

      return{
        ...state,
        currentOperand: payload.digit,
        overwrite: false,
      }
    }


    // taking care 0 edge case
    if(payload.digit ==="0" && state.currentOperand === "0") return state

    // taking care of . (period)
    if(payload.digit ==="."  && state.currentOperand.includes("."))
    return state

  
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`
      }

      case ACTIONS.CLEAR:
        return {}

      case ACTIONS.OPERATION:

      // when you tyoe nothing
        if(state.currentOperand == null && state.previousOperand == null){
          return state
        }
      
      // taking care of mistake operation or mistype
    if(state.currentOperand == null){
      return{
       ...state,
       operation:payload.operation,
      } 
     }
 

       if(state.previousOperand ==null){
          return{
            ...state,
            operation: payload.operation,
            previousOperand: state.currentOperand,
            currentOperand:null,
          }
        }

        return{
          ...state,
          previousOperand:evaluate(state),
          operation: payload.operation,
          currentOperand:null
        }

        case ACTIONS.EVALUATE:
          if(
            state.operation == null || state.currentOperand == null || state.previousOperand==null
          ){
            return state
          }

          return {
            ...state,
           overwrite:true,
           previousOperand:null,
           operation:null,
           currentOperand:evaluate(state),
          }

  }

}


// evaluating all the calculation 

function evaluate({ currentOperand,previousOperand,operation}){

  const prev = parseFloat(previousOperand)
  const current = parseFloat(currentOperand)
  if(isNaN(prev) || isNaN(current))
  return ""

  let computation = ""
  switch (operation) {
    case "+":
      computation = prev + current
      break
    case "-":
      computation = prev - current
      break
    case "*":
      computation = prev * current
      break
    case "÷":
      computation = prev / current
      break
  }

  return computation.toString()
}

function App() {


 const [{currentOperand, previousOperand, operation}, dispatch] = useReducer(reducer,{})

  return (
    <div style={{margin:'5%'}}>

    <h1 style={{justifyContent:'center',marginLeft:'35%'}}>Calculator</h1> 
    <div className="calculator-grid">
       
        <div className="output">
          <div className='previous-op'>{previousOperand}{operation}</div>
          <div className='current-op'>{currentOperand}</div>
        </div>

        <button className='span-two' onClick={ ()=> dispatch({type: ACTIONS.CLEAR})}>AC</button>
        <button>DEL</button>
        <OperationButton operation="÷" dispatch={dispatch} />
      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />
      <OperationButton operation="*" dispatch={dispatch} />
      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />
      <OperationButton operation="+" dispatch={dispatch} />
      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />
      <OperationButton operation="-" dispatch={dispatch} />
      <DigitButton digit="." dispatch={dispatch} />
      <DigitButton digit="0" dispatch={dispatch} />
        <button className='span-two' onClick={()=> dispatch( { type:ACTIONS.EVALUATE } )}>=</button>

    </div>

  </div>  
  );
}

export default App;
