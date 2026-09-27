# Biohebra Website

Sitio web comercial y SEO de Biohebra.

- Producción: https://biohebra.uk
- Repositorio: JrP1478/JrP1478.github.io
- Rama de rediseño: redesign-2026
- Despliegue: GitHub Pages

## Objetivo

El sitio está diseñado para convertir búsquedas relacionadas con trapo industrial, trapo suelto, trapo cosido, waipe industrial y merma de jean en consultas comerciales por WhatsApp.

La arquitectura distribuye la intención de búsqueda entre páginas de categoría, fichas de producto y páginas por uso, en lugar de concentrar todo en una sola landing.

## Stack

- Astro
- TypeScript
- HTML estático
- CSS
- GitHub Pages

Astro genera HTML estático para cada URL, facilitando el rastreo de categorías y productos y manteniendo una carga ligera.

## Desarrollo local

Requisitos:

- Node.js 20 LTS o superior
- npm

Instalación:

~~~bash
npm install
npm run dev
~~~

## Build

~~~bash
npm run build
~~~

La salida se genera en dist/.

Para revisar el build local:

~~~bash
npm run preview
~~~

## Deploy a GitHub Pages

El proyecto mantiene despliegue mediante la rama gh-pages:

~~~bash
npm run deploy
~~~

El comando genera dist/ y publica el resultado en gh-pages. El archivo public/CNAME mantiene el dominio biohebra.uk dentro del build.

## Estructura principal

~~~text
src/
├── components/
├── data/
│   ├── products.ts
│   └── site.ts
├── layouts/
├── pages/
│   ├── index.astro
│   ├── [slug].astro
│   ├── trapo-industrial/
│   ├── trapo-industrial-suelto/
│   ├── trapo-industrial-cosido/
│   ├── waipe-industrial/
│   ├── merma-de-jean/
│   ├── usos/
│   ├── contacto/
│   └── sitemap.xml.ts
└── styles/

public/
├── CNAME
├── robots.txt
├── fonts/
└── img/
~~~

## Productos y precios

La fuente de verdad del catálogo está en src/data/products.ts.

| Producto | Precio |
| --- | ---: |
| Trapo Industrial cosido - color | S/ 1.90 por kilo |
| Trapo Industrial cosido - blanco | S/ 3.10 por kilo |
| Trapo Industrial suelto - color | S/ 3.10 por kilo |
| Trapo Industrial suelto - blanco | S/ 3.90 por kilo |
| Merma de jean | S/ 0.25 por kilo |
| Trapo Industrial cosido manualmente - color | S/ 2.10 por kilo |
| Waipe - color | S/ 2.50 por kilo |
| Waipe - blanco | S/ 4.30 por kilo |

Estos precios fueron recuperados del último build publicado previo al rediseño. Antes de cambiar un precio en producción, validar que siga vigente.

## WhatsApp y datos comerciales

Los datos generales del negocio están centralizados en src/data/site.ts:

- WhatsApp
- correo
- RUC
- ubicación
- horario
- Facebook
- TikTok
- mapa
- dominio

Los enlaces de producto generan un mensaje de WhatsApp con el nombre y precio correspondiente.

## SEO

El sitio incorpora:

- URL canónica por página
- títulos y meta descriptions independientes
- Open Graph y Twitter Card
- datos estructurados Organization, WebSite, Product, Offer y FAQPage
- robots.txt
- sitemap.xml generado durante el build
- páginas de categoría
- fichas individuales de producto
- páginas orientadas a usos y problemas de búsqueda

Clusters principales:

- trapo industrial
- trapo suelto / trapo para limpieza
- trapo cosido
- waipe industrial
- merma de jean
- trapos para talleres
- trapos para grasa y aceite
- trapos para limpieza industrial

No crear páginas casi idénticas para pequeñas variaciones de una palabra clave. Una URL nueva debe responder a una intención de búsqueda diferenciada.

## Colores de marca

~~~text
#00693E
#0A5C36
#1E7B4C
#8DC63F
~~~

Los tonos neutros se usan como soporte de legibilidad y jerarquía visual.

## Imágenes

Los recursos existentes se conservan en public/img/ y las imágenes de producto en public/img/products/.

Al reemplazar una imagen:

- mantener el producto real y reconocible
- optimizar el peso del archivo
- usar una resolución suficiente para tarjeta y ficha
- conservar el mismo nombre cuando no sea necesario cambiar la referencia

## Añadir un producto

1. Añade la imagen a public/img/products/.
2. Crea la entrada correspondiente en src/data/products.ts.
3. Define nombre, slug, categoría, precio, resumen, descripción, usos y aplicaciones.
4. La ficha individual se genera mediante src/pages/[slug].astro.
5. Ejecuta npm run build antes de publicar.

## Dominio

El dominio de producción es https://biohebra.uk.

No eliminar public/CNAME mientras GitHub Pages utilice este dominio personalizado.

## Flujo recomendado

~~~text
redesign-2026
    ↓ revisión
main
    ↓ build
gh-pages
    ↓
biohebra.uk
~~~
