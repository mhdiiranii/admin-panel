import type { Metadata } from "next";
import "../../globals.css";
import { getLocale } from "next-intl/server";
import SideBarPanel from "@/app/components/panel/sideBarPanel";
import { auth } from "@/auth";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Panel Page",
  description: "My Panel",
};

export default async function PanelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const dir = locale === "fa" || locale === "ar" ? "rtl" : "ltr";
  const session = await auth();
  console.log(session?.user?.role);
  if (session?.user?.role !== "admin") {
    notFound();
  }

  return (
    <div className="flex items-end justify-end  gap-10">
      <SideBarPanel />
      <main dir={dir} className="flex container ml-auto w-5/7  py-4">
        {children}
      </main>
    </div>
  );
}
