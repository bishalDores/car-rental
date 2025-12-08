export const updateSearchParams = (searchParams: URLSearchParams, key: string, value: string) => {
  const params = new URLSearchParams(searchParams);

  if (params.has(key)) {
    params.set(key, value);
  } else {
    params.append(key, value);
  }

  return params;
};
