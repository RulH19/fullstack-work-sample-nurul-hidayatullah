import { Product, StockStatus } from '../types/product';

const CATEGORIES = [
  'Electronics',
  'Fashion & Apparel',
  'Home & Living',
  'Gaming & Accessories',
  'Health & Beauty',
  'Automotive & Tools',
  'Books & Stationery',
  'Sports & Outdoors',
];

const PRODUCT_PREFIXES = [
  'Ultra Wireless',
  'Pro Ergonomic',
  'HyperX Dynamic',
  'Smart Carbon',
  'Eco Clean',
  'Quantum Dual',
  'Titanium Max',
  'Aero Glide',
  'Apex Precision',
  'Cyber Stealth',
];

const PRODUCT_ITEMS = [
  'Mechanical Keyboard',
  'Noise Cancelling Headset',
  'Gaming Mouse RGB',
  '4K Ultra HD Monitor',
  'Fast Charging Powerbank 20000mAh',
  'USB-C Multiport Hub',
  'Ergonomic Desk Chair',
  'Bluetooth Soundbar',
  'Smart Fitness Watch',
  'SSD NVMe 1TB Gen4',
  'Aluminum Laptop Stand',
  'Studio Condenser Microphone',
];

function getStatusFromStock(stock: number): StockStatus {
  if (stock === 0) return 'OUT_OF_STOCK';
  if (stock <= 5) return 'LOW_STOCK';
  return 'IN_STOCK';
}

export function generateMockProducts(count = 5000): Product[] {
  const products: Product[] = [];
  const now = Date.now();

  for (let i = 1; i <= count; i++) {
    const prefix = PRODUCT_PREFIXES[i % PRODUCT_PREFIXES.length];
    const item = PRODUCT_ITEMS[i % PRODUCT_ITEMS.length];
    const category = CATEGORIES[i % CATEGORIES.length];
    const stock = Math.floor(Math.random() * 45); // 0 - 45
    const price = Math.floor(Math.random() * 950 + 50) * 10000; // Rp 500.000 - Rp 10.000.000

    products.push({
      id: `PROD-${i.toString().padStart(5, '0')}`,
      name: `${prefix} ${item} (Gen #${i})`,
      sku: `SKU-${category.slice(0, 3).toUpperCase()}-${i.toString().padStart(5, '0')}`,
      category,
      price,
      stock,
      status: getStatusFromStock(stock),
      updatedAt: new Date(now - Math.floor(Math.random() * 3600000)).toLocaleTimeString('id-ID'),
      lastUpdatedTimestamp: now,
    });
  }

  return products;
}
