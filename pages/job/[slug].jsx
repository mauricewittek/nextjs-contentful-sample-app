import React from "react";
import JobDetails from "../../components/data/details/JobDetails";
import { getSlugs } from "../../datalayer/contentful/job";
import { getJobBySlug } from "../../datalayer/contentful/job";

const JobDetailsPage = ({ job }) => {
  return <JobDetails job={job} />;
};

export default JobDetailsPage;

export const getStaticPaths = async () => {
  const slugs = await getSlugs();
  const paths = slugs.map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  console.log("slug in slug.jsx:", params.slug);
  const slug = params.slug;
  const job = await getJobBySlug({ slug });

  return {
    props: {
      job,
    },
  };
};
