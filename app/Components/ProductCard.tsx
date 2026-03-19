type Props = {
  name: string;
  description: string;
  price: number;
};

export default function ProductCard({ name, description, price }: Props) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="h-48 bg-gradient-to-br from-slate-100 to-blue-50 flex items-center justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7c0-1.1.9-2 2-2h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
          </svg>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-bold text-slate-900">{name}</h3>
        <p className="mt-2 text-sm text-slate-500 leading-relaxed">{description}</p>
        <div className="mt-4 flex items-center justify-between">
          {price > 0 ? (
            <span className="text-lg font-black text-blue-600">
              {price.toLocaleString("sv-SE")} kr
            </span>
          ) : (
            <span className="text-sm font-semibold text-slate-500">Kontakta oss för pris</span>
          )}
          <a href="/kontakt" className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700 transition-colors">
            Begär offert
          </a>
        </div>
      </div>
    </div>
  );
}
