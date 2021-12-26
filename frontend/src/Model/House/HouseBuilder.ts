import { House } from "Model/House/House";

export class HouseBuilder {
  private id: number = 0;
  private name: string = "";

  public setId(id: number): HouseBuilder {
    this.id = id;
    return this;
  }

  public setName(name: string): HouseBuilder {
    this.name = name;
    return this;
  }

  public build() {
    return new House(this.id, this.name);
  }
}
