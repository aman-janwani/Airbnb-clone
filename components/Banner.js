import Image from "next/image";
function Banner() {
  return (
    <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[600px] 2xl:h-[700px]">
      <Image
        src="https://res.cloudinary.com/dfk5jbk5r/image/upload/v1628149967/hero_kyjtts.jpg"
        layout="fill"
        objectFit="cover"
      />
      <div className="absolute top-1/4 w-[350px]">
        <p className="text-2xl sm:text-6xl font-bold ml-10 text-white">
          Olympian & Paralympian Online Experiences
        </p>
        <button className="text-black bg-white px-5 py-2 ml-10 shadow-md rounded-lg font-bold my-3 hover:shadow-xl active:scale-90 transition duration-150">
          Explore now
        </button>
      </div>
    </div>
  );
}

export default Banner;
