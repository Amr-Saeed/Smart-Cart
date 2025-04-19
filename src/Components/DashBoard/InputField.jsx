function InputField({ input }) {
  const { type, name, id, min, max } = input;

  return (
    <input
      type={type}
      name={name}
      id={id}
      min={min}
      max={max}
      className="border shadow-md border-[blueviolet] rounded-md !p-2 w-full  shadw-md !shadow-gray-700/10 focus:outline-none focus:ring-2 focus:ring-[var(--main-color)] focus:border-transparent data-[hover]:bg-gray-100 data-[focus]:outline-1 data-[focus]:outline-[var(--main-color)]"
    />
  );
}

export default InputField;
