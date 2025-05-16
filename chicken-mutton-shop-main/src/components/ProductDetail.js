// src/components/ProductDetail.js
import React, { useState, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './ProductDetail.css';

// Placeholder images (replace with your actual image imports)
import bonelessChickenImg from '../assets/boneless-chicken.jpg';
import chickenBreastImg from '../assets/chicken-breast.jpg';
import sheepBonelessImg from '../assets/sheep-boneless.jpg';
import goatKeemaImg from '../assets/goat-keema.jpg';
import goatLegsImg from '../assets/goat-legs.jpg';
import chickenCurryImg from '../assets/ChickenCurryCuts1.jpg';

import bonelessMinceImg from '../assets/boneless-mince.jpg';
import specialityCutsImg from '../assets/chickenlarge-cuts.jpg';
import offalsImg from '../assets/offals.jpg';
import premiumCutsImg from '../assets/chicken-keema-mince.jpg';
import muttonCurryImg from '../assets/mutton-curry.jpg';
import largeCutsImg from '../assets/mutton-large-cuts.jpg';
import keemaImg from '../assets/mutton-keema.jpg';

// Define allProducts with updated names
const allProducts = [
  // Bestsellers (unchanged)
  {
    id: 'bestsellers-1',
    name: 'Boneless Chicken',
    price: 350,
    originalPrice: 450,
    discount: '22% off',
    image: bonelessChickenImg,
    images: [bonelessChickenImg, chickenCurryImg, bonelessMinceImg],
    weight: '500 g',
    pieces: '12-18 pieces',
    serves: 4,
    description: 'Tender, juicy boneless chicken perfect for grilling or stir-frying.',
    whatYouGet: [
      { text: 'Chicken humanely raised in restricted bio-security zones', isPositive: true },
      { text: 'Hygienically vacuum-packed', isPositive: true },
      { text: 'Hand selected after age and weight calibration', isPositive: true },
      { text: 'Net weight of prepped meat only', isPositive: true },
      { text: 'Meat of chicken on growth promoters', isPositive: false },
      { text: 'Antibiotic residue free', isPositive: true },
      { text: 'Artisanal cuts', isPositive: true },
      { text: 'Mix of offal organs', isPositive: false },
      { text: 'Temperature controlled between 0-4°C', isPositive: true },
    ],
  },
  {
    id: 'bestsellers-2',
    name: 'Chicken Breast',
    price: 320,
    originalPrice: 400,
    discount: '20% off',
    image: chickenBreastImg,
    images: [chickenBreastImg, specialityCutsImg, offalsImg],
    weight: '500 g',
    pieces: '2-4 pieces',
    serves: 4,
    description: 'Lean and healthy chicken breast, ideal for a variety of dishes.',
    whatYouGet: [
      { text: 'Chicken humanely raised in restricted bio-security zones', isPositive: true },
      { text: 'Hygienically vacuum-packed', isPositive: true },
      { text: 'Hand selected after age and weight calibration', isPositive: true },
      { text: 'Net weight of prepped meat only', isPositive: true },
      { text: 'Meat of chicken on growth promoters', isPositive: false },
      { text: 'Antibiotic residue free', isPositive: true },
      { text: 'Artisanal cuts', isPositive: true },
      { text: 'Mix of offal organs', isPositive: false },
      { text: 'Temperature controlled between 0-4°C', isPositive: true },
    ],
  },
  {
    id: 'bestsellers-3',
    name: 'Mutton Boneless',
    price: 400,
    originalPrice: 500,
    discount: '20% off',
    image: sheepBonelessImg,
    images: [sheepBonelessImg, muttonCurryImg, largeCutsImg],
    weight: '500 g',
    pieces: '10-12 pieces',
    serves: 4,
    description: 'Boneless mutton, perfect for curries and stews.',
    whatYouGet: [
      { text: 'Mutton humanely raised in restricted bio-security zones', isPositive: true },
      { text: 'Hygienically vacuum-packed', isPositive: true },
      { text: 'Hand selected after age and weight calibration', isPositive: true },
      { text: 'Net weight of prepped meat only', isPositive: true },
      { text: 'Meat of mutton on growth promoters', isPositive: false },
      { text: 'Antibiotic residue free', isPositive: true },
      { text: 'Artisanal cuts', isPositive: true },
      { text: 'Mix of offal organs', isPositive: false },
      { text: 'Temperature controlled between 0-4°C', isPositive: true },
    ],
  },
  {
    id: 'bestsellers-4',
    name: 'Mutton Keema',
    price: 380,
    originalPrice: 480,
    discount: '21% off',
    image: goatKeemaImg,
    images: [goatKeemaImg, keemaImg, bonelessMinceImg],
    weight: '500 g',
    pieces: 'N/A',
    serves: 4,
    description: 'Finely minced mutton, great for kebabs and curries.',
    whatYouGet: [
      { text: 'Mutton humanely raised in restricted bio-security zones', isPositive: true },
      { text: 'Hygienically vacuum-packed', isPositive: true },
      { text: 'Hand selected after age and weight calibration', isPositive: true },
      { text: 'Net weight of prepped meat only', isPositive: true },
      { text: 'Meat of mutton on growth promoters', isPositive: false },
      { text: 'Antibiotic residue free', isPositive: true },
      { text: 'Artisanal cuts', isPositive: true },
      { text: 'Mix of offal organs', isPositive: false },
      { text: 'Temperature controlled between 0-4°C', isPositive: true },
    ],
  },
  {
    id: 'bestsellers-5',
    name: 'Mutton Legs',
    price: 450,
    originalPrice: 550,
    discount: '18% off',
    image: goatLegsImg,
    images: [goatLegsImg, largeCutsImg, muttonCurryImg],
    weight: '500 g',
    pieces: '2 pieces',
    serves: 4,
    description: 'Tender mutton legs, ideal for slow-cooked dishes.',
    whatYouGet: [
      { text: 'Mutton humanely raised in restricted bio-security zones', isPositive: true },
      { text: 'Hygienically vacuum-packed', isPositive: true },
      { text: 'Hand selected after age and weight calibration', isPositive: true },
      { text: 'Net weight of prepped meat only', isPositive: true },
      { text: 'Meat of mutton on growth promoters', isPositive: false },
      { text: 'Antibiotic residue free', isPositive: true },
      { text: 'Artisanal cuts', isPositive: true },
      { text: 'Mix of offal organs', isPositive: false },
      { text: 'Temperature controlled between 0-4°C', isPositive: true },
    ],
  },

  {
    id: 'chicken-1',
    name: 'Chicken Curry Cuts',
    price: 150,
    originalPrice: 195,
    discount: '23% off',
    image: chickenCurryImg,
    images: [chickenCurryImg, chickenCurryImg, specialityCutsImg],
    weight: '500 g',
    pieces: '12-18 pieces',
    serves: 4,
    description: 'Premium chicken curry cuts including leg, breast, and wings, perfect for a family of 4.',
    whatYouGet: [
      { text: 'Chicken humanely raised in restricted bio-security zones', isPositive: true },
      { text: 'Hygienically vacuum-packed', isPositive: true },
      { text: 'Hand selected after age and weight calibration', isPositive: true },
      { text: 'Net weight of prepped meat only', isPositive: true },
      { text: 'Meat of chicken on growth promoters', isPositive: false },
      { text: 'Antibiotic residue free', isPositive: true },
      { text: 'Artisanal cuts', isPositive: true },
      { text: 'Mix of offal organs', isPositive: false },
      { text: 'Temperature controlled between 0-4°C', isPositive: true },
    ],
  },
  {
    id: 'chicken-2',
    name: 'Chicken Boneless',
    price: 320,
    originalPrice: 400,
    discount: '20% off',
    image: bonelessMinceImg,
    images: [bonelessMinceImg, premiumCutsImg, goatKeemaImg],
    weight: '500 g',
    pieces: 'N/A',
    serves: 4,
    description: 'Tender boneless chicken, ideal for grilling, stir-frying, or curries.',
    whatYouGet: [
      { text: 'Chicken humanely raised in restricted bio-security zones', isPositive: true },
      { text: 'Hygienically vacuum-packed', isPositive: true },
      { text: 'Hand selected after age and weight calibration', isPositive: true },
      { text: 'Net weight of prepped meat only', isPositive: true },
      { text: 'Meat of chicken on growth promoters', isPositive: false },
      { text: 'Antibiotic residue free', isPositive: true },
      { text: 'Artisanal cuts', isPositive: true },
      { text: 'Mix of offal organs', isPositive: false },
      { text: 'Temperature controlled between 0-4°C', isPositive: true },
    ],
  },
  {
    id: 'chicken-3',
    name: 'Chicken Large Cuts',
    price: 250,
    originalPrice: 300,
    discount: '17% off',
    image: specialityCutsImg,
    images: [specialityCutsImg, chickenBreastImg, bonelessChickenImg],
    weight: '500 g',
    pieces: '4-6 pieces',
    serves: 4,
    description: 'Large chicken cuts, ideal for roasting or grilling.',
    whatYouGet: [
      { text: 'Chicken humanely raised in restricted bio-security zones', isPositive: true },
      { text: 'Hygienically vacuum-packed', isPositive: true },
      { text: 'Hand selected after age and weight calibration', isPositive: true },
      { text: 'Net weight of prepped meat only', isPositive: true },
      { text: 'Meat of chicken on growth promoters', isPositive: false },
      { text: 'Antibiotic residue free', isPositive: true },
      { text: 'Artisanal cuts', isPositive: true },
      { text: 'Mix of offal organs', isPositive: false },
      { text: 'Temperature controlled between 0-4°C', isPositive: true },
    ],
  },
  {
    id: 'chicken-4',
    name: 'Chicken Offals',
    price: 180,
    originalPrice: 220,
    discount: '18% off',
    image: offalsImg,
    images: [offalsImg, sheepBonelessImg, largeCutsImg],
    weight: '500 g',
    pieces: 'N/A',
    serves: 4,
    description: 'Chicken offals, great for traditional recipes.',
    whatYouGet: [
      { text: 'Chicken humanely raised in restricted bio-security zones', isPositive: true },
      { text: 'Hygienically vacuum-packed', isPositive: true },
      { text: 'Hand selected after age and weight calibration', isPositive: true },
      { text: 'Net weight of prepped meat only', isPositive: true },
      { text: 'Meat of chicken on growth promoters', isPositive: false },
      { text: 'Antibiotic residue free', isPositive: true },
      { text: 'Artisanal cuts', isPositive: true },
      { text: 'Mix of offal organs', isPositive: true },
      { text: 'Temperature controlled between 0-4°C', isPositive: true },
    ],
  },
  {
    id: 'chicken-5',
    name: 'Chicken Breast',
    price: 220,
    originalPrice: 345,
    discount: '36% off',
    image: chickenBreastImg,
    images: [chickenBreastImg, specialityCutsImg, bonelessChickenImg],
    weight: '500 g',
    pieces: '2-4 pieces',
    serves: 4,
    description: 'Lean chicken breast, perfect for healthy meals.',
    whatYouGet: [
      { text: 'Chicken humanely raised in restricted bio-security zones', isPositive: true },
      { text: 'Hygienically vacuum-packed', isPositive: true },
      { text: 'Hand selected after age and weight calibration', isPositive: true },
      { text: 'Net weight of prepped meat only', isPositive: true },
      { text: 'Meat of chicken on growth promoters', isPositive: false },
      { text: 'Antibiotic residue free', isPositive: true },
      { text: 'Artisanal cuts', isPositive: true },
      { text: 'Mix of offal organs', isPositive: false },
      { text: 'Temperature controlled between 0-4°C', isPositive: true },
    ],
  },
  {
    id: 'chicken-6',
    name: 'Chicken Keema',
    price: 280,
    originalPrice: 350,
    discount: '20% off',
    image: premiumCutsImg,
    images: [premiumCutsImg, goatKeemaImg, bonelessMinceImg],
    weight: '500 g',
    pieces: 'N/A',
    serves: 4,
    description: 'Finely minced chicken, ideal for kebabs and curries.',
    whatYouGet: [
      { text: 'Chicken humanely raised in restricted bio-security zones', isPositive: true },
      { text: 'Hygienically vacuum-packed', isPositive: true },
      { text: 'Hand selected after age and weight calibration', isPositive: true },
      { text: 'Net weight of prepped meat only', isPositive: true },
      { text: 'Meat of chicken on growth promoters', isPositive: false },
      { text: 'Antibiotic residue free', isPositive: true },
      { text: 'Artisanal cuts', isPositive: true },
      { text: 'Mix of offal organs', isPositive: false },
      { text: 'Temperature controlled between 0-4°C', isPositive: true },
    ],
  },
  {
    id: 'chicken-7',
    name: 'Chicken Wings',
    price: 200,
    originalPrice: 250,
    discount: '20% off',
    image: chickenBreastImg,
    images: [chickenBreastImg, specialityCutsImg, bonelessChickenImg],
    weight: '500 g',
    pieces: '8-10 pieces',
    serves: 4,
    description: 'Tender chicken wings, ideal for frying or barbecuing.',
    whatYouGet: [
      { text: 'Chicken humanely raised in restricted bio-security zones', isPositive: true },
      { text: 'Hygienically vacuum-packed', isPositive: true },
      { text: 'Hand selected after age and weight calibration', isPositive: true },
      { text: 'Net weight of prepped meat only', isPositive: true },
      { text: 'Meat of chicken on growth promoters', isPositive: false },
      { text: 'Antibiotic residue free', isPositive: true },
      { text: 'Artisanal cuts', isPositive: true },
      { text: 'Mix of offal organs', isPositive: false },
      { text: 'Temperature controlled between 0-4°C', isPositive: true },
    ],
  },
  {
    id: 'chicken-8',
    name: 'Chicken Drumsticks',
    price: 240,
    originalPrice: 300,
    discount: '20% off',
    image: specialityCutsImg,
    images: [specialityCutsImg, chickenBreastImg, bonelessChickenImg],
    weight: '500 g',
    pieces: '4-6 pieces',
    serves: 4,
    description: 'Succulent chicken drumsticks, great for roasting or grilling.',
    whatYouGet: [
      { text: 'Chicken humanely raised in restricted bio-security zones', isPositive: true },
      { text: 'Hygienically vacuum-packed', isPositive: true },
      { text: 'Hand selected after age and weight calibration', isPositive: true },
      { text: 'Net weight of prepped meat only', isPositive: true },
      { text: 'Meat of chicken on growth promoters', isPositive: false },
      { text: 'Antibiotic residue free', isPositive: true },
      { text: 'Artisanal cuts', isPositive: true },
      { text: 'Mix of offal organs', isPositive: false },
      { text: 'Temperature controlled between 0-4°C', isPositive: true },
    ],
  },
  {
    id: 'chicken-9',
    name: 'Chicken Liver',
    price: 160,
    originalPrice: 200,
    discount: '20% off',
    image: offalsImg,
    images: [offalsImg, sheepBonelessImg, largeCutsImg],
    weight: '500 g',
    pieces: 'N/A',
    serves: 4,
    description: 'Fresh chicken livers, ideal for traditional recipes.',
    whatYouGet: [
      { text: 'Chicken humanely raised in restricted bio-security zones', isPositive: true },
      { text: 'Hygienically vacuum-packed', isPositive: true },
      { text: 'Hand selected after age and weight calibration', isPositive: true },
      { text: 'Net weight of prepped meat only', isPositive: true },
      { text: 'Meat of chicken on growth promoters', isPositive: false },
      { text: 'Antibiotic residue free', isPositive: true },
      { text: 'Artisanal cuts', isPositive: true },
      { text: 'Mix of offal organs', isPositive: true },
      { text: 'Temperature controlled between 0-4°C', isPositive: true },
    ],
  },
  {
    id: 'chicken-10',
    name: 'Chicken Neck Pieces',
    price: 190,
    originalPrice: 240,
    discount: '21% off',
    image: bonelessChickenImg,
    images: [bonelessChickenImg, chickenCurryImg, specialityCutsImg],
    weight: '500 g',
    pieces: '6-8 pieces',
    serves: 4,
    description: 'Chicken neck pieces, perfect for soups or stews.',
    whatYouGet: [
      { text: 'Chicken humanely raised in restricted bio-security zones', isPositive: true },
      { text: 'Hygienically vacuum-packed', isPositive: true },
      { text: 'Hand selected after age and weight calibration', isPositive: true },
      { text: 'Net weight of prepped meat only', isPositive: true },
      { text: 'Meat of chicken on growth promoters', isPositive: false },
      { text: 'Antibiotic residue free', isPositive: true },
      { text: 'Artisanal cuts', isPositive: true },
      { text: 'Mix of offal organs', isPositive: false },
      { text: 'Temperature controlled between 0-4°C', isPositive: true },
    ],
  },
  {
    id: 'chicken-11',
    name: 'Chicken Gizzard',
    price: 170,
    originalPrice: 210,
    discount: '19% off',
    image: offalsImg,
    images: [offalsImg, sheepBonelessImg, largeCutsImg],
    weight: '500 g',
    pieces: 'N/A',
    serves: 4,
    description: 'Chicken gizzards, great for traditional dishes.',
    whatYouGet: [
      { text: 'Chicken humanely raised in restricted bio-security zones', isPositive: true },
      { text: 'Hygienically vacuum-packed', isPositive: true },
      { text: 'Hand selected after age and weight calibration', isPositive: true },
      { text: 'Net weight of prepped meat only', isPositive: true },
      { text: 'Meat of chicken on growth promoters', isPositive: false },
      { text: 'Antibiotic residue free', isPositive: true },
      { text: 'Artisanal cuts', isPositive: true },
      { text: 'Mix of offal organs', isPositive: true },
      { text: 'Temperature controlled between 0-4°C', isPositive: true },
    ],
  },

  // Mutton (16 items with updated names)
  {
    id: 'mutton-1',
    name: 'Mutton Curry Cuts',
    price: 450,
    originalPrice: 550,
    discount: '18% off',
    image: muttonCurryImg,
    images: [muttonCurryImg, sheepBonelessImg, largeCutsImg],
    weight: '500 g',
    pieces: '10-12 pieces',
    serves: 4,
    description: 'Tender mutton curry cuts, perfect for rich curries.',
    whatYouGet: [
      { text: 'Mutton humanely raised in restricted bio-security zones', isPositive: true },
      { text: 'Hygienically vacuum-packed', isPositive: true },
      { text: 'Hand selected after age and weight calibration', isPositive: true },
      { text: 'Net weight of prepped meat only', isPositive: true },
      { text: 'Meat of mutton on growth promoters', isPositive: false },
      { text: 'Antibiotic residue free', isPositive: true },
      { text: 'Artisanal cuts', isPositive: true },
      { text: 'Mix of offal organs', isPositive: false },
      { text: 'Temperature controlled between 0-4°C', isPositive: true },
    ],
  },
  {
    id: 'mutton-2',
    name: 'Mutton Boneless',
    price: 500,
    originalPrice: 620,
    discount: '19% off',
    image: bonelessMinceImg,
    images: [bonelessMinceImg, premiumCutsImg, goatKeemaImg],
    weight: '500 g',
    pieces: 'N/A',
    serves: 4,
    description: 'Boneless mutton, great for kebabs and patties.',
    whatYouGet: [
      { text: 'Mutton humanely raised in restricted bio-security zones', isPositive: true },
      { text: 'Hygienically vacuum-packed', isPositive: true },
      { text: 'Hand selected after age and weight calibration', isPositive: true },
      { text: 'Net weight of prepped meat only', isPositive: true },
      { text: 'Meat of mutton on growth promoters', isPositive: false },
      { text: 'Antibiotic residue free', isPositive: true },
      { text: 'Artisanal cuts', isPositive: true },
      { text: 'Mix of offal organs', isPositive: false },
      { text: 'Temperature controlled between 0-4°C', isPositive: true },
    ],
  },
  {
    id: 'mutton-3',
    name: 'Mutton Large Cuts',
    price: 480,
    originalPrice: 580,
    discount: '17% off',
    image: largeCutsImg,
    images: [largeCutsImg, goatLegsImg, muttonCurryImg],
    weight: '500 g',
    pieces: '4-6 pieces',
    serves: 4,
    description: 'Large mutton cuts, ideal for slow-cooked dishes.',
    whatYouGet: [
      { text: 'Mutton humanely raised in restricted bio-security zones', isPositive: true },
      { text: 'Hygienically vacuum-packed', isPositive: true },
      { text: 'Hand selected after age and weight calibration', isPositive: true },
      { text: 'Net weight of prepped meat only', isPositive: true },
      { text: 'Meat of mutton on growth promoters', isPositive: false },
      { text: 'Antibiotic residue free', isPositive: true },
      { text: 'Artisanal cuts', isPositive: true },
      { text: 'Mix of offal organs', isPositive: false },
      { text: 'Temperature controlled between 0-4°C', isPositive: true },
    ],
  },
  {
    id: 'mutton-4',
    name: 'Mutton Offals',
    price: 300,
    originalPrice: 360,
    discount: '17% off',
    image: offalsImg,
    images: [offalsImg, sheepBonelessImg, largeCutsImg],
    weight: '500 g',
    pieces: 'N/A',
    serves: 4,
    description: 'Mutton offals, perfect for traditional recipes.',
    whatYouGet: [
      { text: 'Mutton humanely raised in restricted bio-security zones', isPositive: true },
      { text: 'Hygienically vacuum-packed', isPositive: true },
      { text: 'Hand selected after age and weight calibration', isPositive: true },
      { text: 'Net weight of prepped meat only', isPositive: true },
      { text: 'Meat of mutton on growth promoters', isPositive: false },
      { text: 'Antibiotic residue free', isPositive: true },
      { text: 'Artisanal cuts', isPositive: true },
      { text: 'Mix of offal organs', isPositive: true },
      { text: 'Temperature controlled between 0-4°C', isPositive: true },
    ],
  },
  {
    id: 'mutton-5',
    name: 'Mutton Keema',
    price: 520,
    originalPrice: 650,
    discount: '20% off',
    image: keemaImg,
    images: [keemaImg, goatKeemaImg, bonelessMinceImg],
    weight: '500 g',
    pieces: 'N/A',
    serves: 4,
    description: 'Finely minced mutton, great for kebabs and curries.',
    whatYouGet: [
      { text: 'Mutton humanely raised in restricted bio-security zones', isPositive: true },
      { text: 'Hygienically vacuum-packed', isPositive: true },
      { text: 'Hand selected after age and weight calibration', isPositive: true },
      { text: 'Net weight of prepped meat only', isPositive: true },
      { text: 'Meat of mutton on growth promoters', isPositive: false },
      { text: 'Antibiotic residue free', isPositive: true },
      { text: 'Artisanal cuts', isPositive: true },
      { text: 'Mix of offal organs', isPositive: false },
      { text: 'Temperature controlled between 0-4°C', isPositive: true },
    ],
  },
  {
    id: 'mutton-6',
    name: 'Mutton Legs',
    price: 600,
    originalPrice: 720,
    discount: '17% off',
    image: goatLegsImg,
    images: [goatLegsImg, largeCutsImg, muttonCurryImg],
    weight: '500 g',
    pieces: '2 pieces',
    serves: 4,
    description: 'Tender mutton legs, ideal for slow-cooked dishes.',
    whatYouGet: [
      { text: 'Mutton humanely raised in restricted bio-security zones', isPositive: true },
      { text: 'Hygienically vacuum-packed', isPositive: true },
      { text: 'Hand selected after age and weight calibration', isPositive: true },
      { text: 'Net weight of prepped meat only', isPositive: true },
      { text: 'Meat of mutton on growth promoters', isPositive: false },
      { text: 'Antibiotic residue free', isPositive: true },
      { text: 'Artisanal cuts', isPositive: true },
      { text: 'Mix of offal organs', isPositive: false },
      { text: 'Temperature controlled between 0-4°C', isPositive: true },
    ],
  },
  {
    id: 'mutton-7',
    name: 'Mutton Spleen',
    price: 280,
    originalPrice: 340,
    discount: '18% off',
    image: offalsImg,
    images: [offalsImg, sheepBonelessImg, largeCutsImg],
    weight: '500 g',
    pieces: 'N/A',
    serves: 4,
    description: 'Mutton spleen, perfect for traditional dishes.',
    whatYouGet: [
      { text: 'Mutton humanely raised in restricted bio-security zones', isPositive: true },
      { text: 'Hygienically vacuum-packed', isPositive: true },
      { text: 'Hand selected after age and weight calibration', isPositive: true },
      { text: 'Net weight of prepped meat only', isPositive: true },
      { text: 'Meat of mutton on growth promoters', isPositive: false },
      { text: 'Antibiotic residue free', isPositive: true },
      { text: 'Artisanal cuts', isPositive: true },
      { text: 'Mix of offal organs', isPositive: true },
      { text: 'Temperature controlled between 0-4°C', isPositive: true },
    ],
  },
  {
    id: 'mutton-8',
    name: 'Mutton Shoulder Cuts',
    price: 470,
    originalPrice: 570,
    discount: '18% off',
    image: muttonCurryImg,
    images: [muttonCurryImg, sheepBonelessImg, largeCutsImg],
    weight: '500 g',
    pieces: '8-10 pieces',
    serves: 4,
    description: 'Tender mutton shoulder cuts, perfect for slow-cooked dishes and roasts.',
    whatYouGet: [
      { text: 'Mutton humanely raised in restricted bio-security zones', isPositive: true },
      { text: 'Hygienically vacuum-packed', isPositive: true },
      { text: 'Hand selected after age and weight calibration', isPositive: true },
      { text: 'Net weight of prepped meat only', isPositive: true },
      { text: 'Meat of mutton on growth promoters', isPositive: false },
      { text: 'Antibiotic residue free', isPositive: true },
      { text: 'Artisanal cuts', isPositive: true },
      { text: 'Mix of offal organs', isPositive: false },
      { text: 'Temperature controlled between 0-4°C', isPositive: true },
    ],
  },
  {
    id: 'mutton-9',
    name: 'Mutton Bones',
    price: 200,
    originalPrice: 250,
    discount: '20% off',
    image: muttonCurryImg,
    images: [muttonCurryImg, sheepBonelessImg, largeCutsImg],
    weight: '500 g',
    pieces: 'N/A',
    serves: 4,
    description: 'Mutton bones, ideal for making stocks and broths.',
    whatYouGet: [
      { text: 'Mutton humanely raised in restricted bio-security zones', isPositive: true },
      { text: 'Hygienically vacuum-packed', isPositive: true },
      { text: 'Hand selected after age and weight calibration', isPositive: true },
      { text: 'Net weight of prepped meat only', isPositive: true },
      { text: 'Meat of mutton on growth promoters', isPositive: false },
      { text: 'Antibiotic residue free', isPositive: true },
      { text: 'Artisanal cuts', isPositive: true },
      { text: 'Mix of offal organs', isPositive: false },
      { text: 'Temperature controlled between 0-4°C', isPositive: true },
    ],
  },
  {
    id: 'mutton-10',
    name: 'Mutton Lungs',
    price: 260,
    originalPrice: 320,
    discount: '19% off',
    image: offalsImg,
    images: [offalsImg, sheepBonelessImg, largeCutsImg],
    weight: '500 g',
    pieces: 'N/A',
    serves: 4,
    description: 'Mutton lungs, suitable for traditional recipes.',
    whatYouGet: [
      { text: 'Mutton humanely raised in restricted bio-security zones', isPositive: true },
      { text: 'Hygienically vacuum-packed', isPositive: true },
      { text: 'Hand selected after age and weight calibration', isPositive: true },
      { text: 'Net weight of prepped meat only', isPositive: true },
      { text: 'Meat of mutton on growth promoters', isPositive: false },
      { text: 'Antibiotic residue free', isPositive: true },
      { text: 'Artisanal cuts', isPositive: true },
      { text: 'Mix of offal organs', isPositive: true },
      { text: 'Temperature controlled between 0-4°C', isPositive: true },
    ],
  },
  {
    id: 'mutton-11',
    name: 'Mutton Intestine',
    price: 290,
    originalPrice: 350,
    discount: '17% off',
    image: offalsImg,
    images: [offalsImg, sheepBonelessImg, largeCutsImg],
    weight: '500 g',
    pieces: 'N/A',
    serves: 4,
    description: 'Mutton intestine, perfect for traditional dishes.',
    whatYouGet: [
      { text: 'Mutton humanely raised in restricted bio-security zones', isPositive: true },
      { text: 'Hygienically vacuum-packed', isPositive: true },
      { text: 'Hand selected after age and weight calibration', isPositive: true },
      { text: 'Net weight of prepped meat only', isPositive: true },
      { text: 'Meat of mutton on growth promoters', isPositive: false },
      { text: 'Antibiotic residue free', isPositive: true },
      { text: 'Artisanal cuts', isPositive: true },
      { text: 'Mix of offal organs', isPositive: true },
      { text: 'Temperature controlled between 0-4°C', isPositive: true },
    ],
  },
  {
    id: 'mutton-12',
    name: 'Mutton Head',
    price: 350,
    originalPrice: 420,
    discount: '17% off',
    image: offalsImg,
    images: [offalsImg, sheepBonelessImg, largeCutsImg],
    weight: '500 g',
    pieces: '1 piece',
    serves: 4,
    description: 'Mutton head, ideal for traditional soups and stews.',
    whatYouGet: [
      { text: 'Mutton humanely raised in restricted bio-security zones', isPositive: true },
      { text: 'Hygienically vacuum-packed', isPositive: true },
      { text: 'Hand selected after age and weight calibration', isPositive: true },
      { text: 'Net weight of prepped meat only', isPositive: true },
      { text: 'Meat of mutton on growth promoters', isPositive: false },
      { text: 'Antibiotic residue free', isPositive: true },
      { text: 'Artisanal cuts', isPositive: true },
      { text: 'Mix of offal organs', isPositive: true },
      { text: 'Temperature controlled between 0-4°C', isPositive: true },
    ],
  },
  {
    id: 'mutton-13',
    name: 'Mutton Brain',
    price: 280,
    originalPrice: 340,
    discount: '18% off',
    image: offalsImg,
    images: [offalsImg, sheepBonelessImg, largeCutsImg],
    weight: '500 g',
    pieces: 'N/A',
    serves: 4,
    description: 'Mutton brain, ideal for traditional delicacies.',
    whatYouGet: [
      { text: 'Mutton humanely raised in restricted bio-security zones', isPositive: true },
      { text: 'Hygienically vacuum-packed', isPositive: true },
      { text: 'Hand selected after age and weight calibration', isPositive: true },
      { text: 'Net weight of prepped meat only', isPositive: true },
      { text: 'Meat of mutton on growth promoters', isPositive: false },
      { text: 'Antibiotic residue free', isPositive: true },
      { text: 'Artisanal cuts', isPositive: true },
      { text: 'Mix of offal organs', isPositive: true },
      { text: 'Temperature controlled between 0-4°C', isPositive: true },
    ],
  },
  {
    id: 'mutton-14',
    name: 'Mutton Tongue',
    price: 310,
    originalPrice: 380,
    discount: '18% off',
    image: offalsImg,
    images: [offalsImg, sheepBonelessImg, largeCutsImg],
    weight: '500 g',
    pieces: 'N/A',
    serves: 4,
    description: 'Mutton tongue, perfect for traditional recipes.',
    whatYouGet: [
      { text: 'Mutton humanely raised in restricted bio-security zones', isPositive: true },
      { text: 'Hygienically vacuum-packed', isPositive: true },
      { text: 'Hand selected after age and weight calibration', isPositive: true },
      { text: 'Net weight of prepped meat only', isPositive: true },
      { text: 'Meat of mutton on growth promoters', isPositive: false },
      { text: 'Antibiotic residue free', isPositive: true },
      { text: 'Artisanal cuts', isPositive: true },
      { text: 'Mix of offal organs', isPositive: true },
      { text: 'Temperature controlled between 0-4°C', isPositive: true },
    ],
  },
  {
    id: 'mutton-15',
    name: 'Mutton Liver',
    price: 320,
    originalPrice: 400,
    discount: '20% off',
    image: offalsImg,
    images: [offalsImg, sheepBonelessImg, largeCutsImg],
    weight: '500 g',
    pieces: 'N/A',
    serves: 4,
    description: 'Fresh mutton liver, perfect for traditional dishes.',
    whatYouGet: [
      { text: 'Mutton humanely raised in restricted bio-security zones', isPositive: true },
      { text: 'Hygienically vacuum-packed', isPositive: true },
      { text: 'Hand selected after age and weight calibration', isPositive: true },
      { text: 'Net weight of prepped meat only', isPositive: true },
      { text: 'Meat of mutton on growth promoters', isPositive: false },
      { text: 'Antibiotic residue free', isPositive: true },
      { text: 'Artisanal cuts', isPositive: true },
      { text: 'Mix of offal organs', isPositive: true },
      { text: 'Temperature controlled between 0-4°C', isPositive: true },
    ],
  },
];

const ProductDetail = ({ addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = allProducts.find((p) => p.id === id);

  // State to manage the current image index and swipe direction
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState(null); // 'left' or 'right'
  const touchStartX = useRef(null);

  // Determine the category for the "Go Back" link
  const getCategory = () => {
    if (id.startsWith('mutton')) return 'mutton';
    if (id.startsWith('chicken')) return 'chicken';
    return ''; // Default for bestsellers or other categories
  };

  // Loading state or product not found
  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Product Not Found</h2>
        <p>Sorry, we couldn't find the product you're looking for.</p>
        <Link to={`/category/${getCategory()}`}>Go Back to {getCategory() || 'Home'}</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    try {
      addToCart(product);
      alert(`${product.name} added to cart!`);
      navigate('/');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add to cart. Please try again.');
    }
  };

  const handleNextImage = () => {
    setDirection('right');
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setDirection('left');
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  const handleThumbnailClick = (index) => {
    setDirection(index > currentImageIndex ? 'right' : 'left');
    setCurrentImageIndex(index);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartX.current - touchEndX;

    if (Math.abs(diffX) > 50) { // Minimum swipe distance
      if (diffX > 0) {
        // Swipe left, show next image
        handleNextImage();
      } else {
        // Swipe right, show previous image
        handlePrevImage();
      }
    }
  };

  return (
    <div className="product-detail">
      <div className="product-detail-container">
        <div className="product-image-gallery">
          <div
            className="main-image"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <img
              src={product.images[currentImageIndex]}
              alt={`${product.name} - Image ${currentImageIndex + 1}`}
              className={`slide-${direction}`}
              key={currentImageIndex}
            />
            <button
              className="arrow prev-arrow"
              onClick={handlePrevImage}
              aria-label="Previous Image"
            >
              ❮
            </button>
            <button
              className="arrow next-arrow"
              onClick={handleNextImage}
              aria-label="Next Image"
            >
              ❯
            </button>
          </div>
          <div className="thumbnails">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.name} thumbnail ${index + 1}`}
                className={`thumbnail ${currentImageIndex === index ? 'active' : ''}`}
                onClick={() => handleThumbnailClick(index)}
              />
            ))}
          </div>
        </div>
        <div className="product-info">
          <h1>{product.name}</h1>
          <p className="product-meta">
            {product.weight} | {product.pieces} | Serves {product.serves}
          </p>
          <p className="product-description">{product.description}</p>
          <p className="product-price">
            ₹{product.price} <span className="discount">{product.discount}</span>
            <br />
            <s>MRP: ₹{product.originalPrice} (incl. of all taxes)</s>
          </p>
          <button
            className="add-to-cart-btn"
            onClick={handleAddToCart}
            aria-label={`Add ${product.name} to cart`}
          >
            Add +
          </button>
          <p className="delivery-info">
            <span className="delivery-icon">⚡</span> Today in 90 mins
          </p>
        </div>
      </div>

      {/* What You Get Section */}
      <div className="what-you-get-section">
        <h2>What You Get</h2>
        <div className="what-you-get-content">
          <div className="what-you-get-image">
            <img src={product.images[0]} alt={`What you get for ${product.name}`} />
          </div>
          <div className="what-you-get-list">
            <h3>Sourcing</h3>
            <ul>
              {product.whatYouGet.map((item, index) => (
                <li key={index}>
                  <span className={`icon ${item.isPositive ? 'positive' : 'negative'}`}>
                    {item.isPositive ? '✔' : '✘'}
                  </span>
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export allProducts so other components can use it
export { allProducts };
export default ProductDetail;