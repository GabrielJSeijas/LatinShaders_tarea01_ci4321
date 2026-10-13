# Tarea 01 - Figuras en WebGL (CI4321)

Proyecto de LatinShaders para la Tarea 1 de Computación Gráfica I. Partimos del triángulo hecho con FixedFunction (FF) y lo extendimos para dibujar cuatro figuras, todas armadas solo con triángulos: un triángulo, un cuadrado, un hexágono y un círculo.

## Equipo

- Gabriel Seijas  
- Angel Valero   

## Requisitos

- Node.js 18 o superior
- npm
- Un navegador con soporte para WebGL2

## Cómo correrlo

1. Clonar el repo y entrar a la carpeta:

   ```
   git clone https://github.com/GabrielJSeijas/LatinShaders_tarea01_ci4321.git
   cd LatinShaders_tarea01_ci4321
   ```

2. Instalar las dependencias (este es el único paso que necesita internet):

   ```
   npm install
   ```

3. Levantar el servidor de desarrollo:

   ```
   npm run dev
   ```

4. Abrir `http://localhost:5173` en el navegador.

## Cómo se usa

La página arranca mostrando el triángulo en rojo.

- **Cambiar figura:** pasa por triángulo → cuadrado → hexágono → círculo y vuelve al triángulo.
- **Cambiar color:** pasa por rojo → verde → azul y vuelve al rojo. El color se mantiene cuando cambias de figura.

Sobre los botones se muestran la figura y el color actuales.

## Cómo está hecha cada figura

Cada figura tiene su propio VAO, que solo habilita `ATTRIB.POSITION`. El color se asigna con `ff.setColor`, así que ninguna figura guarda colores en sus buffers. Todas las posiciones están en clip space y todos los triángulos van en sentido antihorario (CCW).

| Figura | Cómo se dibuja |
| --- | --- |
| Triángulo | 3 vértices con `drawArrays` y `gl.TRIANGLES` |
| Cuadrado | 4 vértices y 6 índices con `drawElements` y `gl.TRIANGLES` |
| Hexágono | 7 vértices (el centro y 6 en el borde) y 18 índices con `drawElements` y `gl.TRIANGLES` |
| Círculo | `SEGMENTS + 2` vértices generados por una función, dibujados con `drawArrays` y `gl.TRIANGLE_FAN` (`SEGMENTS = 64`) |

## Otros comandos

| Comando | Qué hace |
| --- | --- |
| `npm run build` | Revisa los tipos con `tsc` y compila en `dist/` |
| `npm run preview` | Sirve localmente lo que quedó en `dist/` |

## Estructura

```
index.html               página con el canvas y los botones
src/main.ts              crea las figuras, maneja los botones y dibuja
src/examples/shared.ts   tamaño del canvas, color de fondo y posiciones del triángulo
src/shapes/              una figura por archivo y la interfaz Shape
src/vendor/ff/           FixedFunction v1.0 (no se modifica)
```

## Si algo falla

- **La página sale en blanco o dice "WebGL2 is not available.":** activa la aceleración por hardware en el navegador o prueba con otro.
- **El puerto 5173 está ocupado:** cierra el otro proceso o corre `npx vite --port 3000`.
