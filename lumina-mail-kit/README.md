# Lumina Mail — Audited Open-Source Build & Packaging Kit (Windows x64)

## Security & Open-Source Compliance Audit

Every component in this build kit uses exclusively OSI/FSF-approved open-source software with mature security track records, zero proprietary binaries, zero telemetry, and strict compiler/linker hardening:

| Component | License | Security Role / Standard |
| :--- | :--- | :--- |
| **Claws Mail Core + LiteHTML** | GPL-3.0-or-later / BSD-3 | HTML rendering without JavaScript/DOM engine (eliminates WebKit RCE & tracking vectors) |
| **GnuTLS + Nettle + GMP** | LGPL-2.1+ | TLS 1.3 transport security + encrypted password store (`--with-password-encryption=gnutls`) |
| **GnuPG + GPGME + Libgcrypt** | GPL-3.0 / LGPL-2.1 | Audited OpenPGP (PGP/MIME RFC 3156) & X.509 S/MIME |
| **Poppler** | GPL-2.0+ | Sandboxed/isolated in-pane PDF viewing |
| **LibEtPan** | BSD-3-Clause | IMAP4rev1 / POP3 / SMTP protocol stack |
| **Bogofilter + libarchive + libical + libytnef + Enchant** | GPL / BSD / LGPL / MPL | Local Bayesian spam filtering (no cloud leak), `.ics`, `winmail.dat`, spellchecking |
| **NSIS + ntldd** | zlib/libpng / GPL | 100% open-source Windows installer & DLL dependency resolver |

### Binary Hardening Flags Enabled
- **Stack Protection:** `-fstack-protector-strong`
- **Buffer Overflow Mitigation:** `-D_FORTIFY_SOURCE=2 -fno-strict-overflow`
- **Windows DEP (NX) & High-Entropy 64-bit ASLR:** `-Wl,--nxcompat -Wl,--dynamicbase -Wl,--high-entropy-va`
- **Supply Chain Integrity:** Full package SBOM (`sbom-msys2-ucrt64.txt`) + `SHA256SUMS.txt`

## Usage

### Option A — Local Build on Windows (MSYS2 UCRT64)
```bash
bash lumina-mail-kit/scripts/build-luminamail-msys2.sh
```

### Option B — Automated Cloud Build (GitHub Actions)
Copy `lumina-mail-kit/.github/workflows/build-windows-luminamail.yml` into `.github/workflows/` of your repository and push to `lumina-main`.
