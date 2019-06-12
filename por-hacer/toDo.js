/**
 * CONSTANTE PARA MANEJAR ARCHIVOS DEL  SISTEMA
 */
const fs = require('fs');


let listadoPorHacer = [];

/**
 * FUNCION QUE ALMACENA EL ARRAY EN UN OBJETO JSON Y L0 GRABA EN UN ARCHIVO
 */
const guardarDb = () => {
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile(`db/data.json`, data, (err) => {
        if (err) throw new Error('No se pudo grabar', err);

    });
}

/**
 * FUNCION PARA OBTENER EL LISTADO
 */
let getListado = () => {

    // let lista = require('../db/data.json');

    // return lista;
    cargarDb();
    return listadoPorHacer;

}
/**
 * FUNCION PARA ACTUALIZAR EL LISTADO, CAMBIAR SU ESTADO
 */
const actualizar = (descripcion, completado = true) => {

    cargarDb();
    //findIndex permite encontrar una coincidencia en el arreglo a traves de la busqueda de una palabra clave
    let index = listadoPorHacer.findIndex(tarea =>
        tarea.descripcion === descripcion);

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDb();
        return true
    } else {
        return false
    }
}
/**
 * FUNCION PARA CARGAR LA BASE DE DATOS, LECTURA DE ARCHIVO JSON
 */
cargarDb = () => {

    try {
        listadoPorHacer = require('../db/data.json');

    } catch (error) {
        listadoPorHacer = [];
    }

    //console.log(listadoPorHacer);


}

/**
 * FUNCION QUE AGREGA UN NUEVO ITEM A NUESTRA LISTA DEL ARCHIVO JSON
 */
const crear = (descripcion) => {

    cargarDb();


    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);

    guardarDb();

    return porHacer;

}
/**
 * FUNCION PARA ELIMINAR UN ELEMENTO DE LA LISTA Y DEL ARCHVIO JSON
 */
const borrar = (descripcion) => {
    cargarDb();
    
    //permite filtrar un elemento en particular o eliminar devolviendo un nuevo arreglo
    let nuevoListado = listadoPorHacer.filter(tarea=>tarea.descripcion !== descripcion);

    if (listadoPorHacer === nuevoListado.lenght) {
        return false;
    }else{
        listadoPorHacer = nuevoListado;
        guardarDb();
        return true;
    }

    /*let index = listadoPorHacer.findIndex(tarea =>
        tarea.descripcion === descripcion);
    if (index >= 0) {
        listadoPorHacer.splice([index],1);
        guardarDb();
        return true
    } else {
        return false
    }*/


}
/**
 * MODULOS QUE PERMITEN LA EXPORTACION DE NUESTRO ARCHIVO Y FUNCIONES
 */
module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}