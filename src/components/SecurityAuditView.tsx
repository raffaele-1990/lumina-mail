import { useState } from 'react';
import { ShieldCheck, ShieldOff } from 'lucide-react';
import { HARDENING_FLAGS, PLUGIN_AUDIT_LIST } from '../data/kitFiles';

export function SecurityAuditView() {
  const [filter, setFilter] = useState<'all' | 'Incluso' | 'Escluso'>('all');

  const filtered = PLUGIN_AUDIT_LIST.filter(
    (p) => filter === 'all' || p.status === filter
  );

  return (
    <section
      aria-label="Audit sicurezza e componenti open source"
      className="max-w-[1440px] mx-auto px-4 sm:px-6 py-6 space-y-6"
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-[#1d242e] text-balance">
            Audit di Sicurezza & Componenti Open Source
          </h1>
          <p className="text-sm text-[#5c6675] mt-1">
            Solo librerie open source con storico di audit crittografico, protezione PE Windows e zero telemetria o tracking remoto.
          </p>
        </div>

        <div
          role="group"
          aria-label="Filtra plugin per stato"
          className="flex items-center gap-1 p-1 bg-[#e4e9f0] rounded-lg"
        >
          {(
            [
              { id: 'all', label: 'Tutti (16)' },
              { id: 'Incluso', label: 'Inclusi (12)' },
              { id: 'Escluso', label: 'Esclusi (4 gruppi)' },
            ] as { id: 'all' | 'Incluso' | 'Escluso'; label: string }[]
          ).map((btn) => (
            <button
              key={btn.id}
              type="button"
              onClick={() => setFilter(btn.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap shrink-0 transition-colors ${
                filter === btn.id
                  ? 'bg-white text-[#1d242e] shadow-sm'
                  : 'text-[#5c6675] hover:text-[#1d242e]'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tabella Audit Plugin */}
      <div className="bg-white border border-[#cfd6e0] rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f5f7fa] border-b border-[#cfd6e0] text-xs font-semibold text-[#5c6675]">
                <th className="px-4 py-3">Plugin / Modulo</th>
                <th className="px-4 py-3">Stato</th>
                <th className="px-4 py-3">Categoria</th>
                <th className="px-4 py-3">Licenza</th>
                <th className="px-4 py-3">Motivazione Architetturale</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#edf1f6] text-xs">
              {filtered.map((entry) => {
                const included = entry.status === 'Incluso';
                return (
                  <tr key={entry.name} className="hover:bg-[#f8fafc]">
                    <td className="px-4 py-3 font-mono font-semibold text-[#1d242e] whitespace-nowrap">
                      {entry.name}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1.5 font-semibold ${
                          included ? 'text-[#16A34A]' : 'text-[#DC2626]'
                        }`}
                      >
                        {included ? (
                          <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                        ) : (
                          <ShieldOff className="w-3.5 h-3.5" aria-hidden="true" />
                        )}
                        {entry.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[#5c6675] whitespace-nowrap">
                      {entry.category}
                    </td>
                    <td className="px-4 py-3 font-mono text-[#5c6675] whitespace-nowrap">
                      {entry.license}
                    </td>
                    <td className="px-4 py-3 text-[#1d242e]">{entry.rationale}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Flag di Hardening del Compilatore e Linker */}
      <div className="bg-white border border-[#cfd6e0] rounded-xl overflow-hidden shadow-sm">
        <div className="px-5 py-3.5 border-b border-[#cfd6e0] bg-[#f5f7fa]">
          <h2 className="font-display text-sm font-bold text-[#1d242e]">
            Hardening Binario Windows PE (MSYS2 UCRT64)
          </h2>
        </div>
        <div className="divide-y divide-[#edf1f6]">
          {HARDENING_FLAGS.map((item) => (
            <div
              key={item.flag}
              className="px-5 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
            >
              <div className="flex items-center gap-3 min-w-0">
                <code className="font-mono font-semibold text-[#1664bc]">
                  {item.flag}
                </code>
                <span className="text-[#5c6675] shrink-0">· {item.scope}</span>
              </div>
              <span className="text-[#1d242e]">{item.effect}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
