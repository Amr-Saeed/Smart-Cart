function LandingSection() {
  return (
    <section className="hero containerr !mt-5 !mb-[108px]">
      <div className="containerr bg-[var(--main-color-2)] flex justify-between items-center rounded-[10px] !p-5 flex-col md:flex-row">
        <div className="flex flex-col items-center justify-center md:block basis-0 md:basis-[50%] left lg:basis-[60%] md:!pl-[15px]">
          <div className="leftText flex flex-col items-center justify-center md:items-start md:justify-start text-center md:text-left">
            <h1 className="text-[1.5rem] md:text-[3rem] lg:text-[4rem] font-bold text-white">
              it's not just Shopping, it's an Experience.
            </h1>
            <p className="text-[#c9b2ff] text-[0.8rem] md:text-[1.2rem]  !mb-3">
              Shopping Made Simple!
            </p>
          </div>
          <div className="leftButton">
            <button
              className="shopBtn text-white max-w-fit md:w-[40%] rounded-2xl !p-2.5 font-bold text-center bg-[#c9b2ff]"
              aria-label="Shop-Now"
            >
              Shop Now
            </button>
          </div>
        </div>
        <div className="right">
          <picture>
            <img
              src="/png.avif"
              alt="Smart-Cart"
              className="w-[500px] md:h-96 object-cover h-auto"
            />
          </picture>
        </div>
      </div>
    </section>
  );
}

export default LandingSection;
