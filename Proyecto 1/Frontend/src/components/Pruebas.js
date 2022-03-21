import '../index.css'
import React, { useEffect, useState, useRef } from 'react'
import { Line, defaults } from "react-chartjs-2";
import { Cuadro, CuadroX,Rectangulo, Cuadro2, RectanguloB, Carta, Texto } from './StyledElements'
import io from 'socket.io-client';
import '../App.css';
import { Nav } from './StyledElements'
import Select from 'react-select';
import formula from '../icons/formula.png'
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
  const [turbidezIn, setTurbidezIn] = useState([])
  const [nivelagua, setNivelagua] = useState([])
  const [turbidez, setTurbidez] = useState([])

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
    setTurbidezIn(info => data[data.length - 1].TurbidezIn)
    setNivelagua(info => data[data.length - 1].NivelAgua)
    setTurbidez(info => data[data.length - 1].Turbidez)
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
          wa.push(Math.trunc(100-((Humedad*100)/1024)))
          console.log(selectedValued)
          
        }else{
          
        }
      }else{
        return (
          wa.push(Math.trunc(100-((Humedad*100)/1024)))
        )
      }
      return(
        Math.trunc(100-((Humedad*100)/1024))
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
          nivA.push(((NivelAgua*452)/660))
          console.log(selectedValued)
          
        }else{
          
        }
      }else{
        return (
          nivA.push(((NivelAgua*452)/660))
        )
      }
      return(
        ((NivelAgua*452)/660)
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


  return (

    <div>
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


      <section className='cards-wrapper2'>
        <div className="card-grid-space">
          <h1>MEDICIONES</h1>
          <a className="card2" >
            <Cuadro>
              <h2>Humedad</h2>
              <h2>{Math.trunc(100-((humedad*100)/1024))}%</h2>
            </Cuadro>
            <Cuadro>
              <h2>Suciedad Entrada</h2>
              
              <h3>{turbidezIn} (fotodiodos)</h3>
              
            </Cuadro>
            <Cuadro>
              <h2>Suciedad Salida</h2>
              <br></br>
              
              <h3>{turbidez} (fotodiodos)</h3>
              
            </Cuadro>
            <Cuadro>
              <h2>Nivel Agua</h2>
              <h2>{((nivelagua*452)/660).toFixed(3)} cm^3</h2>
            </Cuadro>
          </a>
          <a className="cardY" >
            <div><h2>Niveles de suciedad: </h2></div>
            <CuadroX>
              <h3>0-100 fotodiodos (Agua muy limpia)</h3>
              <h3>101-190 fotodiodos (ligeramente sucia)</h3>
              <h3>191-... fotodiodos (Agua muy sucia)</h3>
            </CuadroX>
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
                    label: "Suciedad entrada (fotodiodo)",
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
                    label: "Humedad vs tiempo (%)",
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
                    label: "Cant. agua vs tiempo (cm^3/s)",
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
                    fontSize: 20,
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
                    label: "suciedad de salida (fotodiodos)",
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
          <a className="cardX" >

            <div>

            <h3>___________________________</h3>
            <h3>Tiempo de Llenado: <br></br>{(452/(((nivelagua*4)/660)*(3.1416*16))).toFixed(3)} s  </h3>
            <h3>___________________________</h3>
            <img src={formula} alt="Logo" />
            <h2></h2>
            </div>


          </a>
        </div>

        <div className="card-grid-space">
          <a className="cardX" >
            <div>
            <h3>___________________________</h3>
            <h3>Dimensiones del Recipiente: </h3>
            <h3>___________________________</h3>
            <h2>Alto: 4cm</h2>
            <h2>Radio: 6cm</h2>
            <h2>Volumen: 452cm^3</h2>
            </div>
          </a>
        </div>
      </section>
    </div>
  )
}


//---------------------------------------


export default Pruebas