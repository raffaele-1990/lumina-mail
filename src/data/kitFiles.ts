import luminaPatch from '../../lumina-mail-kit/patches/lumina-mail.patch?raw';
import luminaSafariCss from '../../lumina-mail-kit/themes/lumina-safari.css?raw';
import buildMsys2Script from '../../lumina-mail-kit/scripts/build-luminamail-msys2.sh?raw';
import githubWorkflowYml from '../../lumina-mail-kit/.github/workflows/build-windows-luminamail.yml?raw';
import nsisInstallerScript from '../../lumina-mail-kit/installer/luminamail.nsi?raw';
import w32ResourceRc from '../../lumina-mail-kit/resources/w32-resource.rc.in?raw';
import winManifestIn from '../../lumina-mail-kit/resources/luminamail.exe.manifest.in?raw';
import makeIcoPy from '../../lumina-mail-kit/scripts/make_ico.py?raw';

export interface KitArtifact {
  id: string;
  filename: string;
  path: string;
  role: string;
  language: string;
  content: string;
}

export const KIT_ARTIFACTS: KitArtifact[] = [
  {
    id: 'patch',
    filename: 'lumina-mail.patch',
    path: 'lumina-mail-kit/patches/lumina-mail.patch',
    role: 'Patch C/Autotools verificata con git apply --check su Claws Mail upstream',
    language: 'diff',
    content: luminaPatch,
  },
  {
    id: 'css',
    filename: 'lumina-safari.css',
    path: 'lumina-mail-kit/themes/lumina-safari.css',
    role: 'Tema GTK3 stile Safari su Windows / Luminous Aqua',
    language: 'css',
    content: luminaSafariCss,
  },
  {
    id: 'msys2',
    filename: 'build-luminamail-msys2.sh',
    path: 'lumina-mail-kit/scripts/build-luminamail-msys2.sh',
    role: 'Script MSYS2 UCRT64 hardened con raccolta DLL ntldd, SBOM e SHA-256',
    language: 'bash',
    content: buildMsys2Script,
  },
  {
    id: 'workflow',
    filename: 'build-windows-luminamail.yml',
    path: 'lumina-mail-kit/.github/workflows/build-windows-luminamail.yml',
    role: 'Pipeline GitHub Actions windows-latest con msys2/setup-msys2@v2',
    language: 'yaml',
    content: githubWorkflowYml,
  },
  {
    id: 'nsis',
    filename: 'luminamail.nsi',
    path: 'lumina-mail-kit/installer/luminamail.nsi',
    role: 'Installer Windows open-source NSIS (licenza zlib/libpng)',
    language: 'nsis',
    content: nsisInstallerScript,
  },
  {
    id: 'rc',
    filename: 'w32-resource.rc.in',
    path: 'lumina-mail-kit/resources/w32-resource.rc.in',
    role: 'Risorse Win32 PE (icona, versione, manifest)',
    language: 'rc',
    content: w32ResourceRc,
  },
  {
    id: 'manifest',
    filename: 'luminamail.exe.manifest.in',
    path: 'lumina-mail-kit/resources/luminamail.exe.manifest.in',
    role: 'Manifest Windows PerMonitorV2 HiDPI e Common Controls v6',
    language: 'xml',
    content: winManifestIn,
  },
  {
    id: 'ico',
    filename: 'make_ico.py',
    path: 'lumina-mail-kit/scripts/make_ico.py',
    role: 'Convertitore Python/Pillow PNG -> ICO multi-risoluzione (16/32/48/256)',
    language: 'python',
    content: makeIcoPy,
  },
];

export interface PluginAuditEntry {
  name: string;
  status: 'Incluso' | 'Escluso';
  license: string;
  category: string;
  rationale: string;
}

export const PLUGIN_AUDIT_LIST: PluginAuditEntry[] = [
  { name: 'pgpcore', status: 'Incluso', license: 'GPL-3.0+', category: 'Crittografia', rationale: 'Motore GPGME/GnuPG per gestione chiavi e decifratura.' },
  { name: 'pgpmime', status: 'Incluso', license: 'GPL-3.0+', category: 'Crittografia', rationale: 'Standard RFC 3156 resistente a manipolazioni MIME.' },
  { name: 'smime', status: 'Incluso', license: 'GPL-3.0+', category: 'Crittografia', rationale: 'Firma e cifratura aziendale X.509 via GPGSM.' },
  { name: 'litehtml_viewer', status: 'Incluso', license: 'GPL-3.0+ / BSD-3', category: 'Rendering HTML', rationale: 'Parser HTML/CSS leggero via Gumbo senza motore JavaScript.' },
  { name: 'pdf_viewer', status: 'Incluso', license: 'GPL-3.0+', category: 'Allegati', rationale: 'Anteprima PDF isolata con Poppler senza viewer esterni.' },
  { name: 'notification', status: 'Incluso', license: 'GPL-3.0+', category: 'Desktop Windows', rationale: 'Icona di notifica e avvisi desktop nativi.' },
  { name: 'vcalendar', status: 'Incluso', license: 'GPL-3.0+', category: 'Calendario', rationale: 'Parsing inviti .ics tramite libical open source.' },
  { name: 'tnef_parse', status: 'Incluso', license: 'GPL-3.0+', category: 'Allegati', rationale: 'Decodifica winmail.dat di Microsoft Outlook via libytnef.' },
  { name: 'archive', status: 'Incluso', license: 'GPL-3.0+', category: 'Archiviazione', rationale: 'Backup cartelle email compresso via libarchive.' },
  { name: 'att_remover', status: 'Incluso', license: 'GPL-3.0+', category: 'Igiene dati', rationale: 'Rimozione allegati pesanti dai messaggi archiviati.' },
  { name: 'address_keeper', status: 'Incluso', license: 'GPL-3.0+', category: 'Rubrica', rationale: 'Salvataggio rapido dei destinatari verificati.' },
  { name: 'bogofilter', status: 'Incluso', license: 'GPL-3.0+', category: 'Anti-Spam', rationale: 'Filtro Bayesiano locale offline senza invio dati a cloud esterni.' },
  { name: 'fancy (WebKitGTK)', status: 'Escluso', license: 'LGPL-2.1', category: 'Rischio RCE/Peso', rationale: 'Escluso per ampia superficie JS/DOM e oltre 100 MB di DLL.' },
  { name: 'libravatar', status: 'Escluso', license: 'GPL-3.0+', category: 'Privacy Leak', rationale: 'Escluso perché effettua richieste HTTP verso server esterni.' },
  { name: 'perl / python', status: 'Escluso', license: 'GPL / PSF', category: 'Esecuzione Codice', rationale: 'Esclusi per ridurre superficie di esecuzione script arbitrari.' },
  { name: 'dillo / acpi_notifier / gdata / pgpinline', status: 'Escluso', license: 'GPL-3.0+', category: 'Legacy / Linux', rationale: 'Obsoleti, specifici per LED Linux (/proc/acpi) o formati legacy.' },
];

export const HARDENING_FLAGS = [
  { flag: '-D_FORTIFY_SOURCE=2', scope: 'Compilatore', effect: 'Verifica dei limiti su memcpy/strcpy/sprintf a compile & runtime' },
  { flag: '-fstack-protector-strong', scope: 'Compilatore', effect: 'Canary sullo stack per prevenire buffer overflow' },
  { flag: '-fno-strict-overflow', scope: 'Compilatore', effect: 'Previene ottimizzazioni insicure su overflow interi con segno' },
  { flag: '-Wl,--nxcompat', scope: 'Linker PE', effect: 'Abilita Data Execution Prevention (DEP / NX) su Windows' },
  { flag: '-Wl,--dynamicbase -Wl,--high-entropy-va', scope: 'Linker PE', effect: 'Abilita ASLR completo a 64-bit ad alta entropia' },
  { flag: '--with-password-encryption=gnutls', scope: 'Configure', effect: 'Cifra le password salvate con GnuTLS anziché l’algoritmo legacy' },
];
