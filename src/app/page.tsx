import { CoursesCsvDatasource } from "@/infrastructure/datasource/CoursesCsvDatasource";
import React from "react";
import HomeContent from "./HomeContent";

export default async function Home() {

  // const professors = new ProfessorsCsvDataSource();
  // console.log(await professors.getAll());
  // const subjects = new SubjectsCsvDataSource();
  // console.log(await subjects.getAll());
  const courses = new CoursesCsvDatasource();
  console.log(await courses.getAll());

  return (

    <div>
      <main className="">
        <HomeContent />
      </main>
    </div>
  );
}
