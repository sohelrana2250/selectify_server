export const WORKINGTIME = {
  FULLTIME: 'FULL TIME',
  PARTTIME: 'PART TIME',
  CONTRACTUAL: 'CONTRACTUAL',
} as const;

export const CURRENCY = {
  BDT: 'BDT',
  USD: 'USD',
} as const;


export  const excludeField = ['position','companyname','workingtime','location','companyapplyId'];
