import Link from "next/link";
import testing from "./test";

export default function Home() {
  testing();
  return (
    
    <div className="bg-white text-black">
      <main className="">
      <div>
            <h1>Landing Page</h1>
            <Link style={{backgroundColor:'blue', color:'white',borderRadius:'2rem'}} href='/calendar'>Comenzar</Link>
        </div>      </main>
      
    </div>
  );
}
