import { Button } from '@workspace/ui/components/button';
import { Wordmark } from '@workspace/ui/components/wordmark';

export default function App() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background text-foreground">
      <h1>
        <Wordmark className="text-4xl" />
      </h1>
      <p>Private Application</p>
      <Button>Open Dashboard</Button>
    </main>
  );
}
