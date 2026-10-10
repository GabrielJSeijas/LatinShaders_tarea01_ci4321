// Datos compartidos entre figuras: tamaño de canvas, color de fondo y posiciones.

/** Background color #1b1e2b as linear floats in [0, 1]. */
export const CLEAR_COLOR: readonly [number, number, number, number] = [0x1b / 255, 0x1e / 255, 0x2b / 255, 1];

/** Canvas size in device pixels. */
export const CANVAS_SIZE = 480;

/** Posiciones del triángulo: x, y, z por vértice. Clip space, antihorario (CCW). */
export const TRIANGLE_POSITIONS = new Float32Array([
   0.0,   0.7,  0.0, // arriba
  -0.7,  -0.6,  0.0, // abajo izquierda
   0.7,  -0.6,  0.0, // abajo derecha
]);
