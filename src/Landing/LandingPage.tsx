/** @format */

import { MainBanner } from "./Components/MainBanner";
import { StudentStatus } from "./Components/StudentStatus";
import { TopStudentTest } from "./Components/TopStudentTest";
import { TopStudentTime } from "./Components/TopStudentTime";
export const LandingPage = () => {
  return (
    <>
      <MainBanner />
      <TopStudentTime />
      <StudentStatus />
      <TopStudentTest />
    </>
  );
};
