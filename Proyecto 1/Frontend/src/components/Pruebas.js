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

  const [datos, setDatos] = useState([])

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
  const [filterDate, setFilterDate] = useState([]) //filterDate es un array que contiene las fechas de toma de datos
  const [filtro1, setFiltro1] = useState([])

  //-----------FILTRO
  const [inputvalue, setValue] = useState('')
  const [selectedValued, setSelectedValue] = useState(null) //selectedValued es el valor que se selecciona en el filtro
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
    console.log("GRAFICoooos")
    socket.current.emit("medicion", "asd-prueba");
    socket.current.on("medicion", async (mensaje) => {
      console.log("MENSAJE: ", mensaje);
     const auxiliar=[{
        Fecha: "03 19, 2022 14:51:46",
        Humedad: 451,
        NivelAgua: 10,
        PH: 0,
        Turbidez: 35,
        TurbidezIn: 234
        },
        {
        Fecha: "03 19, 2022 14:51:56",
        Humedad: 321,
        NivelAgua: 57,
        PH: 0,
        Turbidez: 200,
        TurbidezIn: 24
        }
        ,
        {
        Fecha: "03 19, 2022 14:52:46",
        Humedad: 440,
        NivelAgua: 90,
        PH: 0,
        Turbidez: 120,
        TurbidezIn: 234
        },
        {
        Fecha: "03 18, 2022 14:51:49",
        Humedad: 466,
        NivelAgua: 127,
        PH: 0,
        Turbidez: 205,
        TurbidezIn: 234
        },
        {
        Fecha: "03 18, 2022 14:53:22",
        Humedad: 47,
        NivelAgua: 100,
        PH: 0,
        Turbidez: 206,
        TurbidezIn: 234
        },
        {
        Fecha: "03 16, 2022 14:01:25",
        Humedad: 4,
        NivelAgua: 300,
        PH: 0,
        Turbidez: 290,
        TurbidezIn: 234
        },
        {
          Fecha: "03 16, 2022 14:01:28",
          Humedad: 402,
          NivelAgua: 483,
          PH: 0,
          Turbidez: 90,
          TurbidezIn: 234
          }
        
        ]
        //setDatos(auxiliar)
      setDatos(mensaje)

      //----------DATA PARA EL DASHBOARD----
      fillDasboard(mensaje)

      //-------MAPEOS PARA GRAFICAS---------
      let f=[];
      let mes = [];
      //let hum;

      //*/AQUI REPETIDO PERO SIN LOS USESTATE DENTROAAAAAAAAAAA*
      

      const fecha = mensaje.map(({ Fecha, NivelAgua, Humedad, Turbidez, PH }, i) => {
        var fecha_string = new Date(Fecha);
        mes.push(fecha_string.getDate() + '/' + (fecha_string.getMonth() + 1))//--> esto se puede poner en otro map
        return (
          f
        )
      })

     //  setPorcentaje(Array);


      //console.log(Array)
      //setGraph1(Array);
      //setAxis(fecha);
      saveDate2(mes)
    })


    /*****************************/
    let wa=[] //Grafica 1 Humedad
    let we=[] // Axis
    let tu1=[] //turbidez1 -> Al entrar el agua sucia
    let tu2=[] // turbidez2 -> Cuando el agua sale del filtro limpia
    let nivA=[] // Nivel de agua a traves del tiempo en el recipiente despues de filtrado
    
    let hum

    /* ***********GRAFICA2 -> HUMEDAD*********************/
    const Array = datos.map(({ Fecha, NivelAgua, Humedad, Turbidez,TurbidezIn, PH }, i) => {
      var fecha_string = new Date(Fecha);
      if(selectedValued!=null){
        if(fecha_string.getDate() + '/' + (fecha_string.getMonth() + 1)==selectedValued.label){
          wa.push(Math.trunc(100-((humedad*100)/1024)))
          console.log(selectedValued)
          
        }else{
          
        }
      }else{
        return (
          wa.push(Math.trunc(100-((humedad*100)/1024)))
        )
      }
      return(
        Math.trunc(100-((humedad*100)/1024))
      )

    })


    /**********GRAFICA 1 -> Turbidez de entrada******* */
    const turb1 = datos.map(({ Fecha, NivelAgua, Humedad, Turbidez,TurbidezIn, PH }, i) => {
      var fecha_string = new Date(Fecha);
      if(selectedValued!=null){
        if(fecha_string.getDate() + '/' + (fecha_string.getMonth() + 1)==selectedValued.label){
          tu1.push(TurbidezIn)
          console.log(selectedValued)
          
        }else{
          
        }
      }else{
        return (
          tu1.push(TurbidezIn)
        )
      }
      return(
        TurbidezIn
      )

    })



    /*******************GRAFICA 3 -> Nivel de agua luego de filtrada*********************** */

    const niv = datos.map(({ Fecha, NivelAgua, Humedad, Turbidez,TurbidezIn, PH }, i) => {
      var fecha_string = new Date(Fecha);
      if(selectedValued!=null){
        if(fecha_string.getDate() + '/' + (fecha_string.getMonth() + 1)==selectedValued.label){
          nivA.push(NivelAgua)
          console.log(selectedValued)
          
        }else{
          
        }
      }else{
        return (
          nivA.push(NivelAgua)
        )
      }
      return(
        NivelAgua
      )

    })

    /**************GRAFICA 4 -> Turbidez de Salida***************************/

    const turb2 = datos.map(({ Fecha, NivelAgua, Humedad, Turbidez,TurbidezIn, PH }, i) => {
      var fecha_string = new Date(Fecha);
      if(selectedValued!=null){
        if(fecha_string.getDate() + '/' + (fecha_string.getMonth() + 1)==selectedValued.label){
          tu2.push(Turbidez)
          console.log(selectedValued)
          
        }else{
          
        }
      }else{
        return (
          tu2.push(Turbidez)
        )
      }
      return(
        TurbidezIn
      )

    })

     /****************AXIS FECHAS*************/

     let f;
     const fecha = datos.map(({ Fecha, NivelAgua, Humedad, Turbidez, PH }, i) => {
      var fecha_string = new Date(Fecha);

      if(selectedValued!=null){

        let current=fecha_string.getDate() + '/' + (fecha_string.getMonth() + 1)

        if(current==selectedValued.label){
          //Aqui coloco la recoleccion de datos o setear f
          let m = fecha_string.getHours().toString() + ":" + fecha_string.getMinutes().toString() + ":" + fecha_string.getSeconds().toString();
          we.push(m)
          //setAxis(datos=>[...datos,m])
        }

      }else{
        let m = fecha_string.getHours().toString() + ":" + fecha_string.getMinutes().toString() + ":" + fecha_string.getSeconds().toString();
        we.push(m)
        //setAxis(datos=>[...datos,m])
      }

      return (
        f
      )
    })


    setAxis(we)
    setGraph1(tu1)
    setGraph2(wa)
    setGraph3(nivA)
    setGraph4(tu2)
    
    
    


    return () => {
      socket.current.disconnect();
    };
  }, [socket, selectedValued, datos]);




  console.log(selectedValued)
  console.log("LEEEEEEEEEEEEEEEEEEEN")
  console.log(axis.length)
  console.log("LAAAAAAAAAAAAAAAAAAN")

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
              <h2>{Math.trunc(100-((humedad*100)/1024))}%</h2>
            </Cuadro>
            <Cuadro>
              <h2>Turbidez</h2>
              <h2>{turbidez}NTU</h2>
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
          <a className="card">
            <Line
              data={{
                labels: axis,
                datasets: [
                  {
                    label: "Suciedad vs Tiempo (Al salir de vivienda)",
                    data: graph1,
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
                    data: graph2,
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
                labels: axis,
                datasets: [
                  {
                    label: "Cant. agua vs tiempo",
                    data: graph3,
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
                labels: axis,
                datasets: [
                  {
                    label: "suciedad vs tiempo (después de filtrado)",
                    data: graph4,
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