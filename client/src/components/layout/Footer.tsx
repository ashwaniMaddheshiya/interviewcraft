export function Footer() {
  return (
    <footer className="border-t border-border py-8 mt-12">
      <div className="mx-auto max-w-6xl px-4 text-sm text-muted-foreground">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} InterviewCraft</p>
          <p>
            Designed & built by{" "}
            <a
              href="https://www.linkedin.com/in/ashwaniMaddheshiya/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Ashwani Maddheshiya
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
