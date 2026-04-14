import AdminNav from "./AdminNav";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-sanctuary-bg/50 selection:bg-primary-terracotta/10">
      <aside className="fixed left-0 top-0 bottom-0 w-[260px] border-r border-[#1a1c1a]/15 bg-sanctuary-bg/70 backdrop-blur-[32px] z-40 transition-all duration-500 hover:border-[#1a1c1a]/25">
        <AdminNav />
      </aside>

      <main className="flex-1 ml-[260px] min-h-screen">
        <div className="p-12 max-w-[1400px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
