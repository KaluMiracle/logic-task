import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';

const mock = JSON.parse(JSON.stringify({"id":"cl3e8sabh000009l5hauzgsdi-7366657805829584","project":{"id":"cl3e8sabh000009l5hauzgsdi-7366657805829584","name":"communist_gold_hedgehog","width":1124,"height":571,"items":[{"id":"$176","color":"#3a2c6","rotation":82,"x":705,"y":275,"width":339,"height":100},{"id":"$169","color":"#87aca6","rotation":110,"x":271,"y":398,"width":138,"height":215},{"id":"$154","color":"#43daa4","rotation":273,"x":970,"y":164,"width":251,"height":166},{"id":"$133","color":"#6ad7e","rotation":306,"x":840,"y":247,"width":153,"height":231},{"id":"$95","color":"#a0683f","rotation":176,"x":253,"y":321,"width":101,"height":168},{"id":"$51","color":"#b6682c","rotation":188,"x":923,"y":193,"width":301,"height":150},{"id":"$164","color":"#6823e3","rotation":202,"x":446,"y":360,"width":314,"height":186},{"id":"$189","color":"#bf6672","rotation":311,"x":945,"y":291,"width":314,"height":185},{"id":"$185","color":"#9faad9","rotation":350,"x":648,"y":295,"width":374,"height":226},{"id":"$148","color":"#51cbc6","rotation":150,"x":911,"y":224,"width":165,"height":208},{"id":"$138","color":"#10b1e5","rotation":55,"x":742,"y":395,"width":242,"height":147}]}}
))

const getColor = (index) => index % 2 === 0 ? '#000000' : '#ffffff'

function App() {

  let inputValue = ''
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

  const getDimensions = (width, height, deg) => {
    let newWidth = 0
    let newHeight = 0
    try {
      if (deg < 90) {
        newWidth = (width * Math.cos(deg)) + (height * Math.sin(deg))
        newHeight = (width * Math.sin(deg)) + (height * Math.cos(deg))
      }else if (deg === 90){
        newWidth = height
        newHeight = width
      }else if (deg > 90)  {
        let ang = deg - 90
        newWidth = (height * Math.cos(ang)) + (width * Math.sin(ang))
        newHeight = (width * Math.sin(ang)) + (height * Math.cos(ang))
        
      }

      
      return [Math.abs(newWidth), Math.abs(newHeight)]

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    console.log('project', project)
  },[project])
  
  return (
    <div className="App">'
      <div >
        <h3>Enter project Id</h3>
        <input type={'text'} ref= {inputRef} onChange={(e)=> inputValue = e.target.value} placeholder='for Random leave empty'/>
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
                  // console.log(parseInt(item.height) + (item.y / item.rotation))
                  if (item.rotation > 90 ) {
                    return null
                  }

                  const [width, height] = getDimensions(item.width, item.height, item.rotation)
                  console.log(width, height)
                  return (
                    
                    
                    <g  >
                      <rect className={'item'} fill={item.color} data-x={item.x} data-y={item.y} width={item.width} height={item.height} transform={`translate(${item.x}, ${item.y}) rotate(${item.rotation})  translate(-${parseInt(item.width)/2}, -${parseInt(item.height)/2})`} 
                      // transform="translate(705, 275) rotate(82)  translate(-169.5,-50)"`
                      ></rect>
                      <circle data-mono="0.46376470588235297" fill={getColor(index)}  cx={item.x} cy={item.y} r="5"></circle>
                      <text x={parseInt(item.x) + 5} y={parseInt(item.y) + 5} fill={getColor(index)}><tspan>{item.rotation}</tspan></text>
                      <rect fill="none" stroke-width="2" stroke-opacity="0.4" stroke="#FF0000" 
                        width={width + 5} 
                        height={height + 5}
                        transform={`translate(${ item.x - (item.width/2)}, ${item.y - (item.height/2)})`}></rect>
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

<g>
  <rect fill="#9d964d" data-x="588" data-y="188" width="195" height="260" transform="translate(588, 188) rotate(287)  translate(-97.5,-130)"></rect>
  <circle data-mono="0.5649803921568627" fill="#FFFFFF" cx="588" cy="188" r="4"></circle>
  <text x="593" y="188" fill="#FFFFFF"><tspan>287°</tspan>
  </text>
  <rect fill="none" stroke-width="2" stroke-opacity="0.4" stroke="#FF0000" width="305.65171897132285" height="262.49607064070346" transform="translate(435.17414051433855, 56.75196467964827)"></rect>
</g>