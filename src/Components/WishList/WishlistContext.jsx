import { createContext, useContext, useState, useMemo, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";

const WishListContext = createContext();

function WishListProvider({ children }) {
  const [wishList, setWishList] = useState({});

  const { user } = useUser();

  async function fetchWishList({ userId }) {
    try {
      // setIsLoading(true);
      const res = await fetch(
        `https://nutrigeen.com/api/wishlist/${userId}` //https://nutrigeen.com/api/Cart  //https://smartcart.tryasp.net/api/TodoItems/showAll
      );
      const data = await res.json();
      console.log("nbnbnbnbnbn", data); // ✅ <-- Add here

      setWishList(data);
    } catch {
      console.log("Error fetching WishList");
    } finally {
      // setIsLoading(false);
      // hasFetched.current = true; // Mark fetch as complete
    }
  }

  useEffect(() => {
    fetchWishList({ userId: user?.id });
  }, [user]); // Only run on mount

  const wishListItems = wishList.wishlist || [];
  const countWish = wishList.count;

  const contextValue = useMemo(
    () => ({
      wishList,
      setWishList,
      wishListItems,
      countWish,
      fetchWishList,
    }),
    [wishList]
  );

  console.log("WishList fetched successfully:", wishList);
  return (
    <WishListContext.Provider value={contextValue}>
      {children}
    </WishListContext.Provider>
  );
}

function useWishListContext() {
  const context = useContext(WishListContext);
  if (context === undefined)
    throw new Error("WishListContext was used outside of WishListProvider");
  return context;
}

export { WishListProvider, useWishListContext };
