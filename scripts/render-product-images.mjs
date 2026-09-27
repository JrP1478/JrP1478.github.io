import sharp from "sharp";
import { rename } from "node:fs/promises";

const products = [
  {
    file: "public/img/products/trapo-industrial-cosido-color.png",
    brightness: 1.04,
    saturation: 1.04,
  },
  {
    file: "public/img/products/trapo-industrial-cosido-blanco.png",
    brightness: 1.06,
    saturation: 0.96,
  },
  {
    file: "public/img/products/trapo-industrial-suelto-color.png",
    brightness: 1.04,
    saturation: 1.06,
  },
  {
    file: "public/img/products/trapo-industrial-suelto-blanco.png",
    brightness: 1.07,
    saturation: 0.95,
  },
  {
    file: "public/img/products/merma-jean.png",
    brightness: 1.04,
    saturation: 1.03,
  },
  {
    file: "public/img/products/trapo-industrial-cosido-manual-color.png",
    brightness: 1.04,
    saturation: 1.05,
  },
  {
    file: "public/img/products/waipe-color.png",
    brightness: 1.17,
    saturation: 1.2,
  },
  {
    file: "public/img/products/waipe-blanco.png",
    brightness: 1.2,
    saturation: 0.9,
  },
];

for (const product of products) {
  const temporary = product.file + ".rendered.png";

  await sharp(product.file, { failOn: "none" })
    .rotate()
    .toColorspace("srgb")
    .resize({
      width: 1600,
      height: 1200,
      fit: "contain",
      position: "centre",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
      kernel: sharp.kernel.lanczos3,
      withoutEnlargement: false,
    })
    .modulate({
      brightness: product.brightness,
      saturation: product.saturation,
    })
    .sharpen({ sigma: 1.05 })
    .png({
      compressionLevel: 9,
      adaptiveFiltering: true,
      palette: false,
      quality: 100,
    })
    .toFile(temporary);

  await rename(temporary, product.file);
  console.log("Rendered:", product.file);
}
