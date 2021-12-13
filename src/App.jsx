import { useState, useEffect } from 'react'
import Header from './components/Header'
import ListadoGastos from './components/ListadoGastos'
import IconoNuevoGasto from "./img/nuevo-gasto.svg"
import Modal from './components/Modal'
import {generarId, generarFecha } from './components/helpers'
import Filtro from './components/Filtros'
function App() {

  const [presupuesto, setPresupuesto] = useState(Number(localStorage.getItem("presupuesto"))?? 0)  //si hay algo en LS, cargo el state con ese valor por default, sino le asigno 0
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false) //el presupuesto tiene que ser mayor a 0

  const [modal, setModal] = useState(false) //cuando toco el boton de + se muestra el modal
  const [animarModal, setAnimarModal] = useState(false) //muestra una animacion del modal al abrirlo

  const [gastos, setGastos] = useState(localStorage.getItem("gastos") ? JSON.parse(localStorage.getItem("gastos")): [])   //por default consulta al LS, y si hay algo, lo convierte de string a array. Si no hay nada, inicia con un []

  const [gastoEditar, setGastoEditar] = useState({})

  const [filtro, setFiltro] = useState("")
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  //al cargar el componente, consulto si hay un presupuesto en LS. Si hay, cargo ListadoGastos, sino, le asigno 0 al LS
  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem("presupuesto")) ?? 0
    if (presupuestoLS > 0) {
      setIsValidPresupuesto(true)
    }
  }, [])

  //cuando ingrese presupuesto, le asigno ese valor al LS, si presupuesto no tiene nada le asigno 0 al LS
  useEffect(() => {
    localStorage.setItem("presupuesto", presupuesto ?? 0)
  },[presupuesto])

  //cuando cambie gastos, lo guardo en LS como string, sino guardo un arreglo vacio
  useEffect(() => {
    localStorage.setItem("gastos", JSON.stringify(gastos) ?? [])
  },[gastos])

  //si en el state de gastoEditar hay algo, llamo al modal
  useEffect(() => {
    if(Object.keys(gastoEditar).length > 0) {
      setModal(true)
      setTimeout(() => {
        setAnimarModal(true)
      }, 200);
    }
  }, [gastoEditar])

  //filtrar los gastos por categorias
  useEffect(() => {
    if(filtro) {
      const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro)
      setGastosFiltrados(gastosFiltrados)
    }
  },[filtro])

  //mostrar boton + y modal
  const handleNuevoGasto = () => {
    setModal(true)
    setTimeout(() => {
      setAnimarModal(true)
    }, 200);
  }

  //guardo o edito el gasto y cierro el modal
  const guardarGasto = gasto => {
    //si existe un gasto
    if(gasto.id) {
      //Editar gasto
      const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState)  //si la id del gasto que hay en el state de gastos coincide con la id del gasto que estoy mandando por el submit, sobreescribe ese gasto, sino, lo deja tal cual como está
      setGastos(gastosActualizados)
      setGastoEditar({})  //limpio el state
    } else {
      //Nuevo Gasto
      gasto.id = generarId()
      gasto.fecha = generarFecha(Date.now())
      setGastos([
        ...gastos,
        gasto
      ])
    }   
    setAnimarModal(false)
    setTimeout(() => {
      setModal(false)
    }, 500);
  }

  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id)
    setGastos(gastosActualizados)
  }


  return (
    <div className={modal ? "fijar" : ""}>  {/*Cuando el modal se esté mostrando, llamar a la clase fijar. Fijar hace que el modal ocupe al maximo el tamaño de la pantalla */}
      <Header
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />
      {isValidPresupuesto && (
        <>
          <main>
            <Filtro
              filtro={filtro}
              setFiltro={setFiltro}
            />
            <ListadoGastos
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </main>
          <div className="nuevo-gasto">
            <img 
              src={IconoNuevoGasto} 
              alt="nuevo-gasto"
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}

      {modal && <Modal 
                  setModal={setModal} 
                  animarModal={animarModal} 
                  setAnimarModal={setAnimarModal}
                  guardarGasto={guardarGasto}
                  gastoEditar={gastoEditar}
                  setGastoEditar={setGastoEditar}
                />
      }
      
    </div>
  )
}

export default App
