import { Badge } from './badge';

interface EnvironmentBadgeProps {
  environment?: string;
}

const labels: Record<string, string> = {
  dev: 'DEV',
  staging: 'STAGING',
  production: 'PROD',
};

export function EnvironmentBadge({ environment }: EnvironmentBadgeProps) {
  const label = environment ? (labels[environment] ?? 'UNKNOWN') : 'LOCAL';

  return (
    <Badge variant="outline" aria-label={`Environnement : ${label}`}>
      {label}
    </Badge>
  );
}
