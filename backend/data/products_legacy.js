// All Products Data for Digital Power Migrated to CommonJS
const inverterProducts = [
    {
        id: 1,
        name: "Microtek Super Power 1100 Pure Sine wave 12V White Advanced Digital Inverter with 3 Year Warranty & Support 1 Battery",
        shortName: "Super Power 1100",
        brand: "Microtek",
        category: "Inverter",
        type: "Pure Sine Wave",
        originalPrice: 10090,
        salePrice: 6299,
        discount: "38% OFF",
        image: "/images/products/microtek-superpower-1100-v2-front.png",
        rating: 4.5,
        reviews: 128,
        warranty: "3 Years",
        voltage: "12V",
        capacity: "1100VA",
        features: ["Pure Sine Wave", "Digital Display", "3 Year Warranty", "Overload Protection"],
        inStock: true,
        gallery: ["/images/products/microtek-superpower-1100-v2-front.png","/images/products/microtek-superpower-1100-v2-side.png","/images/products/microtek-superpower-1100-v2-top.png","/images/products/microtek-superpower-1100-v2-back.png"]
    },
    {
        id: 2,
        name: "Microtek E2-1025VA Sine Wave Inteli Pure Sine wave Sine Home UPS Comfortable for Support of System/ Domestic Loads 6 Fans and 6 Lights",
        shortName: "Microtek E2 UPS 1025 Sine Wave",
        brand: "Microtek",
        category: "Inverter",
        type: "DG Compatible",
        originalPrice: 9690,
        salePrice: 5800,
        discount: "46% OFF",
        image: "/images/products/microtek-e2-1025-front.png",
        rating: 4.3,
        reviews: 95,
        warranty: "2 Years",
        voltage: "12V",
        capacity: "1025VA",
        features: ["DG Compatible", "12A Charging", "Digital Display", "Smart Battery Management"],
        inStock: true,
        gallery: ["/images/products/microtek-e2-1025-front.png","/images/products/microtek-e2-1025-angle.png","/images/products/microtek-e2-1025-top.png","/images/products/microtek-e2-1025-back.png"]
    },
];

const batteryProducts = [
    {
        id: 101,
        name: "Microtek DURASMART MTK1501818LT 150Ah/12V Inverter Battery",
        shortName: "150AH Tall Microtek DURASMART",
        brand: "Microtek",
        category: "Battery",
        type: "Tall Tubular",
        originalPrice: 16900,
        salePrice: 13400,
        discount: "21% OFF",
        image: "/images/products/microtek-durasmart-150ah-front.png",
        rating: 4.5,
        reviews: 12,
        warranty: "36 Months",
        capacity: "150 Ah",
        features: ["Advanced Dura Core Technology", "150Ah Capacity", "36 Months Warranty"],
        inStock: true
    }
];

const upsProducts = [
    {
        id: 201,
        name: "Luminous EVO D 1050 Inverter",
        shortName: "EVO D 1050",
        brand: "Luminous",
        category: "Online UPS",
        type: "Inverter/UPS",
        originalPrice: 8550,
        salePrice: 5870,
        image: "/images/products/luminous-evo-d-1050-front.png",
        rating: 4.7,
        capacity: "1050VA",
        inStock: true
    }
];

const comboProducts = [
    {
        id: 301,
        name: "LUMINOUS Inverter & Battery Combo",
        shortName: "Luminous 1050 EVO + ILTT18060PRO",
        brand: "Luminous",
        category: "Combo",
        originalPrice: 29000,
        salePrice: 19788,
        image: "/images/products/luminous-1050evo-iltt18060-combo-v1-front.png",
        inStock: true
    }
];

module.exports = {
    inverterProducts,
    batteryProducts,
    upsProducts,
    comboProducts,
    solarProducts: [],
    stabilizerProducts: [],
    onlineUpsProducts: []
};
