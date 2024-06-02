import { Button } from "@repo/ui/button";
import React from "react";
import { Link } from "react-router-dom";
function ButtonEditNote() {
  return (
    <div>
      <Link to="./edit/1">Edit</Link>
      <Button variant="destructive">delete</Button>
    </div>
  );
}

export default ButtonEditNote;
