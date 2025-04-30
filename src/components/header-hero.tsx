"use client";

const HeaderHero = ({ title }: { title: string }) => {
  return (
    <>
      <h2 className="text-white text-2xl font-normal"> {title} </h2>
    </>
  );
};

export default HeaderHero;
