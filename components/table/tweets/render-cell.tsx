// render-cell.tsx
import React from "react";
import { Button, Chip, Tooltip } from "@nextui-org/react";

interface RenderCellProps {
  tweet: any;
  columnKey: string;
  retryCallback?: (id: string) => void;
}

const DateFormatter = ({ date }: { date: string }) => {
  const formattedDate = new Date(date).toLocaleString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'America/Chicago',
  });

  return <span className="text-xs text-gray-500">{formattedDate}</span>;
};

export const RenderCell = ({ tweet, columnKey, retryCallback }: RenderCellProps) => {
  switch (columnKey) {
    case "status":
      return <div className="flex flex-col"><p>{tweet.status}</p></div>;
    case "createdAt":
      return <DateFormatter date={tweet.createdAt} />;
    case "type":
      return tweet.type === 'success' ? 
        <Chip color="success">Success</Chip> : 
        <Chip color="danger">Failed</Chip>;
    case "actions":
      return retryCallback && tweet.type !== 'success' ? (
        <Tooltip content="Retry Tweet">
          <Button 
            size="sm" 
            color="primary"
            onPress={() => retryCallback(tweet.id)}
          >
            Retry
          </Button>
        </Tooltip>
      ) : null;
    default:
      return tweet[columnKey];
  }
};