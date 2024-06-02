import { Button } from "@repo/ui/button";
import { ArrowLeftToLine } from "lucide-react";
import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <h1>404 NotFoundPage</h1>
      <Button variant="link" onClick={() => navigate(-1)} className="gap-2">
        <span>Go back</span>
        <ArrowLeftToLine strokeWidth={2} size={"1rem"} />
      </Button>
    </div>
  );
}

export default NotFoundPage;
