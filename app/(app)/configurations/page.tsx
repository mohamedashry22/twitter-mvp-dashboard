import React from "react";
import { Configurations } from "@/components/configurations";

export const revalidate = 0;
export const dynamic = 'force-static';

const accounts = () => {
  return <Configurations />;
};

export default accounts;