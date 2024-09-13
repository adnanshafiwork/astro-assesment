import React from 'react';
import ProductCard from './ProductCard.jsx';
import useSWR from 'swr';

// SWR fetcher function to get the product data
const fetcher = url => fetch(url).then(res => res.json());

const ProductsPage = () => {
  
  const { data, error } = useSWR('/api/products', fetcher);
  console.log('SWR data:', data);
  console.log('SWR error:', error);
  if (error) return <div>Error loading products.</div>;
  if (!data) return <div>Loading...</div>;

  // Log the fetched data for debugging
  console.log('Fetched data:', data);

  const products = data?.data || [];

  // Ensure products is an array
  if (!Array.isArray(products)) {
    console.error('Products data is not an array:', products);
    return <div>No products available</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product, index) => {
          // Debugging log to identify potential issues with product data
          console.log(`Rendering product at index ${index}:`, product);

          // Make sure product is a valid object
          if (!product || typeof product !== 'object') {
            console.error('Invalid product object:', product);
            return <div key={index}>Invalid product data</div>;
          }

          return <ProductCard key={product.id || index} product={product} />;
        })}
      </div>
    </div>
  );
};

export default ProductsPage;
