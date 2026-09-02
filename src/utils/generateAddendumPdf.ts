import { jsPDF } from "jspdf";
import type { AddendumCategory } from "./addendum";

const MARGIN = 15;
const PAGE_WIDTH = 210;
const PAGE_HEIGHT = 297;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;

interface AddendumMeta {
  clientName: string;
  jobNumber: string;
  today: string;
  total: number;
  hasPoa: boolean;
}

export function generateAddendumPdf(groupOrder: string[], categories: AddendumCategory[], meta: AddendumMeta) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  let y = MARGIN;

  const newPageIfNeeded = (needed: number) => {
    if (y + needed > PAGE_HEIGHT - MARGIN) {
      doc.addPage();
      y = MARGIN;
    }
  };

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("Granny Flats Perth — Construction Addendum", MARGIN, y);
  y += 8;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(`Client: ${meta.clientName || "—"}`, MARGIN, y);
  doc.text(`Job No#: ${meta.jobNumber || "—"}`, MARGIN + 90, y);
  y += 5.5;
  doc.text(`Date generated: ${meta.today}`, MARGIN, y);
  const totalLabel = `Estimated upgrade total: $${meta.total.toLocaleString()}${meta.hasPoa ? " + POA items" : ""}`;
  doc.text(totalLabel, MARGIN + 90, y);
  y += 9;

  for (const group of groupOrder) {
    const cats = categories.filter((c) => c.group === group);
    if (cats.length === 0) continue;

    newPageIfNeeded(10);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(group.toUpperCase(), MARGIN, y);
    y += 6;

    for (const cat of cats) {
      newPageIfNeeded(9);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text(cat.title, MARGIN, y);
      y += 5.5;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      for (const line of cat.lines) {
        const label = line.label;
        const value = line.tier === "upgrade" ? `${line.value}  [Upgrade]` : line.value;
        const price = line.priceNote ?? "";

        const labelLines = doc.splitTextToSize(label, 48);
        const valueLines = doc.splitTextToSize(value, CONTENT_WIDTH - 48 - 25);
        const rowLines = Math.max(labelLines.length, valueLines.length);
        const rowHeight = rowLines * 4.2 + 1.5;

        newPageIfNeeded(rowHeight);
        doc.text(labelLines, MARGIN, y);
        doc.text(valueLines, MARGIN + 50, y);
        if (price) doc.text(price, PAGE_WIDTH - MARGIN, y, { align: "right" });
        y += rowHeight;
      }
      y += 3;
    }
    y += 2;
  }

  newPageIfNeeded(12);
  doc.setFont("helvetica", "italic");
  doc.setFontSize(8);
  const footer = doc.splitTextToSize(
    "Items selected at pre-start are subject to final confirmation. Please refer to this Addendum for finalised selections — changes made after the pre-start meeting may incur an admin fee.",
    CONTENT_WIDTH
  );
  doc.text(footer, MARGIN, y);

  const filenameSafeClient = (meta.clientName || "selections").trim().replace(/[^a-z0-9]+/gi, "-").toLowerCase();
  doc.save(`${filenameSafeClient}-addendum.pdf`);
}
