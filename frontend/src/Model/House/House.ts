import { HouseBuilder } from "Model/House/HouseBuilder";

export class House {
  static getBuilder() {
    return new HouseBuilder();
  }

  private id: number;
  private name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  public getId(): number {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }
}
