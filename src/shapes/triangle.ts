import { ATTRIB } from '../vendor/ff/ff';
import { TRIANGLE_POSITIONS } from '../examples/shared';
import type { Shape } from './types';

const STRIDE_BYTES = 3 * 4; // x, y, z (Float32)

export function createTriangle(gl: WebGL2RenderingContext): Shape {
  const buffer = gl.createBuffer()!;
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, TRIANGLE_POSITIONS, gl.STATIC_DRAW);

  // VAO propio: solo ATTRIB.POSITION habilitado, el color lo da ff.setColor.
  const vao = gl.createVertexArray()!;
  gl.bindVertexArray(vao);
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.enableVertexAttribArray(ATTRIB.POSITION);
  gl.vertexAttribPointer(ATTRIB.POSITION, 3, gl.FLOAT, false, STRIDE_BYTES, 0);
  gl.bindVertexArray(null);

  return {
    name: 'triangulo',
    draw(ff) {
      gl.bindVertexArray(vao);
      ff.drawArrays(gl.TRIANGLES, 0, 3);
    },
  };
}
