"use client";
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@workspace/ui/components/alert-dialog";
import { LoaderCircle } from "lucide-react";
// import { CircleAlert, InfoIcon, AlertTriangle } from "lucide-react";

// type IModalType = 'warning' | 'danger' | 'info'
interface IConfirmModalProps {
  children?: React.ReactNode;
  // type: IModalType
  title: string;
  description: string;
  open?: boolean;
  textConfirm?: string;
  textCancel?: string;
  onConfirm: () => Promise<void> | void;
  onCancel?: () => void;
}

const AlertModal: React.FC<IConfirmModalProps> = ({
  children,
  open,
  title,
  // type,
  description,
  textConfirm,
  textCancel,
  onCancel,
  onConfirm,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>();

  const handleConfirm = async () => {
    try {
      setIsLoading(true);
      await onConfirm();
    } catch (error) {
      console.log("Error while confirm: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AlertDialog open={open}>
        <AlertDialogContent className="w-fit py-6 px-8 md:w-80">
          <AlertDialogHeader>
            <AlertDialogTitle>
              <div className="flex flex-col gap-y-4 items-center text-center">
                {/* {ModalLogo[type]} */}
                {title || "Are you absolutely sure?"}
              </div>
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              {description ||
                "This action cannot be undone. This will permanently delete your account and remove your data from our servers."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          {children}
          <AlertDialogFooter className="flex max-w-96 mx-auto">
            <AlertDialogCancel className="flex-1" onClick={onCancel}>
              {textCancel || "Cancel"}
            </AlertDialogCancel>
            <AlertDialogAction className="flex-1" onClick={handleConfirm}>
              {isLoading ? (
                <LoaderCircle className="size-5 animate-spin" />
              ) : (
                textConfirm || "Continue"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AlertModal;
