export default function Footer() {
  return (
    <footer className="bg-[#10151c] border-t border-thin-separator px-8 py-4 ml-20">
      <div className="max-w-[120rem] mx-auto flex items-center justify-between">
        <p className="text-xs text-foreground/60 font-paragraph">
          © 2026 Novocaine UAV Systems. All rights reserved.
        </p>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <span className="text-xs text-foreground/60 font-heading">System Operational</span>
        </div>
      </div>
    </footer>
  );
}
