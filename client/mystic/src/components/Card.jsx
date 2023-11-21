export function Card() {
  return (
    <>
      <div className="relative flex flex-col text-gray-700 bg-white w-96 rounded-xl bg-clip-border transition-all hover:scale-105 shadow-lg shadow-blue-gray-900/50">
        <Link to="">
          <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white h-96 rounded-xl bg-clip-border">
            <img src="/Miya.jpg" className="object-cover w-full h-full" />
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                Miya
              </p>
              <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                Marksman
              </p>
            </div>
            <p className="block font-sans text-lg antialiased font-normal leading-normal text-gray-700 opacity-100">
              <b>Attack 22.500-</b>
            </p>
          </div>
        </Link>
        <div className="p-6 pt-0">
          <button
            className="block w-full select-none rounded-lg bg-blue-gray-900/10 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}
