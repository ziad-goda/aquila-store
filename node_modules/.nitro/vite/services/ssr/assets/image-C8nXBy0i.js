const hoodie1 = "/assets/hoodie-1-DWKrpRvR.jpg";
const hoodie2 = "/assets/hoodie-2-CWWGzvF6.jpg";
const hoodie3 = "/assets/hoodie-3-D3fhENKs.jpg";
const pants1 = "/assets/pants-1-C-VUHkNf.jpg";
const pants2 = "/assets/pants-2-CMJ_uQL8.jpg";
const map = {
  "/src/assets/hoodie-1.jpg": hoodie1,
  "/src/assets/hoodie-2.jpg": hoodie2,
  "/src/assets/hoodie-3.jpg": hoodie3,
  "/src/assets/pants-1.jpg": pants1,
  "/src/assets/pants-2.jpg": pants2
};
function resolveImage(src) {
  if (!src) return hoodie1;
  return map[src] ?? src;
}
export {
  resolveImage as r
};
