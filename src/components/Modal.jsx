import { useState, useEffect } from "react"
import Mensaje from "./Mensaje"
import CerrarBtn from "../img/cerrar.svg"

const Modal = ({setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar, setGastoEditar}) => {

    const [nombre, setNombre] = useState("")    //trae el nombre del input
    const [cantidad, setCantidad] = useState("")
    const [categoria, setCategoria] = useState("")
    const [id, setId] = useState("")    //toma la id del gasto ya creado
    const [fecha, setFecha] = useState("")  //toma la fecha del gasto ya creado

    const [mensaje, setMensaje] = useState("")
    
    //Al cargar el modal se fija si el state de gastoEditar tiene algo. Si tiene algo, llena los input del modal con el los datos del gasto a editar
    useEffect(() => {
        if(Object.keys(gastoEditar).length > 0) {
            setNombre(gastoEditar.nombre)
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)
            setId(gastoEditar.id)
            setFecha(gastoEditar.fecha)
        }
    },[])

    //ocultar modal
    const ocultarModal = () => {
        setAnimarModal(false)
        setGastoEditar({})  //limpio el state de gastoEditar
        setTimeout(() => {
            setModal(false)
        }, 500);
    }

    //Submit
    const handleSubmit = e => {
        e.preventDefault()

        //validacion
        if([nombre, cantidad, categoria].includes("")) {
            setMensaje("Todos los campos son obligatorios")

            setTimeout(() => {
                setMensaje("")
            }, 3000);
            return
        } else if(cantidad <= 0) {
            setMensaje("Cantidad no valida")

            setTimeout(() => {
                setMensaje("")
            }, 3000);
            return
        }

        //envio el objeto para ser creado o editado
        guardarGasto(
            {nombre, 
            cantidad, 
            categoria,
            id,
            fecha
        })
    }

    return (
        <div className="modal">
            <div className="cerrar-modal">
                <img 
                    src={CerrarBtn} 
                    alt="cerrar-modal" 
                    onClick={ocultarModal}
                />
            </div>

            <form
                onSubmit={handleSubmit}
                className={`formulario ${animarModal ? "animar" : "cerrar"}`}   /*De esta forma llamo a las clases dinamicas. Estas clases de css se van a ejecutar segun la condicion. formulario se ejecuta siempre, animar y cerrar depende. */
            >    
                <legend>{gastoEditar.nombre ? "Editar gasto" : "Nuevo gasto"}</legend> {/*Compruebo si gastoEditar tiene algo */}
                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
                <div className="campo">
                    <label htmlFor="nombre">Nombre Gasto</label>
                    <input 
                        type="text"
                        placeholder="Añade el nombre del gasto" 
                        name="nombre" 
                        id="nombre"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>
                <div className="campo">
                    <label htmlFor="cantidad">Cantidad</label>
                    <input 
                        type="number"
                        placeholder="Añade la cantidad del gasto. Ej: $300" 
                        name="cantidad"
                        id="cantidad"
                        value={cantidad}
                        onChange={e => setCantidad(Number(e.target.value))}
                    />
                </div>
                <div className="campo">
                    <label htmlFor="categoria">Categoria</label>
                    <select 
                        id="categoria"
                        value={categoria}
                        onChange={e => setCategoria(e.target.value)}    //toma los values del option
                    >   Categoria
                        <option value="" hidden>-- Seleccione --</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos">Gastos Varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>
                </div>

                <input 
                    type="submit" 
                    value={gastoEditar.nombre ? "Guardar" : "Nuevo gasto"}
                />
            </form>
        </div>
    )
}

export default Modal
