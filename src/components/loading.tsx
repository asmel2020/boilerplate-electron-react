export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <img
        src="/logo.png" // cambia por la ruta de tu imagen
        alt="loading"
        className="w-40 h-40 animate-blink"
      />
    </div>
  );
}
