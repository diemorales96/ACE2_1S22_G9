import React, { useEffect, useState, useRef } from 'react'
import { Line, defaults } from "react-chartjs-2";
import { Cuadro, Rectangulo, Cuadro2, RectanguloB, Carta, Texto } from './StyledElements'
import io from 'socket.io-client';
import '../App.css';
import {Nav} from './StyledElements'
var sd = require('silly-datetime')


const baseUrl = "http://localhost:5000";



function Pruebas() {
      //HOOKS
  const [graph1, setGraph1] = useState([])
  const [graph2, setGraph2] = useState([])
  const [graph3, setGraph3] = useState([])
  const [graph4, setGraph4] = useState([])
  const [graph5, setGraph5] = useState([])
  const [porcentaje, setPorcentaje] = useState([])
  const [axis, setAxis] = useState([0])

  const socket = useRef();
 
      //-------------------
  useEffect(() => {
  console.log("Conexion Front")
  socket.current = io.connect("http://localhost:5000");
  socket.current.emit("medicion", "asd-prueba");
  socket.current.on("medicion", async (mensaje) => {
    console.log("MENSAJE: ", mensaje);
    let f;
    let mes;
    const Array = mensaje.map( ({Fecha,NivelAgua,Humedad,Turbidez,PH}, i) => {
      return (
              Humedad
      )
    })
    const fecha = mensaje.map( ({Fecha,NivelAgua,Humedad,Turbidez,PH}, i) => {
      var fecha_string = new Date(Fecha);
      var Xmas95 = new Date(Fecha);
      mes = Xmas95.toLocaleString('default', { weekday: 'long' })
      //var hours = Xmas95.getHours();

      console.log(mes); // 23
      f = fecha_string.getHours().toString() + ":" + fecha_string.getMinutes().toString()+ ":" + fecha_string.getSeconds().toString();
      
      //dia = fecha_string.getDay().toString();
      //console.log(fecha_string);
      //console.log(fecha_string.getMinutes());
      return (
            f
      )
    })
    setPorcentaje(Array);

    setAxis(fecha);
    console.log(Array);
  })
  
  return () => {
    socket.current.disconnect();
  };}, [socket]);
  


  return (

      <div>
          <Nav>
              <Texto>
                  <h1 >
                    DASHBOARD 
                  </h1>
              </Texto>
          </Nav>

    <section className="cards-wrapper">
  <div className="card-grid-space">
    filtro?
    <a className="card">
    <Line
          data={{
            labels: axis,
            datasets: [
              {
                label: "graph5",
                data: porcentaje,
                borderColor: "blue",
                borderWidth: 1,
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
    </a>
  </div>
  <div className="card-grid-space">
    <a className="card">
    <Line
          data={{
            labels: [1,2,5,1,1,1,1,1],
            datasets: [
              {
                label: "suciedad vs tiempo",
                data: [1,2,3,2,4,6,7,8],
                borderColor: "orange",
                borderWidth: 1,
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
        
    </a>
  </div>
  <div className="card-grid-space">
    <a className="card" >
    <Line
          data={{
            labels: [1,2,5,1,1,1,1,1],
            datasets: [
              {
                label: "graph2",
                data: [1,2,5,20,1,60,1,1],
                borderColor: "red",
                borderWidth: 1,
                
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
    </a>
  </div>
  <div className="card-grid-space">
    <a className="card" >
    <Line
            
            data={{
              labels: [1,2,5,1,1,1,1,1],
              datasets: [
                {
                  label: "graph4",
                  data: [1,2,3,2,4,6,7,8],
                  borderColor: "purple",
                  borderWidth: 1,
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
                  fontSize: 15,
                },
              },
            }
          }
          />

    </a>
  </div>
  <div className="card-grid-space">
    <a className="card" >
    <Line
          data={{
            labels: [1,2,5,1,2,2,2,2,2,2,0],
            datasets: [
              {
                label: "graph3",
                data: [1,2,3,15,3,4,12,9,1,4,5],
                borderColor: "green",
                borderWidth: 1,
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

    </a>
  </div>
  <div className="card-grid-space">
    <h1>MEDICIONES</h1>
    <a className="card" >
      <Cuadro>Agua sucia 25.4</Cuadro>
      <Cuadro>sss</Cuadro>
      <Cuadro>sss</Cuadro>
    </a>
  </div>
</section>
</div>
  )
}

export default Pruebas