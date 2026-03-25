import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const envFile = fs.readFileSync(resolve(__dirname, '../.env.local'), 'utf-8');
const env = {};
envFile.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) env[match[1].trim()] = match[2].trim();
});

const url = env['NEXT_PUBLIC_SUPABASE_URL'];
const key = env['SUPABASE_SERVICE_ROLE_KEY'] || env['NEXT_PUBLIC_SUPABASE_ANON_KEY'];

if (!url || !key) {
  console.error("Missing Supabase URL or Key");
  process.exit(1);
}

const supabase = createClient(url, key, {
  auth: { persistSession: false }
});

const products = [
  {
    name: "Classic Black Dressage Saddle",
    category: "Dressage",
    purpose: "Dressage Competition",
    size: "17.5 inch",
    material: "Full Grain Italian Leather",
    image_url: "/images/products/dressage.png",
    price: 2499.00,
    stock_quantity: 4,
    description: "A premium black dressage saddle featuring a deep seat, prominent thigh blocks, and exquisite stitching. Ideal for competitive dressage riders seeking maximum communication and balance.",
    is_active: true
  },
  {
    name: "Premium Western Trail Saddle",
    category: "Western",
    purpose: "Trail Riding",
    size: "16 inch",
    material: "Tooled Cowhide Leather",
    image_url: "/images/products/western.png",
    price: 1850.00,
    stock_quantity: 6,
    description: "Hand-tooled western trail saddle offering unmatched comfort for long rides. Features a padded seat, brass hardware, and intricate floral tooling.",
    is_active: true
  },
  {
    name: "Elite Dressage Mastery Saddle",
    category: "Dressage",
    purpose: "Professional Training",
    size: "18 inch",
    material: "Calfskin Leather",
    image_url: "/images/products/dressage.png",
    price: 2890.00,
    stock_quantity: 2,
    description: "Designed for the ultimate dressage professional, this saddle provides a narrow twist and deep seat to position the rider perfectly.",
    is_active: true
  },
  {
    name: "Western Roping Saddle",
    category: "Western",
    purpose: "Roping & Ranch Work",
    size: "15.5 inch",
    material: "Roughout Leather",
    image_url: "/images/products/western.png",
    price: 2100.00,
    stock_quantity: 5,
    description: "Heavy-duty roping saddle built on a reinforced tree. Features a suede seat for extra grip and thick skirting for durability on the ranch.",
    is_active: true
  },
  {
    name: "Youth Dressage Starter",
    category: "Dressage",
    purpose: "Beginner Training",
    size: "16.5 inch",
    material: "Synthetic Leather",
    image_url: "/images/products/dressage.png",
    price: 850.00,
    stock_quantity: 8,
    description: "An excellent, lightweight starter saddle for younger dressage riders. Easy to clean and incredibly comfortable.",
    is_active: true
  },
  {
    name: "Classic Barrel Racing Saddle",
    category: "Western",
    purpose: "Barrel Racing",
    size: "14.5 inch",
    material: "Premium Tooling Leather",
    image_url: "/images/products/western.png",
    price: 1950.00,
    stock_quantity: 3,
    description: "Lightweight barrel saddle with silver conchos and a raw hide braided horn. Engineered for speed and secure seating during tight turns.",
    is_active: true
  },
  {
    name: "Grand Prix Dressage Saddle",
    category: "Dressage",
    purpose: "Grand Prix Competition",
    size: "17 inch",
    material: "Buffalo Leather",
    image_url: "/images/products/dressage.png",
    price: 3200.00,
    stock_quantity: 1,
    description: "The pinnacle of our dressage line, featuring ultra-soft buffalo leather for unbelievable grip and an adjustable gullet system.",
    is_active: true
  },
  {
    name: "Ranch Hand Western Saddle",
    category: "Western",
    purpose: "Everyday Ranch Work",
    size: "16.5 inch",
    material: "Oiled Harness Leather",
    image_url: "/images/products/western.png",
    price: 1650.00,
    stock_quantity: 7,
    description: "No-nonsense ranch saddle designed for all-day comfort and grueling work environments. Built to last a lifetime.",
    is_active: true
  },
  {
    name: "Custom Monoflap Dressage",
    category: "Dressage",
    purpose: "Close Contact Training",
    size: "17.5 inch",
    material: "French Calf Leather",
    image_url: "/images/products/dressage.png",
    price: 3500.00,
    stock_quantity: 2,
    description: "Monoflap design for unparalleled close contact with the horse. Features large external knee blocks for thigh security.",
    is_active: true
  },
  {
    name: "Show Ring Western Saddle",
    category: "Western",
    purpose: "Western Pleasure Shows",
    size: "16 inch",
    material: "Light Oil Leather",
    image_url: "/images/products/western.png",
    price: 2750.00,
    stock_quantity: 3,
    description: "Stunning show saddle heavily adorned with engraved silver plating. Sure to catch the judge's eye in any Western Pleasure class.",
    is_active: true
  }
];

async function seed() {
  console.log('Seeding 10 products...');
  for (const product of products) {
    const { data, error } = await supabase.from('products').insert(product);
    if (error) {
      console.error(`Error inserting ${product.name}:`, error.message);
    } else {
      console.log(`Inserted: ${product.name}`);
    }
  }
  console.log('Done!');
}

seed().catch(console.error);
