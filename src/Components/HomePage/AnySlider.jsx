import TrueFocus from "../TextAnimations/TrueFocus/TrueFocus";
import SwiperComponent from "./Swiper";

function AnySlider({ title }) {
  return (
    <section
      className={title === "Best Deals" ? "best-deals" : "everyDayNeeds"}
    >
      <h2 className="main-title text-2xl font-bold text-center">
        <TrueFocus borderColor="#aa8cee" sentence={title} key={title} />
      </h2>
      <div className="containerEveryday">
        <SwiperComponent title={title} />
      </div>
    </section>
  );
}

export default AnySlider;
