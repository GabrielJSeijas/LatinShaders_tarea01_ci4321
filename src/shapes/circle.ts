import type { Shape } from './types';

export function createCircle(_gl: WebGL2RenderingContext): Shape {
  return {
    name: 'circulo',
    draw(_ff) {
      //aun no se dibuja nada.
    },
  };
}
