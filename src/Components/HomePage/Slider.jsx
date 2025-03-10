import RollingGallery from "../RollingGallery/RollingGallery";
import { useProducts } from "../useProducts";

function Slider() {
  const { products, isLoading } = useProducts();

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div>
      <RollingGallery
        images={products.slice(2, 13).map((item) => item.imageUrl)}
        autoplay={true}
      />
    </div>
  );
}

export default Slider;
