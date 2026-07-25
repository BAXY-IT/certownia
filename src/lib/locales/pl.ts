import type { Dict } from "../i18n.js";

// Polish.
export const pl: Dict = {
  "app.poweredBy": "Napędzane przez Let's Encrypt",

  "hero.title": "Darmowy certyfikat SSL w kilka minut",
  "hero.subtitle":
    "Wygeneruj zaufany certyfikat HTTPS dla swojej domeny. Za darmo, bez rejestracji, bez instalowania niczego.",
  "hero.trust.title": "Twój klucz prywatny nigdy nie opuszcza tego komputera",
  "hero.trust.body":
    "Cała kryptografia dzieje się w Twojej przeglądarce, która łączy się z Let's Encrypt bezpośrednio. Żaden serwer nie pośredniczy i nikt nie widzi Twojego klucza prywatnego. Kod jest otwarty — możesz to sprawdzić.",
  "hero.start": "Zaczynamy",
  "hero.step1": "Podaj domenę",
  "hero.step1.desc": "Wpisz adres, dla którego chcesz certyfikat.",
  "hero.step2": "Potwierdź własność",
  "hero.step2.desc": "Dodaj rekord DNS lub plik na serwerze — pokażemy dokładnie jaki.",
  "hero.step3": "Pobierz certyfikat",
  "hero.step3.desc": "Klucz prywatny i certyfikat lądują na Twoim dysku.",

  "cfg.title": "Konfiguracja certyfikatu",
  "cfg.domains.label": "Domeny",
  "cfg.domains.hint":
    "Jedna lub kilka domen (oddziel spacją lub przecinkiem). Wildcard * jest możliwy tylko z weryfikacją DNS.",
  "cfg.domains.placeholder": "example.com www.example.com",
  "a11y.theme": "Przełącz motyw jasny/ciemny",
  "a11y.language": "Język",
  "cfg.email.label": "E-mail (opcjonalnie)",
  "cfg.email.hint":
    "Let's Encrypt użyje go tylko do powiadomień o wygasaniu certyfikatu. Możesz zostawić puste.",
  "cfg.email.placeholder": "ty@example.com",
  "cfg.env.label": "Środowisko",
  "cfg.env.staging": "Testowe (staging)",
  "cfg.env.staging.hint":
    "Zalecane na start. Certyfikat NIE jest zaufany przez przeglądarki, ale nie zużywasz limitów. Idealne do sprawdzenia, czy wszystko działa.",
  "cfg.env.production": "Produkcyjne (prawdziwy certyfikat)",
  "cfg.env.production.hint":
    "Wystawia certyfikat zaufany przez przeglądarki. Obowiązują limity Let's Encrypt — używaj, gdy test przeszedł.",
  "cfg.keytype.label": "Typ klucza",
  "cfg.keytype.info":
    "ECDSA P-256 — nowoczesny, krótki klucz: szybszy i lżejszy. Zalecany dla nowych serwerów.\nRSA 2048 — klasyczny standard: działa niemal wszędzie, także na starszym sprzęcie.\nRSA 4096 — dłuższy klucz RSA: największa zgodność i zapas bezpieczeństwa, ale wolniejszy.\nNie wiesz? Zostaw ECDSA P-256.",
  "cfg.keytype.ecdsa.short": "zalecane, szybsze",
  "cfg.keytype.rsa4096.short": "najszersza zgodność",
  "cfg.challenge.label": "Sposób weryfikacji",
  "cfg.challenge.dns": "DNS (rekord TXT)",
  "cfg.challenge.dns.hint":
    "Działa wszędzie, wymagany dla certyfikatów wildcard. Musisz mieć dostęp do ustawień DNS domeny.",
  "cfg.challenge.http": "Plik na serwerze (HTTP)",
  "cfg.challenge.http.hint":
    "Prostsze, jeśli masz dostęp do serwera WWW domeny. Nie działa dla wildcard.",
  "cfg.tos.pre": "Akceptuję ",
  "cfg.tos.link": "Warunki subskrybenta Let's Encrypt",
  "cfg.tos.post": ".",
  "cfg.submit": "Dalej",
  "cfg.back": "Wróć",

  "cfg.err.domains": "Podaj przynajmniej jedną poprawną domenę.",
  "cfg.err.domainInvalid": "Niepoprawna domena: {0}",
  "cfg.err.wildcardHttp":
    "Domena wildcard ({0}) wymaga weryfikacji DNS — przełącz sposób weryfikacji.",
  "cfg.err.email": "Niepoprawny adres e-mail.",
  "cfg.err.tos": "Musisz zaakceptować warunki, aby kontynuować.",

  "work.preparing": "Przygotowuję…",
  "work.genAccountKey": "Generuję klucz konta ACME w przeglądarce…",
  "work.genCertKey": "Generuję klucz prywatny certyfikatu w przeglądarce…",
  "work.register": "Rejestruję konto w Let's Encrypt…",
  "work.newOrder": "Tworzę zamówienie certyfikatu…",
  "work.fetchChallenges": "Pobieram zadania weryfikacyjne…",
  "work.finalizing": "Wysyłam żądanie podpisania (CSR)…",
  "work.downloading": "Pobieram gotowy certyfikat…",

  "chal.title": "Potwierdź, że domena należy do Ciebie",
  "chal.dns.intro":
    "Dodaj poniższe rekordy TXT w panelu DNS swojej domeny. Po zapisaniu i propagacji kliknij „Sprawdź”.",
  "chal.http.intro":
    "Umieść poniższe pliki na swoim serwerze WWW (dokładnie pod wskazanym adresem), a potem kliknij „Sprawdź”.",
  "chal.dns.name": "Nazwa / host",
  "chal.dns.type": "Typ",
  "chal.dns.value": "Wartość",
  "chal.http.path": "Adres pliku (URL)",
  "chal.http.content": "Zawartość pliku",
  "chal.http.download": "Pobierz plik",
  "chal.copy": "Kopiuj",
  "chal.copied": "Skopiowano!",
  "chal.dns.propagation":
    "Uwaga: zmiany DNS mogą propagować od kilku minut do godziny. Jeśli sprawdzenie się nie powiedzie, poczekaj i spróbuj ponownie.",
  "chal.verify": "Zweryfikuj domenę",
  "chal.verifying": "Weryfikuję…",
  "chal.verifyLocked":
    "Przycisk „Zweryfikuj” odblokuje się, gdy wykryjemy rekord w DNS. Dodaj rekord i kliknij „Sprawdź, czy rekord jest już widoczny”.",
  "chal.recordChanged":
    "Po nieudanej próbie wygenerowaliśmy świeży rekord. Nazwa jest taka sama, ale WARTOŚĆ się zmieniła — podmień ją w DNS, sprawdź propagację i dopiero wtedy weryfikuj.",
  "chal.verifyAnyway": "Na pewno dodane, a mimo to nie wykrywamy? Zweryfikuj mimo to.",

  "doh.check": "Sprawdź, czy rekord jest już widoczny",
  "doh.checking": "Sprawdzam DNS…",
  "doh.ok": "Rekord widoczny w DNS — możesz weryfikować",
  "doh.pending": "Jeszcze nie widać — poczekaj chwilę i sprawdź ponownie",
  "doh.error": "Nie udało się sprawdzić DNS — spróbuj ponownie",
  "doh.hint":
    "Najpierw sprawdź propagację, żeby nie klikać „Zweryfikuj” na ślepo (nieudana próba wymaga wygenerowania nowego rekordu).",
  "doh.privacy":
    "Sprawdzanie propagacji korzysta z publicznych serwerów DNS Cloudflare i Google — wysyłamy im tylko nazwę Twojej domeny.",

  "provider.detected": "Wykryty dostawca DNS: {0}",
  "provider.hostList": "Otwórz panel swojego hostingu…",
  "provider.steps":
    "Zaloguj się do panelu swojego hostingu lub dostawcy DNS.\nWejdź w ustawienia DNS domeny („Strefa DNS” / „Edycja DNS” / „Rekordy DNS”).\nDodaj nowy rekord typu TXT — użyj „Host/Nazwa” i „Wartość” z tabeli powyżej.\nZapisz i poczekaj kilka minut na propagację.",
  "provider.generic": "Dodaj rekord w panelu DNS u swojego dostawcy domeny.",

  "http.where.title": "Gdzie wgrać plik",
  "http.where.body":
    "Umieść plik na serwerze WWW domeny tak, aby był dostępny dokładnie pod adresem powyżej — czyli w folderze .well-known/acme-challenge w głównym katalogu strony. Musi działać po HTTP (port 80).",
  "httpcheck.checking": "Sprawdzam plik…",
  "httpcheck.ok": "Plik widoczny — możesz weryfikować",
  "httpcheck.pending": "Nie widać pliku (albo zła treść) — sprawdź i spróbuj ponownie",
  "httpcheck.error": "Nie udało się sprawdzić automatycznie — otwórz plik ręcznie",
  "http.check": "Sprawdź, czy plik jest dostępny",
  "http.open": "Otwórz plik",
  "http.checkNote":
    "Sprawdzanie automatyczne jest orientacyjne — plik pobiera zewnętrzny serwis (allorigins.win), bo przeglądarka sama go nie odczyta. Jeśli nie zadziała, kliknij „Otwórz plik”, sprawdź na oczy, że widać treść pliku, a potem kliknij „Zweryfikuj mimo to”.",
  "chal.verifyLockedHttp":
    "Przycisk „Zweryfikuj” odblokuje się, gdy wykryjemy plik. Kliknij „Sprawdź, czy plik jest dostępny” albo „Otwórz plik”.",

  "resume.text": "Masz niedokończoną weryfikację dla {0}.",
  "resume.hint": "Możesz do niej wrócić — dane (rekord) są te same, nic nie trzeba dodawać od nowa.",
  "resume.continue": "Wróć do weryfikacji",
  "resume.discard": "Zacznij od nowa",
  "resume.restoring": "Wczytuję zapisaną weryfikację…",

  "done.title": "Gotowe! Masz swój certyfikat SSL",
  "done.subtitle":
    "Poniżej krok po kroku: co pobrać i gdzie dokładnie to wkleić. Nie musisz znać się na kryptografii — wystarczy dopasować pliki do pól w panelu.",
  "done.staging.warning":
    "To jest certyfikat TESTOWY (staging) — przeglądarki go nie zaufają. Gdy wszystko działa, wróć i wygeneruj certyfikat produkcyjny.",

  "done.step1": "Krok 1 · Pobierz pliki",
  "done.step1.body":
    "To zwykłe pliki tekstowe (.pem). Nie zawsze potrzebujesz wszystkich — którego użyć, podpowiadamy w kroku 2.",
  "done.dl.key": "Klucz prywatny",
  "done.dl.key.h": "Tajny — trzymaj u siebie, nikomu nie wysyłaj.",
  "done.dl.cert": "Sam certyfikat",
  "done.dl.cert.h": "Certyfikat Twojej domeny.",
  "done.dl.chain": "Łańcuch / Root CA",
  "done.dl.chain.h": "Certyfikaty pośrednie urzędu.",
  "done.dl.fullchain": "Certyfikat + łańcuch razem",
  "done.dl.fullchain.h": "Jeden plik: certyfikat i łańcuch. Częsty w Nginx i gdy panel prosi o „fullchain”.",

  "done.step2": "Krok 2 · Wgraj pliki w panelu hostingu",
  "done.step2.body":
    "Wejdź w panel swojego hostingu → sekcja „SSL” lub „Certyfikaty”. Zobaczysz pola do wklejenia. Dopasuj pliki do pól po nazwie:",
  "done.map.key": "Pole „Klucz prywatny” (Private Key)",
  "done.map.cert": "Pole „Certyfikat” (Certificate)",
  "done.map.chain": "Pole „Certyfikat Root CA”, „CA” albo „łańcuch”",
  "done.map.fullchain":
    "Panel ma tylko jedno pole na certyfikat albo prosi o „fullchain”? Wtedy zamiast cert.pem i chain.pem użyj samego fullchain.pem.",
  "done.step2.how":
    "Każdy plik otwórz w Notatniku, zaznacz i skopiuj CAŁĄ zawartość — razem z liniami „-----BEGIN…” i „-----END…” — i wklej w odpowiednie pole. Na końcu zapisz. Certyfikat zwykle zaczyna działać od razu (czasem trzeba chwilę poczekać).",
  "done.secret":
    "Klucz prywatny (privkey.pem) jest tajny — trzymaj go u siebie i nigdy nikomu nie wysyłaj ani nie wklejaj w obce miejsca.",

  "done.expiry":
    "Certyfikat jest ważny 90 dni — potem trzeba go odnowić. Ustaw sobie przypomnienie, albo (jeśli masz własny serwer) zautomatyzuj to jak niżej.",
  "done.whatnow": "Masz własny serwer (VPS)?",
  "done.whatnow.body":
    "W konfiguracji wskaż: certyfikat = fullchain.pem, klucz prywatny = privkey.pem. W Nginx to ssl_certificate i ssl_certificate_key, w Apache SSLCertificateFile i SSLCertificateKeyFile.",
  "alt.title": "Wolisz terminal? Zrób to na serwerze",
  "alt.body":
    "To samo, ale komendą na Twoim serwerze: certbot (albo acme.sh) poprosi Cię o dodanie rekordu TXT — dokładnie tak samo jak w kreatorze wyżej — i wyda certyfikat. Podmień tylko example.com na swoją domenę.",
  "alt.note": "To komenda jednorazowa — nie odnawia się sama.",
  "alt.renewToggle": "Automatyczne odnawianie — jak ustawić (rozwiń)",

  "renew.title": "Jak sprawić, żeby certyfikat odnawiał się sam",
  "renew.body":
    "Certyfikat jest ważny 90 dni. Zamiast robić to ręcznie co 3 miesiące, wybierz swoją sytuację:",
  "renew.shared.title": "Hosting współdzielony (cyberFolks, OVH, nazwa.pl…)",
  "renew.shared.body":
    "Najprościej: w panelu hostingu jest zwykle darmowy, samoodnawiający się certyfikat SSL (Let's Encrypt / AutoSSL). Włączasz go raz i masz spokój — szukaj sekcji „SSL” albo „Certyfikaty”. Wtedy nie potrzebujesz ani certbota, ani BAXY SSL.",
  "renew.vps.title": "Masz własny serwer (VPS) i chcesz pełny automat?",
  "renew.vps.body":
    "Użyj certbota — sam odnawia certyfikat co jakiś czas. Wybierz metodę. W komendach jest już „--deploy-hook”, żeby serwer przeładował nowy certyfikat po odnowieniu — zamień „nginx” na „apache2”, jeśli używasz Apache:",
  "renew.webroot.label":
    "1) Strona działa po HTTP — metoda „webroot” (podmień /var/www/html na katalog swojej strony):",
  "renew.dns.label":
    "2) Wildcard albo brak dostępu po HTTP — przez API dostawcy DNS (przykład dla Cloudflare):",
  "renew.dns.steps":
    "Zainstaluj wtyczkę dostawcy (np. python3-certbot-dns-cloudflare), zapisz token API w pliku ~/.secrets/cloudflare.ini i uruchom. Inny dostawca = inna wtyczka (dns-ovh, dns-google itd.).",
  "done.again": "Wygeneruj kolejny",

  "err.title": "Coś poszło nie tak",
  "err.retry": "Spróbuj ponownie",
  "err.startOver": "Zacznij od nowa (inna domena)",
  "err.verifyFailed":
    "Nie udało się potwierdzić domeny. Najczęściej rekord nie zdążył się jeszcze rozpropagować albo jego wartość się nie zgadza. Kliknij „Spróbuj ponownie” — wygenerujemy świeży rekord: nazwa zostaje taka sama, zmienia się tylko wartość. Zaktualizuj wartość w DNS, sprawdź propagację i dopiero wtedy weryfikuj. Twoja domena i ustawienia są zapamiętane — nie musisz zaczynać od zera.",
  "err.network":
    "Nie udało się połączyć z serwerem pośredniczącym. Sprawdź, czy proxy ACME działa (patrz README), i spróbuj ponownie.",
  "err.rateLimited":
    "Osiągnięto limit Let's Encrypt. Użyj środowiska testowego (staging) do prób lub poczekaj. Szczegóły w konsoli.",

  "step.config": "Konfiguracja",
  "step.verify": "Weryfikacja",
  "step.download": "Pobierz",

  "footer.madeBy": "Projekt open-source od",
  "footer.source": "Kod źródłowy",
  "footer.privacy": "Prywatność",
  "footer.terms": "Regulamin",
  "cmd.caveat":
    "Uruchamiasz ją na własnym serwerze i na własne ryzyko — najpierw sprawdź. Zawiera --agree-tos, czyli akceptuje warunki Let's Encrypt w Twoim imieniu.",
  "footer.notAffiliated":
    "BAXY SSL to projekt open-source, niepowiązany z Let's Encrypt ani ISRG i przez nie niesponsorowany ani niewspierany. Let's Encrypt to darmowa usługa i znak towarowy ISRG.",
};
