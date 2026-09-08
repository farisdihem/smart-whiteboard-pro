const fs = require('fs');
const path = require('path');

function createValidBmpIco(width, height, color = { r: 59, g: 130, b: 246, a: 255 }) {
  // Generates a 100% valid Windows RC.EXE compatible ICO file with 1 frame (32x32, 32-bit RGBA BMP)
  const headerSize = 6;
  const dirEntrySize = 16;
  const bmpHeaderSize = 40;
  const pixelDataSize = width * height * 4;
  const maskSize = Math.ceil((width * height) / 8);
  const totalImageDataSize = bmpHeaderSize + pixelDataSize + maskSize;
  const totalFileSize = headerSize + dirEntrySize + totalImageDataSize;

  const buf = Buffer.alloc(totalFileSize);

  // ICO Header
  buf.writeUInt16LE(0, 0); // Reserved
  buf.writeUInt16LE(1, 2); // Type 1 = ICO
  buf.writeUInt16LE(1, 4); // Count = 1

  // Directory Entry
  buf.writeUInt8(width >= 256 ? 0 : width, 6);
  buf.writeUInt8(height >= 256 ? 0 : height, 7);
  buf.writeUInt8(0, 8); // Palette count
  buf.writeUInt8(0, 9); // Reserved
  buf.writeUInt16LE(1, 10); // Color planes
  buf.writeUInt16LE(32, 12); // Bits per pixel
  buf.writeUInt32LE(totalImageDataSize, 14); // Image data size
  buf.writeUInt32LE(headerSize + dirEntrySize, 18); // Offset

  // BITMAPINFOHEADER
  let offset = headerSize + dirEntrySize;
  buf.writeUInt32LE(40, offset); // biSize
  buf.writeInt32LE(width, offset + 4); // biWidth
  buf.writeInt32LE(height * 2, offset + 8); // biHeight (2x height for XOR + AND mask)
  buf.writeUInt16LE(1, offset + 12); // biPlanes
  buf.writeUInt16LE(32, offset + 14); // biBitCount
  buf.writeUInt32LE(0, offset + 16); // biCompression = BI_RGB
  buf.writeUInt32LE(pixelDataSize + maskSize, offset + 20); // biSizeImage
  buf.writeInt32LE(0, offset + 24); // biXPelsPerMeter
  buf.writeInt32LE(0, offset + 28); // biYPelsPerMeter
  buf.writeUInt32LE(0, offset + 32); // biClrUsed
  buf.writeUInt32LE(0, offset + 36); // biClrImportant

  // Pixel Data (Bottom to top)
  offset += 40;
  for (let y = height - 1; y >= 0; y--) {
    for (let x = 0; x < width; x++) {
      // Draw a nice blue icon with rounded corners or border
      let r = color.r, g = color.g, b = color.b, a = color.a;
      // Drawing simple board icon border
      if (x < 2 || x >= width - 2 || y < 2 || y >= height - 2) {
        r = 30; g = 58; b = 138; a = 255;
      }
      buf.writeUInt8(b, offset);
      buf.writeUInt8(g, offset + 1);
      buf.writeUInt8(r, offset + 2);
      buf.writeUInt8(a, offset + 3);
      offset += 4;
    }
  }

  // AND Mask (all zeroes for 32-bit alpha transparency handling)
  buf.fill(0, offset, offset + maskSize);

  return buf;
}

const icoPath = path.join(__dirname, 'src-tauri', 'icons', 'icon.ico');
const validIcoBuffer = createValidBmpIco(32, 32);
fs.writeFileSync(icoPath, validIcoBuffer);
console.log('Successfully generated clean valid Windows ICO file at:', icoPath);
