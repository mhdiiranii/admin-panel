import type { Metadata } from "next";
import "./globals.css";
import { getLocale } from "next-intl/server";
import { SessionProvider } from "next-auth/react";
import { NextIntlClientProvider } from "next-intl";

export const metadata: Metadata = {
  title: "Home Page",
  description: "my home",
};

export default async function RoteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body className={`antialiased flex flex-col justify-between h-screen`}>
        <SessionProvider>
          <NextIntlClientProvider>{children}</NextIntlClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
