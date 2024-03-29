import countries from './countries.json'

export const parseCountry = (country: string | null | undefined): string => {
  if (!country) {
    return 'No country provided'
  }
  return countries[country as keyof typeof countries] || country
}
