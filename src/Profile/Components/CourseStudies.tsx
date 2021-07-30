import { createStyles, Theme } from '@material-ui/core/styles';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { withStyles, makeStyles } from "@material-ui/core/styles";

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.common.white,
    },
}))(TableCell);

const useStyles = makeStyles({
    container: {
      width: "100%",
      maxWidth:"1200px",
      overflowX: "auto",
      boxShadow: "0 0 1px 0px grey",
      borderRadius: 2,
      marginTop:"40px"
    },
});


export  const CourseStudies = (prop: {
    data: Array<any>;
  }) => {

  return (
         <Table aria-label="customized table">
                <TableHead>
                    <TableRow>
                    <StyledTableCell align="center">نام درس</StyledTableCell>
                    <StyledTableCell align="center">زمان مطالعه</StyledTableCell>
                    <StyledTableCell align="center">تعداد تست</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {prop.data.map((report, index) => (
                    <TableRow key={index}>
                        <StyledTableCell align="center">{report.courseName}</StyledTableCell>
                        <StyledTableCell align="center">{report.studyTime}</StyledTableCell>
                        <StyledTableCell align="center">{report.testCount}</StyledTableCell>
                    </TableRow>
                    ))}
                </TableBody>
        </Table>
  );
}