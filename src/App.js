import "./style.css"


function App() {
  return (
    <div style={{margin:'5%'}}>

    <h1 style={{justifyContent:'center',marginLeft:'35%'}}>Calculator</h1> 
    <div className="calculator-grid">
       
        <div className="output">
          <div className='previous-op'>111111</div>
          <div className='current-op'>111111</div>
        </div>

        <button className='span-two'>AC</button>
        <button>DEL</button>
        <button>+</button>
        
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>/</button>

        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button>X</button>
        
        <button>7</button>
        <button>8</button>
        <button>9</button>
        <button>-</button>
        
        <button>.</button>
        <button>0</button>
        <button className='span-two'>=</button>

    </div>

  </div>  
  );
}

export default App;
