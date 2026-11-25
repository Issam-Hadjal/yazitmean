import { Button } from '@workspace/ui/components/button';

export default function App() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background text-foreground">
      <h1 className="text-4xl font-bold">YazItMean</h1>
      <p>Private Application</p>
      <Button>Open Dashboard</Button>
    </main>
  );
}
