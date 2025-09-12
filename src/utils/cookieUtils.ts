export function setCookie(name: string, value: string, days = 365) {
  const decoded = decodeURIComponent(value); // remove codificações antigas
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(
    decoded
  )}; expires=${expires}; path=/`;
}

export function getCookie(name: string): string | null {
  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="))
    ?.split("=")[1];
  return cookie ? decodeURIComponent(cookie) : null;
}
