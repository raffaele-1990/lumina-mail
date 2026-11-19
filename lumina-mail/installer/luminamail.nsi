; Lumina Mail Open-Source NSIS Installer (zlib/libpng License)
!include "MUI2.nsh"

!define APP_NAME "Lumina Mail"
!define APP_EXE "luminamail.exe"
!ifndef APP_VERSION
  !define APP_VERSION "1.0.0"
!endif

Name "${APP_NAME} ${APP_VERSION}"
OutFile "LuminaMail-Setup-${APP_VERSION}-win64.exe"
InstallDir "$LOCALAPPDATA\Programs\LuminaMail"
InstallDirRegKey HKCU "Software\LuminaMail" "InstallDir"
RequestExecutionLevel user
Unicode true
SetCompressor /SOLID lzma

!define MUI_ABORTWARNING
!define MUI_ICON "..\resources\luminamail.ico"
!define MUI_UNICON "..\resources\luminamail.ico"

!insertmacro MUI_PAGE_WELCOME
!insertmacro MUI_PAGE_DIRECTORY
!insertmacro MUI_PAGE_INSTFILES
!define MUI_FINISHPAGE_RUN "$INSTDIR\bin\${APP_EXE}"
!insertmacro MUI_PAGE_FINISH

!insertmacro MUI_UNPAGE_CONFIRM
!insertmacro MUI_UNPAGE_INSTFILES

!insertmacro MUI_LANGUAGE "English"
!insertmacro MUI_LANGUAGE "Italian"

Section "Lumina Mail Core" SecCore
  SetOutPath "$INSTDIR"
  File /r "dist-bundle\*.*"

  WriteUninstaller "$INSTDIR\Uninstall.exe"
  WriteRegStr HKCU "Software\LuminaMail" "InstallDir" "$INSTDIR"
  WriteRegStr HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\LuminaMail" "DisplayName" "${APP_NAME}"
  WriteRegStr HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\LuminaMail" "UninstallString" '"$INSTDIR\Uninstall.exe"'
  WriteRegStr HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\LuminaMail" "DisplayIcon" "$INSTDIR\bin\${APP_EXE}"
  WriteRegStr HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\LuminaMail" "DisplayVersion" "${APP_VERSION}"
  WriteRegDWORD HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\LuminaMail" "NoModify" 1
  WriteRegDWORD HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\LuminaMail" "NoRepair" 1

  CreateDirectory "$SMPROGRAMS\${APP_NAME}"
  CreateShortcut "$SMPROGRAMS\${APP_NAME}\${APP_NAME}.lnk" "$INSTDIR\bin\${APP_EXE}" "" "$INSTDIR\bin\${APP_EXE}" 0
  CreateShortcut "$SMPROGRAMS\${APP_NAME}\Uninstall ${APP_NAME}.lnk" "$INSTDIR\Uninstall.exe"
  CreateShortcut "$DESKTOP\${APP_NAME}.lnk" "$INSTDIR\bin\${APP_EXE}" "" "$INSTDIR\bin\${APP_EXE}" 0
SectionEnd

Section "Uninstall"
  Delete "$DESKTOP\${APP_NAME}.lnk"
  RMDir /r "$SMPROGRAMS\${APP_NAME}"
  RMDir /r "$INSTDIR"
  DeleteRegKey HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\LuminaMail"
  DeleteRegKey HKCU "Software\LuminaMail"
SectionEnd
