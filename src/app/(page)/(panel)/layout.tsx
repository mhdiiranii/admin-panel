import type { Metadata } from "next";
import "../../globals.css";
import { getLocale } from "next-intl/server";
import SideBarPanel from "@/app/components/panel/sideBarPanel";

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

  return (
    <div className="flex gap-10">
      <SideBarPanel/>
      <main dir={dir} className="mx-auto container w-full">{children}</main>
    </div>
  );
}
