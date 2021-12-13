import {LeadingActions, SwipeableList, SwipeableListItem, SwipeAction, TrailingActions} from "react-swipeable-list" //para las animaciones de los gastos
import "react-swipeable-list/dist/styles.css"
import IconoAhorro from "../img/icono_ahorro.svg"
import IconoCasa from "../img/icono_casa.svg"
import IconoComida from "../img/icono_comida.svg"
import IconoGastos from "../img/icono_gastos.svg"
import IconoOcio from "../img/icono_ocio.svg"
import IconoSalud from "../img/icono_salud.svg"
import IconoSuscripciones from "../img/icono_suscripciones.svg"

//Creo un objeto que almacene las imagenes segun corresponda. El nombre de cada uno tiene que ser igual a los options que hay en el Modal.jsx
const diccionarioIconos = {
    ahorro: IconoAhorro,
    comida: IconoComida,
    casa: IconoCasa,
    gastos: IconoGastos,
    ocio: IconoOcio,
    salud: IconoSalud,
    suscripciones: IconoSuscripciones
}

const Gasto = ({gasto, setGastoEditar, eliminarGasto}) => {

    const {nombre, cantidad, categoria, fecha, id} = gasto

    //Animacion derecha para editar - hago un return de dos componentes importados. Uno de los componentes traen estilos simples. Pero toma los estilos del index.css ya que los nombres de las clases son las mismas
    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction onClick={() => setGastoEditar(gasto)}>
                Editar
            </SwipeAction>
        </LeadingActions>
    )
    //Animacion izquierda para eliminar
    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction 
                onClick={() => eliminarGasto(id)}
                destructive={true}
            >
                Eliminar
            </SwipeAction>
        </TrailingActions>
    )

    return (
        <SwipeableList>
            <SwipeableListItem
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}
            >
                <div className="gasto sombra">
                    <div className="contenido-gasto">
                        <img //recorro el diccionario y muestro la imagen que coincida con el nombre de la categoria del gasto
                            src={diccionarioIconos[categoria]} 
                            alt="icono-gasto" 
                        />
                        <div className="descripcion-gasto">
                            <p className="categoria">{categoria}</p>
                            <p className="nombre-gasto">{nombre}</p>
                            <p className="fecha-gasto">Agregado el
                                <span> {fecha}</span>    
                            </p>
                        </div>
                    </div>  
                    <p className="cantidad-gasto">${cantidad}</p>
                </div>
            </SwipeableListItem>
        </SwipeableList>
    )
}

export default Gasto
