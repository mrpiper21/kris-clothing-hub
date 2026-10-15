import type { Metadata } from "next";
import { WishlistView } from "@/components/WishlistView";

export const metadata: Metadata = {
  title: "Wishlist",
  robots: { index: false },
};

export default function WishlistPage() {
  return (
    <div className="mx-auto max-w-[1600px] px-5 pb-20 pt-10 md:px-10 md:pb-32 md:pt-16">
      <h1 className="display mb-10 text-[clamp(3.25rem,10vw,7rem)] md:mb-14">
        Your <span className="accent-word">wishlist</span>
      </h1>
      <WishlistView />
    </div>
  );
}
