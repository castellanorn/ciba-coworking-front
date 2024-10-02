const reserva=[{id: '01', franja: '09:00 - 10:00', data: '2023-09-10', nomAmbCognom:'Juan Perez'}]
const ManageIndividual = () => {
  return (
    <div>
      <Table columns={columns} data={reserva}  actions={['delete']} />
      <TableMobile data={users} type='adminReserves' actions={['delete']} />
    </div>
  )
}

export default ManageIndividual
