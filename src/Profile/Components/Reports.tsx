import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { CircularProgress } from "material-ui";
import { useState, useEffect } from "react";
import { GetData } from "../../Services/ApiService";
import { Button } from "@material-ui/core";
import IModal from "../../Common/IModal";
import { CourseStudies } from "./CourseStudies";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
  },
}))(TableCell);

const useStyles = makeStyles({
  container: {
    width: "100%",
    maxWidth: "1200px",
    overflowX: "auto",
    boxShadow: "0 0 1px 0px grey",
    borderRadius: 2,
    marginTop: "40px",
  },
});

export const Reports = () => {
  const classes = useStyles();
  const [reports, setReport] = useState<Array<any>>([]);
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState<Array<any>>([]);
  useEffect(() => {
    GetData("Planning/Study/30").then((res) => {
      setReport(res);
    });
  }, []);
  console.log(reports);
  return (
    <>
      <Paper className={classes.container}>
        {reports ? (
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">تاریخ گزارش</StyledTableCell>
                <StyledTableCell align="center">ساعت بیداری</StyledTableCell>
                <StyledTableCell align="center">جزئیات درسی</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reports &&
                reports.map((report, index) => (
                  <TableRow key={index}>
                    <StyledTableCell align="center">
                      {report.studyDate}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {report.awakeTime}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Button
                        onClick={() => {
                          setOpen(true);
                          setModalData(report.courseStudies);
                        }}
                      >
                        نمایش
                      </Button>
                    </StyledTableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        ) : (
          <CircularProgress></CircularProgress>
        )}
      </Paper>
      <IModal open={open} onClose={() => setOpen(false)}>
        <CourseStudies data={modalData} />
      </IModal>
    </>
  );
};
