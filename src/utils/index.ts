export function formatDate(dateString: string | undefined): string {
  if (!dateString) return "";
  // Convertit la chaîne en un objet Date
  const date = new Date(dateString);

  // Extrait le jour, le mois et l'année
  const day: string = String(date.getDate()).padStart(2, "0");
  const month: string = String(date.getMonth() + 1).padStart(2, "0"); // Les mois sont indexés à partir de 0
  const year: number = date.getFullYear();

  // Formate la date en "18.08.2024"
  return `${day}.${month}.${year}`;
}
