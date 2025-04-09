import { Link } from "react-router-dom";

function TitleandDes({ name, unit, description, id }) {
  return (
    <>
      <span className="card-title">
        <Link
          className="card-title"
          to={`/${id}`}
        >{`${name} - Per ${unit}`}</Link>
      </span>
      <div className="description overflow-hidden ">
        <p>{description}</p>
      </div>
    </>
  );
}

export default TitleandDes;
