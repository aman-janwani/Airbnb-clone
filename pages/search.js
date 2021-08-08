import { format } from "date-fns";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import Footer from "../components/Footer";
import Header from "../components/Header";
import InfoCard from "../components/InfoCard";
import Map from "../components/Map";

function Search({ searchResult }) {
  const router = useRouter();
  const { location, startDate, endDate, numberOfGuest } = router.query;

  const formatdateStartDate = format(new Date(startDate), "dd MMMM yy");
  const formatdateEndDate = format(new Date(endDate), "dd MMMM yy");

  const range = `${formatdateStartDate} to ${formatdateEndDate}`;
  return (
    <div className="dark:bg-black">
      <Head>
        <title>{`${location} . Stays . Airbnb`}</title>
        <link
          rel="icon"
          href="https://a0.muscache.com/airbnb/static/icons/android-icon-192x192-c0465f9f0380893768972a31a614b670.png"
        />
      </Head>
      <Header />
      <main className="flex mt-10">
        <section className="flex-grow pt-14 px-6">
          <p className="text-xs dark:text-gray-100">
            300+ Stays {range} for {numberOfGuest} guest
          </p>
          <h1 className="text-3xl font-semibold mt-2 mb-6 dark:text-gray-50">
            Stays In {location}
          </h1>
          <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 dark:text-gray-50 whitespace-nowrap">
            <p className="button">Cancellation Flexbility</p>
            <p className="button">Type of Place</p>
            <p className="button">Price</p>
            <p className="button">Rooms and Beds</p>
            <p className="button">More filters</p>
          </div>

          <div className="flex flex-col">
            {searchResult?.map(
              ({ img, title, description, star, price, total }) => (
                <InfoCard
                  key={img}
                  img={img}
                  location={`Private room in center of ${location}`}
                  title={title}
                  description={description}
                  star={star}
                  price={price}
                  total={total}
                />
              )
            )}
          </div>
        </section>
        <section className="mt-14 hidden rounded-xl xl:inline-flex min-w-[600px] sticky">
          <Map searchResult={searchResult}/>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Search;

export async function getServerSideProps() {
  const searchResult = await fetch("https://links.papareact.com/isz").then(
    (res) => res.json()
  );

  return {
    props: {
      searchResult,
    },
  };
}
