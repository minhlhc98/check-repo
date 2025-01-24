import {
  Button as ShadcnButton,
  ButtonProps as ShadcnButtonProps,
} from "@workspace/ui/components/button";
import { LoaderCircle } from "lucide-react";

interface ButtonProps extends ShadcnButtonProps {
  isLoading?: boolean;
}

const Button = ({ children, isLoading, ...otherProps }: ButtonProps) => {
  return (
    <ShadcnButton {...otherProps}>
      {isLoading ? <div className="px-4"><LoaderCircle className="size-5 animate-spin" /></div> : children}
    </ShadcnButton>
  );
};

export default Button;
