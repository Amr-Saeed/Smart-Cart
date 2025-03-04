function SearchList({ children }) {
  return (
    <section className="searchList grid ">
      <div className="!pl-[1.5rem] !pr-[1.5rem] !mt-2.5">
        <ul className="grid grid-cols-1 gap-5 place-items-center">
          {children}
        </ul>
      </div>
    </section>
  );
}

export default SearchList;
