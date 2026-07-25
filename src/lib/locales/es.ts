import type { Dict } from "../i18n.js";

// Spanish (Español, es-ES).
export const es: Dict = {
  "app.poweredBy": "Con la tecnología de Let's Encrypt",

  "hero.title": "Un certificado SSL gratuito en minutos",
  "hero.subtitle":
    "Genera un certificado HTTPS de confianza para tu dominio. Gratis, sin registro y sin instalar nada.",
  "hero.trust.title": "Tu clave privada nunca sale de este ordenador",
  "hero.trust.body":
    "Toda la criptografía ocurre en tu navegador, que se comunica con Let's Encrypt directamente. Ningún servidor actúa de intermediario y nadie ve tu clave privada. El código es abierto — puedes comprobarlo tú mismo.",
  "hero.start": "Empezar",
  "hero.step1": "Introduce tu dominio",
  "hero.step1.desc": "Escribe la dirección para la que quieres un certificado.",
  "hero.step2": "Demuestra que es tuyo",
  "hero.step2.desc": "Añade un registro DNS o un archivo en tu servidor — te mostramos exactamente cuál.",
  "hero.step3": "Descarga el certificado",
  "hero.step3.desc": "La clave privada y el certificado quedan en tu disco.",

  "cfg.title": "Configuración del certificado",
  "cfg.domains.label": "Dominios",
  "cfg.domains.hint":
    "Uno o varios dominios (sepáralos con espacio o coma). El comodín * solo es posible con validación DNS.",
  "cfg.domains.placeholder": "example.com www.example.com",
  "a11y.theme": "Cambiar tema claro/oscuro",
  "a11y.language": "Idioma",
  "cfg.email.label": "Correo electrónico (opcional)",
  "cfg.email.hint":
    "Let's Encrypt lo usa solo para avisos de caducidad. Puedes dejarlo en blanco.",
  "cfg.email.placeholder": "you@example.com",
  "cfg.env.label": "Entorno",
  "cfg.env.staging": "Pruebas (staging)",
  "cfg.env.staging.hint":
    "Recomendado al principio. El certificado NO es de confianza para los navegadores, pero no consume los límites de uso. Ideal para confirmar que todo funciona.",
  "cfg.env.production": "Producción (certificado real)",
  "cfg.env.production.hint":
    "Emite un certificado de confianza para los navegadores. Se aplican los límites de uso de Let's Encrypt — úsalo cuando tu prueba haya salido bien.",
  "cfg.keytype.label": "Tipo de clave",
  "cfg.keytype.info":
    "ECDSA P-256 — una clave moderna y corta: más rápida y ligera. Recomendada para servidores nuevos.\nRSA 2048 — el estándar clásico: funciona casi en todas partes, también en sistemas antiguos.\nRSA 4096 — una clave RSA más larga: máxima compatibilidad y más margen de seguridad, pero más lenta.\n¿No estás seguro? Deja ECDSA P-256.",
  "cfg.keytype.ecdsa.short": "recomendado, más rápido",
  "cfg.keytype.rsa4096.short": "máxima compatibilidad",
  "cfg.challenge.label": "Método de verificación",
  "cfg.challenge.dns": "DNS (registro TXT)",
  "cfg.challenge.dns.hint":
    "Funciona en todas partes y es obligatorio para los certificados comodín. Necesitas acceso a la configuración DNS del dominio.",
  "cfg.challenge.http": "Archivo en el servidor (HTTP)",
  "cfg.challenge.http.hint":
    "Más sencillo si tienes acceso al servidor web del dominio. No funciona para comodines.",
  "cfg.tos.pre": "Acepto ",
  "cfg.tos.link": "el Acuerdo de Suscriptor de Let's Encrypt",
  "cfg.tos.post": ".",
  "cfg.submit": "Continuar",
  "cfg.back": "Atrás",

  "cfg.err.domains": "Introduce al menos un dominio válido.",
  "cfg.err.domainInvalid": "Dominio no válido: {0}",
  "cfg.err.wildcardHttp":
    "El dominio comodín ({0}) requiere validación DNS — cambia el método de verificación.",
  "cfg.err.email": "Dirección de correo no válida.",
  "cfg.err.tos": "Debes aceptar los términos para continuar.",

  "work.preparing": "Preparando…",
  "work.genAccountKey": "Generando la clave de cuenta ACME en tu navegador…",
  "work.genCertKey": "Generando la clave privada del certificado en tu navegador…",
  "work.register": "Registrando la cuenta en Let's Encrypt…",
  "work.newOrder": "Creando el pedido del certificado…",
  "work.fetchChallenges": "Obteniendo los retos de verificación…",
  "work.finalizing": "Enviando la solicitud de firma (CSR)…",
  "work.downloading": "Descargando el certificado terminado…",

  "chal.title": "Demuestra que el dominio es tuyo",
  "chal.dns.intro":
    "Añade los registros TXT de abajo en el panel DNS de tu dominio. Tras guardarlos y esperar la propagación, pulsa “Verificar”.",
  "chal.http.intro":
    "Coloca los archivos de abajo en tu servidor web (en la URL exacta indicada) y luego pulsa “Verificar”.",
  "chal.dns.name": "Nombre / host",
  "chal.dns.type": "Tipo",
  "chal.dns.value": "Valor",
  "chal.http.path": "URL del archivo",
  "chal.http.content": "Contenido del archivo",
  "chal.http.download": "Descargar archivo",
  "chal.copy": "Copiar",
  "chal.copied": "¡Copiado!",
  "chal.dns.propagation":
    "Nota: los cambios de DNS pueden tardar de unos minutos a una hora en propagarse. Si la verificación falla, espera y vuelve a intentarlo.",
  "chal.verify": "Verificar dominio",
  "chal.verifying": "Verificando…",
  "chal.verifyLocked":
    "El botón “Verificar” se desbloquea cuando detectamos el registro en el DNS. Añade el registro y luego pulsa “Comprobar si el registro ya es visible”.",
  "chal.recordChanged":
    "Tras el intento fallido generamos un registro nuevo. El nombre es el mismo, pero el VALOR ha cambiado — reemplázalo en el DNS, comprueba la propagación y luego verifica.",
  "chal.verifyAnyway": "¿Seguro que lo has añadido y aún no lo detectamos? Verifica de todos modos.",

  "doh.check": "Comprobar si el registro ya es visible",
  "doh.checking": "Comprobando el DNS…",
  "doh.ok": "Registro visible en el DNS — ya puedes verificar",
  "doh.pending": "Aún no es visible — espera un momento y vuelve a comprobar",
  "doh.error": "No se pudo comprobar el DNS — inténtalo de nuevo",
  "doh.hint":
    "Comprueba primero la propagación para no pulsar “Verificar” a ciegas (un intento fallido obliga a generar un registro nuevo).",
  "doh.privacy":
    "La comprobación de propagación usa los DNS públicos de Cloudflare y Google — solo se les envía el nombre de tu dominio.",

  "provider.detected": "Proveedor de DNS detectado: {0}",
  "provider.hostList": "Abre el panel de tu alojamiento…",
  "provider.steps":
    "Inicia sesión en el panel de tu alojamiento o proveedor de DNS.\nAbre la configuración DNS de tu dominio (“Zona DNS” / “Editar DNS” / “Registros DNS”).\nAñade un nuevo registro TXT — usa “Host/Nombre” y “Valor” de la tabla de arriba.\nGuarda y espera unos minutos a que se propague.",
  "provider.generic": "Añade el registro en el panel DNS del proveedor de tu dominio.",

  "http.where.title": "Dónde poner el archivo",
  "http.where.body":
    "Coloca el archivo en el servidor web del dominio para que sea accesible exactamente en la URL de arriba — es decir, la carpeta .well-known/acme-challenge en la raíz de tu sitio. Debe funcionar por HTTP (port 80).",
  "httpcheck.checking": "Comprobando el archivo…",
  "httpcheck.ok": "Archivo visible — ya puedes verificar",
  "httpcheck.pending": "Archivo no encontrado (o contenido incorrecto) — comprueba y reintenta",
  "httpcheck.error": "No se pudo comprobar automáticamente — abre el archivo manualmente",
  "http.check": "Comprobar si el archivo es accesible",
  "http.open": "Abrir el archivo",
  "http.checkNote":
    "La comprobación automática es aproximada — el archivo lo descarga un intermediario externo (allorigins.win), porque el navegador no puede leerlo directamente. Si no funciona, pulsa “Abrir el archivo”, confirma que ves el contenido del archivo y luego pulsa “Verifica de todos modos”.",
  "chal.verifyLockedHttp":
    "El botón “Verificar” se desbloquea cuando detectamos el archivo. Pulsa “Comprobar si el archivo es accesible” o “Abrir el archivo”.",

  "resume.text": "Tienes una verificación sin terminar para {0}.",
  "resume.hint": "Puedes retomarla — los datos (el registro) son los mismos, no hay que añadir nada de nuevo.",
  "resume.continue": "Retomar la verificación",
  "resume.discard": "Empezar de nuevo",
  "resume.restoring": "Restaurando la verificación guardada…",

  "done.title": "¡Listo! Tu certificado SSL está preparado",
  "done.subtitle":
    "Paso a paso más abajo: qué descargar y dónde pegarlo exactamente. No necesitas entender de criptografía — solo tienes que emparejar los archivos con los campos de tu panel.",
  "done.staging.warning":
    "Este es un certificado de PRUEBA (staging) — los navegadores no confiarán en él. Cuando todo funcione, vuelve y emite un certificado de producción.",

  "done.step1": "Paso 1 · Descarga los archivos",
  "done.step1.body":
    "Son archivos de texto simple (.pem). No siempre necesitas todos — el paso 2 te dice cuáles usar.",
  "done.dl.key": "Clave privada",
  "done.dl.key.h": "Secreta — guárdala para ti y no se la envíes nunca a nadie.",
  "done.dl.cert": "Solo el certificado",
  "done.dl.cert.h": "El certificado de tu dominio.",
  "done.dl.chain": "Cadena / Root CA",
  "done.dl.chain.h": "Los certificados intermedios de la autoridad.",
  "done.dl.fullchain": "Certificado + cadena juntos",
  "done.dl.fullchain.h": "Un solo archivo: certificado y cadena. Habitual en Nginx y cuando un panel pide “fullchain”.",

  "done.step2": "Paso 2 · Añade los archivos en el panel de tu hosting",
  "done.step2.body":
    "Abre el panel de tu hosting → la sección “SSL” o “Certificates”. Verás campos donde pegar. Empareja los archivos con los campos por su nombre:",
  "done.map.key": "Campo “Clave privada” (Private key)",
  "done.map.cert": "Campo “Certificado” (Certificate)",
  "done.map.chain": "Campo “Root CA”, “CA” o “cadena”",
  "done.map.fullchain":
    "¿El panel tiene un solo campo para el certificado o pide “fullchain”? Entonces usa fullchain.pem en lugar de cert.pem y chain.pem.",
  "done.step2.how":
    "Abre cada archivo en un editor de texto, selecciona y copia TODO el contenido — incluidas las líneas “-----BEGIN…” y “-----END…” — y pégalo en el campo correspondiente. Después guarda. El certificado suele funcionar enseguida (a veces tras una breve espera).",
  "done.secret":
    "La clave privada (privkey.pem) es secreta — guárdala para ti y nunca la envíes ni la pegues en sitios que no sean de confianza.",

  "done.expiry":
    "El certificado es válido durante 90 días — luego hay que renovarlo. Ponte un recordatorio o (si tienes tu propio servidor) automatízalo como se indica abajo.",
  "done.whatnow": "¿Tienes tu propio servidor (VPS)?",
  "done.whatnow.body":
    "En la configuración indica: certificado = fullchain.pem, clave privada = privkey.pem. En Nginx son ssl_certificate y ssl_certificate_key; en Apache SSLCertificateFile y SSLCertificateKeyFile.",
  "alt.title": "¿Prefieres la terminal? Hazlo en tu servidor",
  "alt.body":
    "Lo mismo, pero como un comando en tu servidor: certbot (o acme.sh) te pedirá que añadas un registro TXT — exactamente igual que el asistente de arriba — y emitirá el certificado. Solo cambia example.com por tu dominio.",
  "alt.note": "Es un comando de una sola vez — no se renueva solo.",
  "alt.renewToggle": "Renovación automática — cómo configurarla (desplegar)",

  "renew.title": "Cómo hacer que el certificado se renueve solo",
  "renew.body":
    "El certificado es válido durante 90 días. En lugar de hacerlo a mano cada 3 meses, elige tu situación:",
  "renew.shared.title": "Hosting compartido (cyberFolks, OVH, nazwa.pl…)",
  "renew.shared.body":
    "Lo más fácil: el panel de tu hosting suele tener un certificado SSL gratuito que se renueva solo (Let's Encrypt / AutoSSL). Actívalo una vez y listo — busca una sección “SSL” o “Certificates”. Así no necesitas ni certbot ni BAXY SSL.",
  "renew.vps.title": "¿Tienes tu propio servidor (VPS) y quieres automatización completa?",
  "renew.vps.body":
    "Usa certbot — renueva el certificado por sí solo. Elige un método. Los comandos ya incluyen “--deploy-hook” para que el servidor recargue el nuevo certificado tras la renovación — cambia “nginx” por “apache2” si usas Apache:",
  "renew.webroot.label":
    "1) Sitio servido por HTTP — el método “webroot” (reemplaza /var/www/html por el directorio de tu sitio):",
  "renew.dns.label":
    "2) Comodín o sin acceso por HTTP — mediante la API de tu proveedor de DNS (ejemplo con Cloudflare):",
  "renew.dns.steps":
    "Instala el plugin de tu proveedor (p. ej. python3-certbot-dns-cloudflare), guarda un token de API en ~/.secrets/cloudflare.ini y luego ejecútalo. Un proveedor distinto = un plugin distinto (dns-ovh, dns-google, etc.).",
  "done.again": "Generar otro",

  "err.title": "Algo salió mal",
  "err.retry": "Reintentar",
  "err.startOver": "Empezar de nuevo (otro dominio)",
  "err.verifyFailed":
    "No pudimos verificar el dominio. Normalmente el registro aún no se ha propagado, o su valor no coincide. Pulsa “Reintentar” — generaremos un registro nuevo: el nombre se mantiene igual, solo cambia el valor. Actualiza el valor en el DNS, comprueba la propagación y luego verifica. Tu dominio y ajustes se conservan — no hace falta empezar de nuevo.",
  "err.network":
    "No se pudo contactar con el servidor proxy. Comprueba que el proxy ACME esté en marcha (consulta el README) e inténtalo de nuevo.",
  "err.rateLimited":
    "Se alcanzó el límite de uso de Let's Encrypt. Usa el entorno de pruebas (staging) para tus pruebas, o espera. Los detalles están en la consola.",

  "step.config": "Configuración",
  "step.verify": "Verificación",
  "step.download": "Descarga",

  "footer.madeBy": "Un proyecto de código abierto de",
  "footer.source": "Código fuente",
  "footer.privacy": "Privacidad",
  "footer.terms": "Términos",
  "cmd.caveat":
    "Ejecútalo en tu propio servidor y bajo tu responsabilidad — revísalo antes. Incluye --agree-tos, que acepta los términos de Let's Encrypt en tu nombre.",
  "footer.notAffiliated":
    "BAXY SSL es un proyecto de código abierto y no está afiliada a Let's Encrypt ni ISRG, ni patrocinada o respaldada por ellos. Let's Encrypt es un servicio gratuito y una marca registrada de ISRG.",
};
