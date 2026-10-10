import type { Shape } from './types';

// TODO: TRIANGLE_FAN o TRIANGLES con índices, generado a partir de una constante
// SEGMENTS (máximo 64). VAO propio con solo ATTRIB.POSITION. Clip space, CCW.
export function createCircle(_gl: WebGL2RenderingContext): Shape {
  return {
    name: 'circulo',
    draw(_ff) {
      // Aún no dibuja nada.
    },
  };
}
