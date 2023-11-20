export class Chocolates {
  key: string;
  nombre: string;
  precio: number;
  gramos: number;

  constructor(key: string, nombre: string, precio: number, gramos: number) {
    this.key = key;
    this.nombre = nombre;
    this.precio = precio;
    this.gramos = gramos;
  }
}
