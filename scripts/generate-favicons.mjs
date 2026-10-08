/**
 * Build square Biohebra favicons from the existing brand PNG.
 * No additional npm packages are required (Node.js built-ins only).
 * Run: npm run favicons
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { deflateSync, inflateSync } from 'node:zlib';

const root = fileURLToPath(new URL('..', import.meta.url));
const sourcePath = join(root, 'public', 'img', 'svg', 'logo-biohebra.png');
const output = (file) => join(root, 'public', file);
const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

function readRgbaPng(buffer) {
  if (!buffer.subarray(0, 8).equals(signature)) {
    throw new Error(`El logo no es un PNG valido: ${sourcePath}`);
  }

  let width = 0;
  let height = 0;
  let bitDepth = 0;
  let colorType = 0;
  let interlaced = 0;
  const imageData = [];

  for (let offset = 8; offset + 12 <= buffer.length;) {
    const length = buffer.readUInt32BE(offset);
    const name = buffer.toString('ascii', offset + 4, offset + 8);
    const start = offset + 8;
    const end = start + length;
    if (end + 4 > buffer.length) throw new Error('PNG truncado');

    if (name === 'IHDR') {
      width = buffer.readUInt32BE(start);
      height = buffer.readUInt32BE(start + 4);
      bitDepth = buffer[start + 8];
      colorType = buffer[start + 9];
      interlaced = buffer[start + 12];
    } else if (name === 'IDAT') {
      imageData.push(buffer.subarray(start, end));
    } else if (name === 'IEND') {
      break;
    }
    offset = end + 4;
  }

  // The project's logo-biohebra.png is an 8-bit RGBA non-interlaced PNG.
  if (!width || !height || bitDepth !== 8 || colorType !== 6 || interlaced !== 0) {
    throw new Error('Formato PNG inesperado: se requiere RGBA de 8 bits sin entrelazado');
  }

  const rowSize = width * 4;
  const raw = inflateSync(Buffer.concat(imageData));
  if (raw.length !== height * (rowSize + 1)) throw new Error('Datos PNG invalidos');
  const pixels = Buffer.alloc(width * height * 4);
  let readAt = 0;

  for (let y = 0; y < height; y++) {
    const filter = raw[readAt++];
    if (filter > 4) throw new Error(`Filtro PNG desconocido: ${filter}`);
    const row = y * rowSize;
    for (let x = 0; x < rowSize; x++) {
      const left = x >= 4 ? pixels[row + x - 4] : 0;
      const up = y > 0 ? pixels[row + x - rowSize] : 0;
      const upperLeft = y > 0 && x >= 4 ? pixels[row + x - rowSize - 4] : 0;
      let predictor = 0;
      if (filter === 1) predictor = left;
      if (filter === 2) predictor = up;
      if (filter === 3) predictor = Math.floor((left + up) / 2);
      if (filter === 4) {
        const p = left + up - upperLeft;
        const a = Math.abs(p - left);
        const b = Math.abs(p - up);
        const c = Math.abs(p - upperLeft);
        predictor = a <= b && a <= c ? left : b <= c ? up : upperLeft;
      }
      pixels[row + x] = (raw[readAt++] + predictor) & 255;
    }
  }
  return { width, height, pixels };
}

function renderSquare(source, size, background = null) {
  const pixels = Buffer.alloc(size * size * 4);
  if (background) {
    for (let i = 0; i < pixels.length; i += 4) {
      pixels[i] = background[0];
      pixels[i + 1] = background[1];
      pixels[i + 2] = background[2];
      pixels[i + 3] = 255;
    }
  }

  // Keep the original aspect ratio, with breathing room on all sides.
  const scale = Math.min(size * 0.88 / source.width, size * 0.88 / source.height);
  const renderedWidth = source.width * scale;
  const renderedHeight = source.height * scale;
  const x0 = (size - renderedWidth) / 2;
  const y0 = (size - renderedHeight) / 2;

  for (let y = 0; y < size; y++) {
    const srcY = (y + 0.5 - y0) / scale - 0.5;
    if (srcY < -0.5 || srcY > source.height - 0.5) continue;
    const top = Math.floor(srcY);
    const fy = srcY - top;
    for (let x = 0; x < size; x++) {
      const srcX = (x + 0.5 - x0) / scale - 0.5;
      if (srcX < -0.5 || srcX > source.width - 0.5) continue;
      const left = Math.floor(srcX);
      const fx = srcX - left;
      const neighbors = [
        [left, top, (1 - fx) * (1 - fy)],
        [left + 1, top, fx * (1 - fy)],
        [left, top + 1, (1 - fx) * fy],
        [left + 1, top + 1, fx * fy],
      ];
      let sumA = 0;
      let sumR = 0;
      let sumG = 0;
      let sumB = 0;
      for (const [sx, sy, weight] of neighbors) {
        if (sx < 0 || sx >= source.width || sy < 0 || sy >= source.height) continue;
        const index = (sy * source.width + sx) * 4;
        const alpha = source.pixels[index + 3] / 255;
        const contribution = weight * alpha;
        sumA += contribution;
        sumR += source.pixels[index] * contribution;
        sumG += source.pixels[index + 1] * contribution;
        sumB += source.pixels[index + 2] * contribution;
      }
      if (!sumA) continue;
      const dst = (y * size + x) * 4;
      const alpha = Math.min(1, sumA);
      if (background) {
        pixels[dst] = Math.round(sumR + background[0] * (1 - alpha));
        pixels[dst + 1] = Math.round(sumG + background[1] * (1 - alpha));
        pixels[dst + 2] = Math.round(sumB + background[2] * (1 - alpha));
      } else {
        pixels[dst] = Math.round(sumR / sumA);
        pixels[dst + 1] = Math.round(sumG / sumA);
        pixels[dst + 2] = Math.round(sumB / sumA);
        pixels[dst + 3] = Math.round(alpha * 255);
      }
    }
  }
  return pixels;
}

const crcTable = Array.from({ length: 256 }, (_, value) => {
  let c = value;
  for (let j = 0; j < 8; j++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});

function chunk(name, data) {
  const type = Buffer.from(name);
  let crc = 0xffffffff;
  for (const byte of Buffer.concat([type, data])) {
    crc = crcTable[(crc ^ byte) & 255] ^ (crc >>> 8);
  }
  const result = Buffer.alloc(12 + data.length);
  result.writeUInt32BE(data.length, 0);
  type.copy(result, 4);
  data.copy(result, 8);
  result.writeUInt32BE((crc ^ 0xffffffff) >>> 0, result.length - 4);
  return result;
}

function encodePng(size, pixels) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // RGBA
  const raw = Buffer.alloc(size * (size * 4 + 1));
  for (let y = 0; y < size; y++) {
    pixels.copy(raw, y * (size * 4 + 1) + 1, y * size * 4, (y + 1) * size * 4);
  }
  return Buffer.concat([
    signature,
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

function makeIco(entries) {
  const header = Buffer.alloc(6 + entries.length * 16);
  header.writeUInt16LE(1, 2); // icon type
  header.writeUInt16LE(entries.length, 4);
  let offset = header.length;
  entries.forEach(({ size, data }, i) => {
    const pos = 6 + i * 16;
    header[pos] = size === 256 ? 0 : size;
    header[pos + 1] = size === 256 ? 0 : size;
    header.writeUInt16LE(1, pos + 4); // planes
    header.writeUInt16LE(32, pos + 6); // RGBA bits
    header.writeUInt32LE(data.length, pos + 8);
    header.writeUInt32LE(offset, pos + 12);
    offset += data.length;
  });
  return Buffer.concat([header, ...entries.map((item) => item.data)]);
}

const source = readRgbaPng(readFileSync(sourcePath));
const icon = (size, background = null) => encodePng(size, renderSquare(source, size, background));
writeFileSync(output('favicon.png'), icon(512));
writeFileSync(output('favicon-48x48.png'), icon(48));
writeFileSync(output('apple-touch-icon.png'), icon(180, [255, 255, 255]));
writeFileSync(output('favicon.ico'), makeIco([16, 32, 48, 256].map((size) => ({ size, data: icon(size) }))));
console.log('Favicons Biohebra generados: 512x512, 48x48, 180x180 e ICO multiresolucion.');
