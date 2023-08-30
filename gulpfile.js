// src = funcion para obtener el archivo.scss
// dest = funcion para almacenar el archivo compilado en el disco duro.
// watch = funcion que verifica si hay cambios entonces vuelve a llamar la funcion.
// series = Se inicia una tarea y hasta que finaliza, inicia la siguiente. Ver linea: 41
// parallel = Todas inician al mismo tiempo. Ver linea: 42, descomentela y comente la 41
const { src, dest, watch, series, parallel } = require('gulp');

// Importamos sass y gulp-sass con esta sintaxis.
const sass = require('gulp-sass')(require('sass'));

const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');


// Funcion para compilar SASS (done = para decirle a gulp que ya terminó la tarea).
function css( done ) {
    // Pasos:
    src('./src/scss/app.scss') // 1- Identificar el archivo 
        .pipe( sass({outputStyle:'compressed'}) ) // 2- Compilarla. (En este caso le mandamos el tipo 'compressed para que pese menos.')
        .pipe( postcss( [ autoprefixer() ] ) ) // Para soportar otros navegadores (OPCIONAL), necesitariamos 'npm i --save-dev autoprefixer postcss gulp-postcss' y configuramos los navegadores que quisieramos darle soporte en el package.json
        .pipe( dest('build/css') ) // 3- Guardar el css.

    done();
}

// Funcion para compilar el archivo de SASS cada vez que hayan cambios.
function dev() {
    /* Primer parametro:
    1- Archivo a "vigilar".
    2- Funcion (callback) que va ejecutar cuando cambie el archivo. */
    // watch('./src/scss/app.scss', css)
    watch('./src/scss/**/*.scss', css); // Con esto le decimos que de todos los archivos que terminen en .scss y cambien algo ejecute la funcion css. De esta manera podemos dividir y ordenar en diferentes archivos .scss y cuando cambie uno de ellos igual se va a compilar con la funcion css.
}

function tareaDefault() {
    console.log('Soy la tarea por default...');
}

exports.css = css;
exports.dev = dev;

exports.default = series( css, dev);
// exports.default = parallel( css, dev);

/* Nota: 
- Para ejecutar las funciones lo hacemos con el comando
Gulp ___, ejemplo: Gulp dev -> Llama a la funcion dev...*/