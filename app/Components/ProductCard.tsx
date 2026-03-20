import Link from "next/link";

type Props = {
  name: string;
  description: string;
  price: number;
  sku?: string;
  href?: string;
};

function formatPrice(n: number) {
  return n.toLocaleString("sv-SE") + " kr";
}

export default function ProductCard({ name, description, price, sku, href = "/kontakt" }: Props) {
  return (
    <div className="group flex flex-col rounded-2xl bg-white border border-slate-100 overflow-hidden hover:shadow-lg hover:border-slate-200 transition-all duration-300">

      {/* Image / placeholder */}
      <div className="relative aspect-square overflow-hidden bg-[#f2f2f2]">
        {/* Subtle radial highlight */}
        <div className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at 35% 35%, #ffffff 0%, #e8e8e8 100%)" }}
        />
        {/* Centered brand mark */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/70 shadow-sm">
            <div className="h-6 w-6 rounded-full border-2 border-slate-300" />
          </div>
        </div>
        {/* Hover zoom overlay */}
        <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/4 transition-colors duration-300" />
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col p-5 gap-3">

        {/* SKU + name */}
        <div>
          {sku && (
            <p className="font-mono text-[10px] tracking-widest text-slate-400 uppercase mb-1">{sku}</p>
          )}
          <h3 className="text-sm font-bold text-slate-900 leading-snug">{name}</h3>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-400 leading-relaxed flex-1 line-clamp-2">{description}</p>

        {/* Price + CTA */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-3">
          {price > 0 ? (
            <span className="text-base font-black text-slate-900">{formatPrice(price)}</span>
          ) : (
            <span className="text-xs font-semibold text-slate-400">Pris på begäran</span>
          )}
          <Link
            href={href}
            className="shrink-0 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-700 transition-colors"
          >
            Begär offert
          </Link>
        </div>
      </div>
    </div>
  );
}
