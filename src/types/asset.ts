// eslint-disable-next-line no-shadow
enum BusinessCategory {
  Energy = 'Energy',
  Finance = 'Finance',
  Healthcare = 'Healthcare',
  Manufacturing = 'Manufacturing',
  Retail = 'Retail',
  Technology = 'Technology',
}
interface RiskFactors {
  Earthquake?: number;
  'Extreme heat'?: number;
  Wildfire?: number;
  Tornado?: number;
  Flooding?: number;
  Volcano?: number;
  Hurricane?: number;
  Drought?: number;
  'Extreme cold'?: number;
  'Sea level rise'?: number;
}
interface Asset {
  id: string;
  'Asset Name': string;
  Lat: number;
  Long: number;
  'Business Category': BusinessCategory;
  'Risk Rating': number;
  'Risk Factors': RiskFactors;
  Year: number;
}
export default Asset
