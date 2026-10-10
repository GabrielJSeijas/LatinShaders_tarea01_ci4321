import type { Shape } from './types';

// TODO: 6 triángulos alrededor del centro, con TRIANGLE_FAN o TRIANGLES.
// VAO propio con solo ATTRIB.POSITION. Clip space, triángulos en CCW.
export function createHexagon(_gl: WebGL2RenderingContext): Shape {
  return {
    name: 'hexagono',
    draw(_ff) {
      // Aún no dibuja nada.
    },
  };
}
