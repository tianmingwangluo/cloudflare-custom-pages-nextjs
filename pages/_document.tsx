import { siteConfig } from "@/config/site";
import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="zh-CN">
      <Head>
        {/* <!-- Cloudflare Pages Custom Error Pages --> */}
        <meta name="description" content={siteConfig.description} />
        <meta name="robots" content="index, nofollow" />
      </Head>
      <body className="min-h-screen bg-[#f7f8f5] font-sans antialiased dark:bg-[#0d0f0c]">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
