import './App.css';
import { useEffect, useRef, useState } from 'react';


function App() {

  const inputRef = useRef()
  const [project, setProject] = useState({
    id: '',
    project: { 
      name: '',
      items: []
    }
  })

  const  getInfo = async (inputValue)=>{
    const url = 'https://recruitment01.vercel.app/api/project/' + inputValue;
    let response = {};

    await fetch (url)
      .then(response => response.json())
      .then(data => {
        response = data
      })
      .catch(e=>{
        console.log(e)
        response = {
          id: '',
          project: { 
            name: '',
            items: []
          },
          error: true
        }
      })

      return response
  }

  const getRandomId = async () => {
    const url = 'https://recruitment01.vercel.app/api/init';
    let response = {};
    await fetch (url)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        response = data
      })
      .catch(e=>{
        console.log(e)
        response = {
          id: '',
          error: true
        }
      })

      return response.id
  }

  const handleSubmit = async () => {
    
    console.log(inputRef.current.value)

    if (inputRef.current.value.length === 0){
      const randomId = await getRandomId()
      inputRef.current.value = randomId
    }
    console.log(inputRef.current.value)
    const data = await getInfo(inputRef.current.value)
    console.log(inputRef.current.value)
    setProject(data)
    
  }

  
  useEffect(()=>{
    console.log('project', project)
  },[project])
  
  return (
    <div className="App">'
      <div >
        <h3>Enter project Id</h3>
        <input type={'text'} ref= {inputRef}  placeholder='for Random leave empty'/>
        <button onClick={handleSubmit}>submit</button>
        <div>
          <h3>Name: </h3>
          <p>{project.project.name}</p>
          <h3>Id: </h3>
          <p>{project.id}</p>
        </div>

        <h3>{project.error? 'ERROR' : null}</h3>

      
      </div>
      

      
         
              
      <div className='container'>
        
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink"  width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" width="100%" height="100%" viewBox="0 0 1124 571">

          
              {
                !project.error ?
                  project.project.items.map((item, index)=>{
                    
                      const containerWidth =
                        Math.abs(item.width * Math.cos(item.rotation * (Math.PI / 180))) +
                        Math.abs(item.height * Math.sin(item.rotation * (Math.PI / 180)));
                      const containerHeight =
                        Math.abs(item.width * Math.sin(item.rotation * (Math.PI / 180))) +
                        Math.abs(item.height * Math.cos(item.rotation * (Math.PI / 180)));

                    return (
                      <g  >
                        <rect className={'item'} 
                          fill={item.color} 
                          data-x={item.x} 
                          data-y={item.y} 
                          width={item.width} 
                          height={item.height} 
                          transform={`translate(${item.x}, ${item.y}) rotate(${item.rotation})  translate(-${item.width/2}, -${item.height/2})`} 
                        ></rect>
                        <circle data-mono="0.46376470588235297" fill={'white'}  cx={item.x} cy={item.y} r="5"></circle>
                        <text x={item.x + 5} y={item.y + 5} fill={'white'}>
                          <tspan>{item.rotation}</tspan>
                        </text>
                        <rect 
                          fill="none" 
                          strokeWidth="2" 
                          strokeOpacity="0.4" 
                          stroke="#FF0000" 
                          width={containerWidth} 
                          height={containerHeight}
                          transform={`translate(${ item.x - (containerWidth/2)}, ${item.y - (containerHeight/2)})`}></rect>
                      </g>
                    )
                  }) : null
              }
             
            </svg>
        </svg>
      </div>
          
          
      

   
    </div>
  );
}

export default App;
