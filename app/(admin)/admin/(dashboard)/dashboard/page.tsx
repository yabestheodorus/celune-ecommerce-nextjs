import { 
  ArrowUpRight, 
  ArrowDownRight, 
  DollarSign, 
  ShoppingBag, 
  UserPlus, 
  Eye 
} from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <header className="mb-14 flex justify-between items-end">
        <div>
          <h2 className="font-noto text-[38px] leading-[1.1] font-medium text-[#1a1c1a] tracking-tight">
            Analytics Overview
          </h2>
          <p className="font-manrope text-[11px] text-[#93461d] mt-3 uppercase tracking-[0.25em] font-bold">
            The Digital Sanctuary // Editor in Chief
          </p>
        </div>
        <div>
            <span className="font-manrope px-5 py-2.5 bg-surface-low rounded-full text-[10px] font-bold uppercase tracking-widest text-[#1a1c1a]/40 border border-[#1a1c1a]/5">
                Synced: 12:04 PM
            </span>
        </div>
      </header>

      {/* Analytics Grid - Tonal Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        <StatsCard 
            title="Revenue" 
            value="$42,390" 
            change="+12.5%" 
            isPositive 
            icon={<DollarSign size={20} className="text-[#93461d]" strokeWidth={1.5} />} 
        />
        <StatsCard 
            title="Sales" 
            value="1,204" 
            change="+18.2%" 
            isPositive 
            icon={<ShoppingBag size={20} className="text-[#93461d]" strokeWidth={1.5} />} 
        />
        <StatsCard 
            title="New Clients" 
            value="342" 
            change="-2.4%" 
            isPositive={false} 
            icon={<UserPlus size={20} className="text-[#93461d]" strokeWidth={1.5} />} 
        />
        <StatsCard 
            title="Page Views" 
            value="89.4k" 
            change="+24.1%" 
            isPositive 
            icon={<Eye size={20} className="text-[#93461d]" strokeWidth={1.5} />} 
        />
      </div>

      {/* Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 bg-gradient-to-b from-surface-low to-transparent rounded-[40px] p-12 relative overflow-hidden group border border-[#1a1c1a]/5">
            <div className="flex justify-between items-center mb-10">
                <h3 className="font-noto text-2xl font-medium text-[#1a1c1a]">Commercial Flow</h3>
                <div className="font-manrope flex gap-2">
                    <button className="px-4 py-1.5 bg-white shadow-sm rounded-lg text-[10px] uppercase font-bold tracking-widest text-[#93461d]">Weekly</button>
                    <button className="px-4 py-1.5 opacity-40 text-[10px] uppercase font-bold tracking-widest hover:opacity-100 transition-opacity">Monthly</button>
                </div>
            </div>
            <div className="h-[340px] flex items-center justify-center border-2 border-dashed border-[#1a1c1a]/5 rounded-[30px] group-hover:border-[#93461d]/10 transition-colors duration-700">
                <p className="font-manrope text-[10px] uppercase tracking-[0.3em] font-bold text-[#1a1c1a]/20">
                    Generative Visualization In Progress
                </p>
            </div>
        </div>

        <div className="bg-surface-low/50 backdrop-blur-sm rounded-[40px] p-12 border border-[#1a1c1a]/5">
            <h3 className="font-noto text-2xl font-medium text-[#1a1c1a] mb-8">Editorial Feed</h3>
            <div className="space-y-10">
                <ActivityItem title="Luminescent Serum updated" time="2h ago" type="Product" />
                <ActivityItem title="Registry Integrity Check: Success" time="5h ago" type="System" />
                <ActivityItem title="Journal Entry #402 published" time="Yesterday" type="Content" />
            </div>
            <button className="font-manrope w-full mt-12 py-3.5 border border-[#1a1c1a]/10 rounded-2xl text-[11px] uppercase tracking-widest font-bold text-[#1a1c1a]/60 hover:bg-white hover:text-[#93461d] hover:border-[#93461d]/20 transition-all duration-500">
                View Archives
            </button>
        </div>
      </div>
    </div>
  );
}

function StatsCard({ title, value, change, isPositive, icon }: { 
    title: string; 
    value: string; 
    change: string; 
    isPositive: boolean; 
    icon: React.ReactNode;
}) {
  return (
    <div className="bg-surface-low rounded-[32px] p-8 group hover:bg-white hover:shadow-[0_20px_50px_rgba(0,0,0,0.03)] transition-all duration-700 border border-transparent hover:border-[#1a1c1a]/5">
      <div className="flex justify-between items-start mb-6">
        <div className="p-3 bg-white rounded-2xl shadow-sm group-hover:bg-primary-terracotta group-hover:text-white transition-all duration-700">
            {icon}
        </div>
        <div className="font-manrope flex items-center gap-1.5 text-[10px] font-bold px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-600">
            {isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
            {change}
        </div>
      </div>
      <div>
        <p className="font-manrope text-[#1a1c1a]/40 text-[10px] uppercase tracking-[0.2em] font-bold mb-1.5">{title}</p>
        <h4 className="font-noto text-3xl font-medium text-[#1a1c1a] tracking-tight group-hover:translate-x-1 transition-transform duration-700">{value}</h4>
      </div>
    </div>
  );
}

function ActivityItem({ title, time, type }: { title: string; time: string; type: string }) {
    return (
        <div className="flex gap-6 group cursor-default">
            <div className="w-1.5 h-1.5 rounded-full bg-[#1a1c1a]/10 mt-2.5 shrink-0 group-hover:bg-[#93461d] transition-colors duration-500" />
            <div>
                <p className="font-manrope text-[14px] text-[#1a1c1a]/80 leading-snug mb-2 font-medium group-hover:text-[#1a1c1a] transition-colors duration-500">
                    {title}
                </p>
                <div className="font-manrope flex items-center gap-3">
                    <span className="text-[10px] text-[#1a1c1a]/30 uppercase font-bold tracking-widest group-hover:text-[#93461d]/40 transition-colors duration-500">{time}</span>
                    <span className="w-1 h-1 rounded-full bg-[#1a1c1a]/5" />
                    <span className="text-[10px] text-[#1a1c1a]/30 uppercase font-bold tracking-widest">{type}</span>
                </div>
            </div>
        </div>
    )
}
