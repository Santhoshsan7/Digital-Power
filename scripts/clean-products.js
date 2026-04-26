import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productsPath = path.join(__dirname, '..', 'data', 'products.js');
let content = fs.readFileSync(productsPath, 'utf8');

// Replace JSX blocks with null
// This regex looks for ( <svg ... </svg> )
content = content.replace(/\(\s*<svg[\s\S]*?<\/svg>\s*\)/gm, 'null');

// Also remove imports
content = content.replace(/import .* from .*;/gm, '');

const tempPath = path.join(__dirname, 'temp_products.js');
fs.writeFileSync(tempPath, content);

console.log('Cleaned products data (JSX replaced with null) to temp_products.js');
