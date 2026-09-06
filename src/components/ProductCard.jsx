import { Link } from "react-router-dom";
import { money } from "../data";
import { useShop } from "../context.jsx";
import { Stars } from "./Icons.jsx";
import { Btn } from "./ui.jsx";

export default function ProductCard({ product, compact }) {
  const { addToCart } = useShop();
  return (
    <article className="group relative flex min-h-full flex-col border border-transparent bg-white px-3.5 pb-5 pt-4 hover:border-line hover:shadow-[0_8px_24px_rgba(0,0,0,.06)]">
      <div className={`mb-2 flex items-center gap-1.5 text-xs ${product.inStock ? "text-stock" : "text-oos"}`}>
        {product.inStock ? "● in stock" : "● check availability"}
      </div>
      <Link to={`/product/${product.id}`} className="mb-2.5 grid h-[150px] place-items-center">
        <img src={product.image} alt={product.title} className="max-h-[140px] object-contain" />
      </Link>
      <Stars rating={product.rating || 4} reviews={product.reviews || 4} />
      <h3 className="min-h-[54px] text-[13px] font-medium">
        <Link to={`/product/${product.id}`}>{compact ? product.short : product.short || product.title}</Link>
      </h3>
      <div className="mt-auto">
        <div className="text-xs text-muted line-through">{money(product.oldPrice || product.price)}</div>
        <div className="text-lg font-semibold">{money(product.price)}</div>
      </div>
      <Btn
        size="sm"
        className="mt-3 opacity-0 group-hover:opacity-100"
        onClick={() => addToCart(product.id)}
        disabled={!product.inStock}
      >
        Add To Cart
      </Btn>
    </article>
  );
}
