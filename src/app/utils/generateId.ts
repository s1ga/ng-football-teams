export default function generateId(): string {
  return performance.now().toString(16).replace('.', '') + Math.random().toString(16).slice(2);
}
