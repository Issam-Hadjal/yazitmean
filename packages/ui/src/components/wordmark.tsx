type WordmarkProps = {
  className?: string;
};

export function Wordmark({ className = '' }: WordmarkProps) {
  return (
    <span
      aria-label="YazItMean"
      className={`inline-flex items-center font-bold tracking-tight ${className}`}
    >
      <span aria-hidden="true">Yaz</span>
      <span aria-hidden="true" className="text-primary">
        It
      </span>
      <span aria-hidden="true">Mean</span>
    </span>
  );
}
