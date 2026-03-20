import jsPDF from "jspdf";

export type ProposalData = {
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  eventType?: string;
  eventDate?: string;
  location?: string;
  guests?: number;
  packageName?: string;
  extras?: string[];
  estimatedPrice?: number;
};

const formatPrice = (price?: number) => {
  if (typeof price !== "number") return "Auf Anfrage";
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(price);
};

const formatGeneratedDate = () => {
  return new Intl.DateTimeFormat("de-DE", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date());
};

export function generateProposalPdf(data: ProposalData) {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  const left = 18;
  const right = pageWidth - 18;
  let y = 20;

  const gold: [number, number, number] = [191, 161, 74];
  const dark: [number, number, number] = [20, 20, 20];
  const muted: [number, number, number] = [110, 110, 110];
  const line: [number, number, number] = [225, 225, 225];
  const softBg: [number, number, number] = [248, 246, 241];

  const drawDivider = (posY: number) => {
    doc.setDrawColor(...line);
    doc.setLineWidth(0.4);
    doc.line(left, posY, right, posY);
  };

  const writeLabelValue = (label: string, value?: string) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(...dark);
    doc.text(label, left, y);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(...muted);

    const safeValue = value?.trim() ? value : "—";
    const lines = doc.splitTextToSize(safeValue, 110);
    doc.text(lines, left + 42, y);

    y += Math.max(7, lines.length * 5);
  };

  doc.setDrawColor(...gold);
  doc.setLineWidth(1.2);
  doc.line(left, 12, right, 12);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.setTextColor(...dark);
  doc.text("Veloria Cocktails", left, y);

  y += 7;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(...gold);
  doc.text("Mobile Bar Catering in München", left, y);

  y += 10;
  drawDivider(y);

  y += 12;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(...dark);
  doc.text("Unverbindliches Premium-Angebot", left, y);

  y += 7;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...muted);
  doc.text(`Erstellt am: ${formatGeneratedDate()}`, left, y);

  y += 12;

  const intro = doc.splitTextToSize(
    "Vielen Dank für Ihr Interesse an Veloria Cocktails. Basierend auf Ihrer aktuellen Konfiguration haben wir für Sie ein unverbindliches Richtangebot erstellt.",
    right - left
  );

  doc.text(intro, left, y);
  y += intro.length * 5 + 8;

  drawDivider(y);
  y += 10;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(...dark);
  doc.text("Eventdetails", left, y);
  y += 9;

  writeLabelValue("Name", data.customerName);
  writeLabelValue("E-Mail", data.customerEmail);
  writeLabelValue("Telefon", data.customerPhone);
  writeLabelValue("Eventtyp", data.eventType);
  writeLabelValue("Eventdatum", data.eventDate);
  writeLabelValue("Location", data.location);
  writeLabelValue(
    "Gästeanzahl",
    typeof data.guests === "number" ? String(data.guests) : undefined
  );
  writeLabelValue("Paket", data.packageName);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...dark);
  doc.text("Auswahl", left, y);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(...muted);
  const extrasText =
    data.extras && data.extras.length > 0 ? data.extras.join(", ") : "—";
  const extraLines = doc.splitTextToSize(extrasText, 110);
  doc.text(extraLines, left + 42, y);

  y += Math.max(8, extraLines.length * 5 + 2);

  y += 4;
  drawDivider(y);
  y += 12;

  doc.setFillColor(...softBg);
  doc.roundedRect(left, y, right - left, 32, 3, 3, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...muted);
  doc.text("GESCHÄTZTES ANGEBOT", left + 7, y + 10);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text("Für Ihr Event individuell kalkuliert", left + 7, y + 18);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(...dark);
  doc.text(formatPrice(data.estimatedPrice), right - 7, y + 18, {
    align: "right",
  });

  y += 42;

  const note = doc.splitTextToSize(
    "Dieses Dokument dient als unverbindliche Orientierung. Ein finales Angebot erstellen wir Ihnen gerne persönlich auf Basis Ihrer Eventdetails, Wünsche und des gewünschten Leistungsumfangs.",
    right - left
  );

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...muted);
  doc.text(note, left, y);

  drawDivider(pageHeight - 32);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...dark);
  doc.text("Veloria Cocktails", left, pageHeight - 22);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...muted);
  doc.text("München, Deutschland", left, pageHeight - 16);
  doc.text("kontakt@veloria-cocktails.de", left + 52, pageHeight - 16);
  doc.text("+49 151 41349865", left + 118, pageHeight - 16);
  doc.text("www.veloria-cocktails.de", left, pageHeight - 10);

  const safeName = (data.customerName || "kunde")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  doc.save(`veloria-premium-angebot-${safeName || "kunde"}.pdf`);
}