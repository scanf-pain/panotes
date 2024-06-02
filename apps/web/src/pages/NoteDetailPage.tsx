import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { Button } from "@repo/ui/button";
import { Link } from "react-router-dom";
import BackButton from "../components/BackButton";

function NoteDetailPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Post One</CardTitle>
      </CardHeader>
      <CardContent>Post one content</CardContent>
      <BackButton />
      <Link to="../edit/1" className="bg-slate-500">
        <Button>Edit</Button>
      </Link>
      <Button variant="destructive">delete</Button>
    </Card>
  );
}

export default NoteDetailPage;
