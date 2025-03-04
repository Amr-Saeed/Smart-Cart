// import { useContext } from "react";
// import TrueFocus from "../TextAnimations/TrueFocus/TrueFocus";
// import { useProducts } from "../useProducts";
// import ProductCard from "../HomePage/ProdutCard";
// import SwiperComponent from "./Swiper";
import AnySlider from "../HomePage/AnySlider";
// const content = [
//   {
//     name: "Meat",
//     id: 1,
//     price: 470,
//     image_url: "/meat.png",
//   },
//   {
//     name: "Milk",
//     id: 2,
//     price: 36,
//     image_url: "/bakery.png",
//   },
//   {
//     name: "cheese",
//     id: 3,
//     price: 325,
//     image_url: "/—Pngtree—asus elegant gaming laptop_17033096.png",
//   },
//   {
//     name: "Soda",
//     id: 4,
//     price: 15,
//     image_url: "/bucket.png",
//   },
//   {
//     name: "Indomie",
//     id: 5,
//     price: 8,
//     image_url:
//       "/pngtree-dairy-and-eggs-clipart-illustration-milk-cottage-cheese-on-tablecloth-png-image_16905994.png",
//   },
//   {
//     name: "Indomie",
//     id: 6,
//     price: 8,
//     image_url: "/water.png",
//   },
//   {
//     name: "Indomie",
//     id: 7,
//     price: 8,
//     image_url: "/water.png",
//   },
//   {
//     name: "Indomie",
//     id: 8,
//     price: 8,
//     image_url: "/water.png",
//   },
// ];
export default function EveryDayNeeds() {
  return (
    // <section className="everyDayNeeds">
    //   <h2 className="main-title text-2xl font-bold text-center">
    //     <TrueFocus
    //       borderColor="#aa8cee"
    //       //   manualMode={true}
    //       sentence="EveryDay Needs"
    //     />
    //   </h2>
    //   <div className="containerEveryday">
    //     <SwiperComponent content={content} />
    //     {/* <ProductCard productImg="/meat.png" name="Meat" unit="kg" /> */}
    //   </div>
    // </section>
    <AnySlider title="EveryDay Needs" />
  );
}
