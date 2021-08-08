import Image from "next/image";

function MiddleCards({ img, title , discription}) {
  return (
    <div>
      <div className="cursor-pointer hover:scale-105 md:mx-3 transform transition duration-300 ease-out">
      <div className="relative h-80 w-80 ">
        <Image className="rounded-xl" src={img} layout="fill" />
      </div>
        <h3 className="text-xl font-semibold dark:text-gray-100 mt-1">{title}</h3>
        <p className="text-xs md:text-base dark:text-gray-100">{discription}</p>
      </div>
    </div>
  );
}

export default MiddleCards;
