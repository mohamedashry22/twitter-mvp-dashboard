import React from "react";
import { Events } from "@/components/events";

export const revalidate = 0;
export const dynamic = 'force-static';

const accounts = () => {
  return <Events />;
};

export default accounts;