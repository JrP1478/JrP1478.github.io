import type { APIRoute } from "astro";
import { PRODUCTS, productRoute } from "../data/products";

const staticRoutes = [
  "/",
  "/trapo-industrial/",
  "/trapo-industrial-suelto/",
  "/trapo-industrial-cosido/",
  "/waipe-industrial/",
  "/merma-de-jean/",
  "/usos/trapos-para-talleres/",
  "/usos/trapos-para-grasa-y-aceite/",
  "/usos/trapos-para-limpieza-industrial/",
  "/contacto/",
];

export const GET: APIRoute = ({ site }) => {
  const base = site ?? new URL("https://biohebra.uk");
  const urls = [...staticRoutes, ...PRODUCTS.filter((p) => p.slug !== "merma-de-jean").map(productRoute)];
  const unique = [...new Set(urls)];
  const body =
    '<?xml version="1.0" encoding="UTF-8"?>' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
    unique.map((path) => "<url><loc>" + new URL(path, base).toString() + "</loc></url>").join("") +
    "</urlset>";

  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
