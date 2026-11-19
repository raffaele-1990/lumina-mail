export type StudioView = 'preview' | 'kit' | 'audit' | 'icon';

interface TopStudioBarProps {
  activeView: StudioView;
  onSelectView: (view: StudioView) => void;
  onOpenCompose: () => void;
}

const NAV_ITEMS: { id: StudioView; label: string }[] = [
  { id: 'preview', label: 'Anteprima UI' },
  { id: 'kit', label: 'Kit & Patch' },
  { id: 'audit', label: 'Audit Sicurezza' },
  { id: 'icon', label: 'Icona Glass' },
];

export function TopStudioBar({
  activeView,
  onSelectView,
  onOpenCompose,
}: TopStudioBarProps) {
  return (
    <header className="bg-white border-b border-[#cfd6e0] sticky top-0 z-20">
      <div className="max-w-[1440px] mx-auto px-6 h-14 flex items-center justify-between gap-8">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            onSelectView('preview');
          }}
          className="font-display text-lg font-bold tracking-tight text-[#1d242e] whitespace-nowrap shrink-0"
        >
          Lumina Mail
        </a>

        <nav
          aria-label="Sezioni del progetto"
          className="flex items-center gap-6 overflow-x-auto"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectView(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`text-sm font-medium whitespace-nowrap shrink-0 py-1.5 border-b-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2484e8] ${
                  isActive
                    ? 'text-[#1664bc] border-[#2484e8]'
                    : 'text-[#5c6675] border-transparent hover:text-[#1d242e]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="shrink-0">
          <button
            type="button"
            onClick={onOpenCompose}
            className="safari-aqua-btn px-4 py-2 text-xs font-semibold text-white rounded-lg border border-[#1664bc] whitespace-nowrap shrink-0 transition-transform active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2484e8]"
          >
            Nuova bozza
          </button>
        </div>
      </div>
    </header>
  );
}
