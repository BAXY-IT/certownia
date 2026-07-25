import type { Dict } from "../i18n.js";

// German.
export const de: Dict = {
  "app.poweredBy": "Ermöglicht durch Let's Encrypt",

  "hero.title": "Ein kostenloses SSL-Zertifikat in wenigen Minuten",
  "hero.subtitle":
    "Erstelle ein vertrauenswürdiges HTTPS-Zertifikat für deine Domain. Kostenlos, ohne Anmeldung, ohne Installation.",
  "hero.trust.title": "Dein privater Schlüssel verlässt niemals diesen Computer",
  "hero.trust.body":
    "Die gesamte Kryptografie läuft in deinem Browser, der direkt mit Let's Encrypt spricht. Kein Server sitzt dazwischen, und niemand sieht deinen privaten Schlüssel. Der Code ist Open Source — du kannst es selbst überprüfen.",
  "hero.start": "Los geht's",
  "hero.step1": "Gib deine Domain ein",
  "hero.step1.desc": "Tippe die Adresse ein, für die du ein Zertifikat möchtest.",
  "hero.step2": "Weise die Inhaberschaft nach",
  "hero.step2.desc": "Füge einen DNS-Eintrag oder eine Datei auf deinem Server hinzu — wir zeigen dir genau welche.",
  "hero.step3": "Lade das Zertifikat herunter",
  "hero.step3.desc": "Privater Schlüssel und Zertifikat landen auf deiner Festplatte.",

  "cfg.title": "Zertifikat-Konfiguration",
  "cfg.domains.label": "Domains",
  "cfg.domains.hint":
    "Eine oder mehrere Domains (mit Leerzeichen oder Komma trennen). Wildcard * ist nur mit DNS-Validierung möglich.",
  "cfg.domains.placeholder": "example.com www.example.com",
  "a11y.theme": "Helles/dunkles Design umschalten",
  "a11y.language": "Sprache",
  "cfg.email.label": "E-Mail (optional)",
  "cfg.email.hint":
    "Let's Encrypt nutzt sie nur für Benachrichtigungen über das Ablaufen. Du kannst sie leer lassen.",
  "cfg.email.placeholder": "you@example.com",
  "cfg.env.label": "Umgebung",
  "cfg.env.staging": "Test (Staging)",
  "cfg.env.staging.hint":
    "Zuerst empfohlen. Das Zertifikat wird von Browsern NICHT als vertrauenswürdig eingestuft, verbraucht aber keine Limits. Ideal, um zu prüfen, ob alles funktioniert.",
  "cfg.env.production": "Produktiv (echtes Zertifikat)",
  "cfg.env.production.hint":
    "Stellt ein von Browsern als vertrauenswürdig eingestuftes Zertifikat aus. Es gelten die Limits von Let's Encrypt — nutze es, sobald dein Test erfolgreich war.",
  "cfg.keytype.label": "Schlüsseltyp",
  "cfg.keytype.info":
    "ECDSA P-256 — ein moderner, kurzer Schlüssel: schneller und leichter. Für neue Server empfohlen.\nRSA 2048 — der klassische Standard: läuft fast überall, auch auf älteren Systemen.\nRSA 4096 — ein längerer RSA-Schlüssel: größte Kompatibilität und mehr Sicherheitsreserve, aber langsamer.\nUnsicher? Behalte ECDSA P-256.",
  "cfg.keytype.ecdsa.short": "empfohlen, schneller",
  "cfg.keytype.rsa4096.short": "größte Kompatibilität",
  "cfg.challenge.label": "Verifizierungsmethode",
  "cfg.challenge.dns": "DNS (TXT-Eintrag)",
  "cfg.challenge.dns.hint":
    "Funktioniert überall, erforderlich für Wildcard-Zertifikate. Du brauchst Zugriff auf die DNS-Einstellungen der Domain.",
  "cfg.challenge.http": "Datei auf dem Server (HTTP)",
  "cfg.challenge.http.hint":
    "Einfacher, wenn du Zugriff auf den Webserver der Domain hast. Funktioniert nicht für Wildcard.",
  "cfg.tos.pre": "Ich akzeptiere die ",
  "cfg.tos.link": "Abonnementvereinbarung von Let's Encrypt",
  "cfg.tos.post": ".",
  "cfg.submit": "Weiter",
  "cfg.back": "Zurück",

  "cfg.err.domains": "Gib mindestens eine gültige Domain ein.",
  "cfg.err.domainInvalid": "Ungültige Domain: {0}",
  "cfg.err.wildcardHttp":
    "Wildcard-Domain ({0}) erfordert DNS-Validierung — wechsle die Verifizierungsmethode.",
  "cfg.err.email": "Ungültige E-Mail-Adresse.",
  "cfg.err.tos": "Du musst die Bedingungen akzeptieren, um fortzufahren.",

  "work.preparing": "Wird vorbereitet…",
  "work.genAccountKey": "ACME-Kontoschlüssel wird in deinem Browser erzeugt…",
  "work.genCertKey": "Privater Zertifikatsschlüssel wird in deinem Browser erzeugt…",
  "work.register": "Konto wird bei Let's Encrypt registriert…",
  "work.newOrder": "Zertifikatsbestellung wird erstellt…",
  "work.fetchChallenges": "Verifizierungsaufgaben werden abgerufen…",
  "work.finalizing": "Signieranfrage (CSR) wird gesendet…",
  "work.downloading": "Fertiges Zertifikat wird heruntergeladen…",

  "chal.title": "Weise nach, dass die Domain dir gehört",
  "chal.dns.intro":
    "Füge die untenstehenden TXT-Einträge im DNS-Panel deiner Domain hinzu. Nach dem Speichern und der Propagation klicke auf “Verifizieren”.",
  "chal.http.intro":
    "Lege die untenstehenden Dateien auf deinem Webserver ab (genau unter der angezeigten URL) und klicke dann auf “Verifizieren”.",
  "chal.dns.name": "Name / Host",
  "chal.dns.type": "Typ",
  "chal.dns.value": "Wert",
  "chal.http.path": "Datei-URL",
  "chal.http.content": "Dateiinhalt",
  "chal.http.download": "Datei herunterladen",
  "chal.copy": "Kopieren",
  "chal.copied": "Kopiert!",
  "chal.dns.propagation":
    "Hinweis: DNS-Änderungen brauchen ein paar Minuten bis zu einer Stunde, um sich zu verbreiten. Wenn die Verifizierung fehlschlägt, warte und versuche es erneut.",
  "chal.verify": "Domain verifizieren",
  "chal.verifying": "Wird verifiziert…",
  "chal.verifyLocked":
    "Der Button “Verifizieren” wird freigeschaltet, sobald wir den Eintrag im DNS erkennen. Füge den Eintrag hinzu und klicke dann auf “Prüfen, ob der Eintrag schon sichtbar ist”.",
  "chal.recordChanged":
    "Nach dem gescheiterten Versuch haben wir einen neuen Eintrag erzeugt. Der Name ist derselbe, aber der WERT hat sich geändert — ersetze ihn im DNS, prüfe die Propagation und verifiziere dann.",
  "chal.verifyAnyway": "Sicher hinzugefügt, aber wir erkennen es trotzdem nicht? Trotzdem verifizieren.",

  "doh.check": "Prüfen, ob der Eintrag schon sichtbar ist",
  "doh.checking": "DNS wird geprüft…",
  "doh.ok": "Eintrag im DNS sichtbar — du kannst jetzt verifizieren",
  "doh.pending": "Noch nicht sichtbar — warte einen Moment und prüfe erneut",
  "doh.error": "DNS konnte nicht geprüft werden — versuche es erneut",
  "doh.hint":
    "Prüfe zuerst die Propagation, damit du nicht blind auf “Verifizieren” klickst (ein gescheiterter Versuch erfordert das Erzeugen eines neuen Eintrags).",
  "doh.privacy":
    "Die Propagationsprüfung nutzt die öffentlichen DNS-Server von Cloudflare und Google — an sie wird nur dein Domainname gesendet.",

  "provider.detected": "Erkannter DNS-Anbieter: {0}",
  "provider.hostList": "Panel deines Hosters öffnen…",
  "provider.steps":
    "Melde dich im Panel deines Hosters oder DNS-Anbieters an.\nÖffne die DNS-Einstellungen deiner Domain („DNS-Zone“ / „DNS bearbeiten“ / „DNS-Einträge“).\nFüge einen neuen TXT-Eintrag hinzu — nutze „Host/Name“ und „Wert“ aus der Tabelle oben.\nSpeichere und warte ein paar Minuten auf die Propagation.",
  "provider.generic": "Füge den Eintrag im DNS-Panel deines Domain-Anbieters hinzu.",

  "http.where.title": "Wohin mit der Datei",
  "http.where.body":
    "Lege die Datei auf dem Webserver der Domain ab, sodass sie genau unter der obigen URL erreichbar ist — also im Ordner .well-known/acme-challenge im Stammverzeichnis deiner Website. Sie muss über HTTP (port 80) funktionieren.",
  "httpcheck.checking": "Datei wird geprüft…",
  "httpcheck.ok": "Datei sichtbar — du kannst jetzt verifizieren",
  "httpcheck.pending": "Datei nicht gefunden (oder falscher Inhalt) — prüfe und versuche es erneut",
  "httpcheck.error": "Automatische Prüfung nicht möglich — öffne die Datei manuell",
  "http.check": "Prüfen, ob die Datei erreichbar ist",
  "http.open": "Datei öffnen",
  "http.checkNote":
    "Die automatische Prüfung ist nur ungefähr — die Datei wird von einem externen Relay (allorigins.win) abgerufen, weil der Browser sie nicht direkt lesen kann. Falls es nicht klappt, klicke auf “Datei öffnen”, überzeuge dich, dass du den Inhalt der Datei siehst, und klicke dann auf “Trotzdem verifizieren”.",
  "chal.verifyLockedHttp":
    "Der Button “Verifizieren” wird freigeschaltet, sobald wir die Datei erkennen. Klicke auf “Prüfen, ob die Datei erreichbar ist” oder “Datei öffnen”.",

  "resume.text": "Du hast eine unvollständige Verifizierung für {0}.",
  "resume.hint": "Du kannst dorthin zurückkehren — die Daten (der Eintrag) sind dieselben, es muss nichts erneut hinzugefügt werden.",
  "resume.continue": "Verifizierung fortsetzen",
  "resume.discard": "Von vorn beginnen",
  "resume.restoring": "Gespeicherte Verifizierung wird wiederhergestellt…",

  "done.title": "Fertig! Dein SSL-Zertifikat ist bereit",
  "done.subtitle":
    "Schritt für Schritt unten: was du herunterlädst und wohin genau du es einfügst. Du musst nichts von Kryptografie verstehen — ordne einfach die Dateien den Feldern in deinem Panel zu.",
  "done.staging.warning":
    "Das ist ein TEST-Zertifikat (Staging) — Browser vertrauen ihm nicht. Sobald alles funktioniert, komm zurück und stelle ein Produktivzertifikat aus.",

  "done.step1": "Schritt 1 · Lade die Dateien herunter",
  "done.step1.body":
    "Das sind einfache Textdateien (.pem). Du brauchst nicht immer alle — Schritt 2 sagt dir, welche du verwendest.",
  "done.dl.key": "Privater Schlüssel",
  "done.dl.key.h": "Geheim — behalte ihn für dich und schicke ihn niemals jemandem.",
  "done.dl.cert": "Nur Zertifikat",
  "done.dl.cert.h": "Das Zertifikat deiner Domain.",
  "done.dl.chain": "Kette / Root CA",
  "done.dl.chain.h": "Die Zwischenzertifikate der Zertifizierungsstelle.",
  "done.dl.fullchain": "Zertifikat + Kette zusammen",
  "done.dl.fullchain.h": "Eine Datei: Zertifikat und Kette. Üblich bei Nginx und wenn ein Panel nach “fullchain” fragt.",

  "done.step2": "Schritt 2 · Füge die Dateien in deinem Hosting-Panel hinzu",
  "done.step2.body":
    "Öffne dein Hosting-Panel → den Bereich “SSL” oder “Zertifikate”. Du siehst Felder zum Einfügen. Ordne die Dateien den Feldern nach Namen zu:",
  "done.map.key": "Feld “Privater Schlüssel” (Private Key)",
  "done.map.cert": "Feld “Zertifikat” (Certificate)",
  "done.map.chain": "Feld “Root CA”, “CA” oder “Kette”",
  "done.map.fullchain":
    "Hat das Panel nur ein Zertifikatsfeld oder fragt es nach “fullchain”? Dann nimm fullchain.pem statt cert.pem und chain.pem.",
  "done.step2.how":
    "Öffne jede Datei in einem Texteditor, markiere und kopiere den GESAMTEN Inhalt — einschließlich der Zeilen “-----BEGIN…” und “-----END…” — und füge ihn in das passende Feld ein. Speichere dann. Das Zertifikat funktioniert meist sofort (manchmal nach kurzem Warten).",
  "done.secret":
    "Der private Schlüssel (privkey.pem) ist geheim — behalte ihn für dich und schicke ihn niemals jemandem und füge ihn nie an unsicheren Stellen ein.",

  "done.expiry":
    "Das Zertifikat ist 90 Tage gültig — danach muss es erneuert werden. Richte dir eine Erinnerung ein oder (wenn du einen eigenen Server betreibst) automatisiere es wie unten beschrieben.",
  "done.whatnow": "Betreibst du einen eigenen Server (VPS)?",
  "done.whatnow.body":
    "Verweise in der Konfiguration: Zertifikat = fullchain.pem, privater Schlüssel = privkey.pem. In Nginx sind das ssl_certificate und ssl_certificate_key, in Apache SSLCertificateFile und SSLCertificateKeyFile.",
  "alt.title": "Lieber das Terminal? Mach es auf deinem Server",
  "alt.body":
    "Dasselbe, aber als Befehl auf deinem Server: certbot (oder acme.sh) bittet dich, einen TXT-Eintrag hinzuzufügen — genau wie der Assistent oben — und stellt das Zertifikat aus. Tausche nur example.com gegen deine Domain.",
  "alt.note": "Das ist ein einmaliger Befehl — er erneuert sich nicht von selbst.",
  "alt.renewToggle": "Automatische Erneuerung — so richtest du sie ein (aufklappen)",

  "renew.title": "So sorgst du dafür, dass sich das Zertifikat selbst erneuert",
  "renew.body":
    "Das Zertifikat ist 90 Tage gültig. Statt das alle 3 Monate von Hand zu machen, wähle deine Situation:",
  "renew.shared.title": "Shared Hosting (cyberFolks, OVH, nazwa.pl…)",
  "renew.shared.body":
    "Am einfachsten: Dein Hosting-Panel bietet meist ein kostenloses, sich selbst erneuerndes SSL-Zertifikat (Let's Encrypt / AutoSSL). Aktiviere es einmal und du bist fertig — suche nach einem Bereich “SSL” oder “Zertifikate”. Dann brauchst du weder certbot noch BAXY SSL.",
  "renew.vps.title": "Hast du einen eigenen Server (VPS) und willst volle Automatisierung?",
  "renew.vps.body":
    "Nutze certbot — es erneuert das Zertifikat von selbst. Wähle eine Methode. Die Befehle enthalten bereits “--deploy-hook”, damit der Server das neue Zertifikat nach der Erneuerung neu lädt — ändere “nginx” in “apache2”, wenn du Apache verwendest:",
  "renew.webroot.label":
    "1) Website wird über HTTP ausgeliefert — die “webroot”-Methode (ersetze /var/www/html durch das Verzeichnis deiner Website):",
  "renew.dns.label":
    "2) Wildcard oder kein HTTP-Zugriff — über die API deines DNS-Anbieters (Beispiel Cloudflare):",
  "renew.dns.steps":
    "Installiere das Plugin deines Anbieters (z. B. python3-certbot-dns-cloudflare), speichere ein API-Token in ~/.secrets/cloudflare.ini und führe es aus. Ein anderer Anbieter = ein anderes Plugin (dns-ovh, dns-google usw.).",
  "done.again": "Weiteres erzeugen",

  "err.title": "Etwas ist schiefgelaufen",
  "err.retry": "Erneut versuchen",
  "err.startOver": "Von vorn beginnen (andere Domain)",
  "err.verifyFailed":
    "Wir konnten die Domain nicht verifizieren. Meist hat sich der Eintrag noch nicht verbreitet oder sein Wert stimmt nicht überein. Klicke auf “Erneut versuchen” — wir erzeugen einen neuen Eintrag: der Name bleibt gleich, nur der Wert ändert sich. Aktualisiere den Wert im DNS, prüfe die Propagation und verifiziere dann. Deine Domain und Einstellungen bleiben erhalten — du musst nicht von vorn beginnen.",
  "err.network":
    "Der Proxy-Server war nicht erreichbar. Prüfe, ob der ACME-Proxy läuft (siehe README), und versuche es erneut.",
  "err.rateLimited":
    "Limit von Let's Encrypt erreicht. Nutze für Tests die Staging-Umgebung oder warte. Details in der Konsole.",

  "step.config": "Konfiguration",
  "step.verify": "Verifizierung",
  "step.download": "Herunterladen",

  "footer.madeBy": "Ein Open-Source-Projekt von",
  "footer.source": "Quellcode",
  "footer.privacy": "Datenschutz",
  "footer.terms": "Nutzungsbedingungen",
  "cmd.caveat":
    "Führe ihn auf deinem eigenen Server und auf eigenes Risiko aus — prüfe ihn vorher. Er enthält --agree-tos, akzeptiert die Let's-Encrypt-Bedingungen also in deinem Namen.",
  "footer.notAffiliated":
    "BAXY SSL ist ein Open-Source-Projekt und steht in keiner Verbindung zu Let's Encrypt oder ISRG und wird von ihnen weder gesponsert noch unterstützt. Let's Encrypt ist ein kostenloser Dienst und eine Marke von ISRG.",
};
