export const updateSearchParams = (searchParams: URLSearchParams, key: string, value: string) => {
  const params = new URLSearchParams(searchParams);

  if (params.has(key)) {
    params.set(key, value);
  } else {
    params.append(key, value);
  }

  return params;
};

export function getInitials(fullName: string): string {
  if (!fullName) return "";

  const parts = fullName.trim().split(/\s+/);

  const firstInitial = parts[0]?.[0] ?? "";
  const lastInitial = parts.length > 1 ? parts[parts.length - 1][0] : "";

  return (firstInitial + lastInitial).toUpperCase();
}
