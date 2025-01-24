import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import React, { PropsWithChildren, useState } from "react";
import Button from "./Button";
import _get from "lodash-es/get";
import { LoggerProvider } from "@/logger";

interface IModalProps extends PropsWithChildren {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  title?: string;
  description?: string;
  onOk?: {
    callback?: () => Promise<void>;
    title?: string;
  };
  onCancel?: {
    callback?: () => void;
    title?: string;
  };
}

export const Modal = ({
  open,
  onOpenChange,
  title,
  description,
  onOk,
  onCancel,
  children,
}: IModalProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleOnOk = async () => {
    try {
      setIsLoading(true);
      await onOk?.callback?.();
      setIsLoading(false);
    } catch (error) {
      LoggerProvider.log(error);
      setIsLoading(false);
    }
  };

  const renderDialogHeader = () => {
    if (title || description) {
      return (
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
      );
    }
    return null;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        {renderDialogHeader()}
        <div className="max-h-52 overflow-auto">{children}</div>
        <DialogFooter className="sm:justify-start">
          <Button onClick={handleOnOk} type="button" isLoading={isLoading}>
            {_get(onOk, "title", "Confirm")}
          </Button>
          <Button
            onClick={onCancel?.callback}
            type="button"
            variant="secondary"
          >
            {_get(onCancel, "title", "Cancel")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
