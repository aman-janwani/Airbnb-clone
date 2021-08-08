import Image from "next/image";

function LargeCard({ img, title, description, buttonText, textcolor, buttoncolor }) {
  return (
    <section className={`relative py-16 text-${textcolor}`}>
      <div className="relative h-96 min-w-[300px]">
        <Image
          className="rounded-xl"
          src={img}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="absolute top-32 left-12">
          <h3 className='text-4xl mb-3 w-64'>{title}</h3>
          <p className="text-lg w-64">{description}</p>
          <button className="text-sm cursor-pointer hover:shadow-2xl active:scale-90 transition duration-150 text-black bg-white px-4 py-2 rounded-lg mt-5">{buttonText}</button>
      </div>
    </section>
  );
}

export default LargeCard;
