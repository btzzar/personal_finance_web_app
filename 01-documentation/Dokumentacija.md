

# Web aplikacija za vođenje ličnih finansija



[TOC]

### 00. Projektni Zahtev i Ograničenja

---

#### 00.1. Projektni Zahtev

Aplikacija treba da omogući korisnicima da evidentiraju svoje lične finansije. Aplikacija podržava više korisnika i mora da vodi striktno računa o tome da prijavljenom korisniku prikazuje samo podatke iz baze podataka koji se odnose na njega. Korisnik se na aplikaciju prijavljuje sa korisničkim imenom i lozinkom. Lozinka mora da poštuje vrlo stroge kriterijume za njeno formiranje. Kriterijume odrediti samostalno u skladu sa primerima i predlozima dobre prakse koje treba samostalno pronaći na relevantnim izvorima. Korisnik može samostalno da kreira svoje kase (račune) i da definiše njihovo ime i opis, kao i prioritet u prikazu na listi računa (kasa). Svaka kasa mora imati jednu unapred određenu valutu, npr. Evro ili Dinar. Korisnik može da definiše kategorije troškova i prihoda, npr. za troškove može da napravi kategoriju za evidenciju računa za komunalne usluge, električnu energiju, troškovi za hranu, garderobu itd. U kategorije za prihode može da napravi kategoriju za evidenciju plate, štednje, džeparac itd. Prilikom evidentiranja prihoda, aplikacija automatski upisuje prihod u odabrani račun/kasu i automatski koriguje vrednost stanja (saldo) za taj račun. Isto se dešava u slučaju evidentiranja rashoda. U oba slučaja, korisnik treba da evidentira jednu od svojih definisanih kategorija. Aplikacija treba da omogući prikaz svih računa na kojima se vidi stanje, kao i poslednja promena (prihod ili rashod, zajedno sa datumom evidencije). Kada se otvori pojedinačni račun, aplikacija treba da prikaže spisak svih promena, poređanih od najnovije u vrhu prema najstarijoj na dnu. Obezbediti paginaciju, tako da se na jednoj strani prikaže određeni broj promena, nakon čega korisnik može kliktanjem na dugme za drugu stranu, treću stranu itd. da pregleda sve promene do samog početka voženja računa. Pored spiska u obliku tabele treba kreirati tri grafikona. Jedan grafikon predstavlja tzv. „Pie Chart“ za prikaz udela određene kategorije u prihodima, npr. plata 80%, štednja 19%, džeparac 1% itd. Drugi grafikon prikazuje isti oblik samo za rashode, npr. 15% za hranu, 25% za račune, 15% za razonodu itd. Treću grafikon treba da prikaže liniju kretanja saldo vrednosti po datumima na X osi i iznosu salda na Y osi. Grafikoni se generišu na osnovu podataka za tačno određeni opseg datuma (od-do) koje korisnik može da promeni. Jednom evidentirane promene ne mogu da se brišu, već mogu da se koriguju evidencijom suprotne operacije u istom iznosu, npr. ako je greškom evidentiran neki prihod, on se poništava evidentiranjem rashoda u istom iznosu. Grafički interfejs veb sajta treba da bude realizovan sa responsive dizajnom.


#### 00.2 Tehnička ograničenja

- Aplikacija mora da bude realizovana na Node.js platformi korišćenjem Express biblioteke. Aplikacija mora da bude podeljena u dve nezavisne celine: back-end veb servis (API) i front-end (GUI aplikacija). Sav kôd aplikacije treba da bude organizovan u jednom Git spremištu u okviru korisničkog naloga za ovaj projekat, sa podelom kao u primeru zadatka sa vežbi.

- Baza podataka mora da bude relaciona i treba koristiti MySQL ili MariaDB sistem za upravljanje bazama podataka (RDBMS) i u spremištu back-end dela aplikacije mora da bude dostupan SQL dump strukture baze podataka, eventualno sa inicijalnim podacima, potrebnim za demonstraciju rada projekta.
- Back-end i front-end delovi projekta moraju da budi pisani na TypeScript jeziku, prevedeni TypeScript prevodiocem na adekvatan JavaScript. Back-end deo aplikacije, preveden na JavaScript iz izvornog TypeScript koda se pokreće kao Node.js aplikacija, a front-end deo se statički servira sa rute statičkih resursa back-end dela aplikacije i izvršava se na strani klijenta. Za postupak provere identiteta korisnika koji upućuje zahteve back-end delu aplikacije može da se koristi mehanizam sesija ili JWT (JSON Web Tokena), po slobodnom izboru.
- Sav generisani HTML kôd koji proizvodi front-end deo aplikacije mora da bude 100% validan, tj. da prođe proveru W3C Validatorom (dopuštena su upozorenja - Warning, ali ne i greške - Error). Grafički korisnički interfejs se generiše na strani klijenta (client side rendering), korišćenjem React biblioteke, dok podatke doprema asinhrono iz back-end dela aplikacije (iz API-ja). Nije neophodno baviti se izradom posebnog dizajna grafičkog interfejsa aplikacije, već je moguće koristiti CSS biblioteke kao što je Bootstrap CSS biblioteka. Front-end deo aplikacije treba da bude realizovan tako da se prilagođava različitim veličinama ekrana (responsive design).
- Potrebno je obezbediti proveru podataka koji se od korisnika iz front-end dela upućuju back-end delu aplikacije. Moguća su tri sloja zaštite i to: (1) JavaScript validacija vrednosti na front-end-u; (2) Provera korišćenjem adekvatnih testova ili regularnih izraza na strani servera u back-end-u (moguće je i korišćenjem izričitih šema - Schema za validaciju ili drugim pristupima) i (3) provera na nivou baze podataka korišćenjem okidača nad samim tabelama baze podataka.
- Neophodno je napisati prateću projektnu dokumentaciju o izradi aplikacije koja sadrži (1) model baze podataka sa detaljnim opisom svih tabela, njihovih polja i relacija; (2) dijagram baze podataka; (3) dijagram organizacije delova sistema, gde se vidi veza između baze, back-end, front-end i korisnika sa opisom smera kretanja informacija; (4) popis svih aktivnosti koje su podržane kroz aplikaciju za sve uloge korisnika aplikacije prikazane u obliku Use-Case dijagrama; kao i (5) sve ostale elemente dokumentacije predviđene uputstvom za izradu dokumentacije po ISO standardu.
- Izrada oba dela aplikacije (projekata) i promene kodova datoteka tih projekata moraju da bude praćene korišćenjem alata za verziranje koda Git, a kompletan kôd aplikacije bude dostupan na javnom Git spremištu, npr. na besplatnim GitHub ili Bitbucket servisima, jedno spremište za back-end projekat i jedno za front-end projekat. Ne može ceo projekat da bude otpremljen u samo nekoliko masovnih Git commit-a, već mora da bude pokazano da je projekat realizovan u kontinuitetu, da su korišćene grane (branching), da je bilo paralelnog rada u više grana koje su spojene (merging) sa ili bez konflikata (conflict resolution).





### 01. Model Baze Podataka

---



![](https://github.com/btzzar/personal_finance_web_app/blob/master/02-resources/db%20model/db_sketch_final.jpg?raw=true)

- Tabela **user** se koristi za upis svih registrovanih korisnika aplikacije. Sadrži polja:

  - user_id 		       - jedinstveni identifikacioni broj, postavljen za primarni ključ tabele
  - created_at          - vremenski pečat za vreme kreiranja unosa
  - username           - korisničko ime 
  - email                   - jedinstvena email adresa
  - password_hash - šifrovana vrednost lozinke
  - first_name          - Ime korisnika
  - last_name           - Prezime korisnika

  

Svaki korisnik može imati više **računa**



- Tabela **account** predstavlja spisak svih **računa** korisnika. Sadrži polja:
  - account_id       - jedinstveni identifikacioni broj, postavljen za primarni ključ tabele
  - user_id 		     - jedinstveni broj korisnika, postavljen za strani ključ tabele, koristi se kako bi definisali kom korisniku pripada račun
  - created_at         - vremenski pečat za vreme kreiranja unosa
  - currency            - ENUM vrednost koja označava valutu računa. Može imati sledeće vrednosti - "rsd", "eur", "usd", "gbp"
  - name                  - naziv računa
  - description         - opis računa
  - total                      - saldo računa, rezultat računanja svih transakcija koje su se desile a vezane su za taj račun. 
    - Uspostavljen je trigger koji pri svakoj transakciji (expense, income) ažurira vrednost total za odgovarajući račun. 



Svaki račun može imati više **transakcija** - prihoda i rashoda. 



Tabela **expense** predstavlja spisak svih **rashoda** računa. Sadrži polja:

- expense_id       - jedinstveni identifikacioni broj, postavljen za primarni ključ tabele
- account_id       - jedinstveni broj, postavljen za strani ključ tabele, označava račun za koji se izvršila data transakcija
- category           - predstavlja kategoriju rashoda (opis)
- value                 - vrednost transakcije
- currency            - ENUM vrednost koja označava valutu transakcije. Može imati sledeće vrednosti - "rsd", "eur", "usd", "gbp"
- created_at          - vremenski pečat za vreme kreiranja unosa



Tabela **income** predstavlja spisak svih **prihoda** računa. Sadrži polja:

- income_id       - jedinstveni identifikacioni broj, postavljen za primarni ključ tabele
- account_id       - jedinstveni broj, postavljen za strani ključ tabele, označava račun za koji se izvršila data transakcija
- category           - predstavlja kategoriju prihoda(opis)
- value                 - vrednost transakcije
- currency            - ENUM vrednost koja označava valutu transakcije. Može imati sledeće vrednosti - "rsd", "eur", "usd", "gbp"
- created_at          - vremenski pečat za vreme kreiranja unosa





### 02. Use-Case dijagram

---

![](https://github.com/btzzar/personal_finance_web_app/blob/master/02-resources/diagrams/Use-Case%20diagram.png?raw=true)



#### 02.1. Opis aktivnosti

---

**Posetilac sajta**

​	Svaki posetilac sajt može obaviti dve aktivnosti:

-	Registracija naloga, nakon čega će biti prosleđen na stranicu za prijavu korisnika 
-	Prijava, nakon čega postaje **prijavljen korisnik** i prosleđuje se na stranicu za pregled računa.



**Prijavljen korisnik**

​	Svaki prijavljeni korisnik može obavljati sledeće aktivnosti:

-	Pregled spiska svih računa
-	Dodavanje novog računa
-	Pregled spiska svih transakcija za odabrani račun
-	Pregled grafikona za odabrani račun - Dva grafikona koja prikazuju udeo kategorija u ukupnim prihodima / 		rashodima
-	Dodavanje prihoda 
-	Dodavanje rashoda
-	Odjavljivanje, kada korisnik postaje **posetilac**, i prosleđuje se na stranicu za prijavu korisnika



### 03. Dijagrami sekvence i dijagrami aktivnosti

---

#### 03.01. Primer dijagrama sekvence



- Dohvatanje svih računa jednog korisnika.

![](https://github.com/btzzar/personal_finance_web_app/blob/master/02-resources/diagrams/seq-user-acc.png?raw=true)





- Dohvatanje svih transakcija jednog računa.

  ![](https://github.com/btzzar/personal_finance_web_app/blob/master/02-resources/diagrams/seqDiag-transactions.png?raw=true)





#### 03.01. Primer dijagrama aktivnosti



- Registracija korisnika

  ![](https://github.com/btzzar/personal_finance_web_app/blob/master/02-resources/diagrams/activity-reg.png?raw=true)

  



- Prijava korisnika

  ![](https://github.com/btzzar/personal_finance_web_app/blob/master/02-resources/diagrams/activity-log.png?raw=true)





### 04. Skica korisničkog interfejsa

---



- Stranica za registraciju korisnika

  

![](https://github.com/btzzar/personal_finance_web_app/blob/master/02-resources/design%20mockup/Register-mockup.png?raw=true)





- Stranica za prijavu korisnika

  

![](https://github.com/btzzar/personal_finance_web_app/blob/master/02-resources/design%20mockup/Login-mockup.png?raw=true)

- Stranica za pregled svih računa prijavljenog korisnika i dodavanje računa

  

![](https://github.com/btzzar/personal_finance_web_app/blob/master/02-resources/design%20mockup/accounts-mockup.png?raw=true)



- Stranica za pregled svih transakcija odabranog računa i grafikona prihoda i rashoda

  

![](https://github.com/btzzar/personal_finance_web_app/blob/master/02-resources/design%20mockup/show-transactions.png?raw=true)





- Stranica za pregled svih transakcija odabranog računa i dodavanje transakcije

  

![](https://github.com/btzzar/personal_finance_web_app/blob/master/02-resources/design%20mockup/add-transaction.png?raw=true)






### 05. Testiranje back-end dela aplikacije kroz Postman
---

Fajl u JSON formatu se nalazi na lokaciji [02-resources/Testiranje back-end dela (API)](https://github.com/btzzar/personal_finance_web_app/blob/master/02-resources/Testiranje%20back-end%20dela%20(API).postman_collection.json).

Za potrebe testiranja potrebno je: 

1. Izvršiti logovanje sa validnim podacima - primer Auth/POST a new login request with valid data
2. Kopirati vrednost ključa "authToken" iz odgovora
3. Nalepiti kopiranu vrednost na neku od sledećih lokacija
   1. **Samo jednom** - u korenom folderu, pod karticom *Authorization*, odabrati tip ***Bearer Token*** i nalepiti u ponuđeno polje.
   2. **Za svaki folder** - u folderu u kom se dešava željeni zahtev pod karticom *Authorization*, odabrati tip ***Bearer Token*** i nalepiti u ponuđeno polje. 
   3. **Za svaki zahtev** - u samom zahtevu pod karticom *Authorization*, odabrati tip ***Bearer Token*** i nalepiti u ponuđeno polje.





### 06. Testiranje Rada Aplikacije

----

- Registrovati novog korisnika, prijaviti se i dodati račune i transakcije, ili
- Pristupiti sa kredencijalima:  ``` email: luka@gmail.com password: Test1234! ```  ili ```email: marko@marko.com password: Test1234!```. Na ovim nalozima postoje računi i transakcije koji obuhvataju sve funkcionalnosti aplikacije.

