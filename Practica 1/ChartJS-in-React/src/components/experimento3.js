import React, { useEffect, useState } from 'react'

import { Line, defaults } from 'react-chartjs-2'

defaults.global.tooltips.enabled = false
defaults.global.legend.position = 'bottom'
const baseUrl='http://localhost:5000';

const Exp3 = () => {


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



const tempInt=operaciones.map( ({Fecha, CO2, Iluminacion, Humedad, TemperaturaInterna,TemperaturaExterna}, i) => {
  return (
      

          TemperaturaInterna

      
  )
})

const tempExt=operaciones.map( ({Fecha, CO2, Iluminacion, Humedad, TemperaturaInterna,TemperaturaExterna}, i) => {
  return (
      

    TemperaturaExterna

      
  )
})

const ilu=operaciones.map( ({Fecha, CO2, Iluminacion, Humedad, TemperaturaInterna,TemperaturaExterna}, i) => {
  return (
      

    Math.trunc(600-Iluminacion)
      
  )
})


const Fecha=operaciones.map( ({Fecha, CO2, Iluminacion, Humedad, TemperaturaInterna,TemperaturaExterna}, i) => {
    return (
        
  
      Fecha
  
        
    )
  })

console.log("sssssssssssssssss")
console.log(tempExt)
console.log("sssssssssssssssss")

  return (
    <div>
      <Line
        data={{
          labels: Fecha,
          datasets: [
            {
              label: 'Temperatura Interna  °C',
              data:tempInt ,
              borderColor: 'orange',
              borderWidth: 1,
            },
             {
               label: 'Temp Externa  °C',
               data: tempExt,
               borderColor: 'red',
               
             },
             {
              label: 'Iluminacion (Lum)',
              data: ilu,
              borderColor: 'green',
              
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

export default Exp3
