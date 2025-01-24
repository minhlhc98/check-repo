"use client";

import { Button } from "@workspace/ui/components/button";

interface IRowActionsProps {
  onApprove: () => void
  onCancel: () => void
}

function RowActions({
  onApprove,
  onCancel
}: IRowActionsProps) {
  return (
    <div className="flex flex-none gap-x-2">
      <Button onClick={onApprove}>
        Approve
      </Button>
      <Button variant="outline" onClick={onCancel}>
        Cancel
      </Button>
      
    </div>
  );
}

export default RowActions;
