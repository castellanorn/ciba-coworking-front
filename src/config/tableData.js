//Column customization for admin dashboard - view all users
export const columnsUsers = ['Id','Nom i Cognom', 'Proyecte', 'Correu', 'Mobil'];
export const columnMappingUsers = {
  'Id': 'id',
  'Nom i Cognom': 'name',
  'Proyecte': 'projectName',
  'Correu': 'email',
  'Mobil': 'phone'
};

//column customization for user dashboard
export const columnsReserves = ['Data', 'Franja', 'Espai', 'Nº espai'];
export const columnMappingReserves = {
    'Data': (row) => `${row.startDate} -> ${row.endDate}`,  
    'Franja': (row) => `${row.startTime} - ${row.endTime}`, 
    'Espai': 'spaceDTO.spaceType',  
    'Nº espai':  'spaceDTO.name'
};