import React from "react";
import { Accounts } from "@/components/accounts";

export const revalidate = 0;
export const dynamic = 'force-static';

const accounts = () => {
  return <Accounts />;
};

export default accounts;