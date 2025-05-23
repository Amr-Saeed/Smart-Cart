import { Link } from "react-router-dom";

function TitleandDes({
  name,
  unit,
  description,
  id,
  comingFromSmScreensCategoryPage = false,
}) {
  return (
    <>
      <span
        className={`card-title ${
          comingFromSmScreensCategoryPage ? "h-[81px]" : "h-[50px]"
        }`}
      >
        <Link
          className="card-title"
          to={`/product/${id}`}
        >{`${name} - Per ${unit}`}</Link>
      </span>
      <div className="description overflow-hidden ">
        <p>{description}</p>
      </div>
    </>
  );
}

export default TitleandDes;
