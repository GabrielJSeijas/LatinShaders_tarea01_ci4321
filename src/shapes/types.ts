import type { FixedFunction } from '../vendor/ff/ff';

// Una figura que se puede dibujar

export interface Shape {
  name: string;
  // Bindea su Vao y llama ff.drawArrays o ff.drawElements
  draw(ff: FixedFunction): void;
}
