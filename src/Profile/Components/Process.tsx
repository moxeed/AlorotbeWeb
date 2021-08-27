import { FormEvent, useState } from "react";
import { useEffect } from "react";
import { Line } from "react-chartjs-2";
import { GetData } from "../../Services/ApiService";
import { Period } from "../../Top/Components/Top";
import moment from "jalali-moment";
import { FormGroup, Select } from "@material-ui/core";
import { MenuItem } from "material-ui";

const Months = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

export const Process = () => {
  const [info, setInfo] = useState<any>([]);
  const [month, setMonth] = useState(moment().locale("fa").month());
  useEffect(() => {
    GetData("Planning/Progress/" + Period.Month + `?month=${month + 1}`).then(
      (res) => {
        setInfo(res);
      }
    );
  }, [month]);
  const data = {
    labels: info.map((item: any) => item.date),
    datasets: [
      {
        label: "تعداد تست ها",
        data: info.map((item: any) => item.testCount),
        fill: false,
        backgroundColor: "#FD7D21",
        borderColor: "#FD7D21",
        yAxisID: "y-axis",
      },
      {
        label: "مجموع زمان مطالعه",
        data: info.map((item: any) => item.studyMinute),
        fill: false,
        backgroundColor: "#0848E5",
        borderColor: "#0848E5",
        yAxisID: "y-axis",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          type: "linear",
          display: false,
          position: "right",
          id: "y-axis",
        },
      ],
    },
  };
  return (
    <>
      <FormGroup>
        <Select
          value={month}
          onChange={(e) => setMonth(+(e.target as HTMLSelectElement).value)}
        >
          {Months.map((v, i) => (
            <MenuItem value={i}>{v}</MenuItem>
          ))}
        </Select>
      </FormGroup>
      <Line data={data} options={options} />
    </>
  );
};
