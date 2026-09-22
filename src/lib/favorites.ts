import { useEffect, useState } from "react";

const KEY = "gip-favorites";

function read(): string[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function useFavorites() {
  const [favs, setFavs] = useState<string[]>(read);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(favs));
    } catch {
      /* storage 사용 불가 환경은 무시 */
    }
  }, [favs]);

  const toggle = (id: string) =>
    setFavs((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  return { favs, toggle, has: (id: string) => favs.includes(id) };
}
