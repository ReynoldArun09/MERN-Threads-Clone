export default function LoadingSpinner() {
  return (
    <div
      className="flex items-center justify-center min-h-screen"
      data-testid="loading-spinner"
    >
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 border-solid" />
    </div>
  );
}
