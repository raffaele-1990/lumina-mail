import { useState } from 'react';
import { Check, Copy, Download, FileCode2 } from 'lucide-react';
import { KIT_ARTIFACTS } from '../data/kitFiles';

export function BuildKitView() {
  const [selectedId, setSelectedId] = useState<string>(KIT_ARTIFACTS[0].id);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const active =
    KIT_ARTIFACTS.find((a) => a.id === selectedId) ?? KIT_ARTIFACTS[0];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(active.content);
      setCopiedId(active.id);
      window.setTimeout(() => setCopiedId(null), 1800);
    } catch {
      // Clipboard API restricted fallback
    }
  };

  const handleDownload = () => {
    const blob = new Blob([active.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = active.filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <section
      aria-label="Kit sorgente e patch verificati"
      className="max-w-[1440px] mx-auto px-4 sm:px-6 py-6 space-y-6"
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-[#1d242e] text-balance">
            Kit di Compilazione & Patch C Verificate
          </h1>
          <p className="text-sm text-[#5c6675] mt-1">
            File reali salvati in <code className="text-[#1664bc]">lumina-mail-kit/</code>. La patch <code className="text-[#1664bc]">lumina-mail.patch</code> è verificata con <code className="text-[#1664bc]">git apply --check</code> su Claws Mail upstream.
          </p>
        </div>
        <div className="text-xs text-[#5c6675]">
          Compilazione locale Windows: <code className="text-[#1d242e]">bash lumina-mail-kit/scripts/build-luminamail-msys2.sh</code>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[310px_1fr] bg-white border border-[#cfd6e0] rounded-xl overflow-hidden shadow-sm">
        <aside className="bg-[#f5f7fa] border-b lg:border-b-0 lg:border-r border-[#cfd6e0] p-3 space-y-1">
          <div className="px-2.5 py-1.5 text-xs font-semibold text-[#5c6675]">
            File del Kit ({KIT_ARTIFACTS.length})
          </div>
          {KIT_ARTIFACTS.map((item) => {
            const isSelected = item.id === active.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedId(item.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors flex items-start gap-2.5 ${
                  isSelected
                    ? 'bg-[#2484e8] text-white'
                    : 'text-[#1d242e] hover:bg-[#e8eef6]'
                }`}
              >
                <FileCode2 className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
                <div className="min-w-0">
                  <div className="text-xs font-semibold truncate">{item.filename}</div>
                  <div
                    className={`text-[11px] truncate mt-0.5 ${
                      isSelected ? 'text-white/85' : 'text-[#5c6675]'
                    }`}
                  >
                    {item.path}
                  </div>
                </div>
              </button>
            );
          })}
        </aside>

        <div className="flex flex-col min-w-0">
          <div className="px-5 py-3.5 border-b border-[#cfd6e0] bg-[#fafbfd] flex flex-wrap items-center justify-between gap-3">
            <div className="min-w-0">
              <h2 className="font-display text-sm font-bold text-[#1d242e] truncate">
                {active.filename}
              </h2>
              <p className="text-xs text-[#5c6675] mt-0.5">{active.role}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#1d242e] bg-white border border-[#cfd6e0] rounded-lg hover:bg-[#f5f7fa] whitespace-nowrap shrink-0"
              >
                {copiedId === active.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#16A34A]" aria-hidden="true" />
                    Copiato
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                    Copia codice
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handleDownload}
                className="safari-aqua-btn inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white border border-[#1664bc] rounded-lg whitespace-nowrap shrink-0"
              >
                <Download className="w-3.5 h-3.5" aria-hidden="true" />
                Scarica file
              </button>
            </div>
          </div>

          <pre className="p-5 bg-[#0f172a] text-[#e2e8f0] text-xs font-mono leading-relaxed overflow-auto max-h-[560px]">
            <code>{active.content}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}
