

const descripcion = {
    demand: true,
    alias: 'd',
    desc: 'descripcion de la tarea por hacer'
}

const completado ={    
        default: true,
        alias:'c',
        desc:'marca como completado o pendiente la tarea'
}

const argv = require('yargs')
    .command('crear', 'Crear un elemento por hacer',{
        descripcion
    })
    .command('actualizar', 'Actualiza el estado completado de una tarea',{
        descripcion,
        completado})
    .command('borrar', 'Borra una tarea de la lista',{
        descripcion
    })
    .help()
    .argv;


/**
 * ===================PARA EXPORTAR MODULE.EXPORT
 */
module.exports = {
    argv
}