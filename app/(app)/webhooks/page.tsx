import React from "react";
import { Webhooks } from "@/components/webhooks";

export const revalidate = 0;
export const dynamic = 'force-static';

const accounts = () => {
  return <Webhooks />;
};

export default accounts;