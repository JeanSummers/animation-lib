export function clipValue(value: number, clip: number) {
  return Math.sign(value) * (Math.abs(value) % clip);
}
