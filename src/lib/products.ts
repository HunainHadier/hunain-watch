import w1 from "@/assets/watch-1.jpg";
import w2 from "@/assets/watch-2.jpg";
import w3 from "@/assets/watch-3.jpg";

export type Category = "Chronograph" | "Dress" | "Diver" | "Field";
export const categories: Category[] = ["Chronograph", "Dress", "Diver", "Field"];

export interface Product {
  id: string; name: string; price: number; category: Category; image: string;
  year: string; description: string; featured?: boolean; isNew?: boolean;
  specs: Record<string, string>;
}

const s = (caseM: string, size: string, mvt: string, strap: string, wr: string) => ({
  Case: caseM, Diameter: size, Movement: mvt, Strap: strap, "Water resistance": wr,
});

export const products: Product[] = [
  { id: "heritage-chrono-1948", name: "Heritage Chronograph 1948", price: 4850, category: "Chronograph", image: w1, year: "1948", featured: true,
    description: "A two-register chronograph with a warm cream dial and heat-blued hands, restored by hand and fitted to aged cognac leather.",
    specs: s("Polished steel", "37 mm", "Manual-wind column wheel", "Cognac calf leather", "30 m") },
  { id: "bronze-diver-62", name: "Bronze Diver '62", price: 3200, category: "Diver", image: w2, year: "1962", featured: true, isNew: true,
    description: "Patinated bronze, a black gilt dial and a sixty-minute bezel. Built for the deep, worn for the city.",
    specs: s("Bronze CuSn8", "40 mm", "Automatic", "Dark brown leather", "200 m") },
  { id: "salmon-dress-1955", name: "Salmon Dress 1955", price: 7900, category: "Dress", image: w3, year: "1955", featured: true,
    description: "Solid yellow gold with a sunburst salmon dial and dauphine hands. Quiet elegance from the golden age of watchmaking.",
    specs: s("18k yellow gold", "35 mm", "Manual-wind", "Alligator leather", "Splash") },
  { id: "aviator-field-1944", name: "Aviator Field 1944", price: 2650, category: "Field", image: w1, year: "1944", isNew: true,
    description: "Legible, honest and robust. A military field watch carried through decades and serviced to perform for many more.",
    specs: s("Brushed steel", "36 mm", "Manual-wind", "Canvas strap", "50 m") },
  { id: "monopusher-1939", name: "Monopusher 1939", price: 9400, category: "Chronograph", image: w1, year: "1939",
    description: "A rare single-button chronograph with tachymeter scale and an original enamel-finished dial.",
    specs: s("Steel", "38 mm", "Manual-wind monopusher", "Brown suede", "Splash") },
  { id: "gilt-skin-diver-58", name: "Gilt Skin Diver '58", price: 4100, category: "Diver", image: w2, year: "1958", isNew: true,
    description: "An early skin diver with gilt print and tropical patina. A collector's piece with genuine character.",
    specs: s("Bronze", "39 mm", "Automatic", "Rally leather", "100 m") },
  { id: "rose-calatrava-1961", name: "Rose Calatrava 1961", price: 6800, category: "Dress", image: w3, year: "1961",
    description: "Thin, round and perfectly proportioned. Rose-toned dial with applied baton indices.",
    specs: s("18k gold", "34 mm", "Manual-wind", "Brown croc leather", "Splash") },
  { id: "officer-field-1952", name: "Officer Field 1952", price: 2900, category: "Field", image: w2, year: "1952", isNew: true,
    description: "A darker dial with luminous indices, crafted for officers and reborn for everyday adventure.",
    specs: s("Bronze", "37 mm", "Automatic", "Oiled leather", "50 m") },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);
export const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
