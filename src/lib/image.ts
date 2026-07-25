// Map seeded image paths (which point at src/assets) to actual imported URLs.
import hoodie1 from "@/assets/hoodie-1.jpg";
import hoodie2 from "@/assets/hoodie-2.jpg";
import hoodie3 from "@/assets/hoodie-3.jpg";
import pants1 from "@/assets/pants-1.jpg";
import pants2 from "@/assets/pants-2.jpg";

const map: Record<string, string> = {
  "/src/assets/hoodie-1.jpg": hoodie1,
  "/src/assets/hoodie-2.jpg": hoodie2,
  "/src/assets/hoodie-3.jpg": hoodie3,
  "/src/assets/pants-1.jpg": pants1,
  "/src/assets/pants-2.jpg": pants2,
};

export function resolveImage(src: string | undefined): string {
  if (!src) return hoodie1;
  return map[src] ?? src;
}
