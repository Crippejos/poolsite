import Link from "next/link";
import { ChevronRight } from "lucide-react";

type Crumb = { label: string; href?: string };

type Props = {
  title: string;
  description?: string;
  breadcrumbs?: Crumb[];
  badge?: string;
  children?: React.ReactNode;
};

export default function PageShell({ title, description, breadcrumbs, badge, children }: Props) {
  return (
    <main className="min-h-screen">
      <section className="border-b border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav className="mb-6 flex items-center gap-1 text-sm text-slate-400">
              <Link href="/" className="hover:text-white transition-colors">Hem</Link>
              {breadcrumbs.map((crumb, i) => (
                <span key={i} className="flex items-center gap-1">
                  <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                  {crumb.href ? (
                    <Link href={crumb.href} className="hover:text-white transition-colors">{crumb.label}</Link>
                  ) : (
                    <span className="text-white font-medium">{crumb.label}</span>
                  )}
                </span>
              ))}
            </nav>
          )}
          {badge && (
            <span className="mb-4 inline-block rounded-full bg-blue-500/20 border border-blue-400/30 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-blue-300">
              {badge}
            </span>
          )}
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">{title}</h1>
          {description && (
            <p className="mt-4 max-w-2xl text-lg text-slate-300 leading-relaxed">{description}</p>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {children ?? (
          <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 py-24 text-center">
            <p className="text-lg font-semibold text-slate-500">Innehåll kommer snart</p>
            <p className="mt-1 text-sm text-slate-400">Produkter för <span className="font-medium text-slate-600">{title}</span> läggs till här.</p>
          </div>
        )}
      </section>
    </main>
  );
}