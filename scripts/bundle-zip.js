import fs from 'fs';
import path from 'path';
import JSZip from 'jszip';

const rootDir = process.cwd();
const publicDir = path.join(rootDir, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const zip = new JSZip();

const exclude = new Set([
  'node_modules',
  '.git',
  'dist',
  'build',
  'bun.lock',
  'public',
]);

function addDirectory(currentPath, zipFolder) {
  const entries = fs.readdirSync(currentPath, { withFileTypes: true });
  for (const entry of entries) {
    if (exclude.has(entry.name)) continue;
    const fullPath = path.join(currentPath, entry.name);
    if (entry.isDirectory()) {
      const subFolder = zipFolder.folder(entry.name);
      addDirectory(fullPath, subFolder);
    } else if (entry.isFile()) {
      const content = fs.readFileSync(fullPath);
      zipFolder.file(entry.name, content);
    }
  }
}

addDirectory(rootDir, zip);

const outputPath = path.join(publicDir, 'fantasy-character-generator.zip');
const content = await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' });
fs.writeFileSync(outputPath, content);
console.log('Successfully created:', outputPath, `(${content.length} bytes)`);
