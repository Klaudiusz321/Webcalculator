import fs from "fs";
import { SitemapStream, streamToPromise } from "sitemap";
import { Readable } from "stream";

// Lista stron do uwzględnienia w sitemap
const links = [
  { url: "/", changefreq: "daily", priority: 1.0 },
  // Dodaj kolejne strony, np.:
  // { url: "/about", changefreq: "monthly", priority: 0.8 },
];

const stream = new SitemapStream({ hostname: "https://itensor.online" });

// Utwórz strumień wejściowy z listą linków
const xmlStream = Readable.from(links).pipe(stream);

// Zapisz sitemap.xml do folderu public (upewnij się, że folder public istnieje)
streamToPromise(xmlStream)
  .then((data) => {
    fs.writeFileSync("public/sitemap.xml", data.toString());
    console.log("Sitemap została wygenerowana!");
  })
  .catch((err) => {
    console.error("Błąd przy generowaniu sitemap:", err);
  });
