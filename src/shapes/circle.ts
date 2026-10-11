import { ATTRIB } from '../vendor/ff/ff';
import type { Shape } from './types';

// Cantidad de segmentos con los que se aproxima el circulo. Con 6 queda igual al hexagono.
export const SEGMENTS = 64;

// Mismo radio que el hexagono para poder compararlos.
const R = 0.5;

const STRIDE_BYTES = 3 * 4; // x, y, z

// Genera las posiciones para un TRIANGLE_FAN: el centro primero y luego los vertices
// del borde en sentido antihorario (CCW). El primer vertice del borde se repite al final
// para cerrar el circulo, por eso son SEGMENTS + 2 vertices.
function buildPositions(segments: number): Float32Array {
  const positions = new Float32Array((segments + 2) * 3);
  // positions[0..2] quedan en 0: es el centro
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * 2 * Math.PI;
    positions[(i + 1) * 3 + 0] = R * Math.cos(angle);
    positions[(i + 1) * 3 + 1] = R * Math.sin(angle);
    positions[(i + 1) * 3 + 2] = 0.0;
  }
  return positions;
}

export function createCircle(gl: WebGL2RenderingContext): Shape {
  const positions = buildPositions(SEGMENTS);
  const vertexCount = positions.length / 3;

  const buffer = gl.createBuffer()!;
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

  // VAO propio: solo ATTRIB.POSITION habilitado, el color lo da ff.setColor.
  const vao = gl.createVertexArray()!;
  gl.bindVertexArray(vao);
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.enableVertexAttribArray(ATTRIB.POSITION);
  gl.vertexAttribPointer(ATTRIB.POSITION, 3, gl.FLOAT, false, STRIDE_BYTES, 0);
  gl.bindVertexArray(null);

  return {
    name: 'circulo',
    draw(ff) {
      gl.bindVertexArray(vao);
      ff.drawArrays(gl.TRIANGLE_FAN, 0, vertexCount);
    },
  };
}
