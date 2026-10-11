import { ATTRIB } from '../vendor/ff/ff';
import type { Shape } from './types';

// Hexagono regular centrado en el origen con radio 0.5, igual que el semilado del cuadrado.
// Vertices cada 60 grados empezando en (R, 0) y avanzando en sentido antihorario.
const R = 0.5;
const H = R * Math.sqrt(3) / 2; // altura de los vertices superiores e inferiores

// Posiciones x, y, z por vertice. El 0 es el centro, del 1 al 6 el borde en orden CCW.
const POSITIONS = new Float32Array([
   0.0,    0.0, 0.0, // 0 centro
   R,      0.0, 0.0, // 1 derecha
   R / 2,  H,   0.0, // 2 arriba derecha
  -R / 2,  H,   0.0, // 3 arriba izquierda
  -R,      0.0, 0.0, // 4 izquierda
  -R / 2, -H,   0.0, // 5 abajo izquierda
   R / 2, -H,   0.0, // 6 abajo derecha
]);

// Seis triangulos CCW, cada uno formado por el centro y dos vertices consecutivos del borde.
const INDICES = new Uint16Array([
  0, 1, 2,
  0, 2, 3,
  0, 3, 4,
  0, 4, 5,
  0, 5, 6,
  0, 6, 1,
]);

const STRIDE_BYTES = 3 * 4; // x, y, z

export function createHexagon(gl: WebGL2RenderingContext): Shape {
  const vertexBuffer = gl.createBuffer()!;
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, POSITIONS, gl.STATIC_DRAW);

  const indexBuffer = gl.createBuffer()!;

  // VAO propio, igual que el cuadrado: el index buffer se bindea con el VAO activo
  // para que quede guardado en su estado.
  const vao = gl.createVertexArray()!;
  gl.bindVertexArray(vao);
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.enableVertexAttribArray(ATTRIB.POSITION);
  gl.vertexAttribPointer(ATTRIB.POSITION, 3, gl.FLOAT, false, STRIDE_BYTES, 0);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, INDICES, gl.STATIC_DRAW);
  gl.bindVertexArray(null);

  return {
    name: 'hexagono',
    draw(ff) {
      gl.bindVertexArray(vao);
      ff.drawElements(gl.TRIANGLES, INDICES.length, gl.UNSIGNED_SHORT, 0);
    },
  };
}
