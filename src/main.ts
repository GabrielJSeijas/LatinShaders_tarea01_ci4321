import './style.css';
import { createFixedFunction, LIGHTING } from './vendor/ff/ff';
import type { Color } from './vendor/ff/ff';
import { CANVAS_SIZE, CLEAR_COLOR } from './examples/shared';
import { createTriangle } from './shapes/triangle';
import { createSquare } from './shapes/square';
import { createHexagon } from './shapes/hexagon';
import { createCircle } from './shapes/circle';

// Contenedor donde se dibuja el canvas
const stage = document.getElementById('stage')!;

// Crea un canvas y lo agrega al contenedor
const canvas = document.createElement('canvas');
stage.replaceChildren(canvas);

const gl = canvas.getContext('webgl2');
if (!gl) throw new Error('WebGL2 is not available.');

// Tamaño de canvas, viewport y color de fondo
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
gl.viewport(0, 0, canvas.width, canvas.height);
gl.clearColor(...CLEAR_COLOR);

// FF reemplaza el pipeline fijo de OpenGL 2 Sin iluminacion, el color sale de ff.setColor
const ff = createFixedFunction(gl, { debug: true });
ff.disable(LIGHTING);

// Figuras creadas una sola vez, en el orden en que se ciclan con "Cambiar figura"
const shapes = [createTriangle(gl), createSquare(gl), createHexagon(gl), createCircle(gl)];

// Colores disponibles, en el orden en que se ciclan con "Cambiar color"
const colors: { name: string; value: Color }[] = [
  { name: 'rojo', value: [1, 0, 0] },
  { name: 'verde', value: [0, 1, 0] },
  { name: 'azul', value: [0, 0, 1] },
];

let shapeIndex = 0;
let colorIndex = 0;

// Botones y estado
const btnFigura = document.getElementById('btn-figura')!;
const btnColor = document.getElementById('btn-color')!;
const estado = document.getElementById('estado')!;

// Renderiza la figura actual con el color actual y actualiza el estado
const render = (): void => {
  gl.clear(gl.COLOR_BUFFER_BIT);
  ff.setColor(colors[colorIndex].value);
  shapes[shapeIndex].draw(ff);
  estado.textContent = `${shapes[shapeIndex].name} - ${colors[colorIndex].name}`;
};

btnFigura.addEventListener('click', () => {
  shapeIndex = (shapeIndex + 1) % shapes.length;
  render();
});

btnColor.addEventListener('click', () => {
  colorIndex = (colorIndex + 1) % colors.length;
  render();
});

render();
