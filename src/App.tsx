import {ShieldCheck, Terminal, FileCode2, FolderGit2, Lock} from 'lucide-react';

export default function App() {
  const kitFiles = [
    {path: '.github/workflows/build-windows-luminamail.yml', desc: 'GitHub Actions Windows x64 MSYS2 UCRT64 pipeline'},
    {path: 'patches/lumina-mail.patch', desc: 'Rebranding, %APPDATA%\\LuminaMail, 12 built-in plugins & UI patch'},
    {path: 'themes/lumina-safari.css', desc: 'GTK3 Luminous Aqua theme stylesheet'},
    {path: 'resources/luminamail.ico', desc: 'Multi-resolution Windows flat iOS-style icon (16..256px)'},
    {path: 'resources/luminamail.exe.manifest.in', desc: 'PerMonitorV2 HiDPI Windows manifest'},
    {path: 'scripts/build-luminamail-msys2.sh', desc: 'Security-hardened MSYS2 UCRT64 build script'},
    {path: 'installer/luminamail.nsi', desc: 'Open-source NSIS Windows installer script'},
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 px-6 py-12">
      <div className="mx-auto max-w-3xl space-y-8">
        <header className="flex items-center gap-5 border-b border-slate-200 pb-6">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-b from-[#196EF0] via-[#38A1FA] to-[#64D2FF] shadow-sm">
            <svg viewBox="0 0 64 64" className="h-10 w-10" fill="none">
              <rect x="8" y="14" width="48" height="36" rx="5" fill="#FFFFFF" />
              <path d="M10 17L32 35L54 17" stroke="#237EF4" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M10 47L24 33M54 47L40 33" stroke="#53C1FE" strokeWidth="2.8" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Lumina Mail</h1>
            <p className="text-sm text-slate-600">
              Client email desktop C/GTK3 per Windows x64 — Build Kit Open Source &amp; Hardened
            </p>
          </div>
        </header>

        <section className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <ShieldCheck className="mb-2 h-5 w-5 text-blue-600" />
            <h2 className="text-sm font-semibold">Zero JavaScript</h2>
            <p className="mt-1 text-xs text-slate-600">Rendering HTML sicuro via LiteHTML + Gumbo-Parser.</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <Lock className="mb-2 h-5 w-5 text-blue-600" />
            <h2 className="text-sm font-semibold">PGP/MIME &amp; S/MIME</h2>
            <p className="mt-1 text-xs text-slate-600">Crittografia nativa GnuPG/GPGME e GnuTLS 1.3.</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <Terminal className="mb-2 h-5 w-5 text-blue-600" />
            <h2 className="text-sm font-semibold">ASLR + DEP + SBOM</h2>
            <p className="mt-1 text-xs text-slate-600">Hardening PE Windows x64 e pacchetti MSYS2 UCRT64.</p>
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800">
            <FolderGit2 className="h-4 w-4 text-blue-600" />
            <span>File del Build Kit pronti nella root</span>
          </div>
          <ul className="divide-y divide-slate-100 text-xs">
            {kitFiles.map((item) => (
              <li key={item.path} className="flex flex-col gap-0.5 py-2.5 sm:flex-row sm:items-center sm:justify-between">
                <span className="flex items-center gap-2 font-mono font-medium text-slate-800">
                  <FileCode2 className="h-3.5 w-3.5 text-slate-400" />
                  {item.path}
                </span>
                <span className="text-slate-500">{item.desc}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl border border-slate-200 bg-slate-900 p-4 text-slate-100">
          <p className="mb-2 text-xs font-medium text-slate-400">Compilazione Windows (MSYS2 UCRT64)</p>
          <pre className="overflow-x-auto font-mono text-xs text-sky-300">bash scripts/build-luminamail-msys2.sh</pre>
        </section>
      </div>
    </div>
  );
}
