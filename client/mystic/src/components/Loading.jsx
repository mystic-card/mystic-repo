export function Loading() {
  return (
    <>
      <div className="relative flex justify-center items-center">
        <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-600" />
        <img
          src="./alucard.png"
          className="rounded-full h-28 w-28"
        />
      </div>
    </>
  );
}
