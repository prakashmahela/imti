export interface Product {
  id: string;
  name: string;
  price: number;
  currencySymbol?: string; // Optional custom currency symbol e.g. "₽" or "$"
  category: string;
  description: string;
  details: string[];
  gsm: number;
  colors: { name: string; hex: string; class: string }[];
  sizes: string[];
  imagePrimary: string;
  imageHover: string;
  isExclusive?: boolean;
}

export interface CartItem {
  id: string; // Unique combination of product.id + selectedSize + selectedColor
  product: Product;
  selectedSize: string;
  selectedColor: string;
  selectedColorHex: string;
  quantity: number;
}

export interface SocietyPass {
  id: string;
  holderName: string;
  tier: 'PROV_MEMBER' | 'ELITE_SOCIETY' | 'FOUNDER_GEN';
  issueDate: string;
  accessCode: string;
  active: boolean;
}

export interface OrderDetails {
  orderId: string;
  customerName: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  items: { productName: string; size: string; color: string; price: number; quantity: number }[];
  subtotal: number;
  total: number;
  pass: SocietyPass;
}
