import { useState } from 'react';

import { Badge } from '@workspace/ui/components/badge';
import { Button } from '@workspace/ui/components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@workspace/ui/components/card';
import { Wordmark } from '@workspace/ui/components/wordmark';
import { EnvironmentBadge } from '@workspace/ui/components/environment-badge';

const navigation = [
  { id: 'overview', label: "Vue d'ensemble" },
  { id: 'conversations', label: 'Conversations' },
  { id: 'statistics', label: 'Statistiques' },
  { id: 'comparisons', label: 'Comparaisons' },
  { id: 'settings', label: 'Paramètres' },
] as const;

type Section = (typeof navigation)[number]['id'];

const demoMetrics = [
  {
    label: 'Conversations',
    value: '3',
    description: 'Exemple fictif',
  },
  {
    label: 'Messages',
    value: '12 480',
    description: 'Toutes conversations confondues',
  },
  {
    label: 'Médias',
    value: '326',
    description: 'Images, vidéos et audios',
  },
];

const demoConversations = [
  {
    name: 'Conversation A',
    participants: 'Alice et Camille',
    messages: '5 240 messages',
  },
  {
    name: 'Conversation B',
    participants: 'Alice et Noé',
    messages: '4 180 messages',
  },
  {
    name: 'Conversation C',
    participants: 'Camille et Noé',
    messages: '3 060 messages',
  },
];

export default function App() {
  const [section, setSection] = useState<Section>('overview');

  const currentPage = navigation.find((item) => item.id === section);

  function navigateTo(nextSection: Section) {
    setSection(nextSection);
  }

  return (
    <div className="min-h-screen bg-background text-foreground md:flex">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-card/40 md:flex">
        <div className="border-b border-border px-6 py-7">
          <Wordmark className="text-2xl" />
          <p className="mt-2 text-xs text-muted-foreground">Conversation intelligence</p>
        </div>

        <nav aria-label="Navigation principale" className="flex flex-1 flex-col gap-2 p-4">
          {navigation.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => navigateTo(item.id)}
              aria-pressed={section === item.id}
              className={`rounded-lg px-4 py-3 text-left text-sm transition-colors ${
                section === item.id
                  ? 'bg-primary/15 font-medium text-primary'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="border-t border-border p-5">
          <Badge variant="outline">Prototype local</Badge>
          <p className="mt-3 text-xs leading-5 text-muted-foreground">
            Authentification non activée. Aucune donnée personnelle réelle.
          </p>
        </div>
      </aside>

      {/* Main application */}
      <div className="min-w-0 flex-1">
        <header className="border-b border-border">
          <div className="flex items-center justify-between gap-4 px-5 py-5 md:px-8">
            <div>
              <div className="md:hidden">
                <Wordmark className="text-xl" />
              </div>
              <p className="hidden text-sm text-muted-foreground md:block">
                Espace de démonstration
              </p>
            </div>

            <div className="flex items-center gap-2">
              <EnvironmentBadge environment={import.meta.env.VITE_APP_ENV} />
              <Badge variant="outline">Données fictives</Badge>
            </div>
          </div>

          {/* Mobile navigation */}
          <nav
            aria-label="Navigation mobile"
            className="flex gap-2 overflow-x-auto px-4 pb-4 md:hidden"
          >
            {navigation.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => navigateTo(item.id)}
                aria-pressed={section === item.id}
                className={`shrink-0 rounded-lg px-3 py-2 text-xs ${
                  section === item.id
                    ? 'bg-primary/15 text-primary'
                    : 'bg-card text-muted-foreground'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </header>

        <main className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-10">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-widest text-primary">
                YazItMean / Dashboard
              </p>

              <h1 className="text-3xl font-semibold tracking-tight">{currentPage?.label}</h1>

              <p className="mt-2 text-sm text-muted-foreground">
                Explorez vos conversations sous un autre angle.
              </p>
            </div>

            <Badge variant="secondary">Prototype V0.1</Badge>
          </div>

          {section === 'overview' ? (
            <div className="space-y-8">
              {/* Metrics */}
              <section aria-label="Indicateurs fictifs" className="grid gap-4 sm:grid-cols-3">
                {demoMetrics.map((metric) => (
                  <Card key={metric.label}>
                    <CardHeader>
                      <CardDescription>{metric.label}</CardDescription>
                    </CardHeader>

                    <CardContent>
                      <p className="text-3xl font-semibold text-primary">{metric.value}</p>
                      <p className="mt-2 text-xs text-muted-foreground">{metric.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </section>

              {/* Conversation preview */}
              <section className="grid gap-5 lg:grid-cols-[2fr_1fr]">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between gap-3">
                      <CardTitle>Conversations</CardTitle>
                      <Badge variant="outline">Démo</Badge>
                    </div>

                    <CardDescription>Aperçu de conversations entièrement fictives.</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    {demoConversations.map((conversation) => (
                      <div
                        key={conversation.name}
                        className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border p-4"
                      >
                        <div>
                          <p className="text-sm font-medium">{conversation.name}</p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {conversation.participants}
                          </p>
                        </div>

                        <span className="text-xs text-muted-foreground">
                          {conversation.messages}
                        </span>
                      </div>
                    ))}

                    <Button variant="outline" onClick={() => navigateTo('conversations')}>
                      Voir les conversations
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Analyses</CardTitle>
                    <CardDescription>Les futures fonctionnalités de YazItMean.</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Statistiques temporelles, médias, chronologies et comparaisons entre
                      conversations.
                    </p>

                    <Badge variant="secondary">En préparation</Badge>

                    <div>
                      <Button variant="outline" onClick={() => navigateTo('statistics')}>
                        Explorer les statistiques
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </section>
            </div>
          ) : (
            <Card className="max-w-3xl">
              <CardHeader>
                <CardTitle>{currentPage?.label}</CardTitle>
                <CardDescription>
                  Cette section sera développée dans une prochaine étape.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <p className="mb-5 text-sm leading-6 text-muted-foreground">
                  L'interface est en préparation. Les données affichées actuellement sont uniquement
                  des exemples fictifs.
                </p>

                <Button variant="outline" onClick={() => navigateTo('overview')}>
                  Retour au tableau de bord
                </Button>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
}
