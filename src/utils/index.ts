export function formatDate(dateString: string | undefined): string {
  if (!dateString) return "";
  // Convert the string to a Date object
  const date = new Date(dateString);

  // Extract the day, month and year
  const day: string = String(date.getDate()).padStart(2, "0");
  const month: string = String(date.getMonth() + 1).padStart(2, "0"); 
  const year: number = date.getFullYear();

  // Format the date
  return `${day}.${month}.${year}`;
}
