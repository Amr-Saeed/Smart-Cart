function NoResult() {
  return (
    <li className="w-full flex !p-3 rounded-2xl items-center justify-center bg-[var(--main-color)]">
      <span className="!ml-5 flex items-center justify-center flex-col ">
        <p href="" className="anchorItems text-center text-[1.3rem]">
          No results found
        </p>
      </span>
    </li>
  );
}

export default NoResult;
