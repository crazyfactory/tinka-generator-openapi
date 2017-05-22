String.prototype.toCamelCase = function(): string {
  var str: string = this;
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+|-)/g, (match, index) => {
    if (/(\s+|_|-)/.test(match)) return "";
    return index == 0 ? match.toLowerCase() : match.toUpperCase();
  }).replace(/_+\w/g, (match) => {
    return match[match.length - 1].toUpperCase();
  });
}

String.prototype.toPascalCase = function(): string {
  var str: string = this;
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+|-)/g, (match, index) => {
    if (/(\s+|_|-)/.test(match)) return "";
    return match.toUpperCase();
  }).replace(/_+\w/g, (match) => {
    return match[match.length - 1].toUpperCase();
  });
}
