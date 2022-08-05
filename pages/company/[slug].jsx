import React from "react";
import CompanyDetails from "../../components/data/details/CompanyDetails";
import {
  getCompaniesSlugs,
  getCompanyBySlug,
  getJobsByCompanyId,
} from "../../datalayer";

const CompanyDetailsPage = ({company, companyJobs}) => {
  
  return <CompanyDetails company={company} companyJobs={companyJobs} />;
};

export default CompanyDetailsPage;

export const getStaticPaths = async () => {
  const slugs = await getCompaniesSlugs();
  const paths = slugs.map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const slug = params.slug;
  const company = await getCompanyBySlug({ slug });
  const companyJobs = await getJobsByCompanyId({ id: company.id });

  return {
    props: {
      company,
      companyJobs,
    },
  };
};
