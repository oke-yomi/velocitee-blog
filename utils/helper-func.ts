export const convertToSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^a-zA-Z0-9-]/g, "");
};
