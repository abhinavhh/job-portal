const Footer = () => {
  return (
    <div className="w-full h-[404px] bg-[#34538D] flex items-center justify-end px-10 font-family-sans">
      {/* Left - Email Label */}
      {/* <div className="text-white text-2xl font-semibold">
        Email
      </div> */}

      {/* Right - Email Input and Button */}
      <div className="flex flex-col  gap-2">
        <label htmlFor="email" className="text-white text-xl mb-1 font-bold self-start">
          Subscribe
        </label>
        <div className="flex gap-2">
          <input
            id="email"
            type="email"
            placeholder="Enter Your Email. . ."
            className="px-4 py-2 w-[250px] outline-none font-bold text-xl bg-white"
          />
          <button
            className="bg-[#265DC4] text-white px-6 py-2 rounded-md shadow-[0px_4px_4px_0px_#00000040] hover:brightness-110 transition font-medium text-xl"
          >
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
