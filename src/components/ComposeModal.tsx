import { FormEvent, useState } from 'react';
import { X } from 'lucide-react';

interface ComposeModalProps {
  initialTo?: string;
  initialSubject?: string;
  onClose: () => void;
  onSaveDraft: (draft: { toEmail: string; subject: string; body: string }) => void;
}

export function ComposeModal({
  initialTo = '',
  initialSubject = '',
  onClose,
  onSaveDraft,
}: ComposeModalProps) {
  const [toEmail, setToEmail] = useState(initialTo);
  const [subject, setSubject] = useState(initialSubject);
  const [body, setBody] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!toEmail.trim() || !subject.trim()) {
      setErrorMsg('Inserisci destinatario e oggetto prima di salvare la bozza.');
      return;
    }
    onSaveDraft({
      toEmail,
      subject,
      body: body.trim() || '(Nessun testo)',
    });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="compose-modal-title"
      className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
    >
      <div className="w-full max-w-lg rounded-xl bg-white border border-[#a9b2be] shadow-xl overflow-hidden">
        <div className="safari-toolbar-surface px-5 py-3 border-b border-[#cfd6e0] flex items-center justify-between">
          <h2 id="compose-modal-title" className="font-display text-sm font-bold text-[#1d242e]">
            Componi nuova bozza — Lumina Mail
          </h2>
          <button
            type="button"
            aria-label="Chiudi finestra composizione"
            onClick={onClose}
            className="p-1 text-[#5c6675] hover:text-[#1d242e] rounded"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {errorMsg && (
            <div
              role="alert"
              className="px-3 py-2 rounded-lg bg-[#fef2f2] border border-[#fecaca] text-xs font-medium text-[#dc2626]"
            >
              {errorMsg}
            </div>
          )}

          <div>
            <label htmlFor="compose-to" className="block text-xs font-semibold text-[#1d242e] mb-1">
              Destinatario
            </label>
            <input
              id="compose-to"
              type="email"
              value={toEmail}
              onChange={(e) => setToEmail(e.target.value)}
              placeholder="nome@dominio.it"
              className="w-full px-3 py-2 text-sm rounded-lg border border-[#cfd6e0] focus:outline-none focus:border-[#2484e8] focus:ring-2 focus:ring-[#2484e8]/25"
            />
          </div>

          <div>
            <label htmlFor="compose-subject" className="block text-xs font-semibold text-[#1d242e] mb-1">
              Oggetto
            </label>
            <input
              id="compose-subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Oggetto del messaggio"
              className="w-full px-3 py-2 text-sm rounded-lg border border-[#cfd6e0] focus:outline-none focus:border-[#2484e8] focus:ring-2 focus:ring-[#2484e8]/25"
            />
          </div>

          <div>
            <label htmlFor="compose-body" className="block text-xs font-semibold text-[#1d242e] mb-1">
              Testo del messaggio
            </label>
            <textarea
              id="compose-body"
              rows={5}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Scrivi il contenuto della bozza..."
              className="w-full px-3 py-2 text-sm rounded-lg border border-[#cfd6e0] focus:outline-none focus:border-[#2484e8] focus:ring-2 focus:ring-[#2484e8]/25"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-[#5c6675] hover:text-[#1d242e] border border-[#cfd6e0] rounded-lg"
            >
              Annulla
            </button>
            <button
              type="submit"
              className="safari-aqua-btn px-4 py-2 text-xs font-semibold text-white rounded-lg border border-[#1664bc]"
            >
              Salva in Bozze
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
