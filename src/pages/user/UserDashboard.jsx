import Table from "../../components/table/Table"

const columns = ['Data', 'Franja', 'Espai', 'ID d\'espai'];
const data = [
  { data: '2024-10-05', franja: 'Matí', espai: 'Sala 1', idEspai: '001' },
  { data: '2024-10-06', franja: 'Tarda', espai: 'Sala 2', idEspai: '002' },
];

const UserDashboard = () => {
  return (
    <div>
       <Table columns={columns} data={data}  actions={['edit', 'delete']} />
    </div>
  )
}

export default UserDashboard;
