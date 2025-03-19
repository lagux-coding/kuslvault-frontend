import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
      <h1 className="text-[7rem] leading-tight font-bold">404</h1>
      <span className="font-medium">Hey! Nothing here mate!</span>
      <p className="text-muted-foreground text-center">
        It seems like the page you're looking for does not exist or might have been removed.
      </p>
      <div className="mt-4 flex gap-4">
        <Button variant="outline" className="cursor-pointer" onClick={() => navigate(-1)}>
          Go Back
        </Button>
        <Button className="cursor-pointer" onClick={() => navigate("/")}>
          Back To Home
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
