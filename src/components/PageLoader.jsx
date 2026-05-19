export default function PageLoader() {
  return (
    <div
      className="flex min-h-[40vh] items-center justify-center"
      role="status"
      aria-label="Carregando"
    >
      <div className="h-9 w-9 animate-spin rounded-full border-2 border-white/30 border-t-white" />
    </div>
  );
}
