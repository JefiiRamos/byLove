/**
 * Fotos e vídeos em `public/img/`.
 * Nomes com espaços usam encodeURIComponent na URL.
 */

export function assetPath(filename) {
  return `/img/${encodeURIComponent(filename)}`;
}

/** Foto do primeiro dia em que se viram (27/02/2026) */
const PRIMEIRA_FOTO = "primeirafoto.jpeg";

/** Imagem grande da seção editorial — primeiro dia */
const EDITORIAL = PRIMEIRA_FOTO;

const GALLERY = [
  { file: "WhatsApp Image 2026-04-03 at 23.14.45 (1).jpeg", caption: "03 de abril — 1" },
  { file: "WhatsApp Image 2026-04-03 at 23.14.45.jpeg", caption: "03 de abril — 2" },
  { file: "WhatsApp Image 2026-04-03 at 23.14.46.jpeg", caption: "03 de abril — 3" },
  { file: "WhatsApp Image 2026-04-03 at 23.16.04 (1).jpeg", caption: "03 de abril — 4" },
  { file: "WhatsApp Image 2026-04-03 at 23.16.04.jpeg", caption: "03 de abril — 5" },
  { file: "WhatsApp Image 2026-04-05 at 23.33.46.jpeg", caption: "05 de abril — primeiro culto juntos de mão dadas" },
  { file: "WhatsApp Image 2026-04-05 at 23.34.49 (1).jpeg", caption: "05 de abril — 1" },
  { file: "WhatsApp Image 2026-04-05 at 23.34.49.jpeg", caption: "05 de abril — 2" },
  /** Antes: WhatsApp 2026-04-07 (arquivo ausente — 404). Primeiro dia que se viram: 27/02 */
  { file: PRIMEIRA_FOTO, caption: "27 de março — primeiro café juntos" },
];

const VIDEOS = [
  { file: "WhatsApp Video 2026-04-05 at 23.34.48.mp4", caption: "05 de abril — Um vídeo para os nossos filhos" },
];

/** Miniaturas dos 4 cards: primeira = foto do primeiro dia */
const MOMENTO_FILES = [
  PRIMEIRA_FOTO,
  "WhatsApp Image 2026-04-03 at 23.14.46.jpeg",
  "WhatsApp Image 2026-04-03 at 23.16.04.jpeg",
  "WhatsApp Image 2026-04-05 at 23.33.46.jpeg",
];

export const media = {
  editorial: assetPath(EDITORIAL),
  gallery: GALLERY.map(({ file, caption }) => ({ src: assetPath(file), caption })),
  videos: VIDEOS.map(({ file, caption }) => ({ src: assetPath(file), caption })),
  momentoThumbs: MOMENTO_FILES.map(assetPath),
};
