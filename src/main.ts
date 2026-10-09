//Scaffolding de la página crea el canvas y arranca el dibujo del triangulo en este caso 
import './style.css';
import { run } from './examples/triangle.ff';

//Contenedor donde se va a dibujar el canvas
const stage = document.getElementById('stage')!;

//Crea un canvas y lo agrega al contenedor
const canvas = document.createElement('canvas');
stage.replaceChildren(canvas);


//Llama a la funcion run que dibuja el triangulo en el canvas
run(canvas);
