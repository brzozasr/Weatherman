export interface ReverseGeocoding {
  continent: string;                  // Kontynent
  continentCode: string;              // Kod kontynentu np. EU
  countryName:  string;               // Nazwa państwa
  countryCode:  string;               // Kod państwa (dwuliterowy np. PL)
  principalSubdivision:  string;      // Województwo
  principalSubdivisionCode:  string;  // Kod województwa (np. PL-14)
  city:  string;                      // Miasto
  locality:  string;                  // Dokładniejsza lokalizacja np. dzielnica miast lub Ocean Spokojny
  postcode:  string;                  // Kod pocztowy
}
