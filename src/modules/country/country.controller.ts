import { Body, Controller, Get } from '@nestjs/common';
import { CountryService } from './country.service';
import { Country } from './interface/country.interface';

@Controller('countries')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  getAllCountries(): Country[] {
    return this.countryService.getAllCountries();
  }

  @Get('code')
  getCountryByCode(@Body() body: { code: string }): Country | undefined {
    const { code } = body;
    return this.countryService.getCountryByCode(code);
  }
}
