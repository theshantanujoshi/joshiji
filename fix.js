const fs = require('fs');
let css = fs.readFileSync('src/app/globals.css');
// Handle possible UTF-16LE BOM
if (css[0] === 0xff && css[1] === 0xfe) {
    css = css.toString('utf16le');
} else {
    css = css.toString('utf8');
}
// Remove the specific font import
css = css.replace(/@import url\("https:\/\/fonts\.googleapis\.com[^"]+"\);\r?\n?/g, '');
// And remove any null bytes that might have resulted from mixed encodings
css = css.replace(/\0/g, '');
fs.writeFileSync('src/app/globals.css', css, 'utf8');
