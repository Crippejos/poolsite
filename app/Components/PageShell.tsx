import Link from "next/link";
import { ChevronRight } from "lucide-react";

type Crumb = { label: string; href?: string };

type Props = {
  title: string;
  description?: string;
  breadcrumbs?: Crumb[];
  badge?: string;
  count?: number;
  children?: React.ReactNode;
};

export default function PageShell({ title, description, breadcrumbs, badge, count, children }: Props) {
  return (
    <main className="min-h-screen bg-white">

      {/* ── Category header ── */}
      <section className="border-b border-slate-100 px-6 pt-10 pb-0 sm:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">

          {/* Breadcrumbs */}
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav className="mb-6 flex items-center gap-1 text-xs text-slate-400">
              <Link href="/" className="hover:text-slate-700 transition-colors">Hem</Link>
              {breadcrumbs.map((crumb, i) => (
                <span key={i} className="flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 opacity-40" />
                  {crumb.href ? (
                    <Link href={crumb.href} className="hover:text-slate-700 transition-colors">{crumb.label}</Link>
                  ) : (
                    <span className="text-slate-700 font-medium">{crumb.label}</span>
                  )}
                </span>
              ))}
            </nav>
          )}

          {/* Title row with editorial count */}
          <div className="flex items-end justify-between gap-4 pb-10">
            <div className="flex-1 min-w-0">
              {badge && (
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 mb-3">{badge}</p>
              )}
              <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                {title}
              </h1>
              {description && (
                <p className="mt-4 text-sm text-slate-500 leading-relaxed max-w-lg">{description}</p>
              )}
            </div>

            {/* Editorial product count — decorative */}
            {count !== undefined && count > 0 && (
              <div className="shrink-0 text-right hidden sm:block">
                <span className="text-[80px] sm:text-[100px] font-black leading-none text-slate-100 select-none tabular-nums">
                  {String(count).padStart(2, "0")}
                </span>
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-300 -mt-2">
                  {count === 1 ? "produkt" : "produkter"}
                </p>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* ── Product grid ── */}
      <section className="px-6 py-12 sm:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          {children ?? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-[#f5f5f5] py-24 text-center">
              <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center mb-4">
                <div className="h-5 w-5 rounded-full bg-slate-300" />
              </div>
              <p className="text-sm font-semibold text-slate-500">Produkter för <span className="text-slate-700">{title}</span> läggs till här.</p>
              <p className="mt-1 text-xs text-slate-400">Kontakta oss för mer information om sortimentet.</p>
              <Link href="/kontakt" className="mt-5 inline-flex rounded-full border border-slate-200 px-5 py-2 text-xs font-semibold text-slate-600 hover:bg-white transition-colors">
                Kontakta oss
              </Link>
            </div>
          )}
        </div>
      </section>

    </main>
  );
}
