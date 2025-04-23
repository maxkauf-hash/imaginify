export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen w-full bg-purple-100 items-center justify-center">{children}</main>
  );
}
