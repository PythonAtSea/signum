export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full text-center gap-4">
      <div className="relative w-full">
        <h1 className="text-[150px] font-black text-muted">404</h1>
        <p className="text-red-500 text-[30px] font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          Not Found
        </p>
      </div>
    </div>
  );
}
