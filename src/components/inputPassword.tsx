import { useState } from "react";
import { Input } from "#/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
import { Button } from "#/components/ui/button";
import { Eye, EyeClosed } from "lucide-react";
import { cn } from "#/lib/utils";

type InputPasswordProps = {
  className?: string;
};
const InputPassword = ({ className } : InputPasswordProps) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <Field className="gap-1 mt-3">
        <FieldLabel className="font-bold">Senha</FieldLabel>
        <div className="relative">
          <Input
            className={cn("rounded-3xl pr-10", className)}
            type={isVisible ? "text" : "password"}
          ></Input>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsVisible((prevState) => !prevState)}
            className="absolute right-2 top-1/2 -translate-y-1/2 border-0"
          >
            {isVisible ? <Eye /> : <EyeClosed />}

            <span className="sr-only">
              {isVisible ? "Hide password" : "Show password"}
            </span>
          </Button>
        </div>
      </Field>
    </>
  );
};

export default InputPassword;
