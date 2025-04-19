const inputFields = [
  {
    label: "Product Title",
    name: "title",
    type: "text",
    id: "title",
  },
  { label: "Price", name: "price", type: "number", id: "price", min: 0 },
  {
    label: "Offer",
    name: "offer",
    type: "number",
    id: "offer",
    min: 0,
    max: 100,
  },
  {
    label: "Stock",
    name: "stock",
    type: "text",
    id: "stock",
  },
  {
    label: "unit",
    name: "unit",
    type: "text",
    id: "unit",
  },
  {
    label: "image",
    name: "image",
    type: "text",
    id: "image",
  },
];

export default inputFields;
