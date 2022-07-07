import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Image from "next/image";
import { HeartIcon } from "@heroicons/react/outline";
import { StarIcon } from "@heroicons/react/solid";
import { HeartIcon as HeartIcon2 } from "@heroicons/react/solid";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { session } from "next-auth/react";
import axios from "axios";

const stripePromise = loadStripe(process.env.stripe_public_key);

function SingleItem() {
  const router = useRouter();
  const { img, location, title, description, star, price, total } =
    router.query;
  const [liked, setLiked] = useState(false);
    const createCheckoutSession=async()=>{
      const stripe = await stripePromise; 
    
    // call backend to create session
    
    const checkoutSession = await axios.post("/api/create-checkout-session", {
      img: img,
      title: title,
      description: description,
    });
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    if (result.error) {
      alert(result.error.message);
    }
    }

  return (
    <div>
      <Head>
        <title>{`${title}`}</title>
        <link
          rel="icon"
          href="https://a0.muscache.com/airbnb/static/icons/android-icon-192x192-c0465f9f0380893768972a31a614b670.png"
        />
      </Head>
      <Header />
      <main className="my-32">
        {img ? (
          <section className="flex flex-row justify-center">
            <div className="relative h-48 md:h-96 w-full ml-12 mr-16">
              <Image
                src={img}
                layout="fill"
                className="rounded-3xl"
                objectFit="cover"
              />
            </div>
            <div className="mr-14 ml-5 hidden md:block">
              <div className="relative h-44 w-44 mx-5 mb-8 mt-1">
                <Image
                  src={img}
                  layout="fill"
                  className="rounded-3xl"
                  objectFit="cover"
                />
              </div>
              <div className="relative h-44 w-44 mx-5 mb-8">
                <Image
                  src={img}
                  layout="fill"
                  className="rounded-3xl"
                  objectFit="cover"
                />
              </div>
            </div>
            <div className="mr-14 hidden lg:block">
              <div className="relative h-44 w-44 mx-5 mb-8 mt-1">
                <Image
                  src={img}
                  layout="fill"
                  className="rounded-3xl"
                  objectFit="cover"
                />
              </div>
              <div className="relative h-44 w-44 mx-5 mb-8">
                <Image
                  src={img}
                  layout="fill"
                  className="rounded-3xl"
                  objectFit="cover"
                />
              </div>
            </div>
          </section>
        ) : (
          ""
        )}
        <section className="ml-12 mt-10 mr-16">
          <div className="flex flex-col flex-grow">
            <div className="flex justify-between">
              <p className="text-md dark:text-gray-300 text-gray-500">
                {location}
              </p>
              {liked ? (
                <HeartIcon2
                  onClick={() => setLiked(!liked)}
                  className="h-8 cursor-pointer text-red-500"
                />
              ) : (
                <HeartIcon
                  onClick={() => setLiked(!liked)}
                  className="h-10 cursor-pointer dark:text-white p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
                />
              )}
            </div>
            <h4 className="text-2xl md:text-4xl mb-14 font-semibold dark:text-gray-50">
              {title}
            </h4>
          </div>
          <p className="pt-2 ml-5 text-sm md:text-xl text-gray-500 w-48 md:w-96 dark:text-gray-100">
            {description}
          </p>
          <div className="flex ml-5 justify-between items-end pt-5">
            <p className="flex items-center">
              <StarIcon className="h-5 text-red-400" />
              <p className="dark:text-gray-100">{star}</p>
            </p>
            <div>
              <p className="text-lg font-semibold lg:text-2xl pb-2 dark:text-gray-50">
                {price}
              </p>
              <p className="text-right font-extralight dark:text-gray-50">
                {total}
              </p>
            </div>
          </div>
          <div className="w-44 sm:w-96 mx-auto">
            <button
              onClick={createCheckoutSession}
              role="link"
              className="text-white bg-red-500 w-full mt-10 px-5 py-2 shadow-md rounded-lg font-bold my-3 hover:shadow-xl active:scale-90 transition duration-150"
            >
              Reserve Now
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SingleItem;
