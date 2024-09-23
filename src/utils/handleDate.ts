
/*
  Conversión de la fecha: Se usa new Date(anio, mes - 1, dia) 
  porque en JavaScript los meses empiezan desde el índice 0 (enero es el mes 0).
  Formato en MongoDB: MongoDB utiliza el tipo de dato Date, por lo que, una vez que conviertes la fecha a un objeto Date de JavaScript,
  puedes usarla directamente en una consulta

*/
export const tomongoDate = (dateStr: string): Date => {
  // Separar el día, mes y año del formato recibido dd/mm/yyyy
  const [day, month, year] = dateStr.split('/').map(Number);
  // Crear un objeto Date de JavaScript (año, mes - 1, día)
  const dateISO = new Date(year, month - 1, day);
  return dateISO;
}