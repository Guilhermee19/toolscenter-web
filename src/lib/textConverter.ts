export type TextFormat =
  | "lower_case"
  | "upper_case"
  | "sentence_case"
  | "title_case"
  | "camel_case"
  | "pascal_case"
  | "snake_case"
  | "constant_case"
  | "kebab_case"
  | "cobol_case"
  | "train_case";

export function convertText(text: string, type: TextFormat): string {
  if (!text) return "";

  const lines = text.trim().split(/\r?\n/);

  switch (type) {
    case "lower_case":
      return text.toLowerCase();

    case "upper_case":
      return text.toUpperCase();

    case "sentence_case":
      return lines.map(line =>
        line.charAt(0).toUpperCase() + line.slice(1).toLowerCase()
      ).join("\n");

    case "title_case":
      return lines.map(line =>
        line.split(" ").map(word =>
          word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        ).join(" ")
      ).join("\n");

    case "camel_case":
      return lines.map(line =>
        line.split(" ").map((word, i) =>
          i === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1)
        ).join("")
      ).join("\n");

    case "pascal_case":
      return lines.map(line =>
        line.split(" ").map(word =>
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join("")
      ).join("\n");

    case "snake_case":
      return lines.map(line =>
        line.split(" ").map(word => word.toLowerCase()).join("_")
      ).join("\n");

    case "constant_case":
      return lines.map(line =>
        line.split(" ").map(word => word.toUpperCase()).join("_")
      ).join("\n");

    case "kebab_case":
      return lines.map(line =>
        line.split(" ").map(word => word.toLowerCase()).join("-")
      ).join("\n");

    case "cobol_case":
      return lines.map(line =>
        line.split(" ").map(word => word.toUpperCase()).join("-")
      ).join("\n");

    case "train_case":
      return lines.map(line =>
        line.split(" ").map(word =>
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join("-")
      ).join("\n");

    default:
      return text;
  }
}
