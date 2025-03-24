import type { Metadata } from "next";
import "../../globals.css";
import { getLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Panel Page",
  description: "My Panel",
};

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const dir = locale === "fa" || locale === "ar" ? "rtl" : "ltr";

  return (
    <div>
      <header className="bg-red-500">auth</header>
      <main dir={dir}>{children}</main>
    </div>
  );
}