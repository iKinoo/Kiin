
import Calendar from "./presentation/components/Calendar";
import FilterSelector from "@/app/presentation/pages/FilterSelector";
import testing from "./test";

export default function Home() {
  testing();
  return (
    
    <div className="bg-white text-black">
      {/* Provisonal style */}
      <main style={{display:'flex', justifyContent:'first baseline', alignItems: 'first baseline', gap:'20px', padding: '10px'}} className="">
        <FilterSelector />
        <Calendar />
      </main>
      
    </div>
  );
}
