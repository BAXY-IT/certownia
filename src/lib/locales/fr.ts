import type { Dict } from "../i18n.js";

export const fr: Dict = {
  "app.poweredBy": "Propulsé par Let's Encrypt",

  "hero.title": "Un certificat SSL gratuit en quelques minutes",
  "hero.subtitle":
    "Générez un certificat HTTPS de confiance pour votre domaine. Gratuit, sans inscription, rien à installer.",
  "hero.trust.title": "Votre clé privée ne quitte jamais cet ordinateur",
  "hero.trust.body":
    "Toute la cryptographie se déroule dans votre navigateur, qui communique directement avec Let's Encrypt. Aucun serveur ne s'interpose, et personne ne voit votre clé privée. Le code est open source — vous pouvez le vérifier vous-même.",
  "hero.start": "Commencer",
  "hero.step1": "Saisissez votre domaine",
  "hero.step1.desc": "Tapez l'adresse pour laquelle vous voulez un certificat.",
  "hero.step2": "Prouvez que le domaine vous appartient",
  "hero.step2.desc":
    "Ajoutez un enregistrement DNS ou un fichier sur votre serveur — nous vous montrons exactement lequel.",
  "hero.step3": "Téléchargez le certificat",
  "hero.step3.desc": "La clé privée et le certificat arrivent sur votre disque.",

  "cfg.title": "Configuration du certificat",
  "cfg.domains.label": "Domaines",
  "cfg.domains.hint":
    "Un ou plusieurs domaines (séparez-les par une espace ou une virgule). Le wildcard * n'est possible qu'avec la validation DNS.",
  "cfg.domains.placeholder": "example.com www.example.com",
  "a11y.theme": "Basculer le thème clair/sombre",
  "a11y.language": "Langue",
  "cfg.email.label": "E-mail (facultatif)",
  "cfg.email.hint":
    "Let's Encrypt ne l'utilise que pour les notifications d'expiration. Vous pouvez le laisser vide.",
  "cfg.email.placeholder": "you@example.com",
  "cfg.env.label": "Environnement",
  "cfg.env.staging": "Test (staging)",
  "cfg.env.staging.hint":
    "Recommandé pour commencer. Le certificat n'est PAS reconnu par les navigateurs, mais il ne consomme pas les limites d'usage. Idéal pour vérifier que tout fonctionne.",
  "cfg.env.production": "Production (certificat réel)",
  "cfg.env.production.hint":
    "Émet un certificat reconnu par les navigateurs. Les limites d'usage de Let's Encrypt s'appliquent — utilisez-le une fois votre test réussi.",
  "cfg.keytype.label": "Type de clé",
  "cfg.keytype.info":
    "ECDSA P-256 — une clé moderne et courte : plus rapide et plus légère. Recommandée pour les serveurs récents.\nRSA 2048 — le standard classique : fonctionne presque partout, y compris sur les systèmes anciens.\nRSA 4096 — une clé RSA plus longue : compatibilité maximale et plus de marge de sécurité, mais plus lente.\nVous hésitez ? Gardez ECDSA P-256.",
  "cfg.keytype.ecdsa.short": "recommandé, plus rapide",
  "cfg.keytype.rsa4096.short": "compatibilité maximale",
  "cfg.challenge.label": "Méthode de vérification",
  "cfg.challenge.dns": "DNS (enregistrement TXT)",
  "cfg.challenge.dns.hint":
    "Fonctionne partout, obligatoire pour les certificats wildcard. Vous devez avoir accès aux réglages DNS du domaine.",
  "cfg.challenge.http": "Fichier sur le serveur (HTTP)",
  "cfg.challenge.http.hint":
    "Plus simple si vous avez accès au serveur web du domaine. Ne fonctionne pas pour le wildcard.",
  "cfg.tos.pre": "J'accepte les ",
  "cfg.tos.link": "Conditions d'abonné Let's Encrypt",
  "cfg.tos.post": ".",
  "cfg.submit": "Continuer",
  "cfg.back": "Retour",

  "cfg.err.domains": "Saisissez au moins un domaine valide.",
  "cfg.err.domainInvalid": "Domaine invalide : {0}",
  "cfg.err.wildcardHttp":
    "Le domaine wildcard ({0}) nécessite la validation DNS — changez de méthode de vérification.",
  "cfg.err.email": "Adresse e-mail invalide.",
  "cfg.err.tos": "Vous devez accepter les conditions pour continuer.",

  "work.preparing": "Préparation…",
  "work.genAccountKey": "Génération de la clé de compte ACME dans votre navigateur…",
  "work.genCertKey": "Génération de la clé privée du certificat dans votre navigateur…",
  "work.register": "Enregistrement du compte auprès de Let's Encrypt…",
  "work.newOrder": "Création de la commande de certificat…",
  "work.fetchChallenges": "Récupération des défis de vérification…",
  "work.finalizing": "Envoi de la demande de signature (CSR)…",
  "work.downloading": "Téléchargement du certificat finalisé…",

  "chal.title": "Prouvez que le domaine est à vous",
  "chal.dns.intro":
    "Ajoutez les enregistrements TXT ci-dessous dans le panneau DNS de votre domaine. Après enregistrement et propagation, cliquez sur “Vérifier”.",
  "chal.http.intro":
    "Placez les fichiers ci-dessous sur votre serveur web (à l'URL exacte indiquée), puis cliquez sur “Vérifier”.",
  "chal.dns.name": "Nom / hôte",
  "chal.dns.type": "Type",
  "chal.dns.value": "Valeur",
  "chal.http.path": "URL du fichier",
  "chal.http.content": "Contenu du fichier",
  "chal.http.download": "Télécharger le fichier",
  "chal.copy": "Copier",
  "chal.copied": "Copié !",
  "chal.dns.propagation":
    "Remarque : les changements DNS peuvent mettre de quelques minutes à une heure à se propager. Si la vérification échoue, patientez et réessayez.",
  "chal.verify": "Vérifier le domaine",
  "chal.verifying": "Vérification…",
  "chal.verifyLocked":
    "Le bouton “Vérifier” se déverrouille dès que nous détectons l'enregistrement dans le DNS. Ajoutez l'enregistrement, puis cliquez sur “Vérifier si l'enregistrement est déjà visible”.",
  "chal.recordChanged":
    "Après l'échec, nous avons généré un nouvel enregistrement. Le nom reste le même, mais la VALEUR a changé — remplacez-la dans le DNS, vérifiez la propagation, puis lancez la vérification.",
  "chal.verifyAnyway": "Vous êtes sûr de l'avoir ajouté mais nous ne le détectons toujours pas ? Vérifiez quand même.",

  "doh.check": "Vérifier si l'enregistrement est déjà visible",
  "doh.checking": "Vérification du DNS…",
  "doh.ok": "Enregistrement visible dans le DNS — vous pouvez vérifier maintenant",
  "doh.pending": "Pas encore visible — patientez un instant et vérifiez à nouveau",
  "doh.error": "Impossible de vérifier le DNS — réessayez",
  "doh.hint":
    "Vérifiez d'abord la propagation pour ne pas cliquer sur “Vérifier” à l'aveugle (un échec oblige à générer un nouvel enregistrement).",
  "doh.privacy":
    "La vérification de la propagation utilise les DNS publics de Cloudflare et Google — seul le nom de votre domaine leur est envoyé.",

  "provider.detected": "Fournisseur DNS détecté : {0}",
  "provider.hostList": "Ouvrir le panneau de votre hébergeur…",
  "provider.steps":
    "Connectez-vous au panneau de votre hébergeur ou fournisseur DNS.\nOuvrez les réglages DNS de votre domaine (« Zone DNS » / « Modifier le DNS » / « Enregistrements DNS »).\nAjoutez un nouvel enregistrement TXT — utilisez « Hôte/Nom » et « Valeur » du tableau ci-dessus.\nEnregistrez et patientez quelques minutes le temps de la propagation.",
  "provider.generic": "Ajoutez l'enregistrement dans le panneau DNS de votre fournisseur de domaine.",

  "http.where.title": "Où placer le fichier",
  "http.where.body":
    "Placez le fichier sur le serveur web du domaine pour qu'il soit accessible exactement à l'URL ci-dessus — c'est-à-dire dans le dossier .well-known/acme-challenge à la racine de votre site. Il doit fonctionner en HTTP (port 80).",
  "httpcheck.checking": "Vérification du fichier…",
  "httpcheck.ok": "Fichier visible — vous pouvez vérifier maintenant",
  "httpcheck.pending": "Fichier introuvable (ou mauvais contenu) — vérifiez et réessayez",
  "httpcheck.error": "Vérification automatique impossible — ouvrez le fichier manuellement",
  "http.check": "Vérifier si le fichier est accessible",
  "http.open": "Ouvrir le fichier",
  "http.checkNote":
    "La vérification automatique est approximative — le fichier est récupéré par un relais tiers (allorigins.win), car le navigateur ne peut pas le lire directement. Si cela ne fonctionne pas, cliquez sur “Ouvrir le fichier”, confirmez que vous voyez son contenu, puis cliquez sur “Vérifier quand même”.",
  "chal.verifyLockedHttp":
    "Le bouton “Vérifier” se déverrouille dès que nous détectons le fichier. Cliquez sur “Vérifier si le fichier est accessible” ou “Ouvrir le fichier”.",

  "resume.text": "Vous avez une vérification inachevée pour {0}.",
  "resume.hint": "Vous pouvez y revenir — les données (l'enregistrement) sont les mêmes, rien à rajouter.",
  "resume.continue": "Reprendre la vérification",
  "resume.discard": "Recommencer",
  "resume.restoring": "Restauration de la vérification enregistrée…",

  "done.title": "Terminé ! Votre certificat SSL est prêt",
  "done.subtitle":
    "Étape par étape ci-dessous : ce qu'il faut télécharger et où exactement le coller. Pas besoin de connaître la cryptographie — il suffit d'associer les fichiers aux champs de votre panneau.",
  "done.staging.warning":
    "Ceci est un certificat de TEST (staging) — les navigateurs ne lui feront pas confiance. Une fois que tout fonctionne, revenez et émettez un certificat de production.",

  "done.step1": "Étape 1 · Téléchargez les fichiers",
  "done.step1.body":
    "Ce sont de simples fichiers texte (.pem). Vous n'en avez pas toujours besoin de tous — l'étape 2 vous indique lesquels utiliser.",
  "done.dl.key": "Clé privée",
  "done.dl.key.h": "Secrète — gardez-la pour vous, ne l'envoyez à personne.",
  "done.dl.cert": "Certificat seul",
  "done.dl.cert.h": "Le certificat de votre domaine.",
  "done.dl.chain": "Chaîne / Root CA",
  "done.dl.chain.h": "Les certificats intermédiaires de l'autorité.",
  "done.dl.fullchain": "Certificat + chaîne ensemble",
  "done.dl.fullchain.h": "Un seul fichier : certificat et chaîne. Courant sous Nginx et quand un panneau demande un “fullchain”.",

  "done.step2": "Étape 2 · Ajoutez les fichiers dans votre panneau d'hébergement",
  "done.step2.body":
    "Ouvrez votre panneau d'hébergement → la section “SSL” ou “Certificates”. Vous verrez des champs où coller. Associez les fichiers aux champs par leur nom :",
  "done.map.key": "Champ “Private key” (clé privée)",
  "done.map.cert": "Champ “Certificate” (certificat)",
  "done.map.chain": "Champ “Root CA”, “CA” ou “chain” (chaîne)",
  "done.map.fullchain":
    "Votre panneau n'a qu'un seul champ de certificat ou demande un “fullchain” ? Utilisez alors fullchain.pem à la place de cert.pem et chain.pem.",
  "done.step2.how":
    "Ouvrez chaque fichier dans un éditeur de texte, sélectionnez et copiez TOUT le contenu — y compris les lignes “-----BEGIN…” et “-----END…” — et collez-le dans le bon champ. Enregistrez ensuite. Le certificat fonctionne généralement tout de suite (parfois après une courte attente).",
  "done.secret":
    "La clé privée (privkey.pem) est secrète — gardez-la pour vous et ne l'envoyez ni ne la collez jamais dans un endroit non fiable.",

  "done.expiry":
    "Le certificat est valable 90 jours — il faut ensuite le renouveler. Programmez un rappel, ou (si vous gérez votre propre serveur) automatisez-le comme ci-dessous.",
  "done.whatnow": "Vous gérez votre propre serveur (VPS) ?",
  "done.whatnow.body":
    "Dans la configuration, indiquez : certificat = fullchain.pem, clé privée = privkey.pem. Sous Nginx, ce sont ssl_certificate et ssl_certificate_key ; sous Apache, SSLCertificateFile et SSLCertificateKeyFile.",
  "alt.title": "Vous préférez le terminal ? Faites-le sur votre serveur",
  "alt.body":
    "La même chose, mais en ligne de commande sur votre serveur : certbot (ou acme.sh) vous demandera d'ajouter un enregistrement TXT — exactement comme l'assistant ci-dessus — et émettra le certificat. Remplacez simplement example.com par votre domaine.",
  "alt.note": "C'est une commande ponctuelle — elle ne se renouvelle pas toute seule.",
  "alt.renewToggle": "Renouvellement automatique — comment le configurer (déplier)",

  "renew.title": "Comment faire pour que le certificat se renouvelle tout seul",
  "renew.body":
    "Le certificat est valable 90 jours. Plutôt que de le faire à la main tous les 3 mois, choisissez votre situation :",
  "renew.shared.title": "Hébergement mutualisé (cyberFolks, OVH, nazwa.pl…)",
  "renew.shared.body":
    "Le plus simple : votre panneau d'hébergement propose généralement un certificat SSL gratuit qui se renouvelle tout seul (Let's Encrypt / AutoSSL). Activez-le une fois et c'est réglé — cherchez une section “SSL” ou “Certificates”. Vous n'aurez alors besoin ni de certbot ni de BAXY SSL.",
  "renew.vps.title": "Vous avez votre propre serveur (VPS) et voulez une automatisation complète ?",
  "renew.vps.body":
    "Utilisez certbot — il renouvelle le certificat tout seul. Choisissez une méthode. Les commandes incluent déjà “--deploy-hook” pour que le serveur recharge le nouveau certificat après le renouvellement — remplacez “nginx” par “apache2” si vous utilisez Apache :",
  "renew.webroot.label":
    "1) Site servi en HTTP — la méthode “webroot” (remplacez /var/www/html par le répertoire de votre site) :",
  "renew.dns.label":
    "2) Wildcard ou pas d'accès HTTP — via l'API de votre fournisseur DNS (exemple pour Cloudflare) :",
  "renew.dns.steps":
    "Installez le plugin de votre fournisseur (par ex. python3-certbot-dns-cloudflare), enregistrez un jeton API dans ~/.secrets/cloudflare.ini, puis lancez la commande. Un autre fournisseur = un autre plugin (dns-ovh, dns-google, etc.).",
  "done.again": "En générer un autre",

  "err.title": "Une erreur est survenue",
  "err.retry": "Réessayer",
  "err.startOver": "Recommencer (autre domaine)",
  "err.verifyFailed":
    "Nous n'avons pas pu vérifier le domaine. Le plus souvent, l'enregistrement ne s'est pas encore propagé, ou sa valeur ne correspond pas. Cliquez sur “Réessayer” — nous générerons un nouvel enregistrement : le nom reste le même, seule la valeur change. Mettez la valeur à jour dans le DNS, vérifiez la propagation, puis lancez la vérification. Votre domaine et vos réglages sont conservés — pas besoin de tout recommencer.",
  "err.network":
    "Impossible de joindre le serveur proxy. Vérifiez que le proxy ACME est actif (voir le README) et réessayez.",
  "err.rateLimited":
    "Limite d'usage de Let's Encrypt atteinte. Utilisez l'environnement staging pour vos tests, ou patientez. Détails dans la console.",

  "step.config": "Configuration",
  "step.verify": "Vérification",
  "step.download": "Téléchargement",

  "footer.madeBy": "Un projet open source par",
  "footer.source": "Code source",
  "footer.privacy": "Confidentialité",
  "footer.terms": "Conditions",
  "cmd.caveat":
    "À exécuter sur votre propre serveur, à vos risques — vérifiez-la d'abord. Elle inclut --agree-tos, qui accepte les conditions de Let's Encrypt en votre nom.",
  "footer.notAffiliated":
    "BAXY SSL est un projet open source, sans affiliation avec Let's Encrypt ou ISRG, ni parrainage ni approbation de leur part. Let's Encrypt est un service gratuit et une marque déposée d'ISRG.",
};
