const inputFields = [
  {
    label: "Product Title",
    name: "name",
    type: "text",
    id: "name",
  },
  {
    label: "Price",
    name: "price",
    type: "number",
    id: "price",
    min: 0,
    step: 0.01,
  },
  {
    label: "Offer",
    name: "offers",
    type: "number",
    id: "offers",
    min: 0,
    max: 100,
  },
  {
    label: "Stock",
    name: "inStock",
    type: "text",
    id: "inStock",
  },
  {
    label: "unit",
    name: "unit",
    type: "text",
    id: "unit",
  },
  {
    label: "image",
    name: "imageUrl",
    type: "text",
    id: "imageUrl",
  },
];

export default inputFields;
