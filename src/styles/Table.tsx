import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled } from '@mui/material';


export const TableWrap = styled(TableContainer)`
  width: 100%;
  height: calc(100vh - 64px - 42px);
  box-sizing: border-box;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.color?.BgColor02};
  border: 1px solid ${(props) => props.theme.color?.TextColor10};
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06);
  border-radius: 8px;
  overflow: auto;
  white-space: nowrap;
  ${(props) => props.theme.breakpoints.down('md')} {
    padding: 0;
    height: calc(100vh - 64px);
  }
`

export const TableHeadStyle = styled(TableHead)`
  th{
    font-weight: 500;
    font-size: 12px;
    color: ${(props) => props.theme.color?.TextColor60};
    background: ${(props) => props.theme.color?.BgColor01};
  }
`

export const TableCellStyle = styled(TableCell)`
  border-bottom: none;
`

const StyledTableRow = styled(TableRow)`
  &:nth-of-type(even) {
    background: ${(props) => props.theme.color.TableRow};
  }
`

export default {
  Table,
  TableBody,
  TableCell: TableCellStyle,
  TableHead: TableHeadStyle,
  TableRow: StyledTableRow,
  TableContainer: TableWrap
}