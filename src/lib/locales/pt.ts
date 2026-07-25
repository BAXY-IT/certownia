import type { Dict } from "../i18n.js";

// Portuguese (European, pt-PT).
export const pt: Dict = {
  "app.poweredBy": "Com a tecnologia de Let's Encrypt",

  "hero.title": "Um certificado SSL gratuito em minutos",
  "hero.subtitle":
    "Gere um certificado HTTPS de confiança para o seu domínio. Gratuito, sem registo, sem nada para instalar.",
  "hero.trust.title": "A sua chave privada nunca sai deste computador",
  "hero.trust.body":
    "Toda a criptografia acontece no seu navegador, que comunica diretamente com Let's Encrypt. Não há nenhum servidor no meio e ninguém vê a sua chave privada. O código é aberto — pode verificá-lo por si mesmo.",
  "hero.start": "Começar",
  "hero.step1": "Introduza o seu domínio",
  "hero.step1.desc": "Escreva o endereço para o qual quer um certificado.",
  "hero.step2": "Prove que o domínio é seu",
  "hero.step2.desc": "Adicione um registo DNS ou um ficheiro no seu servidor — mostramos-lhe exatamente qual.",
  "hero.step3": "Descarregue o certificado",
  "hero.step3.desc": "A chave privada e o certificado ficam guardados no seu disco.",

  "cfg.title": "Configuração do certificado",
  "cfg.domains.label": "Domínios",
  "cfg.domains.hint":
    "Um ou mais domínios (separe com espaço ou vírgula). O wildcard * só é possível com validação DNS.",
  "cfg.domains.placeholder": "example.com www.example.com",
  "a11y.theme": "Alternar tema claro/escuro",
  "a11y.language": "Idioma",
  "cfg.email.label": "E-mail (opcional)",
  "cfg.email.hint":
    "Let's Encrypt usa-o apenas para avisos de expiração. Pode deixar em branco.",
  "cfg.email.placeholder": "you@example.com",
  "cfg.env.label": "Ambiente",
  "cfg.env.staging": "Testes (staging)",
  "cfg.env.staging.hint":
    "Recomendado para começar. O certificado NÃO é de confiança para os navegadores, mas não consome limites de utilização. Ideal para confirmar que está tudo a funcionar.",
  "cfg.env.production": "Produção (certificado real)",
  "cfg.env.production.hint":
    "Emite um certificado de confiança para os navegadores. Aplicam-se os limites de Let's Encrypt — use quando o seu teste tiver passado.",
  "cfg.keytype.label": "Tipo de chave",
  "cfg.keytype.info":
    "ECDSA P-256 — uma chave moderna e curta: mais rápida e leve. Recomendada para servidores novos.\nRSA 2048 — o padrão clássico: funciona quase em todo o lado, incl. sistemas antigos.\nRSA 4096 — uma chave RSA mais longa: máxima compatibilidade e mais margem de segurança, mas mais lenta.\nNão tem a certeza? Mantenha ECDSA P-256.",
  "cfg.keytype.ecdsa.short": "recomendado, mais rápido",
  "cfg.keytype.rsa4096.short": "maior compatibilidade",
  "cfg.challenge.label": "Método de verificação",
  "cfg.challenge.dns": "DNS (registo TXT)",
  "cfg.challenge.dns.hint":
    "Funciona em qualquer lado, obrigatório para certificados wildcard. Precisa de acesso às definições de DNS do domínio.",
  "cfg.challenge.http": "Ficheiro no servidor (HTTP)",
  "cfg.challenge.http.hint":
    "Mais simples se tiver acesso ao servidor web do domínio. Não funciona para wildcard.",
  "cfg.tos.pre": "Aceito os ",
  "cfg.tos.link": "Termos de subscritor de Let's Encrypt",
  "cfg.tos.post": ".",
  "cfg.submit": "Continuar",
  "cfg.back": "Voltar",

  "cfg.err.domains": "Introduza pelo menos um domínio válido.",
  "cfg.err.domainInvalid": "Domínio inválido: {0}",
  "cfg.err.wildcardHttp":
    "O domínio wildcard ({0}) requer validação DNS — mude o método de verificação.",
  "cfg.err.email": "Endereço de e-mail inválido.",
  "cfg.err.tos": "Tem de aceitar os termos para continuar.",

  "work.preparing": "A preparar…",
  "work.genAccountKey": "A gerar a chave da conta ACME no seu navegador…",
  "work.genCertKey": "A gerar a chave privada do certificado no seu navegador…",
  "work.register": "A registar a conta em Let's Encrypt…",
  "work.newOrder": "A criar o pedido de certificado…",
  "work.fetchChallenges": "A obter os desafios de verificação…",
  "work.finalizing": "A enviar o pedido de assinatura (CSR)…",
  "work.downloading": "A descarregar o certificado concluído…",

  "chal.title": "Prove que o domínio é seu",
  "chal.dns.intro":
    "Adicione os registos TXT abaixo no painel de DNS do seu domínio. Depois de guardar e de propagar, clique em “Verificar”.",
  "chal.http.intro":
    "Coloque os ficheiros abaixo no seu servidor web (exatamente no URL indicado) e depois clique em “Verificar”.",
  "chal.dns.name": "Nome / anfitrião",
  "chal.dns.type": "Tipo",
  "chal.dns.value": "Valor",
  "chal.http.path": "URL do ficheiro",
  "chal.http.content": "Conteúdo do ficheiro",
  "chal.http.download": "Descarregar ficheiro",
  "chal.copy": "Copiar",
  "chal.copied": "Copiado!",
  "chal.dns.propagation":
    "Nota: as alterações de DNS podem demorar de alguns minutos a uma hora a propagar. Se a verificação falhar, aguarde e tente novamente.",
  "chal.verify": "Verificar domínio",
  "chal.verifying": "A verificar…",
  "chal.verifyLocked":
    "O botão “Verificar” fica disponível assim que detetarmos o registo no DNS. Adicione o registo e depois clique em “Verificar se o registo já está visível”.",
  "chal.recordChanged":
    "Depois da tentativa falhada, gerámos um novo registo. O nome é o mesmo, mas o VALOR mudou — substitua-o no DNS, verifique a propagação e só depois verifique.",
  "chal.verifyAnyway": "Tem a certeza de que já o adicionou mas continuamos a não o detetar? Verifique mesmo assim.",

  "doh.check": "Verificar se o registo já está visível",
  "doh.checking": "A verificar o DNS…",
  "doh.ok": "Registo visível no DNS — já pode verificar",
  "doh.pending": "Ainda não está visível — aguarde um momento e verifique de novo",
  "doh.error": "Não foi possível verificar o DNS — tente novamente",
  "doh.hint":
    "Verifique primeiro a propagação para não clicar em “Verificar” às cegas (uma tentativa falhada obriga a gerar um novo registo).",
  "doh.privacy":
    "A verificação da propagação usa os DNS públicos da Cloudflare e da Google — só lhes é enviado o nome do seu domínio.",

  "provider.detected": "Fornecedor de DNS detetado: {0}",
  "provider.hostList": "Abrir o painel do seu alojamento…",
  "provider.steps":
    "Inicie sessão no painel do seu alojamento ou fornecedor de DNS.\nAbra as definições de DNS do seu domínio (“Zona DNS” / “Editar DNS” / “Registos DNS”).\nAdicione um novo registo TXT — use “Host/Nome” e “Valor” da tabela acima.\nGuarde e aguarde alguns minutos pela propagação.",
  "provider.generic": "Adicione o registo no painel de DNS do seu fornecedor de domínio.",

  "http.where.title": "Onde colocar o ficheiro",
  "http.where.body":
    "Coloque o ficheiro no servidor web do domínio, de modo a que fique acessível exatamente no URL acima — ou seja, na pasta .well-known/acme-challenge, na raiz do seu site. Tem de funcionar por HTTP (port 80).",
  "httpcheck.checking": "A verificar o ficheiro…",
  "httpcheck.ok": "Ficheiro visível — já pode verificar",
  "httpcheck.pending": "Ficheiro não encontrado (ou conteúdo errado) — verifique e tente novamente",
  "httpcheck.error": "Não foi possível verificar automaticamente — abra o ficheiro manualmente",
  "http.check": "Verificar se o ficheiro está acessível",
  "http.open": "Abrir o ficheiro",
  "http.checkNote":
    "A verificação automática é aproximada — o ficheiro é obtido por um serviço externo (allorigins.win), porque o navegador não o consegue ler diretamente. Se não resultar, clique em “Abrir o ficheiro”, confirme que consegue ver o conteúdo do ficheiro e depois clique em “Verificar mesmo assim”.",
  "chal.verifyLockedHttp":
    "O botão “Verificar” fica disponível assim que detetarmos o ficheiro. Clique em “Verificar se o ficheiro está acessível” ou em “Abrir o ficheiro”.",

  "resume.text": "Tem uma verificação por concluir para {0}.",
  "resume.hint": "Pode voltar a ela — os dados (o registo) são os mesmos, não há nada para adicionar de novo.",
  "resume.continue": "Retomar verificação",
  "resume.discard": "Começar de novo",
  "resume.restoring": "A restaurar a verificação guardada…",

  "done.title": "Concluído! O seu certificado SSL está pronto",
  "done.subtitle":
    "Passo a passo em baixo: o que descarregar e exatamente onde o colar. Não precisa de perceber de criptografia — basta fazer corresponder os ficheiros aos campos do seu painel.",
  "done.staging.warning":
    "Este é um certificado de TESTE (staging) — os navegadores não vão confiar nele. Quando estiver tudo a funcionar, volte e emita um certificado de produção.",

  "done.step1": "Passo 1 · Descarregue os ficheiros",
  "done.step1.body":
    "São simples ficheiros de texto (.pem). Nem sempre precisa de todos — o passo 2 diz-lhe quais usar.",
  "done.dl.key": "Chave privada",
  "done.dl.key.h": "Secreta — guarde-a só para si, nunca a envie a ninguém.",
  "done.dl.cert": "Apenas o certificado",
  "done.dl.cert.h": "O certificado do seu domínio.",
  "done.dl.chain": "Cadeia / Root CA",
  "done.dl.chain.h": "Os certificados intermédios da autoridade.",
  "done.dl.fullchain": "Certificado + cadeia juntos",
  "done.dl.fullchain.h": "Um ficheiro: certificado e cadeia. Comum no Nginx e quando um painel pede “fullchain”.",

  "done.step2": "Passo 2 · Adicione os ficheiros no painel do seu alojamento",
  "done.step2.body":
    "Abra o painel do seu alojamento → a secção “SSL” ou “Certificados”. Vai ver campos onde colar. Faça corresponder os ficheiros aos campos pelo nome:",
  "done.map.key": "Campo “Chave privada” (Private key)",
  "done.map.cert": "Campo “Certificado” (Certificate)",
  "done.map.chain": "Campo “Root CA”, “CA” ou “cadeia” (chain)",
  "done.map.fullchain":
    "O painel só tem um campo para o certificado ou pede “fullchain”? Então use fullchain.pem em vez de cert.pem e chain.pem.",
  "done.step2.how":
    "Abra cada ficheiro num editor de texto, selecione e copie TODO o conteúdo — incluindo as linhas “-----BEGIN…” e “-----END…” — e cole-o no campo certo. Depois guarde. O certificado costuma funcionar logo (por vezes é preciso esperar um pouco).",
  "done.secret":
    "A chave privada (privkey.pem) é secreta — guarde-a só para si e nunca a envie nem a cole em sítios em que não confie.",

  "done.expiry":
    "O certificado é válido por 90 dias — depois tem de ser renovado. Crie um lembrete ou (se tiver o seu próprio servidor) automatize-o como se mostra abaixo.",
  "done.whatnow": "Tem o seu próprio servidor (VPS)?",
  "done.whatnow.body":
    "Na configuração aponte: certificado = fullchain.pem, chave privada = privkey.pem. No Nginx é ssl_certificate e ssl_certificate_key; no Apache SSLCertificateFile e SSLCertificateKeyFile.",
  "alt.title": "Prefere o terminal? Faça-o no seu servidor",
  "alt.body":
    "O mesmo, mas como um comando no seu servidor: o certbot (ou o acme.sh) vai pedir-lhe para adicionar um registo TXT — tal como o assistente acima — e emitir o certificado. Basta trocar example.com pelo seu domínio.",
  "alt.note": "É um comando pontual — não se renova sozinho.",
  "alt.renewToggle": "Renovação automática — como configurar (expandir)",

  "renew.title": "Como fazer o certificado renovar-se sozinho",
  "renew.body":
    "O certificado é válido por 90 dias. Em vez de fazer isto à mão a cada 3 meses, escolha a sua situação:",
  "renew.shared.title": "Alojamento partilhado (cyberFolks, OVH, nazwa.pl…)",
  "renew.shared.body":
    "O mais fácil: o painel do seu alojamento costuma ter um certificado SSL gratuito que se renova sozinho (Let's Encrypt / AutoSSL). Ative-o uma vez e está feito — procure uma secção “SSL” ou “Certificados”. Assim não precisa nem do certbot nem da BAXY SSL.",
  "renew.vps.title": "Tem o seu próprio servidor (VPS) e quer automatizar tudo?",
  "renew.vps.body":
    "Use o certbot — renova o certificado sozinho. Escolha um método. Os comandos já incluem “--deploy-hook” para que o servidor recarregue o novo certificado depois da renovação — troque “nginx” por “apache2” se usar o Apache:",
  "renew.webroot.label":
    "1) Site servido por HTTP — o método “webroot” (substitua /var/www/html pela pasta do seu site):",
  "renew.dns.label":
    "2) Wildcard ou sem acesso por HTTP — através da API do seu fornecedor de DNS (exemplo com Cloudflare):",
  "renew.dns.steps":
    "Instale o plugin do seu fornecedor (por exemplo, python3-certbot-dns-cloudflare), guarde um token de API em ~/.secrets/cloudflare.ini e depois execute. Um fornecedor diferente = um plugin diferente (dns-ovh, dns-google, etc.).",
  "done.again": "Gerar outro",

  "err.title": "Algo correu mal",
  "err.retry": "Tentar novamente",
  "err.startOver": "Começar de novo (outro domínio)",
  "err.verifyFailed":
    "Não conseguimos verificar o domínio. Normalmente o registo ainda não se propagou, ou o seu valor não corresponde. Clique em “Tentar novamente” — vamos gerar um novo registo: o nome mantém-se, muda apenas o valor. Atualize o valor no DNS, verifique a propagação e só depois verifique. O seu domínio e as suas definições são guardados — não precisa de começar de novo.",
  "err.network":
    "Não foi possível contactar o servidor proxy. Verifique se o proxy ACME está a funcionar (consulte o README) e tente novamente.",
  "err.rateLimited":
    "Limite de utilização de Let's Encrypt atingido. Use o ambiente de testes (staging) para experimentar, ou aguarde. Detalhes na consola.",

  "step.config": "Configuração",
  "step.verify": "Verificação",
  "step.download": "Descarregar",

  "footer.madeBy": "Um projeto open-source de",
  "footer.source": "Código-fonte",
  "footer.privacy": "Privacidade",
  "footer.terms": "Termos",
  "cmd.caveat":
    "Execute-o no seu próprio servidor e por sua conta e risco — reveja-o primeiro. Inclui --agree-tos, que aceita os termos de Let's Encrypt em seu nome.",
  "footer.notAffiliated":
    "A BAXY SSL é um projeto open source, sem afiliação com Let's Encrypt ou ISRG, nem patrocínio ou aprovação. Let's Encrypt é um serviço gratuito e uma marca registada da ISRG.",
};
