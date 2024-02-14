export default function isValidUrl(path: string): boolean {
  try {
    const url = new URL(path);
    return url.protocol === 'https:';
  } catch {
    return false;
  }
}
