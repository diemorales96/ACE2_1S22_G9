import '../index.css'
import React, { useEffect, useState, useRef } from 'react'
import { Line, defaults } from "react-chartjs-2";
import { Cuadro, Rectangulo, Cuadro2, RectanguloB, Carta, Texto } from './StyledElements'
import io from 'socket.io-client';
import '../App.css';
import { Nav } from './StyledElements'
import Select from 'react-select';
//import 'bootstrap/dist/css/bootstrap.min.css';



const baseUrl = "http://localhost:5000";



function Pruebas() {
  //HOOKS
  const actions = [
    { label: "Add", value: 1 },
    { label: "Delete", value: 2 }
  ];


  //----PARA GRAFICAS-----------
  const [graph1, setGraph1] = useState([])
  const [graph2, setGraph2] = useState([])
  const [graph3, setGraph3] = useState([])
  const [graph4, setGraph4] = useState([])
  const [graph5, setGraph5] = useState([])

  //------ PARA DASHBOARD--------
  const [humedad, setHumedad] = useState([])
  const [turbidez, setTurbidez] = useState([])
  const [nivelagua, setNivelagua] = useState([])

  //--------AXIS DE LAS GRAFICAS
  const [axis, setAxis] = useState([0])

  //---------PRUEBAS/TESTS
  const [porcentaje, setPorcentaje] = useState([])
  const [filterDate, setFilterDate] = useState([])
  const [filtro1, setFiltro1] = useState([])

  //-----------FILTRO
  const [inputvalue, setValue] = useState('')
  const [selectedValued, setSelectedValue] = useState(null)
  const handleInputChance = value => {
    setValue(value)
  }

  const handleChange = value => {
    setSelectedValue(value)
  }

  const socket = useRef();
  const filtroFechas = useRef([])


  //-----FUNCION PARA LLENAR EL DASHBOARD REAL TIME--

  function fillDasboard(data) {
    setHumedad(info => data[data.length - 1].Humedad)
    setTurbidez(info => data[data.length - 1].Turbidez)
    setNivelagua(info => data[data.length - 1].NivelAgua)
  }


  function saveDate2(date) {
    let aux = []
    let aux2 = []
    date.map((values, index) => {
      if (aux.indexOf(values) > -1) {
        console.log("Ya existe la fecha bb")
      } else {
        const obj = { label: values, value: index }
        aux.push(values)
        aux2.push(obj)
      }
    })
    setFilterDate(aux2)
  }

  //-------------------
  useEffect(() => {
    console.log("Conexion Front")
    socket.current = io.connect("http://localhost:5000");
    socket.current.emit("medicion", "asd-prueba");
    socket.current.on("medicion", async (mensaje) => {
      console.log("MENSAJE: ", mensaje);

      //----------DATA PARA EL DASHBOARD----
      fillDasboard(mensaje)

      //-------MAPEOS PARA GRAFICAS---------
      let f;
      let mes = [];
      const Array = mensaje.map(({ Fecha, NivelAgua, Humedad, Turbidez, PH }, i) => {
        return (
          Humedad
        )
      })
      
      const fecha = mensaje.map(({ Fecha, NivelAgua, Humedad, Turbidez, PH }, i) => {
        var fecha_string = new Date(Fecha);
        /* if(fechaFiltro) then return fecha que contenga el friltro
        1 fecha map para cada grafica */
        mes.push(fecha_string.getDate() + '/' + (fecha_string.getMonth() + 1))
        f = fecha_string.getHours().toString() + ":" + fecha_string.getMinutes().toString() + ":" + fecha_string.getSeconds().toString();

        return (
          f
        )
      })

      setPorcentaje(Array);
      setGraph1(Array);
      setAxis(fecha);
      saveDate2(mes)
    })

    return () => {
      socket.current.disconnect();
    };
  }, [socket]);




  console.log(selectedValued)
  return (

    <div>
      /*******************************/
      /*NAV Y FILTRO PARA FECHAS */
      <Nav>
        <Texto>
          <h1>DASHBOARD</h1>
        </Texto>
        <div className='container'>
          <div className='row'>
            <div className='col-md-4'></div>
            <div className='col-md-4'>
              <Select options={filterDate} value={selectedValued} OnInputChange={handleChange} onChange={handleChange} />
            </div>
            <div className='con-md-4'></div>
          </div>
        </div>
      </Nav>

/******************************************************************/
/*SECCION DE CARD-WRAPPER PARA ALOCAR EL DASHBOARD DE MEDICIONES */
      <section className='cards-wrapper2'>
        <div className="card-grid-space">
          <h1>MEDICIONES</h1>
          <a className="card2" >
            <Cuadro>
              <h2>Humedad</h2>
              <h2>{humedad}%</h2>
            </Cuadro>
            <Cuadro>
              <h2>Turbidez</h2>
              <h2>{turbidez}</h2>
            </Cuadro>
            <Cuadro>
              <h2>Nivel Agua</h2>
              <h2>{nivelagua}</h2>
            </Cuadro>
          </a>
        </div>
      </section>

   

      <section className="cards-wrapper">
        <div className="card-grid-space">
          filtro?
          <a className="card">
            <Line
              data={{
                labels: axis,
                datasets: [
                  {
                    label: "Suciedad vs Tiempo (Al salir de vivienda)",
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
                    fontSize: 15,
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
                labels: axis,
                datasets: [
                  {
                    label: "Humedad vs tiempo",
                    data: graph1,
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
                labels: [1, 2, 5, 1, 1, 1, 1, 1],
                datasets: [
                  {
                    label: "Cant. agua vs tiempo",
                    data: [1, 2, 5, 20, 1, 60, 1, 1],
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
                labels: [1, 2, 5, 1, 1, 1, 1, 1],
                datasets: [
                  {
                    label: "suciedad vs tiempo (después de filtrado)",
                    data: [1, 2, 3, 2, 4, 6, 7, 8],
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
                labels: [1, 2, 5, 1, 2, 2, 2, 2, 2, 2, 0],
                datasets: [
                  {
                    label: "Tiempo requerido (Agua)",
                    data: [1, 2, 3, 15, 3, 4, 12, 9, 1, 4, 5],
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
      </section>
    </div>
  )
}


//---------------------------------------


export default Pruebas