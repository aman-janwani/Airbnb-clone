import { CheckCircleIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Head from "next/head";

function success() {
  const router = useRouter();

  return (
    <div className="bg-gray-100 h-screen">
      <Head>
        <title>success</title>
        <link
          rel="icon"
          href="https://a0.muscache.com/airbnb/static/icons/android-icon-192x192-c0465f9f0380893768972a31a614b670.png"
        />
      </Head>
      <Header />

      <main className="max-w-screen-lg mx-auto my-28">
        <div className="flex flex-col p-10 bg-white">
          <div className="flex items-center space-x-2 mb-5">
            <CheckCircleIcon className="text-green-500 h-10" />
            <h1 className="text-3xl">Thank you, your House has been Booked!</h1>
          </div>
          <p>
            Thank you for Booking House Form us. We'll send a confirmation once
            your House, Thankyou & have a nice day.
          </p>
          <button onClick={() => router.push("/")} className="button mt-8">
            Go To Main page
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default success;
