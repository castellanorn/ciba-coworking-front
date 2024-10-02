//Column customization for admin dashboard - view all users
export const columnsUsers = ['Id','Nom amb Cognom', 'Proyecte', 'Correu', 'Mobil'];
export const columnMappingUsers = {
  'Id': 'id',
  'Nom amb Cognom': 'name',
  'Proyecte': 'projectName',
  'Correu': 'email',
  'Mobil': 'phone'
};

//column customization for user dashboard
export const columnsReserves = ['Data', 'Franja', 'Espai', 'ID d\'espai'];
/* export const columnMappingReserves ={
    'Data': 'startDate + " - " + endDate',
    'Franja': 'startTime + " - " + endTime',
    'Espai': 'spaceDTO.name',
    'Espai Id': 'spaceDTO.spaceType'
}; */
export const columnMappingReserves = {
    'Data': (row) => `${row.startDate} -> ${row.endDate}`,  
    'Franja': (row) => `${row.startTime} - ${row.endTime}`, 
    'Espai': 'spaceDTO.spaceType',  
    'ID d\'espai':  'spaceDTO.name'
};