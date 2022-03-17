import React, { useEffect, useState } from 'react'
import { Line, defaults } from "react-chartjs-2";
import { Cuadro, Rectangulo, Cuadro2, RectanguloB, Carta } from './StyledElements'
import io from 'socket.io-client';
import '../App.css';

const baseUrl = "http://localhost:3000";

function Dashboard() {
  //HOOKS
  const [graph1, setGraph1] = useState([])
  const [graph2, setGraph2] = useState([])
  const [graph3, setGraph3] = useState([])
  const [graph4, setGraph4] = useState([])
  const [graph5, setGraph5] = useState([])

    //-----------SOCKET CONNECTION
    const socket = io.connect(baseUrl);
 
    //-------------------
    useEffect(() => {      
      socket.emit("ram", "asd-prueba");    
      socket.on("ram", async (mensaje) => {
      console.log("MENSAJE: ", mensaje);
      //llenar(mensaje)
      })
    }, [socket]);




    
  return (
    
    <div>Dashboard
        <Rectangulo>
            <Cuadro>
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
            </Cuadro>
            
            <Cuadro>
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
            </Cuadro>
            <Cuadro>
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
            </Cuadro>
        </Rectangulo>
        <RectanguloB>
            <Cuadro>
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

            </Cuadro>

            <Cuadro>
            <Line
          data={{
            labels: [1,2,5,1,1,1,1,1],
            datasets: [
              {
                label: "graph5",
                data: [1,2,3,2,4,6,7,8],
                borderColor: "pink",
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

            </Cuadro>
        </RectanguloB>
    </div>
  )
}

export default Dashboard