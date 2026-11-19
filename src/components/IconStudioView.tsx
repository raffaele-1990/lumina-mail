import { useState } from 'react';
import { Download } from 'lucide-react';

const ICON_URL = '/src/assets/images/lumina_mail_icon_1795095428930.jpg';
const ICON_SIZES = [256, 48, 32, 16];

export function IconStudioView() {
  const [imgError, setImgError] = useState(false);

  return (
    <section
      aria-label="Icona Glassmorphism e risorse Windows"
      className="max-w-[1440px] mx-auto px-4 sm:px-6 py-6 space-y-6"
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-[#1d242e] text-balance">
            Brand Identity & Icona 3D Glassmorphism
          </h1>
          <p className="text-sm text-[#5c6675] mt-1">
            Asset generato per <code className="text-[#1664bc]">luminamail.ico</code> e integrato in <code className="text-[#1664bc]">src/w32-resource.rc.in</code> con supporto HiDPI PerMonitorV2.
          </p>
        </div>

        <a
          href={ICON_URL}
          download="lumina-mail-icon-1024.jpg"
          className="safari-aqua-btn inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white border border-[#1664bc] rounded-lg whitespace-nowrap shrink-0"
        >
          <Download className="w-3.5 h-3.5" aria-hidden="true" />
          Scarica asset icona
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-6 items-stretch">
        <div className="bg-[#f8fafc] border border-[#cfd6e0] rounded-xl p-6 flex flex-col items-center justify-center shadow-sm">
          {!imgError ? (
            <img
              src={ICON_URL}
              alt="Icona ufficiale Lumina Mail 3D Glassmorphism con prisma di luce interno"
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="w-72 h-72 object-contain rounded-2xl mix-blend-multiply"
            />
          ) : (
            <div className="w-72 h-72 rounded-2xl bg-gradient-to-br from-[#eaf4ff] to-[#cde3fc] border border-[#a6c9f2] flex flex-col items-center justify-center text-center p-6">
              <span className="font-display font-bold text-[#1664bc]">Lumina Mail</span>
              <span className="text-xs text-[#5c6675] mt-1">Anteprima icona non disponibile</span>
            </div>
          )}
          <div className="mt-4 text-xs text-[#5c6675] text-center">
            Busta in vetro traslucido azzurro-cristallo con prisma ottico luminoso
          </div>
        </div>

        <div className="bg-white border border-[#cfd6e0] rounded-xl p-6 flex flex-col justify-between shadow-sm space-y-6">
          <div>
            <h2 className="font-display text-base font-bold text-[#1d242e]">
              Matrice Multi-Risoluzione Windows (.ico)
            </h2>
            <p className="text-xs text-[#5c6675] mt-1">
              Le quattro risoluzioni standard richieste da Windows Explorer, Taskbar e Alt-Tab.
            </p>

            <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {ICON_SIZES.map((size) => (
                <div
                  key={size}
                  className="p-4 rounded-lg border border-[#e5e9f0] bg-[#f8fafc] flex flex-col items-center justify-between min-h-[140px]"
                >
                  <div className="flex-1 flex items-center justify-center">
                    <img
                      src={ICON_URL}
                      alt={`Anteprima ${size}x${size}`}
                      referrerPolicy="no-referrer"
                      style={{
                        width: `${Math.min(size, 72)}px`,
                        height: `${Math.min(size, 72)}px`,
                      }}
                      className="object-contain rounded mix-blend-multiply"
                    />
                  </div>
                  <span className="mt-3 text-xs font-mono font-semibold text-[#1d242e] tabular-nums">
                    {size}×{size}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-[#edf1f6] space-y-2">
            <div className="text-xs font-semibold text-[#1d242e]">
              Comando di conversione open source (Pillow)
            </div>
            <pre className="p-3.5 rounded-lg bg-[#0f172a] text-[#e2e8f0] text-xs font-mono overflow-x-auto">
              <code>python3 lumina-mail-kit/scripts/make_ico.py path/to/icon.png lumina-mail-kit/resources/luminamail.ico</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
