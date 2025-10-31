export function parseDuration(durationStr: string) {
  const regex = /^(\d+)(ms|s|m|h)$/;
  const match = durationStr.toLowerCase().match(regex);

  if (!match) return;

  if (match.length !== 3) return;

  const value = parseInt(match[1]);
  const unit = match[2];

  switch (unit) {
    case "h":
      return value * 60 * 60 * 1000;
    case "m":
      return value * 60 * 1000;
    case "s":
      return value * 1000;
    case "ms":
      return value;
    default:
      return;
  }
}
