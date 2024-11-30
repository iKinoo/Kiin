import Calendar from "./CalendarTest";
import FilterSelector from "@/app/presentation/pages/FilterSelector";

export default function Home() {
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
