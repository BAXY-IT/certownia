import type { Dict } from "../i18n.js";

export const it: Dict = {
  "app.poweredBy": "Basato su Let's Encrypt",

  "hero.title": "Un certificato SSL gratuito in pochi minuti",
  "hero.subtitle":
    "Genera un certificato HTTPS affidabile per il tuo dominio. Gratis, senza registrazione, senza installare nulla.",
  "hero.trust.title": "La tua chiave privata non lascia mai questo computer",
  "hero.trust.body":
    "Tutta la crittografia avviene nel tuo browser, che comunica direttamente con Let's Encrypt. Nessun server sta nel mezzo e nessuno vede la tua chiave privata. Il codice è open source — puoi verificarlo tu stesso.",
  "hero.start": "Inizia",
  "hero.step1": "Inserisci il tuo dominio",
  "hero.step1.desc": "Digita l'indirizzo per cui vuoi un certificato.",
  "hero.step2": "Dimostra la proprietà",
  "hero.step2.desc": "Aggiungi un record DNS o un file sul tuo server — ti mostriamo esattamente quale.",
  "hero.step3": "Scarica il certificato",
  "hero.step3.desc": "La chiave privata e il certificato finiscono sul tuo disco.",

  "cfg.title": "Configurazione del certificato",
  "cfg.domains.label": "Domini",
  "cfg.domains.hint":
    "Uno o più domini (separali con uno spazio o una virgola). Il wildcard * è possibile solo con la validazione DNS.",
  "cfg.domains.placeholder": "example.com www.example.com",
  "a11y.theme": "Cambia tema chiaro/scuro",
  "a11y.language": "Lingua",
  "cfg.email.label": "Email (facoltativa)",
  "cfg.email.hint":
    "Let's Encrypt la usa solo per le notifiche di scadenza. Puoi lasciarla vuota.",
  "cfg.email.placeholder": "you@example.com",
  "cfg.env.label": "Ambiente",
  "cfg.env.staging": "Test (staging)",
  "cfg.env.staging.hint":
    "Consigliato per iniziare. Il certificato NON è considerato affidabile dai browser, ma non consuma i limiti di richieste. Ideale per verificare che tutto funzioni.",
  "cfg.env.production": "Produzione (certificato reale)",
  "cfg.env.production.hint":
    "Emette un certificato affidabile per i browser. Si applicano i limiti di richieste di Let's Encrypt — usalo quando il test è andato a buon fine.",
  "cfg.keytype.label": "Tipo di chiave",
  "cfg.keytype.info":
    "ECDSA P-256 — una chiave moderna e corta: più veloce e leggera. Consigliata per i server nuovi.\nRSA 2048 — lo standard classico: funziona quasi ovunque, anche su sistemi datati.\nRSA 4096 — una chiave RSA più lunga: massima compatibilità e più margine di sicurezza, ma più lenta.\nNon sei sicuro? Lascia ECDSA P-256.",
  "cfg.keytype.ecdsa.short": "consigliato, più veloce",
  "cfg.keytype.rsa4096.short": "massima compatibilità",
  "cfg.challenge.label": "Metodo di verifica",
  "cfg.challenge.dns": "DNS (record TXT)",
  "cfg.challenge.dns.hint":
    "Funziona ovunque, obbligatorio per i certificati wildcard. Devi avere accesso alle impostazioni DNS del dominio.",
  "cfg.challenge.http": "File sul server (HTTP)",
  "cfg.challenge.http.hint":
    "Più semplice se hai accesso al server web del dominio. Non funziona per il wildcard.",
  "cfg.tos.pre": "Accetto il ",
  "cfg.tos.link": "Contratto di abbonamento di Let's Encrypt",
  "cfg.tos.post": ".",
  "cfg.submit": "Continua",
  "cfg.back": "Indietro",

  "cfg.err.domains": "Inserisci almeno un dominio valido.",
  "cfg.err.domainInvalid": "Dominio non valido: {0}",
  "cfg.err.wildcardHttp":
    "Il dominio wildcard ({0}) richiede la validazione DNS — cambia il metodo di verifica.",
  "cfg.err.email": "Indirizzo email non valido.",
  "cfg.err.tos": "Devi accettare i termini per continuare.",

  "work.preparing": "Preparazione…",
  "work.genAccountKey": "Generazione della chiave dell'account ACME nel tuo browser…",
  "work.genCertKey": "Generazione della chiave privata del certificato nel tuo browser…",
  "work.register": "Registrazione dell'account su Let's Encrypt…",
  "work.newOrder": "Creazione dell'ordine del certificato…",
  "work.fetchChallenges": "Recupero delle prove di verifica…",
  "work.finalizing": "Invio della richiesta di firma (CSR)…",
  "work.downloading": "Download del certificato finito…",

  "chal.title": "Dimostra che il dominio è tuo",
  "chal.dns.intro":
    "Aggiungi i record TXT qui sotto nel pannello DNS del tuo dominio. Dopo il salvataggio e la propagazione, clicca “Verifica”.",
  "chal.http.intro":
    "Metti i file qui sotto sul tuo server web (esattamente all'URL indicato), poi clicca “Verifica”.",
  "chal.dns.name": "Nome / host",
  "chal.dns.type": "Tipo",
  "chal.dns.value": "Valore",
  "chal.http.path": "URL del file",
  "chal.http.content": "Contenuto del file",
  "chal.http.download": "Scarica il file",
  "chal.copy": "Copia",
  "chal.copied": "Copiato!",
  "chal.dns.propagation":
    "Nota: le modifiche al DNS possono impiegare da qualche minuto a un'ora per propagarsi. Se la verifica non riesce, aspetta e riprova.",
  "chal.verify": "Verifica il dominio",
  "chal.verifying": "Verifica in corso…",
  "chal.verifyLocked":
    "Il pulsante “Verifica” si sblocca quando rileviamo il record nel DNS. Aggiungi il record, poi clicca “Controlla se il record è già visibile”.",
  "chal.recordChanged":
    "Dopo il tentativo fallito abbiamo generato un nuovo record. Il nome è lo stesso, ma il VALORE è cambiato — sostituiscilo nel DNS, controlla la propagazione, poi verifica.",
  "chal.verifyAnyway": "Sei sicuro di averlo aggiunto ma non lo rileviamo ancora? Verifica comunque.",

  "doh.check": "Controlla se il record è già visibile",
  "doh.checking": "Controllo del DNS…",
  "doh.ok": "Record visibile nel DNS — ora puoi verificare",
  "doh.pending": "Non ancora visibile — aspetta un momento e ricontrolla",
  "doh.error": "Impossibile controllare il DNS — riprova",
  "doh.hint":
    "Controlla prima la propagazione, così non clicchi “Verifica” alla cieca (un tentativo fallito richiede la generazione di un nuovo record).",
  "doh.privacy":
    "Il controllo della propagazione usa i DNS pubblici di Cloudflare e Google — a loro viene inviato solo il nome del tuo dominio.",

  "provider.detected": "Provider DNS rilevato: {0}",
  "provider.hostList": "Apri il pannello del tuo hosting…",
  "provider.steps":
    "Accedi al pannello del tuo hosting o provider DNS.\nApri le impostazioni DNS del dominio (“Zona DNS” / “Modifica DNS” / “Record DNS”).\nAggiungi un nuovo record TXT — usa “Host/Nome” e “Valore” dalla tabella qui sopra.\nSalva e attendi qualche minuto per la propagazione.",
  "provider.generic": "Aggiungi il record nel pannello DNS del tuo provider del dominio.",

  "http.where.title": "Dove mettere il file",
  "http.where.body":
    "Metti il file sul server web del dominio in modo che sia raggiungibile esattamente all'URL qui sopra — cioè nella cartella .well-known/acme-challenge nella radice del tuo sito. Deve funzionare via HTTP (port 80).",
  "httpcheck.checking": "Controllo del file…",
  "httpcheck.ok": "File visibile — ora puoi verificare",
  "httpcheck.pending": "File non trovato (o contenuto errato) — controlla e riprova",
  "httpcheck.error": "Impossibile controllare automaticamente — apri il file manualmente",
  "http.check": "Controlla se il file è raggiungibile",
  "http.open": "Apri il file",
  "http.checkNote":
    "Il controllo automatico è approssimativo — il file viene recuperato da un servizio esterno (allorigins.win), poiché il browser non può leggerlo direttamente. Se non funziona, clicca “Apri il file”, verifica di vedere il contenuto del file, poi clicca “Verifica comunque”.",
  "chal.verifyLockedHttp":
    "Il pulsante “Verifica” si sblocca quando rileviamo il file. Clicca “Controlla se il file è raggiungibile” o “Apri il file”.",

  "resume.text": "Hai una verifica non completata per {0}.",
  "resume.hint": "Puoi riprenderla — i dati (il record) sono gli stessi, non c'è nulla da aggiungere di nuovo.",
  "resume.continue": "Riprendi la verifica",
  "resume.discard": "Ricomincia",
  "resume.restoring": "Ripristino della verifica salvata…",

  "done.title": "Fatto! Il tuo certificato SSL è pronto",
  "done.subtitle":
    "Qui sotto passo dopo passo: cosa scaricare e dove esattamente incollarlo. Non devi capire la crittografia — basta abbinare i file ai campi del tuo pannello.",
  "done.staging.warning":
    "Questo è un certificato di TEST (staging) — i browser non lo considereranno affidabile. Quando tutto funziona, torna qui ed emetti un certificato di produzione.",

  "done.step1": "Passo 1 · Scarica i file",
  "done.step1.body":
    "Sono semplici file di testo (.pem). Non sempre ti servono tutti — il passo 2 ti dice quali usare.",
  "done.dl.key": "Chiave privata",
  "done.dl.key.h": "Segreta — tienila per te, non inviarla mai a nessuno.",
  "done.dl.cert": "Solo il certificato",
  "done.dl.cert.h": "Il certificato del tuo dominio.",
  "done.dl.chain": "Catena / Root CA",
  "done.dl.chain.h": "I certificati intermedi dell'autorità.",
  "done.dl.fullchain": "Certificato + catena insieme",
  "done.dl.fullchain.h": "Un unico file: certificato e catena. Comune in Nginx e quando un pannello chiede il “fullchain”.",

  "done.step2": "Passo 2 · Aggiungi i file nel pannello dell'hosting",
  "done.step2.body":
    "Apri il pannello del tuo hosting → la sezione “SSL” o “Certificati”. Vedrai dei campi in cui incollare. Abbina i file ai campi in base al nome:",
  "done.map.key": "Campo “Chiave privata” (Private Key)",
  "done.map.cert": "Campo “Certificato” (Certificate)",
  "done.map.chain": "Campo “Root CA”, “CA” o “catena”",
  "done.map.fullchain":
    "Il pannello ha un solo campo per il certificato o chiede il “fullchain”? Allora usa fullchain.pem al posto di cert.pem e chain.pem.",
  "done.step2.how":
    "Apri ogni file in un editor di testo, seleziona e copia TUTTO il contenuto — comprese le righe “-----BEGIN…” e “-----END…” — e incollalo nel campo giusto. Poi salva. Il certificato di solito funziona subito (a volte dopo una breve attesa).",
  "done.secret":
    "La chiave privata (privkey.pem) è segreta — tienila per te e non inviarla né incollarla mai in luoghi non affidabili.",

  "done.expiry":
    "Il certificato è valido per 90 giorni — poi va rinnovato. Imposta un promemoria oppure (se gestisci un tuo server) automatizzalo come mostrato sotto.",
  "done.whatnow": "Gestisci un tuo server (VPS)?",
  "done.whatnow.body":
    "Nella configurazione indica: certificato = fullchain.pem, chiave privata = privkey.pem. In Nginx sono ssl_certificate e ssl_certificate_key; in Apache SSLCertificateFile e SSLCertificateKeyFile.",
  "alt.title": "Preferisci il terminale? Fallo sul tuo server",
  "alt.body":
    "La stessa cosa, ma come comando sul tuo server: certbot (o acme.sh) ti chiederà di aggiungere un record TXT — esattamente come nella procedura guidata qui sopra — ed emetterà il certificato. Basta sostituire example.com con il tuo dominio.",
  "alt.note": "È un comando una tantum — non si rinnova da solo.",
  "alt.renewToggle": "Rinnovo automatico — come impostarlo (espandi)",

  "renew.title": "Come far sì che il certificato si rinnovi da solo",
  "renew.body":
    "Il certificato è valido per 90 giorni. Invece di farlo a mano ogni 3 mesi, scegli la tua situazione:",
  "renew.shared.title": "Hosting condiviso (cyberFolks, OVH, nazwa.pl…)",
  "renew.shared.body":
    "Il modo più semplice: il pannello del tuo hosting di solito offre un certificato SSL gratuito che si rinnova da solo (Let's Encrypt / AutoSSL). Attivalo una volta e sei a posto — cerca una sezione “SSL” o “Certificati”. Allora non ti servono né certbot né BAXY SSL.",
  "renew.vps.title": "Hai un tuo server (VPS) e vuoi l'automazione completa?",
  "renew.vps.body":
    "Usa certbot — rinnova il certificato da solo. Scegli un metodo. I comandi includono già “--deploy-hook” così il server ricarica il nuovo certificato dopo il rinnovo — cambia “nginx” in “apache2” se usi Apache:",
  "renew.webroot.label":
    "1) Sito servito via HTTP — il metodo “webroot” (sostituisci /var/www/html con la cartella del tuo sito):",
  "renew.dns.label":
    "2) Wildcard o nessun accesso via HTTP — tramite l'API del tuo provider DNS (esempio con Cloudflare):",
  "renew.dns.steps":
    "Installa il plugin del tuo provider (es. python3-certbot-dns-cloudflare), salva un token API in ~/.secrets/cloudflare.ini, poi esegui. Un provider diverso = un plugin diverso (dns-ovh, dns-google, ecc.).",
  "done.again": "Generane un altro",

  "err.title": "Qualcosa è andato storto",
  "err.retry": "Riprova",
  "err.startOver": "Ricomincia (dominio diverso)",
  "err.verifyFailed":
    "Non siamo riusciti a verificare il dominio. Di solito il record non si è ancora propagato, oppure il suo valore non corrisponde. Clicca “Riprova” — genereremo un nuovo record: il nome resta lo stesso, cambia solo il valore. Aggiorna il valore nel DNS, controlla la propagazione, poi verifica. Il tuo dominio e le impostazioni vengono conservati — non serve ricominciare.",
  "err.network":
    "Impossibile raggiungere il server proxy. Controlla che il proxy ACME sia in esecuzione (vedi README) e riprova.",
  "err.rateLimited":
    "Limite di richieste di Let's Encrypt raggiunto. Usa l'ambiente di staging per i test, oppure aspetta. Dettagli nella console.",

  "step.config": "Configurazione",
  "step.verify": "Verifica",
  "step.download": "Scarica",

  "footer.madeBy": "Un progetto open-source di",
  "footer.source": "Codice sorgente",
  "footer.privacy": "Privacy",
  "footer.terms": "Termini",
  "cmd.caveat":
    "Eseguilo sul tuo server, a tuo rischio — controllalo prima. Include --agree-tos, che accetta i termini di Let's Encrypt per tuo conto.",
  "footer.notAffiliated":
    "BAXY SSL è un progetto open source, non affiliato né sponsorizzato o approvato da Let's Encrypt o ISRG. Let's Encrypt è un servizio gratuito e un marchio di ISRG.",
};
