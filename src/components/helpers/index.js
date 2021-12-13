//Genero una id
export const generarId = () => {
    const random = Math.random().toString(36).substr(2)
    const fecha = Date.now().toString(36)

    return random + fecha
}

//generar fecha
export const generarFecha = fecha => {  //trae la fecha del Modal
    const fechaNueva = new Date(fecha)
    const opciones = {year: "numeric", month: "long", day: "2-digit"}
    return fechaNueva.toLocaleDateString("es-AR", opciones)
}

//generar peso argentino
export const formatearCantidad = cantidad => cantidad.toLocaleString("es-AR", { style: "currency", currency: "ARS"})
