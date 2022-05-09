import React, { useEffect, useState, useRef } from 'react'
import Select from 'react-select'


const actions=[
  {label:"Add", value: 1},
  {label:"Delete", value: 2}
];



function Utils() {
  const[inputvalue, setValue]= useState('')
  const[selectedValued, setSelectedValue]=useState(null)


  const handleInputChance=value=>{
    setValue(value)
  }

  const handleChange=value=>{
    setSelectedValue(value)
  }
  useEffect(() => {

console.log("Wenas")
  },[selectedValued])

console.log(selectedValued)
  
  return (
    <div className='container'>

      <div className='row alert-info'> Selected Value: {JSON.stringify(selectedValued || {}, null,2)}</div>

      <div className='row'>
        <div className='col-md-4'></div>
        <div className='col-md-4'>
        <Select options={actions} value={selectedValued} OnInputChange={handleChange} onChange={handleChange}/>

        </div>
        <div className='con-md-4'></div>
      </div>

      
    </div>
  )
}

export default Utils