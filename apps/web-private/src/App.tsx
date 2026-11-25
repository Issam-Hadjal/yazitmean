import { Button } from '@workspace/ui/components/button';
import { Wordmark } from '@workspace/ui/components/wordmark';
import { Badge } from '@workspace/ui/components/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@workspace/ui/components/card';
import { Separator } from '@workspace/ui/components/separator';

export default function App() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background text-foreground">
      <h1>
        <Wordmark className="text-4xl" />
      </h1>
      <p>Private Application</p>
      <Button>Open Dashboard</Button>

      <Card className="w-full max-w-sm">
        <CardHeader>
          <div className="flex items-center justify-between gap-3">
            <CardTitle>Conversation Analytics</CardTitle>
            <Badge variant="secondary">Demo</Badge>
          </div>
          <CardDescription>Shared components powered by shadcn/ui</CardDescription>
        </CardHeader>

        <Separator />

        <CardContent>
          <p className="text-sm text-muted-foreground">
            Explore conversations and discover meaningful insights.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
