import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto max-w-6xl min-h-screen pb-8">{children}</main>
  );
}
