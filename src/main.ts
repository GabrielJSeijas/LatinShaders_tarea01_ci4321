import './style.css';
import { createFixedFunction, LIGHTING } from './vendor/ff/ff';
import { CANVAS_SIZE, CLEAR_COLOR } from './examples/shared';
import { createTriangle } from './shapes/triangle';

// Contenedor donde se va a dibujar el canvas.
const stage = document.getElementById('stage')!;

// Crea un canvas y lo agrega al contenedor.
const canvas = document.createElement('canvas');
stage.replaceChildren(canvas);

const gl = canvas.getContext('webgl2');
if (!gl) throw new Error('WebGL2 is not available.');

// Tamaño de canvas, viewport y color de fondo.
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
gl.viewport(0, 0, canvas.width, canvas.height);
gl.clearColor(...CLEAR_COLOR);

// FF reemplaza el pipeline fijo de OpenGL 2. Sin iluminación: el color sale de ff.setColor.
const ff = createFixedFunction(gl, { debug: true });
ff.disable(LIGHTING);

const triangle = createTriangle(gl);

gl.clear(gl.COLOR_BUFFER_BIT);
ff.setColor([1, 0, 0]);
triangle.draw(ff);
