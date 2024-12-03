import React from "react";
import HomeContent from "./HomeContent";
import { CoursesCsvDatasource } from "@/infrastructure/datasource/CoursesCsvDatasource";
import { ProfessorsCsvDataSource } from "@/infrastructure/datasource/ProfessorsCsvDataSource";
import { SubjectsCsvDataSource } from "@/infrastructure/datasource/SubjectsCSvDataSource";

export default async function Home() {
  const professors = new ProfessorsCsvDataSource();
  console.log(await professors.getAll());
  const subjects = new SubjectsCsvDataSource();
  console.log(await subjects.getAll());
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
