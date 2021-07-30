import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { CircularProgress } from "material-ui";
import { useState ,useEffect} from "react";
import { GetData } from "../../Services/ApiService";

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.common.white,
    },
}))(TableCell);

const useStyles = makeStyles({
    container: {
      width: "100%",
      overflowX: "auto",
      boxShadow: "0 0 1px 0px grey",
      borderRadius: 2,
    },
});

export const Reports = () => {
    const classes = useStyles();
    const [reports, setReport] = useState<Array<any>>([]);
    useEffect(() => {
        GetData("Planning/Study/10")
        .then((res)=>{
            setReport(res);
        })
      }, []);
    return(
        <Paper className={classes.container}>
        {reports ? (
            <Table aria-label="customized table">
            <TableHead>
                <TableRow>
                <StyledTableCell align="center">تاریخ گزارش</StyledTableCell>
                <StyledTableCell align="center">درس</StyledTableCell>
                <StyledTableCell align="center">زمان مطالعه</StyledTableCell>
                <StyledTableCell align="center">تعداد تست</StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {reports && reports.map((report, index) => (
                <TableRow key={index}>
                    <StyledTableCell align="center">{report.studyDate}</StyledTableCell>
                    <StyledTableCell align="center">{report.courseStudies[0].courseName}</StyledTableCell>
                    <StyledTableCell align="center">{report.courseStudies[0].studyTime}</StyledTableCell>
                    <StyledTableCell align="center">{report.courseStudies[0].testCount}</StyledTableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        ) : (
            <CircularProgress></CircularProgress>
        )}
    </Paper>
    );
}