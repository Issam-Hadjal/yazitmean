import { Badge } from '@workspace/ui/components/badge';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Wordmark } from '@workspace/ui/components/wordmark';

const features = [
  {
    title: 'Statistiques',
    description:
      'Explorez les volumes de messages, les habitudes et les tendances de communication.',
  },
  {
    title: 'Chronologies',
    description:
      'Retrouvez les moments marquants et observez comment les échanges évoluent dans le temps.',
  },
  {
    title: 'Comparaisons',
    description:
      'Comparez plusieurs conversations avec des indicateurs cohérents et contextualisés.',
  },
];

const demoMetrics = [
  { label: 'Messages', value: '1 284' },
  { label: 'Jours actifs', value: '146' },
  { label: 'Réponse médiane', value: '42 min' },
];

export default function App() {
  const scrollToDemo = () => {
    document.getElementById('demo')?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/60">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Wordmark className="text-2xl" />

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground">
              Fonctionnalités
            </a>
            <a href="#demo" className="hover:text-foreground">
              Démo
            </a>
          </div>
        </nav>
      </header>

      <main>
        <section className="mx-auto flex max-w-5xl flex-col items-center px-6 py-24 text-center md:py-32">
          <Badge variant="secondary" className="mb-8">
            Conversation intelligence
          </Badge>

          <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
            Découvrez ce que racontent vraiment
            <span className="text-primary"> vos conversations.</span>
          </h1>

          <p className="mt-7 max-w-2xl text-lg text-muted-foreground">
            Transformez vos échanges en statistiques, chronologies et visualisations pour mieux
            comprendre leur évolution.
          </p>

          <div className="mt-10">
            <Button size="lg" onClick={scrollToDemo}>
              Explorer la démonstration
            </Button>
          </div>
        </section>

        <section id="demo" className="mx-auto max-w-5xl px-6 py-12">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold">Un aperçu de YazItMean</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Exemple fictif de statistiques conversationnelles.
              </p>
            </div>

            <Badge variant="outline">Données fictives</Badge>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {demoMetrics.map((metric) => (
              <Card key={metric.label}>
                <CardHeader>
                  <CardTitle className="text-sm text-muted-foreground">{metric.label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-semibold text-primary">{metric.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="features" className="mx-auto max-w-5xl px-6 py-20">
          <h2 className="mb-8 text-2xl font-semibold">Explorez vos échanges autrement</h2>

          <div className="grid gap-4 md:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title}>
                <CardHeader>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-6 text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-border/60 px-6 py-8 text-center text-sm text-muted-foreground">
        YazItMean — Beyond messages. Discover meaning.
      </footer>
    </div>
  );
}
