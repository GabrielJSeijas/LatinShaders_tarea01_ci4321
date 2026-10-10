import type { Shape } from './types';

// TODO: 4 vértices y 6 índices, dibujado con drawElements y gl.TRIANGLES.
// VAO propio con solo ATTRIB.POSITION. Clip space, triángulos en CCW.
export function createSquare(_gl: WebGL2RenderingContext): Shape {
  return {
    name: 'cuadrado',
    draw(_ff) {
      // Aún no dibuja nada.
    },
  };
}
