import { Mandala } from "./Mandala";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-gold/15 bg-navy-deep pt-20 pb-8">
      <Mandala className="-left-32 -top-20" size={320} opacity={0.07} />
      <Mandala className="-right-32 -bottom-20" size={320} opacity={0.07} />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid h-10 w-10 place-items-center rounded-lg gold-gradient-bg font-display text-lg font-bold text-navy-deep">
                C
              </span>
              <span className="font-display text-xl font-bold">
                Career<span className="gold-text">Saathi</span> AI
              </span>
            </div>
            <p className="mt-4 font-display text-lg italic gold-text">Apna Career, Apni Bhasha</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Built for Bharat. Powered by AI.
            </p>
          </div>

          <div className="md:text-center">
            <h4 className="text-sm font-semibold text-gold uppercase tracking-wider">Explore</h4>
            <ul className="mt-4 space-y-2 text-sm">
              {[
                ["Problem", "#problem"],
                ["Solution", "#solution"],
                ["Demo", "#demo"],
                ["Roadmap", "#roadmap"],
              ].map(([l, h]) => (
                <li key={h}>
                  <a href={h} className="text-muted-foreground transition-colors hover:text-gold">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:text-right">
            <h4 className="text-sm font-semibold text-gold uppercase tracking-wider">Connect</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>📧 adityadudu45@gmail.com</li>
              <li>🏆 India Runs Hackathon 2026 Submission</li>
              <li>🌐 Powered by Redrob's 15M+ Job Network</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-gold/15 pt-6 text-center text-xs text-muted-foreground">
          Powered by AI · Built by Aditya · <a href="mailto:adityadudu45@gmail.com" className="text-gold hover:underline">adityadudu45@gmail.com</a>
        </div>
      </div>
    </footer>
  );
}
