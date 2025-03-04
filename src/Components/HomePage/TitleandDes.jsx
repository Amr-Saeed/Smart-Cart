function TitleandDes({ name, unit, description }) {
  return (
    <>
      <h6 className="card-title">{`${name} - Per ${unit}`}</h6>
      <div className="description overflow-hidden ">
        <p>{description}</p>
      </div>
    </>
  );
}

export default TitleandDes;
