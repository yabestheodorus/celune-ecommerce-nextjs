"use client";

import { useTransition, useRef } from "react";
import { Plus, Trash2, Loader2 } from "lucide-react";

interface Item { id: string; name: string }

interface Props {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  items: Item[];
  addAction: (formData: FormData) => Promise<void>;
  deleteAction: (id: string) => Promise<void>;
  placeholder?: string;
}

export default function MasterDataPanel({
  title, subtitle, icon, items, addAction, deleteAction, placeholder = "Add new entry…"
}: Props) {
  const [isPendingAdd, startAdd] = useTransition();
  const [isPendingDel, startDel] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData(formRef.current!);
    if (!(data.get("name") as string).trim()) return;
    startAdd(async () => {
      await addAction(data);
      formRef.current?.reset();
    });
  };

  return (
    <div className="bg-white/50 backdrop-blur-sm rounded-[32px] border border-[#1a1c1a]/6 overflow-hidden flex flex-col shadow-[0_2px_20px_rgba(26,28,26,0.04)]">

      {/* Accent strip */}
      <div className="h-0.5 bg-linear-to-r from-primary-terracotta/60 via-primary-terracotta/20 to-transparent" />

      {/* Header */}
      <div className="px-8 pt-7 pb-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-primary-terracotta/70">{icon}</span>
              <p className="font-manrope text-[10px] uppercase tracking-[0.3em] font-bold text-primary-terracotta/80">{subtitle}</p>
            </div>
            <h3 className="font-noto text-[22px] text-[#1a1c1a] leading-tight">{title}</h3>
          </div>
          <span className="mt-1 min-w-8 h-8 flex items-center justify-center rounded-xl bg-[#1a1c1a]/4 font-manrope text-[13px] font-bold text-[#1a1c1a]/40 px-2.5">
            {items.length}
          </span>
        </div>
      </div>

      {/* Items list */}
      <div className="flex-1 overflow-y-auto max-h-64 border-t border-[#1a1c1a]/5">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-8 gap-3">
            <div className="w-10 h-10 rounded-2xl border-2 border-dashed border-[#1a1c1a]/10 flex items-center justify-center text-[#1a1c1a]/15">
              <Plus size={16} strokeWidth={1.5} />
            </div>
            <p className="font-manrope text-[10px] text-[#1a1c1a]/25 uppercase tracking-[0.25em] text-center">
              No entries yet
            </p>
          </div>
        ) : (
          <ul>
            {items.map((item: Item, i: number) => (
              <li
                key={item.id}
                className="group flex items-center justify-between px-8 py-3 hover:bg-primary-terracotta/3 transition-colors duration-200 border-b border-[#1a1c1a]/4 last:border-0"
              >
                <div className="flex items-center gap-3.5">
                  <span className="font-manrope text-[10px] font-bold text-[#1a1c1a]/20 w-4 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-manrope text-[13px] text-[#1a1c1a]/70 font-medium">{item.name}</span>
                </div>
                <button
                  type="button"
                  disabled={isPendingDel}
                  onClick={() => startDel(async () => { await deleteAction(item.id); })}
                  className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-red-50 text-[#1a1c1a]/20 hover:text-red-400 transition-all duration-200"
                >
                  {isPendingDel
                    ? <Loader2 size={13} className="animate-spin" />
                    : <Trash2 size={13} strokeWidth={1.5} />
                  }
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Add form */}
      <form ref={formRef} onSubmit={handleAdd} className="px-5 py-4 border-t border-[#1a1c1a]/5 bg-[#1a1c1a]/2">
        <div className="flex gap-2">
          <input
            name="name"
            placeholder={placeholder}
            className="flex-1 font-manrope text-[12px] bg-white/70 border border-[#1a1c1a]/8 rounded-xl px-4 py-2.5 text-[#1a1c1a] placeholder:text-[#1a1c1a]/25 focus:outline-none focus:ring-2 focus:ring-primary-terracotta/15 focus:border-primary-terracotta/25 transition-all duration-200"
          />
          <button
            type="submit"
            disabled={isPendingAdd}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-primary-terracotta text-white rounded-xl font-manrope text-[10px] uppercase tracking-[0.15em] font-bold hover:bg-[#7a3917] transition-all duration-300 active:scale-[0.97] disabled:opacity-50 shadow-[0_4px_12px_rgba(147,70,29,0.2)]"
          >
            {isPendingAdd
              ? <Loader2 size={13} className="animate-spin" />
              : <><Plus size={13} strokeWidth={2.5} />Add</>
            }
          </button>
        </div>
      </form>
    </div>
  );
}
