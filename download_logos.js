const fs = require('fs');
const https = require('https');
const path = require('path');

const brands = [
    { name: 'massimo.png', url: 'https://logo.clearbit.com/massimobatteries.com?size=500' },
    { name: 'eastman.png', url: 'https://logo.clearbit.com/eaplworld.com?size=500' },
    { name: 'amaron.png', url: 'https://logo.clearbit.com/amaron.in?size=500' },
    { name: 'luminous.png', url: 'https://logo.clearbit.com/luminousindia.com?size=500' },
    { name: 'microtek.png', url: 'https://logo.clearbit.com/microtekdirect.com?size=500' },
    { name: 'exide.png', url: 'https://logo.clearbit.com/exideindustries.com?size=500' }
];

const dir = path.join(__dirname, 'public', 'images', 'brands');

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

brands.forEach(brand => {
    const filePath = path.join(dir, brand.name);
    const file = fs.createWriteStream(filePath);
    https.get(brand.url, function (response) {
        if (response.statusCode === 200) {
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log(`Downloaded ${brand.name}`);
            });
        } else {
            console.error(`Failed to download ${brand.name}: Status ${response.statusCode}`);
            fs.unlink(filePath, () => { }); // Delete empty file
        }
    }).on('error', function (err) {
        fs.unlink(filePath, () => { }); // Delete empty file
        console.error(`Error downloading ${brand.name}: ${err.message}`);
    });
});
