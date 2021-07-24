import { useEffect, useState } from "react";
import { GetData } from "../../Services/ApiService";
import { TopTable } from "./TopTable";

export const TestTop = () => {
  const [data, setData] = useState(
    undefined as
      | Array<{
          name: string;
          lastName: string;
          majorName: string;
          gardeName: string;
          totalStudy: string;
          totalTestCount: number;
        }>
      | null
      | undefined
  );

  useEffect(() => {
    GetData("Planning/Top/Test/100")
      .then(setData)
      .catch(() => setData(null));
  }, []);

  return <TopTable rows={data} />;
};
