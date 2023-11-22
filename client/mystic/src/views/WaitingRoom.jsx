import { Loading } from "../components/Loading";
import useSound from "use-sound";
import WSound from "../sound/w-sound.mp3"
import { useEffect } from "react";

export function WaitingRoom() {
  const [sound] = useSound(WSound);

  sound()

  return (
    <>
      <div
        className="flex flex-col h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat"
        style={{
          backgroundImage: 'url("/loading.png")',
        }}
      >
        <div className="rounded-xl bg-gray-800 bg-opacity-50 px-16 shadow-lg backdrop-blur-md max-sm:px-8 text-white py-5 mb-3 uppercase">
          <p>The battle begin!!</p>
        </div>
        <div className="rounded-xl bg-gray-800 bg-opacity-50 px-16 shadow-lg backdrop-blur-md max-sm:px-8 py-5 mb-40 uppercase">
          <p className="text-white font-medium">room pin:</p>
          <p className="text-orange-800 text-center text-lg font-extrabold">
            1234
          </p>
        </div>

        {/* loading */}
        <Loading />

        <div className="rounded-xl bg-gray-800 bg-opacity-50 px-16 shadow-lg backdrop-blur-md max-sm:px-8 text-white py-5 mt-40">
          <p>Wait for your opponent to accept your match...</p>
        </div>
      </div>
    </>
  );
}
