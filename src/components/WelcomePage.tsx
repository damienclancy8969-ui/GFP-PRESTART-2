export function WelcomePage() {
  return (
    <section className="page-card px-6 py-10 text-center sm:px-16 sm:py-16">
      <p className="font-display text-lg italic text-stone-600">Firstly…</p>
      <h1 className="mt-1 font-display text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
        CONGRATULATIONS!
      </h1>
      <div className="mx-auto mt-6 max-w-xl space-y-4 text-[14px] leading-relaxed text-stone-700">
        <p>
          You've reached an exciting stage in the process, and there's plenty to look forward to! The pre-start is
          arguably the most fun part of building, where you get to choose your finishes and truly make it your own.
        </p>
        <p>
          At Granny Flats Perth, we've teamed up with industry pros to curate the most sought-after and timeless
          design items. Even if it's your first time, we've got you covered with{" "}
          <strong className="text-stone-900">clean, bold, and timeless classics.</strong>
        </p>
        <p>Happy selecting!</p>
        <p className="text-stone-500">— Kadir, Director</p>
      </div>

      <p className="mt-10 font-display text-2xl italic text-brand-700" style={{ fontFamily: "var(--font-script)" }}>
        Let's begin…
      </p>

      <div className="mx-auto mt-10 max-w-xl rounded-lg border border-brand-200/70 bg-white/60 px-5 py-4 text-left text-[12.5px] leading-relaxed text-stone-600">
        <p>
          <strong className="text-stone-800">The Refined Collection</strong> is our carefully curated standard
          selection — included in your build, meticulously chosen for quality at an affordable price.
        </p>
        <p className="mt-2">
          <strong className="text-gold-600">Optional Upgrades</strong> can be selected individually or as part of an
          upgraded package. Items marked <span className="font-semibold">POA</span> are priced upon application —
          consult your sales person.
        </p>
        <p className="mt-2 italic text-stone-500">
          Selections made here populate your Construction Addendum automatically. We encourage you to complete this
          before your pre-start meeting, as changes made afterwards may incur an admin fee.
        </p>
      </div>

      <p className="mt-8 text-[11px] text-stone-400">Follow us for #inspo: @grannyflats.perth</p>
    </section>
  );
}
