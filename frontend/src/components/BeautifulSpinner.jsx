export const BeautifulSpinner = () => {
  return (
    <div className="flex items-center justify-center h-20">
      <div
        className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-orange-500 border-r-transparent"
        style={{ animationDuration: "0.8s" }}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};
