import React from 'react';

export default function ProductCard({ product }) {
  // Safely access product attributes
  const { attributes } = product || {};
  const { name, description, image } = attributes || {};
  const imageUrl = image?.data?.attributes?.url;

  // Debugging log to check for invalid data
  console.log('Rendering ProductCard:', product);
  console.log('Product attributes:', attributes);
  console.log('Image URL:', imageUrl);

  // Handle missing attributes
  if (!attributes) {
    console.error('Missing product attributes:', product);
    return <div>Invalid product data</div>;
  }

  return (
    <article className="border rounded-lg overflow-hidden shadow-lg">
      {imageUrl && (
        <img
          src={`http://127.0.0.1:1337/${imageUrl}`}
          alt={name}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h2 className="text-lg font-semibold">{name}</h2>
        <p className="text-gray-700">{description}</p>
        <a
          href={`/products/${product.id}`}
          className="mt-4 inline-block text-blue-500 hover:underline"
        >
          View Details
        </a>
      </div>
    </article>
  );
}
