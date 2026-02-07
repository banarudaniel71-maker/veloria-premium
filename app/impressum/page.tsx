export default function ImpressumPage() {
  return (
    <main className="py-14 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-white">
        <p className="text-xs font-black tracking-[0.25em] text-white/70">IMPRESSUM</p>
        <h1 className="mt-3 text-3xl sm:text-4xl font-semibold">Impressum</h1>

        <div className="mt-8 space-y-6 rounded-3xl border border-white/15 bg-white/10 p-7 text-sm text-white/85 leading-7">
          <p className="font-bold text-white">Angaben gemäß § 5 TMG</p>

          <p>
            <span className="font-semibold text-white">Veloria Cocktails</span>
            <br />
            München & Umgebung
            <br />
            (Adresse folgt)
          </p>

          <p>
            <span className="font-semibold text-white">Kontakt</span>
            <br />
            Telefon: (folgt)
            <br />
            E-Mail: kontakt@veloria-cocktails.de
          </p>

          <p>
            <span className="font-semibold text-white">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</span>
            <br />
            (Name folgt)
            <br />
            (Adresse folgt)
          </p>

          <p className="text-white/70">
            Hinweis: Dies ist ein Platzhalter-Impressum. Bitte mit deinen echten Daten ergänzen
            (Name, Adresse, Kontakt).
          </p>
        </div>
      </div>
    </main>
  );
}
