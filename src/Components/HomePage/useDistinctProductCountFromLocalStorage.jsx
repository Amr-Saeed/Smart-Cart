export function useDistinctProductCountFromLocalStorage() {
  let count = 0;

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith("quantity-")) {
      const quantity = Number(localStorage.getItem(key));
      if (quantity > 0) count++;
    }
  }

  return count;
}
