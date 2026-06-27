import * as fs from "node:fs";
import * as path from "node:path";
import * as cheerio from "cheerio";
import {
  type Locale,
  type Localized,
  type PageTranslation,
  blockPageTranslations,
  challengePageTranslations,
  commonTranslations,
  errorPageTranslations,
  translate,
} from "../config/i18n";

const cloudflareCssStart = "/* yueyuan-cloudflare-css:start */";
const cloudflareCssEnd = "/* yueyuan-cloudflare-css:end */";

interface CloudflareRouteContext {
  directory: string;
  type: string;
  translations: Localized<PageTranslation>;
}

function getAllHtmlFiles(dirPath: string): string[] {
  const files: string[] = [];

  const items = fs.readdirSync(dirPath);

  for (const item of items) {
    const fullPath = path.join(dirPath, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      files.push(...getAllHtmlFiles(fullPath));
    } else if (path.extname(fullPath) === ".html") {
      files.push(fullPath);
    }
  }

  return files;
}

function processHtmlFile(filePath: string): void {
  try {
    const html = fs.readFileSync(filePath, "utf-8");
    const $ = cheerio.load(html);
    const isCloudflarePage = filePath.includes(path.join("out", "cf"));

    $('link[rel="preload"]').each((_, element) => {
      const $element = $(element);
      const as = $element.attr("as");

      if (as === "style") {
        $element.attr("rel", "stylesheet");
        $element.removeAttr("as");
      } else if (as === "font") {
        $element.remove();
      }
    });

    updateTDK($, filePath);

    // Cloudflare custom pages should be self-contained for reliable fetching.
    if (isCloudflarePage) {
      addCloudflareMetaTags($);
      inlineLocalStyles($);
      applyStandaloneLocalization($, filePath);
      removeCloudflareScripts($);
    } else {
      // Move all script tags from head to bottom of body
      moveScriptsToBodyBottom($);
    }

    fs.writeFileSync(filePath, $.html());
    console.log(`Processed: ${filePath}`);
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
}

function getCloudflareRouteContext(
  filePath: string,
): CloudflareRouteContext | undefined {
  const pathParts = filePath.split(path.sep);
  const cfIndex = pathParts.findIndex((part) => part === "cf");

  if (cfIndex === -1 || cfIndex + 2 >= pathParts.length) {
    return undefined;
  }

  const directory = pathParts[cfIndex + 1];
  const type = pathParts[cfIndex + 2];

  if (directory === "block" && type in blockPageTranslations) {
    return {
      directory,
      type,
      translations: blockPageTranslations[type] as Localized<PageTranslation>,
    };
  }

  if (directory === "error" && type in errorPageTranslations) {
    return {
      directory,
      type,
      translations: errorPageTranslations[type] as Localized<PageTranslation>,
    };
  }

  if (directory === "challenge" && type in challengePageTranslations) {
    return {
      directory,
      type,
      translations: challengePageTranslations[
        type
      ] as Localized<PageTranslation>,
    };
  }

  return undefined;
}

function updateTDK($: cheerio.CheerioAPI, filePath: string): void {
  const route = getCloudflareRouteContext(filePath);

  if (!route) {
    return;
  }

  const translation = translate(route.translations, "en");
  const pageTitle = translation.title;
  const pageDescription = translation.message;

  if (pageTitle) {
    $("title").text(`${pageTitle} - YueYuan`);
  }

  if (pageDescription) {
    const descriptionMeta = $('meta[name="description"]');
    if (descriptionMeta.length > 0) {
      descriptionMeta.attr("content", pageDescription);
    } else {
      $("head").append(
        `<meta name="description" content="${pageDescription}">`,
      );
    }
  }

  const keywordsMeta = $('meta[name="keywords"]');
  if (keywordsMeta.length === 0) {
    $("head").append(
      '<meta name="keywords" content="Cloudflare, security, WAF, protection">',
    );
  }
}

function getCloudflareInlineCss(): string {
  const globalsPath = path.join(process.cwd(), "styles", "globals.css");
  const source = fs.readFileSync(globalsPath, "utf-8");
  const start = source.indexOf(cloudflareCssStart);
  const end = source.indexOf(cloudflareCssEnd);
  const yueYuanCss =
    start >= 0 && end > start
      ? source.slice(start + cloudflareCssStart.length, end).trim()
      : source;

  return `
*,*::before,*::after{box-sizing:border-box}
html,body,#__next{min-height:100%;margin:0}
body{margin:0}
a{color:inherit;text-decoration:none}
svg{display:block}
button{font:inherit}
:root{--font-mono:"SFMono-Regular","Consolas","Liberation Mono",ui-monospace,monospace}
.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
${yueYuanCss}
`.trim();
}

function inlineLocalStyles($: cheerio.CheerioAPI): void {
  const css = getCloudflareInlineCss().replace(/<\/style/gi, "<\\/style");
  let inserted = false;

  $('link[href][rel="stylesheet"], link[href][rel="preload"][as="style"]').each(
    (_, element) => {
      const $element = $(element);

      if (inserted) {
        $element.remove();
        return;
      }

      $element.replaceWith(
        `<style data-inlined="yueyuan-cloudflare">${css}</style>`,
      );
      inserted = true;
    },
  );

  if (!inserted) {
    $("head").append(`<style data-inlined="yueyuan-cloudflare">${css}</style>`);
  }
}

function getLocalizedPair(value: Localized<string>) {
  return {
    en: translate(value, "en"),
    zh: translate(value, "zh"),
  };
}

function setLocalizedText(
  $: cheerio.CheerioAPI,
  selector: string,
  en: string,
  zh: string,
): void {
  $(selector).each((_, element) => {
    const $element = $(element);
    $element.attr("data-l10n-en", en);
    $element.attr("data-l10n-zh", zh);
    $element.text(en);
  });
}

function setLocalizedAttr(
  $: cheerio.CheerioAPI,
  selector: string,
  attribute: string,
  en: string,
  zh: string,
): void {
  $(selector).each((_, element) => {
    const $element = $(element);
    $element.attr(`data-l10n-${attribute}-en`, en);
    $element.attr(`data-l10n-${attribute}-zh`, zh);
    $element.attr(attribute, en);
  });
}

function appendStandaloneLocaleScript(
  $: cheerio.CheerioAPI,
  title: Record<Locale, string>,
  description: Record<Locale, string>,
): void {
  const $script = $("<script></script>");
  $script.attr("data-yueyuan-locale", "true");
  $script.attr("data-title-en", title.en);
  $script.attr("data-title-zh", title.zh);
  $script.attr("data-description-en", description.en);
  $script.attr("data-description-zh", description.zh);
  $script.text(`(function(){
var key="cloudflare-custom-pages-locale";
function each(selector,callback){Array.prototype.forEach.call(document.querySelectorAll(selector),callback);}
function normalize(value){value=String(value||"").toLowerCase();if(value.indexOf("zh")===0){return "zh";}if(value.indexOf("en")===0){return "en";}return "";}
function urlLocale(){try{return normalize(new URLSearchParams(window.location.search).get("lang"));}catch(error){return "";}}
function storedLocale(){try{return normalize(window.localStorage.getItem(key));}catch(error){return "";}}
function browserLocale(){var list=navigator.languages&&navigator.languages.length?navigator.languages:[navigator.language];for(var i=0;i<list.length;i++){var locale=normalize(list[i]);if(locale){return locale;}}return "en";}
function setStored(locale){try{window.localStorage.setItem(key,locale);}catch(error){}}
function setAttribute(selector,name,locale){each(selector,function(node){var value=node.getAttribute("data-l10n-"+name+"-"+locale);if(value){node.setAttribute(name,value);}});}
function applyRayFallback(){each("[data-ray-id]",function(node){var value=(node.textContent||"").replace(/^\\s+|\\s+$/g,"");if(!value||value.indexOf("::RAY_ID::")!==-1){node.textContent="7F4C-9A21-RAY";}});}
function apply(locale){
document.documentElement.lang=locale==="zh"?"zh-CN":"en";
document.documentElement.setAttribute("data-locale",locale);
each("[data-l10n-en]",function(node){var value=node.getAttribute("data-l10n-"+locale);if(value){node.textContent=value;}});
setAttribute("[data-l10n-aria-label-en]","aria-label",locale);
var script=document.querySelector("script[data-yueyuan-locale]");
if(script){
var title=script.getAttribute("data-title-"+locale);
var description=script.getAttribute("data-description-"+locale);
if(title){document.title=title;}
var meta=document.querySelector('meta[name="description"]');
if(meta&&description){meta.setAttribute("content",description);}
}
each("[data-locale-button]",function(button){button.setAttribute("aria-pressed",button.getAttribute("data-locale-button")===locale?"true":"false");});
}
each("[data-locale-button]",function(button){button.addEventListener("click",function(){var locale=normalize(button.getAttribute("data-locale-button"))||"en";setStored(locale);apply(locale);});});
apply(urlLocale()||storedLocale()||browserLocale());
applyRayFallback();
})();`);
  $("body").append($script);
}

function applyStandaloneLocalization(
  $: cheerio.CheerioAPI,
  filePath: string,
): void {
  const route = getCloudflareRouteContext(filePath);

  if (!route) {
    return;
  }

  const pageEn = translate(route.translations, "en");
  const pageZh = translate(route.translations, "zh");
  const isErrorPage = route.directory === "error";

  const brand = getLocalizedPair(commonTranslations.yueYuanBrand);
  const title = getLocalizedPair(commonTranslations.yueYuanTitle);
  const subtitle = getLocalizedPair(commonTranslations.yueYuanSubtitle);
  const body = getLocalizedPair(
    isErrorPage
      ? commonTranslations.yueYuanErrorBody
      : commonTranslations.yueYuanBody,
  );
  const status = getLocalizedPair(commonTranslations.yueYuanStatus);
  const statusValue = getLocalizedPair(
    isErrorPage
      ? commonTranslations.yueYuanGuarding
      : commonTranslations.yueYuanBlocked,
  );
  const type = getLocalizedPair(commonTranslations.yueYuanType);
  const typeValue = getLocalizedPair(commonTranslations.yueYuanEdgeType);
  const requestId = getLocalizedPair(commonTranslations.yueYuanRequestId);
  const verticalTop = getLocalizedPair(commonTranslations.yueYuanVerticalTop);
  const verticalBottom = getLocalizedPair(
    commonTranslations.yueYuanVerticalBottom,
  );
  const sealTop = getLocalizedPair(commonTranslations.yueYuanSealTop);
  const sealBottom = getLocalizedPair(commonTranslations.yueYuanSealBottom);
  const protectedBy = getLocalizedPair(commonTranslations.yueYuanProtectedBy);
  const backHome = getLocalizedPair(commonTranslations.backHome);
  const contactOwner = getLocalizedPair(commonTranslations.contactOwner);

  setLocalizedText($, ".yy-brand__text", brand.en, brand.zh);
  setLocalizedText($, ".yy-title", title.en, title.zh);
  setLocalizedText($, ".yy-subtitle", subtitle.en, subtitle.zh);
  setLocalizedText($, ".yy-message", body.en, body.zh);
  setLocalizedText(
    $,
    ".yy-meta__item:nth-child(1) > span",
    status.en,
    status.zh,
  );
  setLocalizedText(
    $,
    ".yy-meta__item:nth-child(1) > strong",
    statusValue.en,
    statusValue.zh,
  );
  setLocalizedText($, ".yy-meta__item:nth-child(2) > span", type.en, type.zh);
  setLocalizedText(
    $,
    ".yy-meta__item:nth-child(2) > strong",
    typeValue.en,
    typeValue.zh,
  );
  setLocalizedText(
    $,
    ".yy-meta__item:nth-child(3) > span",
    requestId.en,
    requestId.zh,
  );
  setLocalizedText(
    $,
    ".yy-vertical > span:nth-of-type(1)",
    verticalTop.en,
    verticalTop.zh,
  );
  setLocalizedText(
    $,
    ".yy-vertical > span:nth-of-type(2)",
    verticalBottom.en,
    verticalBottom.zh,
  );
  setLocalizedText($, ".yy-seal span:nth-child(1)", sealTop.en, sealTop.zh);
  setLocalizedText(
    $,
    ".yy-seal span:nth-child(2)",
    sealBottom.en,
    sealBottom.zh,
  );
  setLocalizedText($, ".yy-protected__text", protectedBy.en, protectedBy.zh);
  setLocalizedText($, ".yy-button--gold span", backHome.en, backHome.zh);
  setLocalizedText(
    $,
    ".yy-button--green span",
    contactOwner.en,
    contactOwner.zh,
  );
  setLocalizedText(
    $,
    ".yy-note h2",
    pageEn.adviceTitle ?? pageEn.title,
    pageZh.adviceTitle ?? pageZh.title,
  );
  setLocalizedText(
    $,
    ".yy-note p",
    pageEn.adviceMessage ?? pageEn.message,
    pageZh.adviceMessage ?? pageZh.message,
  );

  const challengeTitle = getLocalizedPair(
    commonTranslations.challengePanelTitle,
  );
  const detailTitle = getLocalizedPair(commonTranslations.detailPanelTitle);
  setLocalizedText($, ".yy-widget h2", challengeTitle.en, challengeTitle.zh);
  setLocalizedText($, ".yy-detail h2", detailTitle.en, detailTitle.zh);

  const languageSwitch = getLocalizedPair(commonTranslations.languageSwitch);
  const switchToEnglish = getLocalizedPair(commonTranslations.switchToEnglish);
  const switchToChinese = getLocalizedPair(commonTranslations.switchToChinese);
  setLocalizedText(
    $,
    ".yy-locale legend",
    languageSwitch.en,
    languageSwitch.zh,
  );
  setLocalizedAttr(
    $,
    '[data-locale-button="en"]',
    "aria-label",
    switchToEnglish.en,
    switchToEnglish.zh,
  );
  setLocalizedAttr(
    $,
    '[data-locale-button="zh"]',
    "aria-label",
    switchToChinese.en,
    switchToChinese.zh,
  );

  appendStandaloneLocaleScript(
    $,
    {
      en: `${pageEn.title} - YueYuan`,
      zh: `${pageZh.title} - 月垣护界`,
    },
    {
      en: pageEn.message,
      zh: pageZh.message,
    },
  );
}

function removeCloudflareScripts($: cheerio.CheerioAPI): void {
  $('script:not([data-yueyuan-locale="true"])').remove();
  $('link[rel="preload"][as="script"], link[rel="modulepreload"]').remove();
}

/**
 * Add Cloudflare-specific meta tags to the top of head section in HTML files
 * - client-ip: ::CLIENT_IP::
 * - ray-id: ::RAY_ID::
 * - location-code: ::GEO::
 * - build-date: Current build timestamp
 * - version: Package version from package.json
 */
function addCloudflareMetaTags($: cheerio.CheerioAPI): void {
  const packagePath = path.join(__dirname, "../package.json");
  let version = "unknown";

  try {
    const packageContent = fs.readFileSync(packagePath, "utf-8");
    const packageJson = JSON.parse(packageContent);
    version = packageJson.version || "unknown";
  } catch (error) {
    console.warn("Failed to read package.json version:", error);
  }

  const buildDate = new Date().toISOString();

  $("head").prepend(`
    <meta name="client-ip" content="::CLIENT_IP::">
    <meta name="ray-id" content="::RAY_ID::">
    <meta name="location-code" content="::GEO::">
    <meta name="build-date" content="${buildDate}">
    <meta name="version" content="${version}">
  `);
}

/**
 * Move all script tags from head to the bottom of body
 *
 * Cloudflare will embed all style and script files in one HTML in the
 * final error page. However, this will break Next.js's script defer behavior.
 *
 * By putting all script tags to the bottom, we create a similar behavior to
 * defer with Cloudflare created inline scripts.
 */
function moveScriptsToBodyBottom($: cheerio.CheerioAPI): void {
  // Find all script tags in the head
  const headScripts = $("head script");

  if (headScripts.length === 0) {
    return;
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const scriptElements: any[] = [];

  headScripts.each((_, element) => {
    scriptElements.push(element);
  });

  // Remove scripts from head
  headScripts.remove();

  // Append all scripts to the bottom of body (before the closing body tag)
  for (const script of scriptElements) {
    $("body").append(script);
  }
}

function main() {
  const outDir = "./out";

  try {
    if (!fs.existsSync(outDir)) {
      console.error("Directory ./out does not exist");
      return;
    }

    const htmlFiles = getAllHtmlFiles(outDir);

    for (const file of htmlFiles) {
      processHtmlFile(file);
    }

    console.log("All files processed successfully!");
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
