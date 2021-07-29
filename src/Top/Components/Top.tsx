import { useEffect, useState } from "react";
import { GetData } from "../../Services/ApiService";
import { TopTable } from "./TopTable";

enum Critrien {
  Test,
  Time,
  Score,
}

enum Period {
  Day = 1,
  Week = 7,
  Month = 31,
  Year = 365,
}

export const Top = (prop: {
  period: Period;
  critrien: Critrien;
  gradeId?: number | null;
  count: number;
}) => {
  const [data, setData] = useState(
    undefined as
      | Array<{
          userName: string;
          majorName: string;
          gardeName: string;
          totalStudy: string;
          totalTestCount: number;
          score: number;
        }>
      | null
      | undefined
  );

  useEffect(() => {
    GetData(
      `Planning/Top?count=${prop.count}&period=${prop.period}&criterion=${prop.critrien}` +
        (prop.gradeId !== null ? `&gradeId=${prop.gradeId}` : "")
    )
      .then(setData)
      .catch(() => setData(null));
  }, [prop.count, prop.critrien, prop.period, prop.gradeId]);

  return <TopTable rows={data} />;
};

export { Critrien, Period };
