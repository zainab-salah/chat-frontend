import { cn } from "@/lib/utils";

type MaxWidthWrapperProps = {
  className?: string;
  children?: React.ReactNode;
};

const MaxWidthWrapper = ({ className, children }: MaxWidthWrapperProps) => {
  return (
    
    <div
      className={cn(
        "h-full mx-auto container max-w-screen-lg px-2.5 md:px-20",
        className
      )}
    >
      {children}
    </div>
  );
};

export default MaxWidthWrapper;