"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { X, Plus, Sparkles, ImageIcon, Upload, Link2, Trash2 } from "lucide-react";
import { createProduct } from "./actions";

const STEPS = ["Identity", "Pricing", "Media", "Classification"];

interface Categories {
  productTypes: string[];
  skinConditions: string[];
  highlights: string[];
}
type MediaItem = { id: string; type: 'url'; value: string } | { id: string; type: 'file'; file: File; preview: string };

export default function AddProductModal({ categories }: { categories: Categories }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [isPending, startTransition] = useTransition();

  // All form state kept in memory across steps
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [slugModified, setSlugModified] = useState(false);
  const [type, setType] = useState("");
  const [priceNumber, setPriceNumber] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");
  const [reviews, setReviews] = useState("");
  const [sold, setSold] = useState("");
  const [skinConditions, setSkinConditions] = useState<string[]>([]);
  const [highlights, setHighlights] = useState<string[]>([]);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [imageMode, setImageMode] = useState<"url" | "upload">("url");
  const [tempUrl, setTempUrl] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);

  const formattedPrice = (() => {
    const n = parseInt(priceNumber, 10);
    if (!n) return "—";
    if (n >= 1_000_000) return `IDR ${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}M`;
    if (n >= 1_000) return `IDR ${Math.round(n / 1_000)}K`;
    return `IDR ${n}`;
  })();

  const toggleChip = (value: string, list: string[], setter: (v: string[]) => void) => {
    setter(list.includes(value) ? list.filter((x: string) => x !== value) : [...list, value]);
  };

  const addMediaUrl = () => {
    if (mediaItems.length >= 5 || !tempUrl.trim()) return;
    setMediaItems([...mediaItems, { id: crypto.randomUUID(), type: 'url', value: tempUrl }]);
    setTempUrl("");
  };

  const pickFile = (picked: File) => {
    if (mediaItems.length >= 5) return;
    setMediaItems([...mediaItems, { id: crypto.randomUUID(), type: 'file', file: picked, preview: URL.createObjectURL(picked) }]);
  };

  const removeMediaItem = (idx: number) => {
    const newItems = [...mediaItems];
    const item = newItems[idx];
    if (item.type === 'file') URL.revokeObjectURL(item.preview);
    newItems.splice(idx, 1);
    setMediaItems(newItems);
  };

  const onDragStartItem = (e: React.DragEvent, idx: number) => {
    setDraggedIdx(idx);
    e.dataTransfer.effectAllowed = 'move';
  };

  const onDragEnterItem = (e: React.DragEvent, idx: number) => {
    e.preventDefault();
    if (draggedIdx === null || draggedIdx === idx) return;
    const newItems = [...mediaItems];
    const item = newItems[draggedIdx];
    newItems.splice(draggedIdx, 1);
    newItems.splice(idx, 0, item);
    setDraggedIdx(idx);
    setMediaItems(newItems);
  };

  const onDragEndItem = () => {
    setDraggedIdx(null);
  };

  // Build FormData from state — inputs from previous steps are unmounted
  const handleSubmit = () => {
    const data = new FormData();
    data.set("name", name);
    data.set("slug", slug);
    data.set("type", type);
    data.set("priceNumber", priceNumber);
    mediaItems.forEach((item: MediaItem) => {
      if (item.type === 'file') data.append("images", item.file);
      else data.append("images", item.value);
    });
    if (description) data.set("description", description);
    if (rating) data.set("rating", rating);
    if (reviews) data.set("reviews", reviews);
    if (sold) data.set("sold", sold);
    skinConditions.forEach((v) => data.append("skinCondition", v));
    highlights.forEach((v) => data.append("highlight", v));
    startTransition(async () => {
      await createProduct(data);
      handleClose();
    });
  };

  const handleClose = () => {
    setOpen(false);
    setStep(0);
    setName(""); setType(""); setPriceNumber("");
    setDescription(""); setRating(""); setReviews(""); setSold("");
    setSkinConditions([]); setHighlights([]);
    mediaItems.forEach((item: MediaItem) => { if (item.type === 'file') URL.revokeObjectURL(item.preview); });
    setMediaItems([]);
    setTempUrl("");
    setImageMode("url");
    setImageMode("url");
  };

  const canAdvance = () => {
    if (step === 0) return name.trim().length > 0 && type.length > 0;
    if (step === 1) return parseInt(priceNumber, 10) > 0;
    if (step === 2) return mediaItems.length > 0;
    return true;
  };

  return (
    <>
      {/* Trigger */}
      <button
        onClick={() => setOpen(true)}
        className="font-manrope flex items-center gap-3 px-8 py-3.5 bg-primary-terracotta text-white rounded-2xl text-[11px] uppercase tracking-[0.2em] font-bold shadow-[0_10px_30px_rgba(147,70,29,0.2)] hover:bg-[#7a3917] transition-all duration-500 active:scale-[0.98]"
      >
        <Plus size={18} strokeWidth={2} />
        Add Entry
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={(e) => e.target === e.currentTarget && handleClose()}
        >
          {/* Modal */}
          <div className="relative w-full max-w-5xl max-h-[92vh] bg-surface rounded-[40px] overflow-hidden shadow-2xl flex animate-in fade-in zoom-in-95 duration-300">

            {/* Left — Live Preview */}
            <div className="hidden lg:flex w-[340px] shrink-0 flex-col bg-[#EDE8E1] p-10 gap-8">
              <div>
                <p className="font-manrope text-[10px] uppercase tracking-[0.3em] font-bold text-primary-terracota">Live Preview</p>
                <h3 className="font-noto text-2xl text-[#1a1c1a] mt-1 leading-snug">{name || "Product Name"}</h3>
              </div>

              {/* Product card preview */}
              <div className="rounded-3xl overflow-hidden bg-white shadow-sm border border-[#1a1c1a]/5">
                <div className="relative w-full aspect-square bg-surface">
                  {mediaItems.length > 0 ? (
                    <Image src={mediaItems[0].type === 'file' ? mediaItems[0].preview : mediaItems[0].value} alt={name} fill className="object-cover" unoptimized />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-[#1a1c1a]/20">
                      <ImageIcon size={32} strokeWidth={1} />
                      <p className="font-manrope text-[10px] uppercase tracking-widest">No image</p>
                    </div>
                  )}
                  {highlights.length > 0 && (
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                      {highlights.slice(0, 2).map((h: string) => (
                        <span key={h} className="font-manrope text-[9px] uppercase tracking-widest font-bold px-2 py-1 bg-white/80 backdrop-blur-sm rounded-full text-primary-terracota">{h}</span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <p className="font-manrope text-[10px] uppercase tracking-widest text-[#1a1c1a]/40 font-bold">{type || "Type"}</p>
                  <p className="font-noto text-[15px] font-medium text-[#1a1c1a] mt-0.5 leading-snug">{name || "Product Name"}</p>
                  <p className="font-manrope text-[13px] font-semibold text-primary-terracota mt-2">{formattedPrice}</p>
                </div>
              </div>

              {/* Classification badges */}
              {skinConditions.length > 0 && (
                <div>
                  <p className="font-manrope text-[9px] uppercase tracking-[0.25em] font-bold text-[#1a1c1a]/40 mb-2">Skin Conditions</p>
                  <div className="flex flex-wrap gap-1.5">
                    {skinConditions.map((s: string) => (
                      <span key={s} className="font-manrope text-[10px] px-2.5 py-1 rounded-full bg-[#1a1c1a]/5 text-[#1a1c1a]/60 font-medium">{s}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Step indicator */}
              <div className="mt-auto">
                <div className="flex gap-2">
                  {STEPS.map((s: string, i: number) => (
                    <div key={s} className="flex-1">
                      <div className={`h-0.5 rounded-full transition-all duration-500 ${i <= step ? "bg-primary-terracotta" : "bg-[#1a1c1a]/10"}`} />
                      <p className={`font-manrope text-[9px] uppercase tracking-wider mt-1.5 font-bold transition-colors duration-300 ${i === step ? "text-primary-terracota" : "text-[#1a1c1a]/30"}`}>{s}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — Form */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Header */}
              <div className="flex items-start justify-between px-10 pt-10 pb-6 border-b border-[#1a1c1a]/5">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles size={14} className="text-primary-terracota" strokeWidth={1.5} />
                    <p className="font-manrope text-[10px] uppercase tracking-[0.3em] font-bold text-primary-terracota">
                      Step {step + 1} of {STEPS.length} — {STEPS[step]}
                    </p>
                  </div>
                  <h2 className="font-noto text-[28px] leading-tight text-[#1a1c1a]">
                    New Formulation
                  </h2>
                </div>
                <button onClick={handleClose} className="p-2.5 rounded-xl hover:bg-[#1a1c1a]/5 text-[#1a1c1a]/40 hover:text-[#1a1c1a] transition-all duration-300 mt-1">
                  <X size={20} strokeWidth={1.5} />
                </button>
              </div>

              {/* Form body */}
              <div className="flex-1 overflow-y-auto px-10 py-8">

                {/* Step 0 — Identity */}
                {step === 0 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                    <Field label="Formulation Name" hint="Give it a distinctive, editorial name">
                      <input
                        name="name"
                        value={name}
                        onChange={(e) => {
                          const val = e.target.value;
                          setName(val);
                          if (!slugModified) {
                            setSlug(val.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, ''));
                          }
                        }}
                        placeholder="e.g. Radiance Nectar Serum"
                        required
                        className={inputCls}
                      />
                    </Field>

                    <Field label="URL Slug" hint="Override the automated SEO-friendly URL if needed">
                      <input
                        name="slug"
                        value={slug}
                        onChange={(e) => {
                          setSlug(e.target.value);
                          setSlugModified(true);
                        }}
                        placeholder="radiance-nectar-serum"
                        required
                        className={inputCls}
                      />
                    </Field>

                    <Field label="Classification Type" hint="Select the product category">
                      <div className="grid grid-cols-2 gap-2">
                        {categories.productTypes.map((t: string) => (
                          <label key={t} className={`flex items-center gap-3 px-4 py-3 rounded-2xl border cursor-pointer transition-all duration-300 ${type === t ? "border-primary-terracota bg-primary-terracota/5 text-primary-terracota" : "border-[#1a1c1a]/10 hover:border-[#1a1c1a]/20 text-[#1a1c1a]/60"}`}>
                            <input type="radio" name="type" value={t} checked={type === t} onChange={() => setType(t)} className="sr-only" />
                            <span className={`w-2 h-2 rounded-full shrink-0 transition-all duration-300 ${type === t ? "bg-primary-terracota scale-125" : "bg-[#1a1c1a]/20"}`} />
                            <span className="font-manrope text-[12px] font-semibold">{t}</span>
                          </label>
                        ))}
                      </div>
                    </Field>
                  </div>
                )}

                {/* Step 1 — Pricing */}
                {step === 1 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                    <Field label="Price (IDR)" hint="Enter the amount in Indonesian Rupiah">
                      <div className="relative">
                        <span className="absolute left-5 top-1/2 -translate-y-1/2 font-manrope text-[13px] font-bold text-[#1a1c1a]/30">IDR</span>
                        <input
                          name="priceNumber"
                          type="number"
                          min={1000}
                          step={1000}
                          value={priceNumber}
                          onChange={(e) => setPriceNumber(e.target.value)}
                          placeholder="490000"
                          required
                          className={`${inputCls} pl-16`}
                        />
                        <span className="absolute right-5 top-1/2 -translate-y-1/2 font-manrope text-[12px] font-semibold text-primary-terracota">
                          {formattedPrice}
                        </span>
                      </div>
                    </Field>

                    <div className="grid grid-cols-2 gap-4">
                      <Field label="Units Sold" hint="Display string, e.g. 2K+">
                        <input value={sold} onChange={(e) => setSold(e.target.value)} placeholder="2K+" className={inputCls} />
                      </Field>
                      <Field label="Review Count" hint="Total number of reviews">
                        <input value={reviews} onChange={(e) => setReviews(e.target.value)} type="number" min={0} placeholder="214" className={inputCls} />
                      </Field>
                    </div>

                    <Field label="Rating" hint="Score from 0.0 to 5.0">
                      <input
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        type="number"
                        min={0}
                        max={5}
                        step={0.1}
                        placeholder="4.9"
                        className={inputCls}
                      />
                    </Field>
                  </div>
                )}

                {/* Step 2 — Media */}
                {step === 2 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                    <Field label="Selected Media" hint="Drag to reorder. Maximum 5 images.">
                      {mediaItems.length > 0 ? (
                        <div className="flex gap-4 overflow-x-auto pb-4">
                          {mediaItems.map((item: MediaItem, idx: number) => (
                            <div
                              key={item.id}
                              draggable
                              onDragStart={(e) => onDragStartItem(e, idx)}
                              onDragEnter={(e) => onDragEnterItem(e, idx)}
                              onDragEnd={onDragEndItem}
                              onDragOver={(e) => e.preventDefault()}
                              className={`relative w-24 h-24 shrink-0 rounded-2xl overflow-hidden border-2 cursor-grab active:cursor-grabbing transition-all ${draggedIdx === idx ? 'opacity-50 border-primary-terracotta' : 'border-[#1a1c1a]/10'}`}
                            >
                              <Image src={item.type === 'file' ? item.preview : item.value} alt={`Media ${idx}`} fill className="object-cover" unoptimized />
                              <button
                                type="button"
                                onClick={() => removeMediaItem(idx)}
                                className="absolute top-1.5 right-1.5 p-1.5 bg-black/40 backdrop-blur-md rounded-lg text-white hover:bg-black/60 transition-all"
                              >
                                <Trash2 size={12} strokeWidth={2} />
                              </button>
                              <div className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 bg-black/40 backdrop-blur-md rounded-md">
                                <p className="font-manrope text-[8px] uppercase tracking-widest text-white font-bold">{item.type} {idx + 1}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="w-full py-8 border-2 border-dashed border-[#1a1c1a]/10 rounded-2xl flex flex-col items-center justify-center bg-[#1a1c1a]/5">
                          <ImageIcon size={24} className="text-[#1a1c1a]/20 mb-2" />
                          <p className="font-manrope text-[11px] text-[#1a1c1a]/40 font-semibold">No media selected yet</p>
                        </div>
                      )}
                    </Field>

                    {mediaItems.length < 5 && (
                      <div className="p-4 rounded-3xl border border-[#1a1c1a]/8 bg-white/40 space-y-4">
                        <div className="flex gap-2 p-1 bg-[#1a1c1a]/5 rounded-2xl">
                          {(["url", "upload"] as const).map((mode: "url" | "upload") => (
                            <button
                              key={mode}
                              type="button"
                              onClick={() => { setImageMode(mode); setTempUrl(""); }}
                              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-manrope text-[11px] uppercase tracking-[0.2em] font-bold transition-all duration-300 ${imageMode === mode
                                ? "bg-white shadow-sm text-[#1a1c1a]"
                                : "text-[#1a1c1a]/40 hover:text-[#1a1c1a]/60"
                                }`}
                            >
                              {mode === "url" ? <Link2 size={13} strokeWidth={2} /> : <Upload size={13} strokeWidth={2} />}
                              {mode === "url" ? "Image URL" : "Upload File"}
                            </button>
                          ))}
                        </div>

                        {imageMode === "url" && (
                          <div className="flex gap-2">
                            <input
                              value={tempUrl}
                              onChange={(e) => setTempUrl(e.target.value)}
                              placeholder="https://... or /images/product.jpeg"
                              className={inputCls}
                            />
                            <button
                              type="button"
                              onClick={addMediaUrl}
                              disabled={!tempUrl.trim()}
                              className="px-6 rounded-2xl bg-primary-terracotta text-white font-manrope text-[11px] uppercase tracking-[0.2em] font-bold shadow-[0_10px_30px_rgba(147,70,29,0.2)] hover:bg-[#7a3917] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                              Add
                            </button>
                          </div>
                        )}

                        {imageMode === "upload" && (
                          <label
                            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                            onDragLeave={() => setIsDragging(false)}
                            onDrop={(e) => {
                              e.preventDefault();
                              setIsDragging(false);
                              const dropped = e.dataTransfer.files[0];
                              if (dropped?.type.startsWith("image/")) pickFile(dropped);
                            }}
                            className={`flex flex-col items-center justify-center gap-4 w-full h-32 rounded-3xl border-2 border-dashed cursor-pointer transition-all duration-300 ${isDragging
                              ? "border-primary-terracotta bg-primary-terracotta/5 scale-[1.01]"
                              : "border-[#1a1c1a]/15 bg-white/60 hover:border-[#1a1c1a]/30 hover:bg-white"
                              }`}
                          >
                            <input
                              type="file"
                              accept="image/*"
                              className="sr-only"
                              onChange={(e) => {
                                const picked = e.target.files?.[0];
                                if (picked) pickFile(picked);
                              }}
                            />
                            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-300 ${isDragging ? "bg-primary-terracotta/10" : "bg-[#1a1c1a]/5"}`}>
                              <Upload size={18} strokeWidth={1.5} className={isDragging ? "text-primary-terracotta" : "text-[#1a1c1a]/30"} />
                            </div>
                            <div className="text-center">
                              <p className="font-manrope text-[11px] font-semibold text-[#1a1c1a]/50">
                                {isDragging ? "Drop to upload" : "Drag & drop or click"}
                              </p>
                            </div>
                          </label>
                        )}
                      </div>
                    )}

                    <Field label="Description" hint="Optional — product story or key benefits">
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                        placeholder="A richly formulated serum that..."
                        className={`${inputCls} resize-none`}
                      />
                    </Field>
                  </div>
                )}

                {/* Step 3 — Classification */}
                {step === 3 && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                    <Field label="Skin Conditions" hint="Select all that apply">
                      <div className="flex flex-wrap gap-2">
                        {categories.skinConditions.map((s: string) => (
                          <ChipToggle
                            key={s}
                            label={s}
                            active={skinConditions.includes(s)}
                            onClick={() => toggleChip(s, skinConditions, setSkinConditions)}
                          />
                        ))}
                      </div>
                    </Field>

                    <Field label="Collection Highlights" hint="Badges shown on product cards">
                      <div className="flex flex-wrap gap-2">
                        {categories.highlights.map((h: string) => (
                          <ChipToggle
                            key={h}
                            label={h}
                            active={highlights.includes(h)}
                            onClick={() => toggleChip(h, highlights, setHighlights)}
                          />
                        ))}
                      </div>
                    </Field>

                    {/* Summary */}
                    <div className="rounded-3xl border border-[#1a1c1a]/8 bg-white/40 p-6 space-y-3">
                      <p className="font-manrope text-[10px] uppercase tracking-[0.3em] font-bold text-[#1a1c1a]/40">Entry Summary</p>
                      <SummaryRow label="Name" value={name} />
                      <SummaryRow label="Type" value={type} />
                      <SummaryRow label="Price" value={formattedPrice} />
                      <SummaryRow label="Image" value={mediaItems.length > 0 ? `${mediaItems.length} added` : "—"} />
                      <SummaryRow label="Skin" value={skinConditions.join(", ") || "—"} />
                      <SummaryRow label="Highlights" value={highlights.join(", ") || "—"} />
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-10 py-6 border-t border-[#1a1c1a]/5 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={step === 0 ? handleClose : () => setStep((s) => s - 1)}
                  className="font-manrope text-[11px] uppercase tracking-[0.2em] font-bold text-[#1a1c1a]/40 hover:text-[#1a1c1a] transition-colors duration-300 px-4 py-2"
                >
                  {step === 0 ? "Cancel" : "← Back"}
                </button>

                {step < STEPS.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep((s) => s + 1)}
                    disabled={!canAdvance()}
                    className="font-manrope flex items-center gap-3 px-8 py-3.5 bg-primary-terracotta text-white rounded-2xl text-[11px] uppercase tracking-[0.2em] font-bold shadow-[0_10px_30px_rgba(147,70,29,0.2)] hover:bg-[#7a3917] transition-all duration-500 active:scale-[0.98] disabled:opacity-30 disabled:pointer-events-none"
                  >
                    Continue →
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isPending}
                    className="font-manrope flex items-center gap-3 px-8 py-3.5 bg-primary-terracotta text-white rounded-2xl text-[11px] uppercase tracking-[0.2em] font-bold shadow-[0_10px_30px_rgba(147,70,29,0.2)] hover:bg-[#7a3917] transition-all duration-500 active:scale-[0.98] disabled:opacity-60"
                  >
                    {isPending ? (
                      <span className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                        Saving…
                      </span>
                    ) : (
                      <>
                        <Sparkles size={14} strokeWidth={2} />
                        Publish Entry
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ── Helpers ─────────────────────────────────────────────

const inputCls =
  "w-full font-manrope bg-white/60 border border-[#1a1c1a]/8 rounded-2xl px-5 py-3.5 text-[13px] text-[#1a1c1a] placeholder:text-[#1a1c1a]/25 focus:outline-none focus:ring-2 focus:ring-primary-terracota/20 focus:border-primary-terracota/30 transition-all duration-300";

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <div>
        <p className="font-manrope text-[11px] uppercase tracking-[0.25em] font-bold text-[#1a1c1a]">{label}</p>
        {hint && <p className="font-manrope text-[11px] text-[#1a1c1a]/40 mt-0.5">{hint}</p>}
      </div>
      {children}
    </div>
  );
}

function ChipToggle({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`font-manrope text-[11px] font-bold uppercase tracking-wider px-4 py-2 rounded-full border transition-all duration-300 ${active
        ? "bg-primary-terracotta text-white border-primary-terracotta shadow-[0_4px_14px_rgba(147,70,29,0.25)]"
        : "border-[#1a1c1a]/10 text-[#1a1c1a]/50 hover:border-primary-terracota/30 hover:text-primary-terracota"
        }`}
    >
      {active && <span className="mr-1.5">✓</span>}
      {label}
    </button>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <p className="font-manrope text-[10px] uppercase tracking-widest font-bold text-[#1a1c1a]/30 shrink-0">{label}</p>
      <p className="font-manrope text-[12px] text-[#1a1c1a]/70 text-right truncate">{value}</p>
    </div>
  );
}
