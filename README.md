# IT SPA

Aplikacja umożliwia: 

- Przeglądanie dostępnych zabiegów
- Dodawanie wybranych zabiegów do koszyka
- Wybór daty przyjazdu i wyjazdu oraz pokoju  
- Rejestrację użytkownika (opcjonalnie)
- Logowanie użytkownika (opcjonalnie)
- Podsumowanie składanego zamówienia

## Booking

Komponent koszyka, który wyświetla podsumowanie zamówienia.
Koszyk powinien też umożliwiać nanoszenie poprawek do zamówienia.
Użytkownik nie może wybrać daty przyjazdu wcześniejszej niż bieżąca.
Wybrana data wyjazdu nie może być dalsza niż rok od daty przyjazdu.

## Rejestracja

Komponent rejestracji użytkownika z opcjonalnym miernikiem siły hasła.
Rejestracja polega na zapisaniu danych użytkownika (e-mail i hasła) w pliku `database.json`.
Nie powinna być możliwa rejestracja użytkownika o identycznym adresie e-mail.

## Logowanie

Logowanie polega na porównaniu podanych przez użytkownika danych (e-mail i hasła) z tymi w pliku `database.json`.

## Pokoje


## Zabiegi 


## Koszyk

Komponent koszyka, który po najechaniu myszką wyświetla dodane pokoje i zabiegi.
Koszyk musi przetrwa przeładowanie strony(Cookies).

## Technologie

- HTML, Bootstrap
- CSS, Sass, 
- JavaScript, jQuery
- Node

ECMAScript 6.

Do interakcji z serwerem bazy danych wykorzystano `fetch`.
