import { useState, useEffect } from "react"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"    //importo el componente de la libreria que muestra el grafico de los gastos
import { formatearCantidad } from "./helpers"
import "react-circular-progressbar/dist/styles.css"
const ControlPresupuesto = ({presupuesto, gastos, setPresupuesto, setGastos, setIsValidPresupuesto}) => {

    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)
    const [porcentaje, setPorcentaje] = useState(0)

    //si añado gastos, se ejecuta
    useEffect(() => {
        const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0) //recorro el state de gastos, y le sumo la cantidad de ese gasto, mas el total que inicia en 0
        const totalDisponible = presupuesto - totalGastado

        //Calcular porcentaje gastado
        const porcentajeGastado = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(1)
        
        setGastado(totalGastado)
        setDisponible(totalDisponible)

        setTimeout(() => {
            setPorcentaje(porcentajeGastado)
        }, 1500);
    }, [gastos])

    //reiniciar la app
    const handleResetApp = () => {
        const resultado = confirm("¿Deseas resetear el presupuesto y los gastos?")
        if(resultado) {
            setGastos([])
            setPresupuesto(0)
            setIsValidPresupuesto(false)
        }
    }

    return (
        <div className="contenedor-presupuesto contenedor sombra dos-columnas">
            <div>
                <CircularProgressbar
                    styles={buildStyles({   //le da colores a la grafica
                        pathColor: porcentaje > 100 ? "#dc2626" : "#3b82f6",    //color del porcentaje gastado
                        trailColor: "#f5f5f5",   //color del dinero disponible
                        textColor: porcentaje > 100 ? "#dc2626" : "#3b82f6"    //color del texto dentro del grafico
                    })}
                    value={porcentaje}  //muestra la barra de color segun el % gastado
                    text={`${porcentaje}% Gastado`} //muestra adentro de la grafica el % gastado
                />
            </div>
            <div className="contenido-presupuesto">
                <button
                    className="reset-app"
                    onClick={handleResetApp}
                >
                    Resetear la app
                </button>
                <p><span>Presupuesto: </span>{formatearCantidad(presupuesto)}</p>
                <p className={`${disponible < 0 && "negativo"}`}><span>Disponible: </span>{formatearCantidad(disponible)}</p>
                <p><span>Gastado: </span>{formatearCantidad(gastado)}</p>
            </div>
        </div>
    )
}

export default ControlPresupuesto