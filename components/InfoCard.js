import Image from "next/image";
import { HeartIcon } from "@heroicons/react/outline";
import { StarIcon, ArrowRightIcon } from "@heroicons/react/solid";
import { HeartIcon as HeartIcon2 } from "@heroicons/react/solid";
import { useState } from "react";
import { useRouter } from "next/dist/client/router";
function InfoCard({ img, location, title, description, star, price, total }) {
  const [liked, setLiked] = useState(false);
  const router = useRouter();

  const goToSinglePage = () => {
    router.push({
      pathname: "/singleItem",
      query: {
       img: img,
       location: location,
       title: title,
       description: description,
       star: star,
       price: price,
       total: total,
      },
    });
  };

  return (
    <div className="flex flex-col sm:flex-row py-7 pr-4 px-2 border-b hover:opacity-90 hover:shadow-xl transition duration-200 ease-out first:border-t">
      <div className="relative h-40 w-58 mx-2 mb-5 sm:mb-1 md:h-52 md:w-80 flex-shrink-0">
        <Image src={img} layout="fill" className="rounded-3xl" objectFit="cover" />
      </div>
      <div className="flex flex-col flex-grow pl-5">
        <div className="flex justify-between">
          <p className="text-sm dark:text-gray-300 text-gray-500">{location}</p>
          {liked ? (
            <HeartIcon2 onClick={() => setLiked(!liked)} className="h-8 cursor-pointer text-red-500"/>
          ) : (
            <HeartIcon onClick={() => setLiked(!liked)} className="h-10 cursor-pointer dark:text-white p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"/>
          )}
        </div>
        <h4 className="text-xl font-semibold dark:text-gray-50">{title}</h4>

        <div className="border-b w-10 pt-2" />

        <p className="pt-2 text-sm text-gray-500 flex-grow dark:text-gray-100">{description}</p>
        <div className="flex justify-between items-end pt-5">
          <p className="flex items-center">
            <StarIcon className="h-5 text-red-400" />
            <p className="dark:text-gray-100">{star}</p>
          </p>
          <div>
            <p className="text-lg font-semibold lg:text-2xl pb-2 dark:text-gray-50">{price}</p>
            <p className="text-right font-extralight dark:text-gray-50">{total}</p>
          </div>
          <div onClick={goToSinglePage} className="flex cursor-pointer space-x-3">
              <button className="text-sm cursor-pointer hover:shadow-2xl active:scale-90 transition duration-150 text-white bg-black px-4 py-2 rounded-lg mt-5">See more</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoCard;
