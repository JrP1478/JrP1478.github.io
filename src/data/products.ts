import { whatsappLink } from "./site";

export type ProductCategory = "cosido" | "suelto" | "waipe" | "merma";

export type Product = {
  slug: string;
  name: string;
  category: ProductCategory;
  variant: string;
  image: string;
  price: number;
  summary: string;
  description: string;
  idealFor: string[];
  applications: string[];
  searchLanguage: string[];
};

export const PRODUCTS: Product[] = [
  {
    slug: "trapo-industrial-cosido-color",
    name: "Trapo Industrial cosido - color",
    category: "cosido",
    variant: "Color",
    image: "/img/products/trapo-industrial-cosido-color.png",
    price: 1.9,
    summary:
      "Trapo cosido de color para grasa, aceite, lubricantes y limpieza de trabajo en talleres y mantenimiento.",
    description:
      "Pieza formada con retazos textiles unidos mediante costura. Su formato conformado facilita manipular el material como un paño durante tareas repetitivas con grasa, aceite y suciedad de trabajo en herramientas, piezas, maquinaria y superficies.",
    idealFor: ["Talleres mecánicos", "Áreas de mantenimiento", "Fábricas", "Limpieza general"],
    applications: ["Grasa y aceite", "Herramientas y piezas", "Maquinaria", "Superficies de trabajo"],
    searchLanguage: ["trapo industrial cosido", "trapo cosido", "trapo cocido", "trapo de limpieza"],
  },
  {
    slug: "trapo-industrial-cosido-blanco",
    name: "Trapo Industrial cosido - blanco",
    category: "cosido",
    variant: "Blanco",
    image: "/img/products/trapo-industrial-cosido-blanco.png",
    price: 3.1,
    summary:
      "Trapo industrial cosido blanco para grasa, aceite y limpieza donde conviene ver con claridad el residuo retirado.",
    description:
      "Pieza blanca formada con retazos textiles cosidos. El fondo claro permite observar con mayor facilidad grasa, polvo o residuos durante el uso, por lo que puede ser útil para repaso visual de piezas y superficies.",
    idealFor: ["Mantenimiento", "Talleres", "Limpieza general", "Revisión visual de suciedad"],
    applications: ["Piezas y herramientas", "Superficies", "Secado", "Mantenimiento general"],
    searchLanguage: ["trapo blanco industrial", "trapo industrial blanco", "trapo cosido blanco"],
  },
  {
    slug: "trapo-industrial-suelto-color",
    name: "Trapo Industrial suelto - color",
    category: "suelto",
    variant: "Color",
    image: "/img/products/trapo-industrial-suelto-color.png",
    price: 3.1,
    summary:
      "Trapo suelto de color para limpieza general, piezas, maquinaria y trabajos con recambio frecuente de material.",
    description:
      "Retazos textiles independientes que pueden tomarse y reemplazarse según avanza el trabajo. El formato suelto resulta práctico para limpieza general de piezas, herramientas, maquinaria y superficies cuando se necesita cambiar de paño con frecuencia.",
    idealFor: ["Talleres", "Mantenimiento", "Fábricas", "Limpieza general"],
    applications: ["Limpieza general", "Herramientas y piezas", "Maquinaria", "Superficies de trabajo"],
    searchLanguage: ["trapo suelto", "trapo para limpieza", "trapo industrial suelto", "trapo de limpieza"],
  },
  {
    slug: "trapo-industrial-suelto-blanco",
    name: "Trapo Industrial suelto - blanco",
    category: "suelto",
    variant: "Blanco",
    image: "/img/products/trapo-industrial-suelto-blanco.png",
    price: 3.9,
    summary:
      "Trapo suelto blanco para limpieza general, piezas y superficies cuando conviene visualizar el residuo retirado.",
    description:
      "Retazos blancos independientes para elegir y reemplazar pieza por pieza. Su formato es práctico para limpieza general y recambio frecuente; el color claro facilita controlar visualmente la suciedad durante el uso.",
    idealFor: ["Mantenimiento", "Talleres", "Limpieza general", "Revisión visual de suciedad"],
    applications: ["Piezas y herramientas", "Superficies", "Secado", "Limpieza general"],
    searchLanguage: ["trapo suelto blanco", "trapo blanco para limpieza", "trapo industrial suelto blanco"],
  },
  {
    slug: "merma-de-jean",
    name: "Merma de jean",
    category: "merma",
    variant: "Jean",
    image: "/img/products/merma-jean.png",
    price: 0.25,
    summary:
      "Retazos y merma de jean para clasificación, reciclaje mecánico y reaprovechamiento como materia prima textil.",
    description:
      "Material proveniente de saldos o recortes de denim. En procesos de reciclaje textil, este tipo de residuo puede clasificarse, cortarse o desfibrarse para recuperar fibra y destinarla a nuevos hilos, no tejidos, rellenos o materiales compuestos según la tecnología del comprador. Las características del lote pueden variar.",
    idealFor: ["Reciclaje textil", "Clasificación de retazos", "Recuperación de fibra", "Transformación industrial"],
    applications: ["Materia prima textil", "Desfibrado mecánico", "No tejidos y rellenos", "Materiales reciclados"],
    searchLanguage: ["merma de jean", "retazos de jean", "merma textil", "merma denim"],
  },
  {
    slug: "trapo-industrial-cosido-manualmente-color",
    name: "Trapo Industrial cosido manualmente - color",
    category: "cosido",
    variant: "Cosido manual · Color",
    image: "/img/products/trapo-industrial-cosido-manual-color.png",
    price: 2.1,
    summary:
      "Trapo de color cosido manualmente para limpieza general, grasa, aceite y mantenimiento frecuente.",
    description:
      "Retazos unidos manualmente para formar una pieza manejable durante tareas repetitivas. Es una alternativa al material suelto cuando se prefiere trabajar con un paño conformado para herramientas, piezas, superficies y maquinaria.",
    idealFor: ["Talleres", "Mantenimiento", "Fábricas", "Limpieza general"],
    applications: ["Grasa y aceite", "Herramientas y piezas", "Maquinaria", "Superficies de trabajo"],
    searchLanguage: ["trapo cosido manual", "trapo industrial cosido", "trapo de limpieza cosido"],
  },
  {
    slug: "waipe-color",
    name: "Waipe - color",
    category: "waipe",
    variant: "Color",
    image: "/img/products/waipe-color.png",
    price: 2.5,
    summary:
      "Waipe de color para limpieza general y retiro de aceite, grasa, lubricantes y suciedad de trabajo.",
    description:
      "Material textil para wipe-down y mantenimiento de piezas, herramientas, maquinaria y superficies. Es una opción habitual en tareas donde se necesita retirar aceites, grasa y residuos de operación.",
    idealFor: ["Talleres", "Mantenimiento", "Industria", "Limpieza general"],
    applications: ["Aceite y lubricantes", "Grasa", "Herramientas y piezas", "Maquinaria y superficies"],
    searchLanguage: ["waipe", "waipe industrial", "waipe para limpieza", "waipe color"],
  },
  {
    slug: "waipe-blanco",
    name: "Waipe - blanco",
    category: "waipe",
    variant: "Blanco",
    image: "/img/products/waipe-blanco.png",
    price: 4.3,
    summary:
      "Waipe blanco para limpieza general y mantenimiento cuando conviene observar con claridad el residuo retirado.",
    description:
      "Material blanco para wipe-down de piezas y superficies, secado y mantenimiento general. El color claro ayuda a visualizar suciedad o residuos durante el uso; otras propiedades dependen de la composición real del lote.",
    idealFor: ["Mantenimiento", "Talleres", "Limpieza general", "Revisión visual de suciedad"],
    applications: ["Piezas y superficies", "Secado", "Aceite y grasa", "Mantenimiento general"],
    searchLanguage: ["waipe blanco", "waipe industrial blanco", "waipe para limpieza"],
  },
];

export const productPrice = (product: Product) =>
  "S/ " + product.price.toFixed(2) + " por kilo";

export const productRoute = (product: Product) =>
  product.slug === "merma-de-jean" ? "/merma-de-jean/" : "/" + product.slug + "/";

export const productWhatsApp = (product: Product) =>
  whatsappLink(
    "Hola, quiero cotizar " +
      product.name +
      " (" +
      productPrice(product) +
      "). ¿Me pueden confirmar disponibilidad, cantidad y condiciones de envío?"
  );

export const getProduct = (slug: string) =>
  PRODUCTS.find((product) => product.slug === slug);

export const productsByCategory = (category: ProductCategory) =>
  PRODUCTS.filter((product) => product.category === category);
