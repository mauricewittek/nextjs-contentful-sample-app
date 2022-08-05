import { client } from "./client";
import { companyFormatter } from "./utils";

export const getCompanies = async() => {
    const companies = await client.getEntries({content_type: 'company'});
    
    return companies.items;
};

export const getCompanyBySlug = async ({ slug }) => {
    const rawCompany = await client.getEntries({
      content_type: "company",
      "fields.slug": slug,
      include: 2,
    });
  
    if (rawCompany.items.length == 0) {
      return null;
    }
  
    const company = companyFormatter(rawCompany.items[0]);
  
    return company;
  };
  
  export const getCompaniesSlugs = async () => {
    const rawSlugs = await client.getEntries({
      content_type: "company",
      select: ["fields.slug"],
    });
  
    const slugs = rawSlugs.items.map((rawslug) => rawslug.fields.slug);
  
    return slugs;
  };