import testing from "./test";
import RoutesIndex from "./presentation/RoutesIndex";

export default function Home() {
  testing();
  return (
    
    <div className="bg-white text-black">
      <main className="">
          <RoutesIndex />
      </main>
      
    </div>
  );
}
