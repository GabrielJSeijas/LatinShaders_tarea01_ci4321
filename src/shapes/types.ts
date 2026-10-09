import type { FixedFunction } from '../vendor/ff/ff';

// Una figura que se puede dibujar. Cada figura va a vivir en su propio archivo en src/shapes/

export interface Shape {
  name: string;
  // Bindea su Vao y llama ff.drawArrays o ff.drawElements
  draw(ff: FixedFunction): void;
}
