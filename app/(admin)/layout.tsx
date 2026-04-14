export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#fafafa] text-[#1a1a1a]">
      {children}
    </div>
  );
}
