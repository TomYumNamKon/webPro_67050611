import ProductCard from './ProductCard.jsx'

export default function ProductList({ products, onAdd, onDetail }) {
  return (
    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {products.map(product => (
        <ProductCard key={product.id} name={product.name} price={product.price} currencyCode={product.currencyCode} image={product.image}
          category={product.category} rating={product.rating} reviews={product.reviews}
          onAdd={() => onAdd(product)} onDetail={() => onDetail(product)} />
      ))}
    </div>
  )
}
