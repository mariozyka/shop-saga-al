import { Product } from '@/contexts/CartContext';

export const products: Product[] = [
  {
    id: 1,
    name: 'Laptop Gaming Pro',
    description: 'Laptop i fuqishëm për gaming dhe punë profesionale. Intel i7, 16GB RAM, RTX 3060.',
    price: 1299.99,
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800',
    category: 'Elektronikë',
    stock: 15
  },
  {
    id: 2,
    name: 'Smartphone Ultra',
    description: 'Smartphone i ri me kamera të avancuara dhe performancë të shkëlqyer.',
    price: 899.99,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800',
    category: 'Elektronikë',
    stock: 30
  },
  {
    id: 3,
    name: 'Tastierë Mekanike RGB',
    description: 'Tastierë mekanike me ndriçim RGB dhe switches të cilësisë së lartë.',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800',
    category: 'Aksesore',
    stock: 50
  },
  {
    id: 4,
    name: 'Monitor 4K 27"',
    description: 'Monitor 4K me ngjyra të shkëlqyera dhe refresh rate 144Hz.',
    price: 449.99,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800',
    category: 'Elektronikë',
    stock: 20
  },
  {
    id: 5,
    name: 'Kufje Wireless Premium',
    description: 'Kufje me noise cancellation dhe cilësi audio superiore.',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
    category: 'Audio',
    stock: 40
  },
  {
    id: 6,
    name: 'Mouse Gaming Precision',
    description: 'Mouse gaming me sensor të saktë dhe 16000 DPI.',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=800',
    category: 'Aksesore',
    stock: 60
  },
  {
    id: 7,
    name: 'Kamerë Web 4K',
    description: 'Kamerë web me rezolucion 4K për streaming dhe video calls.',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=800',
    category: 'Elektronikë',
    stock: 25
  },
  {
    id: 8,
    name: 'Tablet Pro 12"',
    description: 'Tablet i fuqishëm për punë krijuese dhe argëtim.',
    price: 799.99,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800',
    category: 'Elektronikë',
    stock: 18
  },
  {
    id: 9,
    name: 'Smartwatch Sport',
    description: 'Smartwatch me GPS dhe monitorim të shëndetit.',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800',
    category: 'Aksesore',
    stock: 35
  },
  {
    id: 10,
    name: 'Speaker Bluetooth Portable',
    description: 'Speaker portable me cilësi audio të shkëlqyer dhe bateri të qëndrueshme.',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800',
    category: 'Audio',
    stock: 45
  },
  {
    id: 11,
    name: 'Karrige Gaming Ergonomike',
    description: 'Karrige e rehatshme për gaming me mbështetje të plotë të trupit.',
    price: 349.99,
    image: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=800',
    category: 'Mobilje',
    stock: 12
  },
  {
    id: 12,
    name: 'Desk Gaming LED',
    description: 'Tavolinë gaming me ndriçim LED dhe hapësirë ​​të bollshme.',
    price: 399.99,
    image: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=800',
    category: 'Mobilje',
    stock: 10
  }
];

export const categories = ['Të gjitha', 'Elektronikë', 'Aksesore', 'Audio', 'Mobilje'];
