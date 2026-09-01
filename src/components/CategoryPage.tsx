import type { CategorySection } from "../types";
import { GfpLogo } from "./GfpLogo";
import { SubSectionBlock } from "./SubSectionBlock";

export function CategoryPage({ section }: { section: CategorySection }) {
  const standard = section.subsections.filter((s) => s.tier === "standard");
  const upgrade = section.subsections.filter((s) => s.tier === "upgrade");

  return (
    <section id={section.id} className="page-card scroll-mt-24">
      <header className="flex items-stretch justify-between bg-brand-500">
        <div className="flex items-center px-6 py-5">
          <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">{section.title}</h2>
        </div>
        <div className="flex w-40 shrink-0 items-center justify-center bg-white/95 px-3 py-3 sm:w-48">
          <GfpLogo className="h-16 w-16" />
        </div>
      </header>

      {section.heroImage && (
        <img src={section.heroImage} alt="" className="h-56 w-full object-cover sm:h-72" />
      )}

      <div className="px-5 py-6 sm:px-8 sm:py-8">
        {standard.length > 0 && (
          <div className="mb-7">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-600">
              The Refined Collection
            </p>
            {section.intro && <p className="mb-5 max-w-2xl text-[14px] leading-relaxed text-stone-700">{section.intro}</p>}
            {standard.map((sub) => (
              <SubSectionBlock key={sub.id} sub={sub} />
            ))}
          </div>
        )}

        {upgrade.length > 0 && (
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-600">Optional Upgrades</p>
            {section.upgradeIntro && (
              <p className="mb-5 max-w-2xl text-[14px] leading-relaxed text-stone-700">{section.upgradeIntro}</p>
            )}
            {upgrade.map((sub) => (
              <SubSectionBlock key={sub.id} sub={sub} />
            ))}
          </div>
        )}

        {section.brand && (
          <div className="mt-8 flex items-center gap-2 border-t border-brand-200/60 pt-4">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-stone-400">Brand</span>
            <span className="rounded-full bg-brand-100 px-2.5 py-1 text-[12px] font-semibold text-brand-700">
              {section.brand}
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
