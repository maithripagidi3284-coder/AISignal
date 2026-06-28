import Link from "next/link";
import { Product } from "@/types";
import { Heart, MessageCircle } from "lucide-react";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="flex items-center justify-between py-4 border-b border-gray-100 hover:bg-gray-50 px-4 transition-colors group"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0 text-lg font-bold text-gray-400">
          {product.name[0]}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-gray-900 group-hover:text-[#e5173f] transition-colors">
              {product.name}
            </p>
            {product.trending && (
              <span className="text-xs px-2 py-0.5 bg-orange-50 text-orange-500 rounded-full">
                {product.trending}
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-0.5">{product.tagline}</p>
          <div className="flex gap-2 mt-1">
            {product.tags.map((tag) => (
              <span key={tag} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4 ml-4 flex-shrink-0">
        <div className="flex items-center gap-1 text-gray-500">
          <Heart size={14} />
          <span className="text-xs">{(product.upvotes / 1000).toFixed(1)}K</span>
        </div>
        <div className="flex items-center gap-1 text-gray-500">
          <MessageCircle size={14} />
          <span className="text-xs">{product.comments}</span>
        </div>
      </div>
    </Link>
  );
}