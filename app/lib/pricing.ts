// lib/pricing.ts

export type PackageKey = "classic" | "premium" | "luxury";
export type DateType = "weekday" | "friSun" | "sat";

export type AddonKey =
  | "proseccoWall"
  | "ledBar"
  | "dryIce"
  | "signatureLogo"
  | "mocktailBar"
  | "extraBartender"
  | "espressoMartini"
  | "champagneTower";

type QuoteInput = {
  packageKey: PackageKey;
  guests: number;
  hours: number;
  distanceKm?: number;
  dateType?: DateType;
  addons?: AddonKey[];
};

type QuoteLine = {
  label: string;
  amount: number;
  meta?: string;
};

export type QuoteResult = {
  total: number;
  deposit: number;
  lines: QuoteLine[];
};

const BASE_GUESTS = 50;

const PACKAGES = {
  classic: {
    base: 1190,
    includedHours: 4,
    perGuest: 9,
    extraHour: 140,
  },
  premium: {
    base: 1790,
    includedHours: 6,
    perGuest: 12,
    extraHour: 180,
  },
  luxury: {
    base: 2690,
    includedHours: 6,
    perGuest: 16,
    extraHour: 240,
  },
};

const ADDONS: Record<AddonKey, { label: string; price: number }> = {
  proseccoWall: { label: "Prosecco Wall", price: 390 },
  ledBar: { label: "LED Bar Setup", price: 190 },
  dryIce: { label: "Dry Ice Effekt", price: 160 },
  signatureLogo: { label: "Signature Cocktail mit Logo", price: 240 },
  mocktailBar: { label: "Mocktail Bar (0.0%)", price: 220 },
  extraBartender: { label: "Extra Bartender", price: 390 },
  espressoMartini: { label: "Espresso Martini Station", price: 290 },
  champagneTower: { label: "Champagne Tower", price: 260 },
};

export function formatEUR(value: number) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}

export function getAddonMeta() {
  return ADDONS;
}

function calculate(input: QuoteInput): QuoteResult {
  const pkg = PACKAGES[input.packageKey];

  let total = pkg.base;
  const lines: QuoteLine[] = [];

  lines.push({
    label: `${input.packageKey.toUpperCase()} Paket`,
    amount: pkg.base,
  });

  // Gäste über Basis
  const extraGuests = Math.max(0, input.guests - BASE_GUESTS);
  if (extraGuests > 0) {
    const add = extraGuests * pkg.perGuest;
    total += add;
    lines.push({
      label: "Zusätzliche Gäste",
      meta: `${extraGuests} × ${formatEUR(pkg.perGuest)}`,
      amount: add,
    });
  }

  // Extra Stunden
  const extraHours = Math.max(0, input.hours - pkg.includedHours);
  if (extraHours > 0) {
    const add = extraHours * pkg.extraHour;
    total += add;
    lines.push({
      label: "Zusatzstunden",
      meta: `${extraHours} × ${formatEUR(pkg.extraHour)}`,
      amount: add,
    });
  }

  // Fahrtkosten (20km inkl.)
  const distance = input.distanceKm ?? 0;
  if (distance > 20) {
    const extraKm = distance - 20;
    const rate = 1.2;
    const add = extraKm * rate;
    total += add;
    lines.push({
      label: "Anfahrt",
      meta: `${extraKm} km × ${formatEUR(rate)}`,
      amount: add,
    });
  }

  // Addons
  if (input.addons) {
    input.addons.forEach((a) => {
      const addon = ADDONS[a];
      total += addon.price;
      lines.push({
        label: addon.label,
        amount: addon.price,
      });
    });
  }

  // Weekend Zuschlag
  const dateType = input.dateType ?? "weekday";
  if (dateType === "sat") {
    total *= 1.1;
    lines.push({ label: "Samstag +10%", amount: total * 0.1 });
  } else if (dateType === "friSun") {
    total *= 1.05;
    lines.push({ label: "Fr/So +5%", amount: total * 0.05 });
  }

  total = Math.round(total / 10) * 10;

  return {
    total,
    deposit: total > 2500 ? 300 : 200,
    lines,
  };
}

export function quoteAllVariants(input: Omit<QuoteInput, "packageKey">) {
  const classic = calculate({ ...input, packageKey: "classic" });
  const premium = calculate({ ...input, packageKey: "premium" });
  const luxury = calculate({ ...input, packageKey: "luxury" });

  let recommended: PackageKey = "premium";
  if (input.guests <= 60 && input.hours <= 4) recommended = "classic";
  if (input.guests >= 120) recommended = "luxury";

  return {
    classic,
    premium,
    luxury,
    recommended,
  };
}
