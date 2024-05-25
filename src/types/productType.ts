
export interface Product {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    image: string;
    category: string;
    description: string;
    price: number;
    cartItemId: string | null;
    orderItemId: string | null;
  }
  