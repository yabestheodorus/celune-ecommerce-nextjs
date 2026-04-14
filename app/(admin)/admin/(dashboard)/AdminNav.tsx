"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Package,
  Settings,
  Users,
  ShoppingBag,
  ArrowLeftRight,
} from "lucide-react";

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full p-8">
      <div className="mb-14">
        <h1 className="font-noto text-[28px] leading-tight tracking-tight text-[#1a1c1a]">
          Célune
        </h1>
        <p className="font-manrope text-[10px] uppercase tracking-[0.3em] text-[#93461d] font-bold mt-2 ml-0.5">
          Editorial Portal
        </p>
      </div>

      <nav className="flex-1 space-y-2">
        <SidebarLink href="/admin/dashboard" icon={<BarChart3 size={18} strokeWidth={1.5} />} label="Analytics" active={pathname === "/admin/dashboard"} />
        <SidebarLink href="/admin/products" icon={<Package size={18} strokeWidth={1.5} />} label="Inventory" active={pathname === "/admin/products"} />
        <SidebarLink href="#" icon={<ArrowLeftRight size={18} strokeWidth={1.5} />} label="Transactions" active={false} />
        <SidebarLink href="#" icon={<Users size={18} strokeWidth={1.5} />} label="Clients" active={false} />
      </nav>

      <div className="pt-8 border-t border-[#1a1c1a]/5 space-y-2">
        <SidebarLink href="/admin/settings" icon={<Settings size={18} strokeWidth={1.5} />} label="Settings" active={pathname === "/admin/settings"} />
        <SidebarLink href="/" icon={<ShoppingBag size={18} strokeWidth={1.5} />} label="View Store" active={false} />
      </div>
    </div>
  );
}

function SidebarLink({
  href,
  icon,
  label,
  active,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-500 group relative ${
        active
          ? "bg-primary-terracotta text-white shadow-[0_10px_30px_rgba(147,70,29,0.2)]"
          : "text-[#1a1c1a]/60 hover:bg-[#1a1c1a]/5 hover:text-[#1a1c1a]"
      } font-manrope`}
    >
      <span className={`${active ? "text-white" : "text-[#1a1c1a]/40 group-hover:text-[#93461d]"} transition-colors duration-500`}>
        {icon}
      </span>
      <span className="text-[13px] font-semibold tracking-wide uppercase transition-all duration-500">
        {label}
      </span>
      {active && (
        <span className="absolute right-4 w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse" />
      )}
    </Link>
  );
}
