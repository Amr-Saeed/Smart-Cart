function TitleandDes({ name, unit, description }) {
  return (
    <>
      <span className="card-title">{`${name} - Per ${unit}`}</span>
      <div className="description overflow-hidden ">
        <p>{description}</p>
      </div>
    </>
  );
}

export default TitleandDes;
