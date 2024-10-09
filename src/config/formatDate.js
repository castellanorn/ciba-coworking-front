
export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Sumamos 1 porque los meses empiezan en 0
  const day = String(date.getDate()).padStart(2, '0');
    
  return `${year}/${month}/${day}`;
}
