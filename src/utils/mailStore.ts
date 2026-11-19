export type FolderId = 'inbox' | 'sent' | 'drafts' | 'archive' | 'trash';

export interface MailMessage {
  id: string;
  folder: FolderId;
  fromName: string;
  fromEmail: string;
  toEmail: string;
  subject: string;
  preview: string;
  body: string;
  dateLabel: string;
  sizeLabel: string;
  unread: boolean;
  securityProtocol: string;
  securityKeyInfo: string;
  rendererPlugin: string;
  attachmentName?: string;
  headersRaw: string;
}

export interface FolderMeta {
  id: FolderId;
  label: string;
}

export const FOLDERS: FolderMeta[] = [
  { id: 'inbox', label: 'Posta in arrivo' },
  { id: 'sent', label: 'Inviati' },
  { id: 'drafts', label: 'Bozze' },
  { id: 'archive', label: 'Archivio' },
  { id: 'trash', label: 'Cestino' },
];

export const INITIAL_MESSAGES: MailMessage[] = [
  {
    id: 'msg-1',
    folder: 'inbox',
    fromName: 'Team Sicurezza Lumina',
    fromEmail: 'security@luminamail.org',
    toEmail: 'raffaele@luminamail.org',
    subject: 'Verifica firma PGP/MIME e build hardened MSYS2 UCRT64',
    preview: 'Tutti i 12 plugin open-source sono attivi con TLS 1.3 GnuTLS e ASLR 64-bit.',
    body: `Ciao Raffaele,

La build di Lumina Mail 1.0.0 su MSYS2 UCRT64 è stata completata con successo utilizzando esclusivamente librerie open source verificate.

Riepilogo protezioni attive:
• Trasporto TLS 1.3 tramite GnuTLS + Nettle (cifratura password locali via GnuTLS)
• Rendering HTML sicuro tramite litehtml_viewer + gumbo-parser (motore JavaScript disabilitato)
• Verifica firma crittografica PGP/MIME RFC 3156 tramite GPGME e GnuPG
• Protezioni PE Windows: DEP/NX, High-Entropy 64-bit ASLR e Stack Protector Strong

Puoi ispezionare l'intera patch sorgente e la pipeline GitHub Actions nella scheda Kit & Patch.`,
    dateLabel: '10:42',
    sizeLabel: '18 KB',
    unread: true,
    securityProtocol: 'PGP/MIME Firmato (RFC 3156)',
    securityKeyInfo: 'Chiave RSA-4096 valida · Fingerprint 9A4E 71C0 B2D4 F810',
    rendererPlugin: 'litehtml_viewer (Zero-JS)',
    attachmentName: 'lumina-sbom-ucrt64.txt',
    headersRaw: `Return-Path: <security@luminamail.org>
Authentication-Results: spf=pass smtp.mailfrom=luminamail.org; dkim=pass; dmarc=pass
Content-Type: multipart/signed; micalg=pgp-sha256; protocol="application/pgp-signature"
X-Mailer: Lumina Mail 1.0.0 (Win64; UCRT64)
X-Lumina-Renderer: litehtml_viewer/0.8 (No-JS)`,
  },
  {
    id: 'msg-2',
    folder: 'inbox',
    fromName: 'Elena Conti',
    fromEmail: 'elena.conti@studioarch.it',
    toEmail: 'raffaele@luminamail.org',
    subject: 'Invito revisione interfaccia Safari Aqua & specifiche PDF',
    preview: 'Allego il documento tecnico in PDF e l’invito calendario iCalendar per giovedì.',
    body: `Buongiorno Raffaele,

In allegato trovi le specifiche grafiche definitive per la barra superiore satinata e le tab stile Safari su Windows 11 PerMonitorV2.

L'allegato PDF è visualizzabile direttamente nel pannello messaggi grazie al plugin integrato pdf_viewer (Poppler), mentre l'invito riunione viene gestito nativamente da vCalendar.

A giovedì,
Elena`,
    dateLabel: '09:15',
    sizeLabel: '240 KB',
    unread: true,
    securityProtocol: 'S/MIME X.509 Verificato',
    securityKeyInfo: 'Certificato emesso da Sectigo CA · SHA-256 valido',
    rendererPlugin: 'pdf_viewer (Poppler) + vcalendar',
    attachmentName: 'Specifiche-Aqua-UI.pdf',
    headersRaw: `From: Elena Conti <elena.conti@studioarch.it>
To: raffaele@luminamail.org
Subject: Invito revisione interfaccia Safari Aqua & specifiche PDF
Content-Type: multipart/mixed; boundary="lumina_boundary_02"
X-S-MIME-Status: Verified`,
  },
  {
    id: 'msg-3',
    folder: 'inbox',
    fromName: 'Marco Bellini',
    fromEmail: 'm.bellini@azienda-italia.it',
    toEmail: 'raffaele@luminamail.org',
    subject: 'Documentazione contratto (allegato winmail.dat decodificato)',
    preview: 'Il plugin tnef_parse ha estratto automaticamente gli allegati Outlook.',
    body: `Ciao Raffaele,

Ti inoltro la nota tecnica dal nostro client Outlook aziendale. Lumina Mail decodifica trasparentemente il formato TNEF (winmail.dat) tramite il plugin built-in tnef_parse basato su libytnef.

Un saluto,
Marco`,
    dateLabel: 'Ieri',
    sizeLabel: '64 KB',
    unread: false,
    securityProtocol: 'TLS 1.3 Trasporto Sicuro',
    securityKeyInfo: 'GnuTLS ECDHE-RSA-AES256-GCM-SHA384',
    rendererPlugin: 'tnef_parse (libytnef)',
    attachmentName: 'winmail.dat',
    headersRaw: `From: Marco Bellini <m.bellini@azienda-italia.it>
Content-Type: application/ms-tnef; name="winmail.dat"
X-TNEF-Parsed: true`,
  },
  {
    id: 'msg-4',
    folder: 'sent',
    fromName: 'Raffaele Cecoro',
    fromEmail: 'raffaele@luminamail.org',
    toEmail: 'release@luminamail.org',
    subject: 'Pubblicazione workflow GitHub Actions e pacchetto NSIS',
    preview: 'Inviato lo script luminamail.nsi con checksum SHA-256 e raccolta DLL via ntldd.',
    body: `Ciao a tutti,

Ho caricato la pipeline CI riproducibile su windows-latest con msys2/setup-msys2@v2 e pacchettizzazione open-source NSIS.

Tutti i binari generano automaticamente SHA256SUMS.txt e sbom-msys2-ucrt64.txt.`,
    dateLabel: 'Ieri',
    sizeLabel: '12 KB',
    unread: false,
    securityProtocol: 'PGP/MIME Firmato (RFC 3156)',
    securityKeyInfo: 'Firmato con chiave personale Ed25519',
    rendererPlugin: 'Testo semplice UTF-8',
    headersRaw: `From: Raffaele Cecoro <raffaele@luminamail.org>
To: release@luminamail.org
User-Agent: Lumina Mail 1.0.0`,
  },
  {
    id: 'msg-5',
    folder: 'drafts',
    fromName: 'Raffaele Cecoro',
    fromEmail: 'raffaele@luminamail.org',
    toEmail: 'contributors@luminamail.org',
    subject: 'Note di rilascio Lumina Mail 1.0.0 per Windows',
    preview: 'Bozza riepilogo novità: profilo %APPDATA%\\LuminaMail e tema lumina-safari.css.',
    body: `Bozza note di rilascio:
1. Profilo utente isolato in %APPDATA%\\LuminaMail
2. Nuova interfaccia Luminous Aqua con ricerca integrata nella toolbar
3. 12 plugin di sicurezza e produttività pre-attivati al primo avvio`,
    dateLabel: '18 Nov',
    sizeLabel: '6 KB',
    unread: false,
    securityProtocol: 'Bozza locale cifrata',
    securityKeyInfo: 'Archivio locale %APPDATA%\\LuminaMail',
    rendererPlugin: 'Editor testo',
    headersRaw: `X-Lumina-Draft: true
Folder: Drafts`,
  },
  {
    id: 'msg-6',
    folder: 'archive',
    fromName: 'Audit Dipendenze Open Source',
    fromEmail: 'audit@luminamail.org',
    toEmail: 'raffaele@luminamail.org',
    subject: 'Rapporto esclusione plugin legacy (Fancy WebKit, Libravatar, Perl)',
    preview: 'Documentazione tecnica sulle motivazioni di sicurezza e privacy.',
    body: `Esito audit dipendenze:
- fancy (WebKitGTK): escluso per superficie JavaScript/DOM e peso DLL > 100 MB
- libravatar: escluso per prevenzione leak IP verso server avatar esterni
- perl / python: esclusi per riduzione superficie di esecuzione script`,
    dateLabel: '15 Nov',
    sizeLabel: '22 KB',
    unread: false,
    securityProtocol: 'PGP/MIME Firmato',
    securityKeyInfo: 'Verifica completata',
    rendererPlugin: 'litehtml_viewer (Zero-JS)',
    headersRaw: `Subject: Rapporto esclusione plugin legacy
X-Audit-Status: Passed`,
  },
];

export function filterMessages(
  messages: MailMessage[],
  folder: FolderId,
  query: string
): MailMessage[] {
  const q = query.trim().toLowerCase();
  return messages.filter((m) => {
    if (m.folder !== folder) return false;
    if (!q) return true;
    return (
      m.subject.toLowerCase().includes(q) ||
      m.fromName.toLowerCase().includes(q) ||
      m.fromEmail.toLowerCase().includes(q) ||
      m.preview.toLowerCase().includes(q) ||
      m.securityProtocol.toLowerCase().includes(q)
    );
  });
}

export function getUnreadCounts(messages: MailMessage[]): Record<FolderId, number> {
  const counts: Record<FolderId, number> = {
    inbox: 0,
    sent: 0,
    drafts: 0,
    archive: 0,
    trash: 0,
  };
  for (const m of messages) {
    if (m.unread) {
      counts[m.folder] += 1;
    }
  }
  return counts;
}

export function markMessageRead(
  messages: MailMessage[],
  id: string,
  unread: boolean
): MailMessage[] {
  return messages.map((m) => (m.id === id ? { ...m, unread } : m));
}

export function moveMessageToFolder(
  messages: MailMessage[],
  id: string,
  targetFolder: FolderId
): MailMessage[] {
  return messages.map((m) =>
    m.id === id ? { ...m, folder: targetFolder, unread: false } : m
  );
}

export function createDraftMessage(
  messages: MailMessage[],
  input: { toEmail: string; subject: string; body: string }
): { messages: MailMessage[]; createdId: string } {
  const createdId = `draft-${Date.now()}-${messages.length + 1}`;
  const cleanBody = input.body.trim();
  const draft: MailMessage = {
    id: createdId,
    folder: 'drafts',
    fromName: 'Raffaele Cecoro',
    fromEmail: 'raffaele@luminamail.org',
    toEmail: input.toEmail.trim(),
    subject: input.subject.trim(),
    preview: cleanBody.split('\n')[0]?.slice(0, 88) || 'Bozza salvata',
    body: cleanBody,
    dateLabel: 'Adesso',
    sizeLabel: `${Math.max(1, Math.ceil(cleanBody.length / 1024))} KB`,
    unread: false,
    securityProtocol: 'PGP/MIME pronto per la firma',
    securityKeyInfo: 'Chiave configurata in %APPDATA%\\LuminaMail',
    rendererPlugin: 'Editor testo',
    headersRaw: `From: Raffaele Cecoro <raffaele@luminamail.org>\nTo: ${input.toEmail.trim()}\nSubject: ${input.subject.trim()}\nX-Lumina-Draft: true`,
  };
  return {
    messages: [draft, ...messages],
    createdId,
  };
}
