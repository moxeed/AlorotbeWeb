import React from "react";
import { MainHeader } from "../Layout/MainHeader";

export const WithMenu = (component: () => JSX.Element) => (
  <>
    <MainHeader />
    {component()}
  </>
);
