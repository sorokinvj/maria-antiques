import { ProductCard } from "@/components/product-card";
import React from "react";
import { Product } from "types";

interface Props {
  products: Product[];
}

const ProductGrid: React.FC<Props> = ({ products }) => {
  return (
    <div className="gap-8 grid sm:grid-cols-2 lg:grid-cols-3">
      {products.map(ProductCard)}
    </div>
  );
};

export default ProductGrid;
