import { PropsWithChildren } from "react";
import { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Ochrana osobních údajů",
  description:
    "Informace o zpracování osobních údajů na webových stránkách pivovaru STADIONER v souladu s GDPR. Zjistěte, jak zpracováváme vaše osobní údaje.",
  canonicalPath: "/cs/gdpr",
  keywords: [
    "GDPR",
    "ochrana osobních údajů",
    "soukromí",
    "osobní údaje",
    "STADIONER",
    "pivovar",
    "zpracování údajů",
  ],
});

export default function CookiesLayout({ children }: PropsWithChildren) {
  return children;
}
