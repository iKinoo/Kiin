
import { DegreesDataSource } from "@/domain/datasources/DegreesDataSource";
import { Mapper } from "../mappers/Mapper";
import { Degree } from "@/domain/entities/Degree";

export class DegreesCsvDataSource implements DegreesDataSource {
  private degrees: Degree[] = [];

  async getAll(): Promise<Degree[]> {
    if (this.degrees.length > 0) {
      return this.degrees;
    }

    const storedData = localStorage.getItem("degree-info");

    if (storedData) {
      console.log("Grados recuperados de local storage");
      const convertedDegrees = Mapper.toDegrees(JSON.parse(storedData));
      const degrees = convertedDegrees as Degree[];

      this.degrees = degrees;
    } else {
      console.log("Recuperado de la API");
      const response = await fetch("/api/degrees/all");

      const convertedDegrees = Mapper.toDegrees(await response.json());
      const degrees = convertedDegrees as Degree[];

      this.degrees = degrees;

      localStorage.setItem("degree-info", JSON.stringify(this.degrees));
    }

    return this.degrees;
  }
}
