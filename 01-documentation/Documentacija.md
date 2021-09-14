

# Web aplikacija za vođenje ličnih finansija



### 01. Model Baze Podataka

---



![](C:\Users\Anon\Desktop\personal_finance_app\personal_fin_app\02-resources\db model\db_sketch_final.jpg)

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

![](C:\Users\Anon\Desktop\personal_finance_app\personal_fin_app\02-resources\diagrams\Use-Case diagram.png)



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
	-	Pregled grafikona za odabrani račun - Dva grafikona koja prikazuju udeo kategorija u ukupnim prihodima / rashodima
	-	Dodavanje prihoda 
	-	Dodavanje rashoda
	-	Odjavljivanje, kada korisnik postaje **posetilac**, i prosleđuje se na stranicu za prijavu korisnika





### 03. Dijagrami sekvence i dijagrami aktivnosti

---

#### 03.01. Primer dijagrama sekvence



- Dohvatanje svih računa jednog korisnika.

![](C:\Users\Anon\Desktop\personal_finance_app\personal_fin_app\02-resources\diagrams\seq-user-acc.png)





- Dohvatanje svih transakcija jednog računa.

  ![](C:\Users\Anon\Desktop\personal_finance_app\personal_fin_app\02-resources\diagrams\seqDiag-transactions.png)





#### 03.01. Primer dijagrama aktivnosti



- Registracija korisnika

  ![](C:\Users\Anon\Desktop\personal_finance_app\personal_fin_app\02-resources\diagrams\activity-reg.png)

  



- Prijava korisnika

  ![](C:\Users\Anon\Desktop\personal_finance_app\personal_fin_app\02-resources\diagrams\activity-log.png)





### 04. Skica korisničkog interfejsa

---



- Stranica za registraciju korisnika

  

![](C:\Users\Anon\Desktop\personal_finance_app\personal_fin_app\02-resources\design mockup\Register-mockup.png)





- Stranica za prjavu korisnika

  

![](C:\Users\Anon\Desktop\personal_finance_app\personal_fin_app\02-resources\design mockup\Register-mockup.png)