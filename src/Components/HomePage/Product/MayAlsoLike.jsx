import { memo } from "react";
import SwiperComponent from "../Swiper";

function MayAlsoLike({ relatedProducts }) {
  return (
    <section className="relatedProducts containerr">
      <h2 className="main-title text-2xl font-bold text-center">
        You May Also Like
      </h2>
      <SwiperComponent
        title="You May Also Like"
        relatedProducts={relatedProducts}
      />
    </section>
  );
}

export default memo(MayAlsoLike);
