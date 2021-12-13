import { useState } from "react"
import Mensaje from "./Mensaje"

const NuevoPresupuesto = ({presupuesto, setPresupuesto, setIsValidPresupuesto}) => {

    const [mensaje, setMensaje] = useState("")

    const handlePresupuesto = e => {
        e.preventDefault()

        //Validar
        if(!(presupuesto) || (presupuesto) <= 0) {
           setMensaje("No es un presupuesto Valido")
           return
        }
        setMensaje("")
        setIsValidPresupuesto(true)
    }

    return (
        <div className="contenedor-presupuesto contenedor sombra">
            <form 
                className="formulario"
                onSubmit={handlePresupuesto}
            >
                <div className="campo">
                    <label htmlFor="presupuesto">Definir Presupuesto</label>
                    <input 
                        className="nuevo-presupuesto"
                        type="number"
                        placeholder="Añade tu presupuesto"
                        name="presupuesto" 
                        id="presupuesto"
                        value={presupuesto}
                        onChange={e => setPresupuesto(Number(e.target.value))}  //el campo de tipo number bloquea el tipeo de letras, pero los numeros se ingresan como string. Por eso convierto esos strings a numeros con Number
                    />
                    <input 
                        type="submit"
                        value="Añadir"
                    />
                    {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}  {/*Tipo es una clase en css que le da color rojo al msj*/}
                </div>
            </form>
        </div>
    )
}

export default NuevoPresupuesto
