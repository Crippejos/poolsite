import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type Crumb = { label: string; href?: string };

type Props = {
  crumbs: Crumb[];
  /** Include "Hem" as the first crumb automatically (default: true) */
  includeHome?: boolean;
};

/**
 * Stylish breadcrumb nav with JSON-LD structured data for SEO.
 * Last crumb (no href) is rendered as a pill badge.
 */
export default function Breadcrumb({ crumbs, includeHome = true }: Props) {
  const allCrumbs: Crumb[] = includeHome
    ? [{ label: "Hem", href: "/" }, ...crumbs]
    : crumbs;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allCrumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: `https://elitepoolspa.se${c.href}` } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Brödsmulor" className="flex items-center gap-1 flex-wrap">
        {allCrumbs.map((crumb, i) => {
          const isLast = i === allCrumbs.length - 1;
          return (
            <span key={i} className="flex items-center gap-1">
              {i > 0 && (
                <ChevronRight className="w-3 h-3 text-slate-300 shrink-0" />
              )}
              {isLast ? (
                <span className="inline-flex items-center rounded-full bg-slate-900 px-2.5 py-0.5 text-[11px] font-semibold text-white">
                  {crumb.label}
                </span>
              ) : crumb.href ? (
                <Link
                  href={crumb.href}
                  className="text-xs text-slate-400 hover:text-slate-700 transition-colors font-medium"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-xs text-slate-400 font-medium">{crumb.label}</span>
              )}
            </span>
          );
        })}
      </nav>
    </>
  );
}
