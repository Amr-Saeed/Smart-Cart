import TrueFocus from "../TextAnimations/TrueFocus/TrueFocus";
import { useProducts } from "../useProducts";

function CategorySection() {
  const { products, isLoading } = useProducts();

  if (isLoading) return <h1>Loading...</h1>;


  const newProduct = products.reduce((arr, product) => {
    // Special case: If category is "Meat", only include product with id = 11
    if (product.category === "Meat & Poultry") {
      const hasMeatId11 = arr.some((el) => el.category === "Meat & Poultry");
      if (!hasMeatId11 && product.id === 11) {
        return [
          ...arr,
          {
            category: product.category,
            name: product.name,
            imageUrl: product.imageUrl,
            id: product.id,
          },
        ];
      }
    } else if (product.category === "Dairy, Eggs & Cheese") {
      const hasCheese = arr.some(
        (el) => el.category === "Dairy, Eggs & Cheese"
      );

      if (!hasCheese && product.id === 5) {
        return [
          ...arr,
          {
            category: product.category,
            name: product.name,
            imageUrl: product.imageUrl,
            id: product.id,
          },
        ];
      }
    }
    // General case: Add product if category is not already in arr
    else {
      const categoryExists = arr.some((el) => el.category === product.category);
      if (!categoryExists) {
        return [
          ...arr,
          {
            category: product.category,
            name: product.name,
            imageUrl: product.imageUrl,
            id: product.id,
          },
        ];
      }
    }

    return arr;
  }, []);

  return (
    <section className="categorySection ">
      <h2 className="main-title text-2xl font-bold text-center">
        <TrueFocus
          borderColor="#aa8cee"
          //   manualMode={true}
          sentence="Featured Categories"
        />

        {/* Featured Categories */}
      </h2>
      <div className="containerr grid grid-cols-4 lg:grid lg:grid-cols-8 gap-x-4">
        {newProduct.map((product) => (
          <Category product={product} key={product.id} />
        ))}
      </div>
    </section>
  );
}

function Category({ product }) {
  return (
    <div className="category flex flex-col align-middle justify-center">
      <div className="pic h-12 w-[80%] lg:w-full rounded-2xl flex justify-center align-middle ">
        <img
          loading="lazy"
          src={product.imageUrl}
          alt={product.name}
          className="w-14 h-14 lg:w-24 lg:h-24 translate-y-[-50%]"
        />
      </div>
      <p className="text-center categoryName w-[80%] lg:w-full font-semibold">
        {product.category}
      </p>
    </div>
  );
}

export default CategorySection;
