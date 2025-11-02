export function ScreenLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 rounded-full bg-orange-500 opacity-75 animate-ping"></div>
        <div className="relative rounded-full bg-orange-500 w-20 h-20"></div>
      </div>
    </div>
  );
}
