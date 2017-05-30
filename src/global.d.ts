export {};

declare global {
  interface String {
    toCamelCase(): string;
    toPascalCase(): string;
  }
}
