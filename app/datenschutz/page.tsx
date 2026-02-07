export default function DatenschutzPage() {
  return (
    <main className="py-14 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-white">
        <p className="text-xs font-black tracking-[0.25em] text-white/70">DATENSCHUTZ</p>
        <h1 className="mt-3 text-3xl sm:text-4xl font-semibold">Datenschutzerklärung</h1>

        <div className="mt-8 space-y-6 rounded-3xl border border-white/15 bg-white/10 p-7 text-sm text-white/85 leading-7">
          <p>
            Diese Datenschutzerklärung informiert dich über die Art, den Umfang und Zweck der Verarbeitung
            personenbezogener Daten auf dieser Website.
          </p>

          <p className="font-bold text-white">1. Verantwortlicher</p>
          <p>
            Veloria Cocktails (Daten folgen)
            <br />
            E-Mail: kontakt@veloria-cocktails.de
          </p>

          <p className="font-bold text-white">2. Zugriffsdaten</p>
          <p>
            Beim Besuch der Website können durch den Hosting-Anbieter technische Informationen
            (z. B. IP-Adresse, Zeitpunkt, Browser) verarbeitet werden, um den Betrieb sicherzustellen.
          </p>

          <p className="font-bold text-white">3. Kontaktaufnahme</p>
          <p>
            Wenn du uns kontaktierst (z. B. per E-Mail/WhatsApp), verarbeiten wir deine Angaben zur Bearbeitung
            der Anfrage.
          </p>

          <p className="font-bold text-white">4. Hosting</p>
          <p>
            Diese Website wird bei einem Hosting-Anbieter betrieben (z. B. Vercel). Dabei können
            Server-Logfiles verarbeitet werden.
          </p>

          <p className="font-bold text-white">5. Deine Rechte</p>
          <p>
            Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung sowie
            Widerspruch.
          </p>

          <p className="text-white/70">
            Hinweis: Dies ist ein Platzhalter. Für eine rechtssichere Datenschutzerklärung solltest du
            deine Tools (Analytics, Formulare etc.) final definieren.
          </p>
        </div>
      </div>
    </main>
  );
}
