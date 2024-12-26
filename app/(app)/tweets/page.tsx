import React from "react";
import { Tweets } from "@/components/tweets";

export const revalidate = 0;
export const dynamic = 'force-static';

const tweets = () => {
  return <Tweets />;
};

export default tweets;