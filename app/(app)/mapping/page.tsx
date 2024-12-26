import React from "react";
import { Mappings } from "@/components/mapping";

export const revalidate = 0;
export const dynamic = 'force-static';

const accounts = () => {
  return <Mappings />;
};

export default accounts;