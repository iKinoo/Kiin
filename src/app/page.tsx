import Link from "next/link";
import { CoursesCsvDatasource } from "@/infrastructure/datasource/CoursesCsvDataSource";

export default async function Home() {
  // const professors = new ProfessorsCsvDataSource();
  // console.log(await professors.getAll());
  // const subjects = new SubjectsCsvDataSource();
  // console.log(await subjects.getAll());
  const courses = new CoursesCsvDatasource();
  console.log(await courses.getAll());

  return (
    <div className="bg-white text-black">
      <main className="">
        <div>
          <h1>Landing Page</h1>
          <Link
            style={{
              backgroundColor: "blue",
              color: "white",
              borderRadius: "2rem",
            }}
            href="/calendar"
          >
            Comenzar
          </Link>
        </div>{" "}
      </main>
    </div>
  );
}
