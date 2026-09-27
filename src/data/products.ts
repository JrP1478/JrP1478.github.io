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
      "Trapo cosido de color para limpieza general, mantenimiento y trabajos con grasa o aceite.",
    description:
      "Una alternativa práctica para talleres, fábricas y áreas de mantenimiento que necesitan material textil reutilizable para limpieza frecuente. La confección cosida ayuda a mantener los retazos unidos durante el uso.",
    idealFor: ["Talleres mecánicos", "Fábricas", "Mantenimiento", "Limpieza general"],
    applications: ["Grasa y aceite", "Maquinaria", "Herramientas", "Superficies de trabajo"],
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
      "Trapo industrial cosido blanco para limpieza más controlada y trabajos donde conviene visualizar la suciedad.",
    description:
      "El color blanco facilita observar el nivel de suciedad durante la limpieza y resulta útil cuando se busca evitar la transferencia visual de color del material. Se vende por kilo y puede cotizarse directamente por WhatsApp.",
    idealFor: ["Mantenimiento", "Limpieza profesional", "Talleres", "Procesos industriales"],
    applications: ["Superficies", "Secado", "Mantenimiento", "Limpieza de piezas"],
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
      "Trapo suelto de color para limpieza intensiva, derrames, maquinaria y suciedad de trabajo.",
    description:
      "Retazos textiles sueltos que permiten tomar la cantidad necesaria según la tarea. Es una opción versátil para limpieza de taller, mantenimiento, superficies de trabajo y procesos donde se requiere reemplazar el material con frecuencia.",
    idealFor: ["Talleres", "Fábricas", "Mantenimiento", "Empresas de limpieza"],
    applications: ["Derrames", "Grasa y aceite", "Maquinaria", "Limpieza industrial"],
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
      "Trapo suelto blanco para mantenimiento, secado y limpieza donde conviene controlar visualmente la suciedad.",
    description:
      "Una presentación suelta y de color blanco para tareas que requieren seleccionar retazos individualmente. Su formato facilita separar piezas según el trabajo y reemplazarlas conforme se ensucian.",
    idealFor: ["Limpieza profesional", "Mantenimiento", "Fábricas", "Talleres"],
    applications: ["Secado", "Superficies", "Piezas", "Limpieza general"],
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
      "Retazos y merma de jean para reaprovechamiento como insumo textil y proyectos de reutilización.",
    description:
      "Material proveniente de saldos o recortes de jean que puede aprovecharse como materia prima en procesos textiles, relleno, clasificación de retazos y proyectos de reutilización. Por tratarse de merma, las características visuales pueden variar según el lote disponible.",
    idealFor: ["Reutilización textil", "Clasificación de retazos", "Proyectos productivos", "Transformación de material"],
    applications: ["Materia prima", "Retazos", "Reaprovechamiento", "Proyectos textiles"],
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
      "Trapo de color cosido manualmente para trabajos de limpieza exigentes y mantenimiento frecuente.",
    description:
      "Opción cosida manualmente que mantiene unidos los retazos para un manejo cómodo durante tareas de limpieza. Está orientada a usuarios que prefieren una pieza conformada en lugar de material completamente suelto.",
    idealFor: ["Talleres", "Mantenimiento", "Industria", "Limpieza exigente"],
    applications: ["Maquinaria", "Herramientas", "Grasa", "Mantenimiento general"],
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
      "Waipe de color para limpieza de aceite, grasa, maquinaria y suciedad de trabajo.",
    description:
      "Material textil orientado a tareas de limpieza industrial y mantenimiento. Es una alternativa para talleres y operaciones que necesitan retirar suciedad, lubricantes o residuos de superficies y herramientas.",
    idealFor: ["Talleres", "Industria", "Mantenimiento", "Limpieza técnica"],
    applications: ["Aceite", "Grasa", "Herramientas", "Maquinaria"],
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
      "Waipe blanco para limpieza fina, mantenimiento, pulido y trabajos donde conviene utilizar material claro.",
    description:
      "Alternativa blanca para procesos de limpieza en los que resulta útil observar residuos o suciedad sobre el material. Se comercializa por kilo y se puede cotizar según cantidad y destino de envío.",
    idealFor: ["Limpieza fina", "Mantenimiento", "Pulido", "Procesos industriales"],
    applications: ["Superficies", "Piezas", "Secado", "Acabado"],
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
