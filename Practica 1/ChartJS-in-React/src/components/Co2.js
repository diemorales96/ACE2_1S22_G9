import React, { useEffect, useState } from 'react'

import { Line, defaults } from 'react-chartjs-2'

defaults.global.tooltips.enabled = false
defaults.global.legend.position = 'bottom'
const baseUrl='http://localhost:5000';

const Co2 = () => {


  const [operaciones,setOperations] = useState([])
  useEffect(() => {
    getOperations();
}, [])


const getOperations = async() => {
  await fetch(`${baseUrl}/api/data`, {
      method: 'GET',
      headers: {
          "Content-Type": "application/json"
      }
  })
  .then(resp => resp.json())
  .then(data => {
    setOperations(data)
    console.log("wwwwwwwwwwwww")

  }).catch(console.error)
}

console.log("wwwwwwwwwwwww")
console.log(operaciones)




const co=operaciones.map( ({Fecha, CO2, Iluminacion, Humedad, TemperaturaInterna,TemperaturaExterna}, i) => {
  return (
      

    CO2

      
  )
})

const Hum=operaciones.map( ({Fecha, CO2, Iluminacion, Humedad, TemperaturaInterna,TemperaturaExterna}, i) => {
  return (
      

    Math.trunc(100-(Humedad*100)/1024)

      
  )
})


const Fecha=operaciones.map( ({Fecha, CO2, Iluminacion, Humedad, TemperaturaInterna,TemperaturaExterna}, i) => {
    return (
        
  
      Fecha
  
        
    )
  })


  return (
    <div>
      <Line
        data={{
          labels: Fecha,
          datasets: [
            {
              label: 'CO2 (ppm)',
              data:co ,
              borderColor: 'orange',
              borderWidth: 1,
            },
             {
               label: 'Humedad %',
               data: Hum,
               borderColor: 'red',
               
             },
          ],
        }}
        height={400}
        width={600}
        options={{
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
          legend: {
            labels: {
              fontSize: 25,
            },
          },
        }}
      />
    </div>
  )
}

export default Co2
