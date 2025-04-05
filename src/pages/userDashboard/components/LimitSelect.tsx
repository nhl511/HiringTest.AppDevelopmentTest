import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

const LimitSelect = React.memo(function LimitSelect({
  limit,
  onLimitChange,
}: {
  limit: number;
  onLimitChange: (newLimit: number) => void;
}) {
  return (
    <Select
      onValueChange={(value) => {
        onLimitChange(Number(value));
      }}
      value={String(limit)}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select limit" />
      </SelectTrigger>
      <SelectContent className="bg-white/5 backdrop-blur-sm">
        {[5, 10, 20, 50].map((num) => (
          <SelectItem key={num} value={String(num)}>
            {num} users per page
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
});

export default LimitSelect;
