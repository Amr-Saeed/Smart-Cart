// const inputFields = [
//   {
//     label: "Product Title",
//     name: "name",
//     type: "text",
//     id: "name",
//   },
//   {
//     label: "Price",
//     name: "price",
//     type: "number",
//     id: "price",
//     min: 0,
//     step: 0.01,
//   },
//   {
//     label: "Offer",
//     name: "offers",
//     type: "number",
//     id: "offers",
//     min: 0,
//     max: 100,
//   },
//   {
//     label: "Stock",
//     name: "inStock",
//     type: "text",
//     id: "inStock",
//   },
//   {
//     label: "unit",
//     name: "unit",
//     type: "text",
//     id: "unit",
//   },
//   {
//     label: "image",
//     name: "imageUrl",
//     type: "text",
//     id: "imageUrl",
//   },
// ];

// export default inputFields;

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
    type: "number", // It should be a number (instead of text), since it's a quantity
    id: "inStock",
  },
  {
    label: "Unit",
    name: "unit",
    type: "text",
    id: "unit",
  },

  {
    label: "Description",
    name: "description",
    type: "text",
    id: "description",
  },
  {
    label: "Rating",
    name: "rating",
    type: "number",
    id: "rating",
    min: 0,
    max: 5,
    step: 0.1,
  },
  {
    label: "Barcode",
    name: "barcode",
    type: "text",
    id: "barcode",
  },
  {
    label: "Best Deal",
    name: "bestDeal",
    type: "checkbox", // A checkbox for best deal flag
    id: "bestDeal",
  },
  {
    label: "Top Selling",
    name: "topSelling",
    type: "checkbox", // A checkbox for top selling flag
    id: "topSelling",
  },
  {
    label: "Everyday Needs",
    name: "everydayNeeds",
    type: "checkbox", // A checkbox for everyday needs flag
    id: "everydayNeeds",
  },

  {
    label: "New Arrival",
    name: "new_arrival",
    type: "checkbox", // A checkbox for new arrival flag
    id: "new_arrival",
  },
];

export default inputFields;
