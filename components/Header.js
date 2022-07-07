import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import {
  GlobeAltIcon,
  MenuIcon,
  SearchIcon,
  UserCircleIcon,
  UsersIcon,
} from "@heroicons/react/solid";
import useDarkMode from "../hooks/useDarkMode";
import { signIn, useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";

function Header() {
  const [colorTheme, setTheme] = useDarkMode();
  const { data: session, status } = useSession()
  const [searchInput, setSearchInput] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [numberOfGuest, setNumberOfGuest] = useState(1);
  const router = useRouter();
  const [show, setShow] = useState(false);

  const handleChange = () => {
    if (window.scrollY > 100) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  useEffect(() => {
      window.addEventListener('scroll', handleChange)
      return () => window.removeEventListener('scroll', handleChange)
  }, [])

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  const resetInput = () => {
    setSearchInput("");
  };
  const search = () => {
    router.push({
      pathname: "/search",
      query: {
        location: searchInput,
        startDate: startDate.toDateString(),
        endDate: endDate.toISOString(),
        numberOfGuest,
      },
    });
  };

  return (
    // <header className="sticky top-0 z-50 grid grid-cols-3 bg-white dark:bg-black shadow-md py-5 px-5 md:px-10">
    <header
      className={`fixed w-full top-0 z-50 grid grid-cols-3 navbar p-5 md:px-10 dark:bg-black ${show && "nav_stickey"}`}
    >
      {/* Left sec */}
      <div
        onClick={() => router.push("/")}
        className="hidden md:flex relative items-center h-10 my-auto"
      >
        <Image
          src="https://res.cloudinary.com/dfk5jbk5r/image/upload/v1628223927/The_Coding_Cave_2_k4t4td.png"
          objectFit="contain"
          objectPosition="left"
          layout="fill"
          className="cursor-pointer"
        />
      </div>

      {/* Middle sec */}
      <div className="flex h-12 w-80 md:w-96 items-center border-2 dark:border-gray-200 rounded-full py-5 shadow-sm">
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="pl-5 flex-grow outline-none bg-transparent text-sm text-gray-300 dark:text-gray-100 placeholder-gray-400"
          type="text"
          placeholder="Start your search"
        />
        <SearchIcon className="h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer mx-2" />
      </div>

      {/* Right sec */}
      <div className="hidden md:flex items-center space-x-4 justify-end dark:text-gray-100 text-gray-500">
        <p className="hidden lg:inline-flex bg-white dark:bg-black cursor-pointer py-1 px-3 rounded-full dark:active:text-gray-900 active:bg-gray-100">
          {session ? session.user.name : "Hi, User"}
        </p>
        <GlobeAltIcon className="h-10 bg-white dark:bg-black cursor-pointer p-2 rounded-full dark:active:text-gray-900 active:bg-gray-100" />

        <div
          onClick={() => {
            signIn();
          }}
          className="flex bg-white dark:bg-black items-center space-x-2 border-2 p-2 cursor-pointer rounded-full dark:active:text-gray-900 active:bg-gray-100"
        >
          <MenuIcon className="h-6" />
            <UserCircleIcon className="h-6" />
        </div>
        {colorTheme === "light" ? (
          <svg
            onClick={() => setTheme("light")}
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
        ) : (
          <svg
            onClick={() => setTheme("dark")}
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        )}
      </div>
      {searchInput && (
        <div className="flex flex-col col-span-3 mx-auto bg-white rounded-xl p-5 mt-5">
          <DateRangePicker
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={["#FD5B61"]}
            onChange={handleSelect}
          />
          <div className="flex items-center border-b mb-4">
            <h2 className="text-2xl flex-grow font-semibold">
              Number of Guests
            </h2>
            <UsersIcon className="h-5" />
            <input
              value={numberOfGuest}
              onChange={(e) => setNumberOfGuest(e.target.value)}
              type="number"
              min={1}
              className="w-12 pl-2 text-lg outline-none text-red-400"
            />
          </div>
          <div className="flex">
            <button className="flex-grow text-gray-500" onClick={resetInput}>
              Cancle
            </button>
            <button onClick={search} className="flex-grow text-red-400">
              Search
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
