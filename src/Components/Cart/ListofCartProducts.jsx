import { ProductCart } from "./CartProducts";

export function ListofCartProducts({
  cartProducts,
  setQuantityChangeTrigger,
  handleDelete,
}) {
  return (
    <div className="cartProduct flex flex-col w-full">
      <ul>
        {cartProducts.map((product) => (
          <ProductCart
            // برضو هنا عايزين نسأل جيبتي علي الحوار بتاع || والاسم التاني بتاع البرودكت(اي دي ) دا
            key={product.id || product.product_id}
            product={product}
            setQuantityChangeTrigger={setQuantityChangeTrigger}
            handleDelete={handleDelete}
          />
        ))}
      </ul>
      <a href="/">
        <span className="!mt-[10px] inline-block text-[blueviolet] font-semibold  underline ">
          Continue Shopping
        </span>
      </a>
    </div>
  );
}
