import { Injectable } from '@nestjs/common';
import { Country } from './interface/country.interface';
import { getNames } from 'country-list';

@Injectable()
export class CountryService {
  getAllCountries(): Country[] {
    const countryNames = getNames('en');
    const countries: Country[] = [];

    Object.keys(countryNames).forEach((code) => {
      countries.push({
        code,
        name: countryNames[code],
      } as Country);
    });

    return countries;
  }

  getCountryByCode(code: string): Country | undefined {
    const countryNames = getNames('en');
    const name = countryNames[code];

    return name ? ({ code, name } as Country) : undefined;
  }
}
