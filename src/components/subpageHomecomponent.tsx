import { Link } from "@tanstack/react-router";
import { Button } from "#/components/ui/button";
import { cn } from "#/lib/utils";
type SubpageProps = {
  className?: string;
  buttonClassName?: string;
  title: string;
  subtitle: string;
  buttontitle: string;
  to: string;
  icon?: React.ReactNode;
};

const SubpageComponent = ({
  className,
  buttonClassName,
  title,
  subtitle,
  buttontitle,
  to,
  icon,
}: SubpageProps) => {
  return (
    <>
      <div
        className={cn(
          " w-45 h-55 rounded-2xl flex items-center flex-col",
          className,
        )}
      >
        {icon && <div className="scale-250 m-8">{icon}</div>}
        <h1 className="font-bold text-[16px]">{title}</h1>
        <div className="w-4 h-1.5 bg-gray-300 px-20 rounded-4xl mb-2"></div>
        <h1 className="text-center text-xs">{subtitle}</h1>
        <Link to={to}>
          <Button
            variant={"outline"}
            className={cn(
              "border-none px-4 rounded-3xl text-white cursor-pointer",
              buttonClassName,
            )}
          >
            {buttontitle}
          </Button>
        </Link>
      </div>
    </>
  );
};

export default SubpageComponent;
