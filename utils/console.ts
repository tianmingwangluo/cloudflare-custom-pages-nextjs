"use client";

import pkg from "@/package.json" assert { type: "json" };
import { siteConfig } from "@/config/site";

const print = () => {
  if (!siteConfig.enableCopyrightConsole) {
    return;
  }

  console.log(`${pkg.name} v${pkg.version}`);
  console.log("GitHub:", siteConfig.links.github);
};

export default print;
