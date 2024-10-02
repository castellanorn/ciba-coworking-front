import Table from "../../components/table/Table"
import TableMobile from "../../components/table/TableMobile"
import TitleMobile from "../../components/title/Title"
import { Subtitle, TableSection } from "./UserPagesStyled";

const columns = ['Data', 'Franja', 'Espai', 'ID d\'espai'];
const data = [
  { data: '2024-10-05', franja: 'Matí', espai: 'Sala 1', idEspai: '01' },
  { data: '2024-10-06', franja: 'Tarda', espai: 'Sala 2', idEspai: '02' },
];
const reservasFuturasData = [
  { data: '2024-10-05', franja: 'Matí', espai: 'Sala 1',idEspai: '01' },
  { data: '2024-10-06', franja: 'Tarda', espai: 'Sala 2',idEspai: '01' },
];

const UserDashboard = () => {
  return (
    <div>
      <TitleMobile title="Reserves Pendents" />
      
      <TableSection>
        <Subtitle>RESERVES PENDENTS</Subtitle>
        <Table columns={columns} data={data}  actions={['edit', 'delete']} />
        <TableMobile data={reservasFuturasData} type="reserveUser" actions={['edit','delete']} />
        <Subtitle>RESERVES COMPLETADES</Subtitle>
        <Table columns={columns} data={reservasFuturasData} />
        <TableMobile data={reservasFuturasData} type="reserveUser" />
        

      </TableSection>
    </div>
  )
}

export default UserDashboard;
