import { ATTRIB } from '../vendor/ff/ff';
import type { Shape } from './types';

// Posiciones x, y, z por vertice. Clip spac centrado en el origen semilado 0.5
// en los anexos se ve un poco mas pequeño, por eso en 0.5 
const POSITIONS = new Float32Array([
  -0.5, -0.5, 0.0, // abajo izquierda
   0.5, -0.5, 0.0, // abajo derecha
   0.5,  0.5, 0.0, // arriba derecha
  -0.5,  0.5, 0.0, // arriba izquierda
]);

// Dos triangulos CCW que cubren el cuadrado compartiendo la diagonal 0-2.
const INDICES = new Uint16Array([
  0, 1, 2,
  0, 2, 3,
]);

const STRIDE_BYTES = 3 * 4; // x, y, z 

export function createSquare(gl: WebGL2RenderingContext): Shape {
  const vertexBuffer = gl.createBuffer()!;
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, POSITIONS, gl.STATIC_DRAW);

  const indexBuffer = gl.createBuffer()!;

  // VAO propio solo ATTRIB.POSITION habilitado El index buffer se bindea mientras
  // el VAO está activo asi el VAO lo recuerda como parte de su propio estado.
  const vao = gl.createVertexArray()!;
  gl.bindVertexArray(vao);
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.enableVertexAttribArray(ATTRIB.POSITION);
  gl.vertexAttribPointer(ATTRIB.POSITION, 3, gl.FLOAT, false, STRIDE_BYTES, 0);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, INDICES, gl.STATIC_DRAW);
  gl.bindVertexArray(null);

  return {
    name: 'cuadrado',
    draw(ff) {
      gl.bindVertexArray(vao);
      ff.drawElements(gl.TRIANGLES, INDICES.length, gl.UNSIGNED_SHORT, 0);
    },
  };
}
