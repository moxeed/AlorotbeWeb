import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Avatar, CircularProgress } from "material-ui";
import { Empty } from "../../Styles/Empty";
import User from "../../Assets/user.png";
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

export const TopTable = (prop: {
  rows:
    | Array<{
        userName: string;
        majorName: string;
        gardeName: string;
        totalStudy: string;
        totalTestCount: number;
        score: number;
      }>
    | null
    | undefined;
}) => {
  const classes = useStyles();
  const { rows } = prop;
  return (
    <Paper className={classes.container}>
       {rows ? (
          rows.length > 0 ? 
          (
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">رتبه</StyledTableCell>
                  <StyledTableCell align="center">دانش آموز</StyledTableCell>
                  <StyledTableCell align="center">مقطع</StyledTableCell>
                  <StyledTableCell align="center">تعداد تست</StyledTableCell>
                  <StyledTableCell align="center">ساعت مطالعه</StyledTableCell>
                  <StyledTableCell align="center">امتیاز</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row:any, index) => (
                  <TableRow key={index}>
                    <StyledTableCell align="center">{index + 1}</StyledTableCell>
                    <StyledTableCell align="center">
                      <Avatar src={row.profileId !== null ?`http://api.alorotbe.com/media/${row.profileId}`: User} style={{margin:"0 5px"}}/>
                      {row.userName}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.gardeName} {row.majorName}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.totalTestCount}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.totalStudy}
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.score}</StyledTableCell>
                  </TableRow>
                ))}
              </TableBody>
          </Table>
          ):(
            <Empty/>
          )
        ) : (
        <CircularProgress></CircularProgress>
      )}
    </Paper>
  );
};