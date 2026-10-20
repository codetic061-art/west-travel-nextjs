import type { SupportedLocale } from "./hero-dictionary";

/** Supplemental image copy; section marketing copy stays in HERO_DICTIONARY. */
export const WHY_WEST_ASSET_COPY: Record<SupportedLocale, { traveler: string; landmarks: string }> = {
  en: {
    traveler: "Smiling traveler in a sand-colored hat and blue shirt, carrying a backpack and holding a folded map.",
    landmarks: "The pyramids and ancient architecture of Giza blend into Dubai’s skyline and Burj Khalifa beside the waterfront.",
  },
  tr: {
    traveler: "Kum rengi şapkalı, mavi gömlekli, sırt çantalı ve elinde katlanmış harita tutan gülümseyen gezgin.",
    landmarks: "Gize piramitleri ve antik mimarisi, su kıyısındaki Dubai silüeti ve Burj Khalifa ile birleşiyor.",
  },
  es: {
    traveler: "Viajero sonriente con sombrero color arena, camisa azul y mochila, sosteniendo un mapa plegado.",
    landmarks: "Las pirámides y la arquitectura antigua de Guiza se funden con el horizonte de Dubái y el Burj Khalifa junto al agua.",
  },
};
