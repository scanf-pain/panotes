import { Button } from "@repo/ui/button";
import { ArrowLeftToLine } from "lucide-react";
import { useNavigate } from "react-router-dom";
import React from "react";

function BackButton() {
  const navigate = useNavigate();

  return (
    <Button variant="link" onClick={() => navigate(-1)} className="gap-2">
      <span>Go back</span>
      <ArrowLeftToLine strokeWidth={2} size={"1rem"} />
    </Button>
  );
}

export default BackButton;
