import { LoaderCircle } from "lucide-react";

const Loading = () => {
  return (
    <div className="absolute w-full h-screen top-0 flex justify-center items-center">
      <LoaderCircle className="animate-spin" size={40} />
    </div>
  );
};

export default Loading;
