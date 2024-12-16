
import { DegreesDataSource } from "@/domain/datasources/DegreesDataSource";
import { Mapper } from "../mappers/Mapper";
import { Degree } from "@/domain/entities/Degree";

export class DegreesCsvDataSource implements DegreesDataSource {
  private degrees: Degree[] = [];

  async getAll(): Promise<Degree[]> {
    const response = await fetch('/api/degrees/all');

    this.degrees = Mapper.toDegrees(await response.json());
    console.log(this.degrees);
    return this.degrees;

  }
}
