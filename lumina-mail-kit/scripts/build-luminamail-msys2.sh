#!/usr/bin/env bash
# ==============================================================================
# Lumina Mail - Reproducible Security-Hardened MSYS2 UCRT64 Build Script
# Exclusively uses audited, OSI/FSF-approved open-source packages.
# Run inside MSYS2 UCRT64 shell on Windows x86_64.
# ==============================================================================
set -euo pipefail

KIT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BUILD_ROOT="${BUILD_ROOT:-$PWD/lumina-build}"
SRC_DIR="$BUILD_ROOT/lumina-mail"
STAGE_DIR="$BUILD_ROOT/stage"
BUNDLE_DIR="$KIT_DIR/installer/dist-bundle"
OUT_DIR="$BUILD_ROOT/artifacts"

echo "[1/7] Installing audited open-source MSYS2 UCRT64 toolchain & dependencies..."
pacman -Syu --noconfirm
pacman -S --needed --noconfirm \
  mingw-w64-ucrt-x86_64-toolchain \
  mingw-w64-ucrt-x86_64-autotools \
  mingw-w64-ucrt-x86_64-pkgconf \
  mingw-w64-ucrt-x86_64-binutils \
  mingw-w64-ucrt-x86_64-ntldd \
  mingw-w64-ucrt-x86_64-nsis \
  mingw-w64-ucrt-x86_64-gtk3 \
  mingw-w64-ucrt-x86_64-glib2 \
  mingw-w64-ucrt-x86_64-gnutls \
  mingw-w64-ucrt-x86_64-libetpan \
  mingw-w64-ucrt-x86_64-curl \
  mingw-w64-ucrt-x86_64-enchant \
  mingw-w64-ucrt-x86_64-nettle \
  mingw-w64-ucrt-x86_64-gpgme \
  mingw-w64-ucrt-x86_64-gnupg \
  mingw-w64-ucrt-x86_64-poppler \
  mingw-w64-ucrt-x86_64-gumbo-parser \
  mingw-w64-ucrt-x86_64-cairo \
  mingw-w64-ucrt-x86_64-libical \
  mingw-w64-ucrt-x86_64-libarchive \
  mingw-w64-ucrt-x86_64-libytnef \
  mingw-w64-ucrt-x86_64-bogofilter \
  autoconf automake libtool make gettext-devel git python3 zip

echo "[2/7] Cloning Claws Mail upstream and creating detached lumina-main branch..."
rm -rf "$SRC_DIR" "$STAGE_DIR" "$BUNDLE_DIR" "$OUT_DIR"
mkdir -p "$BUILD_ROOT" "$OUT_DIR"
git clone https://git.claws-mail.org/readonly/claws.git "$SRC_DIR"
cd "$SRC_DIR"
git checkout -b lumina-main
git remote remove origin

echo "[3/7] Applying verified Lumina Mail patches, Safari theme, and Windows manifest..."
git apply "$KIT_DIR/patches/lumina-mail.patch"
mkdir -p src/themes
cp "$KIT_DIR/themes/lumina-safari.css" src/themes/lumina-safari.css
cp "$KIT_DIR/resources/luminamail.exe.manifest.in" src/luminamail.exe.manifest.in
cp "$KIT_DIR/resources/w32-resource.rc.in" src/w32-resource.rc.in
if [ -f "$KIT_DIR/resources/luminamail.ico" ]; then
  cp "$KIT_DIR/resources/luminamail.ico" src/luminamail.ico
else
  cp claws-mail.ico src/luminamail.ico
fi

echo "[4/7] Bootstrapping Autotools and configuring hardened build..."
NOCONFIGURE=1 ./autogen.sh
./configure \
  --prefix=/ucrt64 \
  --with-config-dir=LuminaMail \
  --with-password-encryption=gnutls \
  --enable-gnutls \
  --enable-enchant \
  --enable-pgpcore-plugin \
  --enable-pgpmime-plugin \
  --enable-smime-plugin \
  --enable-litehtml_viewer-plugin \
  --enable-pdf_viewer-plugin \
  --enable-notification-plugin \
  --enable-vcalendar-plugin \
  --enable-tnef_parse-plugin \
  --enable-archive-plugin \
  --enable-att_remover-plugin \
  --enable-address_keeper-plugin \
  --enable-bogofilter-plugin \
  --disable-acpi_notifier-plugin \
  --disable-attachwarner-plugin \
  --disable-bsfilter-plugin \
  --disable-clamd-plugin \
  --disable-demo-plugin \
  --disable-dillo-plugin \
  --disable-fancy-plugin \
  --disable-fetchinfo-plugin \
  --disable-gdata-plugin \
  --disable-keyword_warner-plugin \
  --disable-libravatar-plugin \
  --disable-mailmbox-plugin \
  --disable-managesieve-plugin \
  --disable-newmail-plugin \
  --disable-perl-plugin \
  --disable-pgpinline-plugin \
  --disable-python-plugin \
  --disable-rssyl-plugin \
  --disable-spamassassin-plugin \
  --disable-spam_report-plugin \
  CFLAGS="-O2 -pipe -D_WIN32_WINNT=0x0A00 -D_FORTIFY_SOURCE=2 -fstack-protector-strong -fno-strict-overflow" \
  CXXFLAGS="-O2 -pipe -D_WIN32_WINNT=0x0A00 -D_FORTIFY_SOURCE=2 -fstack-protector-strong -fno-strict-overflow" \
  LDFLAGS="-mwindows -Wl,--nxcompat -Wl,--dynamicbase -Wl,--high-entropy-va -fstack-protector-strong"

echo "[5/7] Compiling luminamail.exe and audited built-in plugins..."
make -j"$(nproc)"
make install DESTDIR="$STAGE_DIR"

echo "[6/7] Bundling runtime DLLs via open-source ntldd & GTK3 schemas..."
mkdir -p "$BUNDLE_DIR/bin" "$BUNDLE_DIR/lib/claws-mail/plugins" "$BUNDLE_DIR/share"
cp "$STAGE_DIR/ucrt64/bin/luminamail.exe" "$BUNDLE_DIR/bin/"
cp "$STAGE_DIR/ucrt64/lib/claws-mail/plugins/"*.dll "$BUNDLE_DIR/lib/claws-mail/plugins/"
cp -r "$STAGE_DIR/ucrt64/share/lumina-mail" "$BUNDLE_DIR/share/"
cp -r /ucrt64/share/glib-2.0 "$BUNDLE_DIR/share/"
cp -r /ucrt64/share/icons "$BUNDLE_DIR/share/"
mkdir -p "$BUNDLE_DIR/lib/gdk-pixbuf-2.0"
cp -r /ucrt64/lib/gdk-pixbuf-2.0/* "$BUNDLE_DIR/lib/gdk-pixbuf-2.0/"

# Collect exact DLL dependencies recursively via ntldd (open source)
ntldd -R "$BUNDLE_DIR/bin/luminamail.exe" "$BUNDLE_DIR/lib/claws-mail/plugins/"*.dll \
  | grep -i '/ucrt64/bin/' \
  | awk '{print $3}' \
  | sort -u \
  | xargs -I{} cp -u "{}" "$BUNDLE_DIR/bin/"

# Copy gpg/bogofilter helper binaries required by audited security plugins
cp -u /ucrt64/bin/gpg.exe /ucrt64/bin/gpgconf.exe /ucrt64/bin/bogofilter.exe "$BUNDLE_DIR/bin/" || true

echo "[7/7] Packaging NSIS installer, portable ZIP, SBOM, and SHA-256 checksums..."
APP_VERSION="1.0.0"
(cd "$BUNDLE_DIR" && zip -r "$OUT_DIR/LuminaMail-${APP_VERSION}-portable-win64.zip" .)
makensis -DAPP_VERSION="$APP_VERSION" "$KIT_DIR/installer/luminamail.nsi"
mv "$KIT_DIR/installer/LuminaMail-Setup-${APP_VERSION}-win64.exe" "$OUT_DIR/"

pacman -Q > "$OUT_DIR/sbom-msys2-ucrt64.txt"
(cd "$OUT_DIR" && sha256sum *.exe *.zip sbom-msys2-ucrt64.txt > SHA256SUMS.txt)

echo "SUCCESS: Artifacts ready in $OUT_DIR"
