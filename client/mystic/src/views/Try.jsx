import { BackCard } from "../components/BackCard";
import Card from "../components/Card";

export function Try() {
  return (
    <>
      <div
        className="flex flex-col h-screen w-full bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: 'url("/bg.png")',
        }}
      >
        <div className="justify-between flex flex-col h-screen w-full bg-center items-center bg-no-repeat mb-0">
          {/* b-card */}
          <BackCard />

          {/* card */}
          <Card />
        </div>
        <div className="flex flex-col items-end mb-10 mr-11">
          <form>
            <div className="text-lg text-black">
              <button
                type="submit"
                className="rounded-3xl bg-purple-600 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-purple-600"
              >
                Go
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
