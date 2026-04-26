const { allProducts } = require('./data/products.js');

function search(query) {
    if (!allProducts) {
        console.log("allProducts is undefined");
        return;
    }
    console.log(`Searching for '${query}'...`);
    const filtered = allProducts.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        (p.shortName && p.shortName.toLowerCase().includes(query.toLowerCase()))
    ).slice(0, 5);

    console.log(`Found ${filtered.length} results:`);
    filtered.forEach(p => console.log(`- ${p.name}`));
}

// Emulate the user's issue
search("M");
search("E");
search("S");
