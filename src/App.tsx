import { useState } from 'react';
import { BuildKitView } from './components/BuildKitView';
import { ComposeModal } from './components/ComposeModal';
import { IconStudioView } from './components/IconStudioView';
import { SafariMailPreview } from './components/SafariMailPreview';
import { SecurityAuditView } from './components/SecurityAuditView';
import { StudioView, TopStudioBar } from './components/TopStudioBar';
import {
  FolderId,
  INITIAL_MESSAGES,
  MailMessage,
  createDraftMessage,
  markMessageRead,
  moveMessageToFolder,
} from './utils/mailStore';

export default function App() {
  const [activeView, setActiveView] = useState<StudioView>('preview');
  const [messages, setMessages] = useState<MailMessage[]>(INITIAL_MESSAGES);
  const [activeFolder, setActiveFolder] = useState<FolderId>('inbox');
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(
    INITIAL_MESSAGES[0].id
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [composeState, setComposeState] = useState<{
    open: boolean;
    initialTo?: string;
    initialSubject?: string;
  }>({ open: false });

  const handleSelectFolder = (folder: FolderId) => {
    setActiveFolder(folder);
    const firstInFolder = messages.find((m) => m.folder === folder);
    setSelectedMessageId(firstInFolder ? firstInFolder.id : null);
  };

  const handleSelectMessage = (id: string) => {
    setSelectedMessageId(id);
    setMessages((prev) => markMessageRead(prev, id, false));
  };

  const handleArchive = (id: string) => {
    setMessages((prev) => moveMessageToFolder(prev, id, 'archive'));
  };

  const handleDelete = (id: string) => {
    setMessages((prev) => moveMessageToFolder(prev, id, 'trash'));
  };

  const handleToggleUnread = (id: string, nextUnread: boolean) => {
    setMessages((prev) => markMessageRead(prev, id, nextUnread));
  };

  const handleSaveDraft = (draft: {
    toEmail: string;
    subject: string;
    body: string;
  }) => {
    const result = createDraftMessage(messages, draft);
    setMessages(result.messages);
    setActiveFolder('drafts');
    setSelectedMessageId(result.createdId);
    setActiveView('preview');
    setComposeState({ open: false });
  };

  return (
    <div className="min-h-screen bg-[#eef2f7] text-[#1d242e] flex flex-col overflow-x-hidden">
      <TopStudioBar
        activeView={activeView}
        onSelectView={setActiveView}
        onOpenCompose={() => setComposeState({ open: true })}
      />

      <main className="flex-1 min-w-0">
        {activeView === 'preview' && (
          <SafariMailPreview
            messages={messages}
            activeFolder={activeFolder}
            selectedMessageId={selectedMessageId}
            searchQuery={searchQuery}
            onSelectFolder={handleSelectFolder}
            onSelectMessage={handleSelectMessage}
            onSearchChange={setSearchQuery}
            onOpenCompose={() => setComposeState({ open: true })}
            onArchiveMessage={handleArchive}
            onDeleteMessage={handleDelete}
            onToggleUnread={handleToggleUnread}
            onReplyMessage={(msg) =>
              setComposeState({
                open: true,
                initialTo: msg.fromEmail,
                initialSubject: `Re: ${msg.subject}`,
              })
            }
          />
        )}

        {activeView === 'kit' && <BuildKitView />}
        {activeView === 'audit' && <SecurityAuditView />}
        {activeView === 'icon' && <IconStudioView />}
      </main>

      {composeState.open && (
        <ComposeModal
          initialTo={composeState.initialTo}
          initialSubject={composeState.initialSubject}
          onClose={() => setComposeState({ open: false })}
          onSaveDraft={handleSaveDraft}
        />
      )}
    </div>
  );
}
