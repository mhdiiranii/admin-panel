import type { Metadata } from "next";
import "../../globals.css";
import { getLocale } from "next-intl/server";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";

export const metadata: Metadata = {
  title: "Home Page",
  description: "my home",
};

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const dir = locale === "fa" || locale === "ar" ? "rtl" : "ltr";

  return (
    <main>
      <Header />
      <main className="h-fit py-4 mx-auto container" dir={dir}>
        {children}
      </main>
      <Footer />
    </main>
  );
}
