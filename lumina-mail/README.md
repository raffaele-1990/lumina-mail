<div align="center">

<img src="resources/luminamail.svg" alt="Lumina Mail Logo" width="128" height="128" />

# Lumina Mail

**Un client email desktop veloce, leggero e orientato alla privacy per Windows — basato su Claws Mail (C/GTK3), riprogettato con estetica *Safari on Windows / Luminous Aqua* e compilazione *security-hardened*.**

[![Platform](https://img.shields.io/badge/Platform-Windows%2010%20%2F%2011%20(x64)-0078D4?style=flat-square&logo=windows)](https://github.com)
[![Engine](https://img.shields.io/badge/Core-C%20%2F%20GTK3-2484E8?style=flat-square)](https://gtk.org)
[![License](https://img.shields.io/badge/License-GPL--3.0--or--later-16A34A?style=flat-square)](https://www.gnu.org/licenses/gpl-3.0.html)
[![Security](https://img.shields.io/badge/Hardening-ASLR%20%7C%20DEP%20%7C%20No--JS-0F766E?style=flat-square)](#sicurezza--audit-open-source)
[![Build](https://img.shields.io/badge/Toolchain-MSYS2%20UCRT64-6366F1?style=flat-square)](scripts/build-luminamail-msys2.sh)

[Caratteristiche](#-caratteristiche-principali) • [Sicurezza & Plugin](#-sicurezza--audit-open-source) • [Compilazione](#-compilazione-su-windows) • [Struttura](#-struttura-del-progetto)

</div>

---

## 🚀 Caratteristiche Principali

| Icona | Funzionalità | Dettagli Tecnici |
| :---: | :--- | :--- |
| 🎨 | **Restyling Safari su Windows** | Tema GTK3 nativo (`themes/lumina-safari.css`) con toolbar satinata perlata, pulsanti *pill-shaped*, schede stile Safari e barra di ricerca `GtkSearchEntry` integrata in alto a destra. |
| 🛡️ | **Rendering HTML Senza JavaScript** | Utilizza **LiteHTML + Gumbo-Parser** al posto di WebKit: zero esecuzione di script remoti, zero superficie d'attacco browser/DOM e consumo RAM ridotto. |
| 🔐 | **Crittografia End-to-End Nativa** | Supporto completo a **PGP/MIME (RFC 3156)** e **S/MIME X.509** tramite GnuPG/GPGME, oltre a password cifrate con **GnuTLS** (`--with-password-encryption=gnutls`). |
| 📄 | **Anteprima PDF & TNEF Sicura** | Lettura integrata degli allegati PDF con **Poppler** e decodifica automatica dei file `winmail.dat` di Outlook tramite **libytnef**. |
| 🧠 | **Antispam 100% Locale** | Filtro Bayesiano **Bogofilter** offline senza invio di email a server cloud esterni. |
| 🪟 | **Integrazione Windows Moderna** | Eseguibile `luminamail.exe` con supporto **HiDPI PerMonitorV2**, icona flat multi-risoluzione stile iOS Mail e profilo isolato in `%APPDATA%\LuminaMail`. |

---

## 🔒 Sicurezza & Audit Open Source

Ogni dipendenza inclusa in **Lumina Mail** è software open source verificato con licenze approvate OSI/FSF, compilato con flag di protezione binaria avanzata e accompagnato da **SBOM** e checksum **SHA-256**.

### Plugin Inclusi e Attivi di Default (12 Built-in)
- **`pgpcore` / `pgpmime` / `smime`** — Firma digitale e crittografia standard tramite GnuPG/GPGME.
- **`litehtml_viewer`** — Motore HTML/CSS leggero privo di JavaScript.
- **`pdf_viewer`** — Rendering PDF isolato con Poppler.
- **`notification`** — Notifiche desktop Windows e icona nell'area di notifica.
- **`vcalendar`** — Gestione inviti calendario `.ics` (libical).
- **`tnef_parse`** — Parsing sicuro degli allegati Microsoft `winmail.dat`.
- **`archive`** & **`att_remover`** — Archiviazione cartelle (`libarchive`) e rimozione allegati.
- **`address_keeper`** — Gestione automatica dei contatti.
- **`bogofilter`** — Classificazione antispam locale.

### Componenti Esclusi per Sicurezza & Privacy
- ❌ **`fancy` (WebKitGTK)** e **`dillo`**: esclusi per peso eccessivo e ampia superficie di vulnerabilità JS/browser.
- ❌ **`libravatar`**: escluso per evitare richieste HTTP automatiche verso server esterni (protezione IP/privacy).
- ❌ **`perl` / `python`**: esclusi per evitare interpreti di scripting arbitrario nel runtime email.
- ❌ **`pgpinline` / `gdata` / `acpi_notifier`**: esclusi perché legacy o specifici per hardware Linux.

### Hardening del Binario (`luminamail.exe`)
```text
CFLAGS / CXXFLAGS : -O2 -D_FORTIFY_SOURCE=2 -fstack-protector-strong -fno-strict-overflow
LDFLAGS (Win64)   : -mwindows -Wl,--nxcompat -Wl,--dynamicbase -Wl,--high-entropy-va
```

---

## 🛠️ Compilazione su Windows

### Opzione 1 — Build Automatica su GitHub Actions
1. Carica il contenuto della cartella `lumina-mail/` nel tuo repository GitHub (includendo `.github/workflows/build-windows-luminamail.yml`).
2. Fai push sul branch `lumina-main` o `main`, oppure avvia manualmente il workflow dalla scheda **Actions → Build Lumina Mail (Windows x64 Hardened)**.
3. Scarica l'artefatto **`lumina-mail-win64-hardened`** contenente `LuminaMail-Setup-1.0.0-win64.exe`, lo ZIP portabile, `sbom-msys2-ucrt64.txt` e `SHA256SUMS.txt`.

### Opzione 2 — Build Locale (MSYS2 UCRT64)
1. Installa [MSYS2](https://www.msys2.org/) e apri il terminale **MSYS2 UCRT64**.
2. Dalla cartella `lumina-mail/` esegui:
   ```bash
   bash scripts/build-luminamail-msys2.sh
   ```

---

## 📁 Struttura del Progetto

```text
lumina-mail/
├── .github/workflows/
│   └── build-windows-luminamail.yml   # Pipeline CI Windows x64 (MSYS2 UCRT64)
├── installer/
│   └── luminamail.nsi                 # Script installer open-source NSIS
├── patches/
│   └── lumina-mail.patch              # Patch verificata su Claws Mail upstream
├── resources/
│   ├── luminamail.svg                 # Icona vettoriale flat stile iOS Mail
│   ├── luminamail_1024.png            # Master PNG 1024x1024 RGBA
│   ├── luminamail.ico                 # Icona Windows multi-risoluzione (16..256px)
│   ├── luminamail.exe.manifest.in     # Manifest HiDPI PerMonitorV2
│   └── w32-resource.rc.in             # Risorse PE Windows
├── scripts/
│   ├── build-luminamail-msys2.sh      # Script compilazione & packaging hardened
│   └── make_ico.py                    # Generatore .ico multi-risoluzione
└── themes/
    └── lumina-safari.css              # Foglio di stile GTK3 Luminous Aqua
```

---

<div align="center">
  <sub>Rilasciato sotto licenza <b>GNU General Public License v3.0 or later</b> — Basato su Claws Mail.</sub>
</div>
