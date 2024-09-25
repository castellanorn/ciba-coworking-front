import Table from "./Table"

import styled from "styled-components"

const Map_container = styled.div`
    width: 420px;
    height: 645px;
    border: 1px solid black;
    background-image: url('../../../public/plano.svg');
    background-repeat: no-repeat;
    display: flexbox;
`;





const MapSpace = () => {
  return (
    <Map_container>
        <Table rotate="0" ></Table>
        <Table rotate="180" ></Table>
        <Table rotate="0" ></Table>
        <Table rotate="0" ></Table>
        <Table rotate="0" ></Table>
        <Table rotate="0" ></Table>
        <Table rotate="0" ></Table>
        <Table rotate="0" ></Table>
        <Table rotate="0" ></Table>
        <Table rotate="0" ></Table>
        <Table rotate="0" ></Table>
        <Table rotate="0" ></Table>
    </Map_container>
  )
}

export default MapSpace