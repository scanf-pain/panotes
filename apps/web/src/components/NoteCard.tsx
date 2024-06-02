import { Card, CardContent, CardFooter, CardHeader } from "@repo/ui/card";
// import { Button } from "@repo/ui/button";

import { Link } from "react-router-dom";

function NoteCard() {
  return (
    <Card className="w-full shadow-xl">
      <CardHeader>Header</CardHeader>
      <CardContent>Content What the dog doin</CardContent>
      <CardFooter className="flex flex-row justify-end">
        <Link to="../note/1" className="hover:underline">
          Read more ...
        </Link>
      </CardFooter>
    </Card>
  );
}

export default NoteCard;
