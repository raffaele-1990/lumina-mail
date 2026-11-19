import { useState } from 'react';
import {
  Archive,
  FileText,
  Folder,
  Forward,
  Inbox,
  Lock,
  Mail,
  PenSquare,
  RefreshCw,
  Reply,
  Search,
  Send,
  Trash2,
  X,
} from 'lucide-react';
import {
  FOLDERS,
  FolderId,
  MailMessage,
  filterMessages,
  getUnreadCounts,
} from '../utils/mailStore';

interface SafariMailPreviewProps {
  messages: MailMessage[];
  activeFolder: FolderId;
  selectedMessageId: string | null;
  searchQuery: string;
  onSelectFolder: (folder: FolderId) => void;
  onSelectMessage: (id: string) => void;
  onSearchChange: (q: string) => void;
  onOpenCompose: () => void;
  onArchiveMessage: (id: string) => void;
  onDeleteMessage: (id: string) => void;
  onToggleUnread: (id: string, nextUnread: boolean) => void;
  onReplyMessage: (msg: MailMessage) => void;
}

type ReadingTab = 'body' | 'security' | 'headers';

function FolderIcon({ folder }: { folder: FolderId }) {
  switch (folder) {
    case 'inbox':
      return <Inbox className="w-4 h-4 shrink-0" aria-hidden="true" />;
    case 'sent':
      return <Send className="w-4 h-4 shrink-0" aria-hidden="true" />;
    case 'drafts':
      return <FileText className="w-4 h-4 shrink-0" aria-hidden="true" />;
    case 'archive':
      return <Archive className="w-4 h-4 shrink-0" aria-hidden="true" />;
    case 'trash':
      return <Trash2 className="w-4 h-4 shrink-0" aria-hidden="true" />;
    default:
      return <Folder className="w-4 h-4 shrink-0" aria-hidden="true" />;
  }
}

export function SafariMailPreview({
  messages,
  activeFolder,
  selectedMessageId,
  searchQuery,
  onSelectFolder,
  onSelectMessage,
  onSearchChange,
  onOpenCompose,
  onArchiveMessage,
  onDeleteMessage,
  onToggleUnread,
  onReplyMessage,
}: SafariMailPreviewProps) {
  const [readingTab, setReadingTab] = useState<ReadingTab>('body');
  const [syncNotice, setSyncNotice] = useState<string | null>(null);

  const visibleMessages = filterMessages(messages, activeFolder, searchQuery);
  const unreadCounts = getUnreadCounts(messages);
  const activeMessage =
    visibleMessages.find((m) => m.id === selectedMessageId) ??
    visibleMessages[0] ??
    null;

  const handleSync = () => {
    setSyncNotice('Sincronizzazione IMAP/TLS 1.3 completata');
    window.setTimeout(() => setSyncNotice(null), 2400);
  };

  return (
    <section
      aria-label="Anteprima finestra desktop Lumina Mail"
      className="max-w-[1440px] mx-auto px-4 sm:px-6 py-6"
    >
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-[#1d242e] text-balance">
            Anteprima Desktop Lumina Mail — Stile Safari su Windows
          </h1>
          <p className="text-sm text-[#5c6675] mt-1">
            Simulazione interattiva del tema GTK3 <code className="text-[#1664bc]">lumina-safari.css</code> con ricerca in alto a destra e 12 plugin sicuri integrati.
          </p>
        </div>
        <div className="text-xs text-[#5c6675] tabular-nums">
          Profilo Windows: <code className="text-[#1d242e]">%APPDATA%\LuminaMail</code> · Eseguibile: <code className="text-[#1d242e]">luminamail.exe</code>
        </div>
      </div>

      {/* Finestra Desktop Lumina Mail (Safari / Luminous Aqua Frame) */}
      <div className="rounded-xl overflow-hidden border border-[#a9b2be] bg-[#f5f7fa] shadow-md">
        {/* Barra Titolo Windows 11 + Icona Glass */}
        <div className="bg-[#f4f7fb] border-b border-[#d5dce6] px-4 py-2 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <img
              src="/src/assets/images/lumina_mail_icon_1795095428930.jpg"
              alt="Icona Lumina Mail"
              referrerPolicy="no-referrer"
              className="w-5 h-5 rounded object-cover border border-[#c4cbd4]"
            />
            <span className="text-xs font-semibold text-[#1d242e]">
              Lumina Mail — Posta in arrivo
            </span>
          </div>
          {syncNotice && (
            <span role="status" className="text-xs font-medium text-[#1664bc]">
              {syncNotice}
            </span>
          )}
        </div>

        {/* Toolbar Unificata "Brushed Pearl / Glass" (lumina-toolbar) */}
        <div className="safari-toolbar-surface border-b border-[#a9b2be] px-3 py-2 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleSync}
              className="safari-pill-btn inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#aeb7c4] text-xs font-medium text-[#202833] whitespace-nowrap shrink-0 transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />
              Ricevi
            </button>

            <button
              type="button"
              onClick={onOpenCompose}
              className="safari-aqua-btn inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-[#1664bc] text-xs font-semibold text-white whitespace-nowrap shrink-0 transition-all"
            >
              <PenSquare className="w-3.5 h-3.5" aria-hidden="true" />
              Scrivi
            </button>

            <button
              type="button"
              disabled={!activeMessage}
              onClick={() => activeMessage && onReplyMessage(activeMessage)}
              className="safari-pill-btn inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#aeb7c4] text-xs font-medium text-[#202833] disabled:opacity-45 whitespace-nowrap shrink-0 transition-all"
            >
              <Reply className="w-3.5 h-3.5" aria-hidden="true" />
              Rispondi
            </button>

            <button
              type="button"
              disabled={!activeMessage}
              onClick={() => activeMessage && onArchiveMessage(activeMessage.id)}
              className="safari-pill-btn inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#aeb7c4] text-xs font-medium text-[#202833] disabled:opacity-45 whitespace-nowrap shrink-0 transition-all"
            >
              <Archive className="w-3.5 h-3.5" aria-hidden="true" />
              Archivia
            </button>

            <button
              type="button"
              disabled={!activeMessage}
              onClick={() => activeMessage && onDeleteMessage(activeMessage.id)}
              className="safari-pill-btn inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#aeb7c4] text-xs font-medium text-[#202833] disabled:opacity-45 whitespace-nowrap shrink-0 transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
              Elimina
            </button>
          </div>

          {/* Barra di Ricerca Safari Integrata in Alto a Destra */}
          <div className="relative flex items-center min-w-[240px] sm:w-72">
            <Search
              className="w-3.5 h-3.5 text-[#5c6675] absolute left-3 pointer-events-none"
              aria-hidden="true"
            />
            <label htmlFor="lumina-toolbar-search" className="sr-only">
              Cerca email nella cartella corrente
            </label>
            <input
              id="lumina-toolbar-search"
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Cerca email, mittente o PGP..."
              className="safari-search-input w-full pl-8 pr-8 py-1.5 rounded-full border border-[#9ea7b3] text-xs text-[#1d242e] placeholder:text-[#6b7685] focus:outline-none focus:border-[#2484e8] focus:ring-2 focus:ring-[#2484e8]/25"
            />
            {searchQuery && (
              <button
                type="button"
                aria-label="Pulisci ricerca"
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 text-[#5c6675] hover:text-[#1d242e]"
              >
                <X className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        {/* Corpo Principale a 3 Pannelli: Sidebar Cartelle + Lista Messaggi + Lettura Tabbed */}
        <div className="grid grid-cols-1 lg:grid-cols-[230px_360px_1fr] min-h-[540px]">
          {/* Pannello 1: Sidebar Cartelle (Azzurro-Ghiaccio #edf2f8) */}
          <aside
            aria-label="Cartelle email"
            className="bg-[#edf2f8] border-b lg:border-b-0 lg:border-r border-[#d0d7e2] p-2.5 flex flex-col justify-between"
          >
            <div className="space-y-1">
              <div className="px-2.5 py-1.5 text-xs font-semibold text-[#5c6675]">
                Cartelle locali
              </div>
              {FOLDERS.map((folder) => {
                const isSelected = activeFolder === folder.id;
                const unread = unreadCounts[folder.id];
                const totalInFolder = messages.filter((m) => m.folder === folder.id).length;
                return (
                  <button
                    key={folder.id}
                    type="button"
                    onClick={() => onSelectFolder(folder.id)}
                    aria-current={isSelected ? 'true' : undefined}
                    className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-md text-xs font-medium transition-colors text-left ${
                      isSelected
                        ? 'safari-aqua-btn text-white font-semibold'
                        : 'text-[#243040] hover:bg-[#e1e9f3]'
                    }`}
                  >
                    <span className="flex items-center gap-2 truncate">
                      <FolderIcon folder={folder.id} />
                      <span className="truncate">{folder.label}</span>
                    </span>
                    <span
                      className={`tabular-nums shrink-0 text-[11px] ${
                        isSelected ? 'text-white/95' : 'text-[#5c6675]'
                      }`}
                    >
                      {unread > 0 ? `${unread} / ${totalInFolder}` : totalInFolder}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 pt-3 border-t border-[#d0d7e2] px-2.5 text-[11px] text-[#5c6675] space-y-1">
              <div className="font-semibold text-[#243040]">12 Plugin Attivi</div>
              <div>PGP/MIME · S/MIME · LiteHTML</div>
              <div>Poppler PDF · TNEF · Bogofilter</div>
            </div>
          </aside>

          {/* Pannello 2: Lista Messaggi (SummaryView Ariosa) */}
          <div
            aria-label="Elenco messaggi"
            className="bg-white border-b lg:border-b-0 lg:border-r border-[#cfd6e0] flex flex-col"
          >
            <div className="bg-gradient-to-b from-[#fafbfd] to-[#edf1f6] border-b border-[#cfd6e0] px-3.5 py-2 flex items-center justify-between text-xs font-semibold text-[#5c6675]">
              <span>
                {FOLDERS.find((f) => f.id === activeFolder)?.label}
              </span>
              <span className="tabular-nums">
                {visibleMessages.length}{' '}
                {visibleMessages.length === 1 ? 'messaggio' : 'messaggi'}
              </span>
            </div>

            {visibleMessages.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <Mail className="w-8 h-8 text-[#9aa3af] mb-2" aria-hidden="true" />
                <p className="text-sm font-semibold text-[#1d242e]">
                  Nessun messaggio trovato
                </p>
                <p className="text-xs text-[#5c6675] mt-1 max-w-[240px]">
                  {searchQuery
                    ? `Nessun risultato per "${searchQuery}" in questa cartella.`
                    : 'Questa cartella è attualmente vuota.'}
                </p>
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => onSearchChange('')}
                    className="mt-3 px-3 py-1.5 text-xs font-medium text-[#1664bc] border border-[#cfd6e0] rounded-lg hover:bg-[#f5f7fa]"
                  >
                    Mostra tutti i messaggi
                  </button>
                )}
              </div>
            ) : (
              <ul className="divide-y divide-[#edf1f6] overflow-y-auto max-h-[500px]">
                {visibleMessages.map((msg) => {
                  const isSelected = activeMessage?.id === msg.id;
                  return (
                    <li key={msg.id}>
                      <button
                        type="button"
                        onClick={() => onSelectMessage(msg.id)}
                        className={`w-full text-left px-3.5 py-3 transition-colors block ${
                          isSelected
                            ? 'bg-[#2484e8] text-white'
                            : 'bg-white hover:bg-[#f5f8fc] text-[#1d242e]'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className={`text-xs truncate ${
                              msg.unread ? 'font-bold' : 'font-semibold'
                            }`}
                          >
                            {msg.unread ? '● ' : ''}
                            {msg.fromName}
                          </span>
                          <span
                            className={`text-[11px] tabular-nums shrink-0 ${
                              isSelected ? 'text-white/90' : 'text-[#5c6675]'
                            }`}
                          >
                            {msg.dateLabel}
                          </span>
                        </div>
                        <div
                          className={`text-xs mt-1 truncate ${
                            msg.unread ? 'font-semibold' : 'font-medium'
                          }`}
                        >
                          {msg.subject}
                        </div>
                        <div
                          className={`text-[11px] mt-1 truncate ${
                            isSelected ? 'text-white/85' : 'text-[#5c6675]'
                          }`}
                        >
                          {msg.preview}
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Pannello 3: Lettura Messaggio con Tab Bar Stile Safari */}
          <div className="bg-white flex flex-col">
            {/* Tab Bar Stile Safari */}
            <div
              role="tablist"
              aria-label="Modalità vista messaggio"
              className="bg-gradient-to-b from-[#cfd6e0] to-[#bfc7d3] border-b border-[#9aa3af] px-3 pt-2 flex items-end gap-1"
            >
              {(
                [
                  { id: 'body', label: 'Messaggio (LiteHTML)' },
                  { id: 'security', label: 'Audit Crittografia' },
                  { id: 'headers', label: 'Intestazioni MIME' },
                ] as { id: ReadingTab; label: string }[]
              ).map((tab) => {
                const active = readingTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    role="tab"
                    type="button"
                    aria-selected={active}
                    onClick={() => setReadingTab(tab.id)}
                    className={`px-4 py-1.5 text-xs rounded-t-md border border-b-0 whitespace-nowrap shrink-0 transition-colors ${
                      active
                        ? 'bg-white border-[#9aa3af] text-[#1d242e] font-semibold'
                        : 'bg-gradient-to-b from-[#dfe4ec] to-[#cdd4df] border-[#a6afbc] text-[#46505e] hover:text-[#1d242e]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {activeMessage ? (
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="pb-4 border-b border-[#e5e9f0] flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h2 className="font-display text-lg font-bold text-[#1d242e]">
                        {activeMessage.subject}
                      </h2>
                      <div className="mt-1.5 text-xs text-[#5c6675] flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="font-medium text-[#1d242e]">
                          {activeMessage.fromName} &lt;{activeMessage.fromEmail}&gt;
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>A: {activeMessage.toEmail}</span>
                        <span aria-hidden="true">·</span>
                        <span className="tabular-nums">{activeMessage.dateLabel}</span>
                        <span aria-hidden="true">·</span>
                        <span className="tabular-nums">{activeMessage.sizeLabel}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() =>
                          onToggleUnread(activeMessage.id, !activeMessage.unread)
                        }
                        className="px-3 py-1.5 text-xs font-medium text-[#202833] border border-[#cfd6e0] rounded-lg hover:bg-[#f5f7fa] whitespace-nowrap shrink-0"
                      >
                        {activeMessage.unread ? 'Segna come letto' : 'Segna non letto'}
                      </button>
                    </div>
                  </div>

                  {/* Contenuto della Tab Selezionata */}
                  {readingTab === 'body' && (
                    <div className="mt-5 space-y-4">
                      <div className="flex flex-wrap items-center gap-2 text-xs text-[#1664bc]">
                        <Lock className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span className="font-medium">{activeMessage.securityProtocol}</span>
                        <span aria-hidden="true" className="text-[#9aa3af]">·</span>
                        <span className="text-[#5c6675]">
                          Renderer: {activeMessage.rendererPlugin}
                        </span>
                      </div>

                      <div className="text-sm leading-relaxed text-[#1d242e] whitespace-pre-line max-w-[68ch]">
                        {activeMessage.body}
                      </div>

                      {activeMessage.attachmentName && (
                        <div className="pt-4 border-t border-[#edf1f6] flex items-center justify-between gap-4">
                          <div className="flex items-center gap-2 text-xs text-[#1d242e]">
                            <FileText className="w-4 h-4 text-[#2484e8]" aria-hidden="true" />
                            <span className="font-medium">
                              Allegato: {activeMessage.attachmentName}
                            </span>
                            <span className="text-[#5c6675] tabular-nums">
                              ({activeMessage.sizeLabel})
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setReadingTab('security')}
                            className="text-xs font-medium text-[#1664bc] hover:underline whitespace-nowrap shrink-0"
                          >
                            Verifica integrità
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {readingTab === 'security' && (
                    <div className="mt-5 space-y-4 text-sm">
                      <div className="p-4 rounded-lg border border-[#d0d7e2] bg-[#f8fafc] space-y-2">
                        <div className="text-xs font-semibold text-[#5c6675]">
                          Stato Crittografico
                        </div>
                        <div className="font-semibold text-[#16A34A]">
                          {activeMessage.securityProtocol}
                        </div>
                        <div className="text-xs text-[#1d242e]">
                          {activeMessage.securityKeyInfo}
                        </div>
                      </div>
                      <div className="p-4 rounded-lg border border-[#d0d7e2] bg-[#f8fafc] space-y-1.5">
                        <div className="text-xs font-semibold text-[#5c6675]">
                          Motore di Rendering Isolato
                        </div>
                        <div className="text-xs text-[#1d242e]">
                          {activeMessage.rendererPlugin} — Esecuzione JavaScript, cookie remoti e beacon HTTP disattivati a livello di motore.
                        </div>
                      </div>
                    </div>
                  )}

                  {readingTab === 'headers' && (
                    <pre className="mt-5 p-4 rounded-lg bg-[#f5f7fa] border border-[#d0d7e2] text-xs font-mono text-[#1d242e] overflow-x-auto leading-relaxed">
                      {activeMessage.headersRaw}
                    </pre>
                  )}
                </div>

                <div className="mt-6 pt-3 border-t border-[#edf1f6] flex items-center justify-between text-xs text-[#5c6675]">
                  <span>Vista isolata · Zero tracciamento remoto</span>
                  <button
                    type="button"
                    onClick={() => onReplyMessage(activeMessage)}
                    className="inline-flex items-center gap-1.5 font-medium text-[#1664bc] hover:underline"
                  >
                    <Forward className="w-3.5 h-3.5" aria-hidden="true" />
                    Rispondi a {activeMessage.fromName}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center p-10 text-sm text-[#5c6675]">
                Seleziona un messaggio dall’elenco per visualizzarne il contenuto.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
