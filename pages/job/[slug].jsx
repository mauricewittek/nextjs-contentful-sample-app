import React from "react";
import JobDetails from "../../components/data/details/JobDetails";
import { getJobSlugs, getJobBySlug } from "../../datalayer";

const JobDetailsPage = ({ job }) => {
  return <JobDetails job={job} />;
};

export default JobDetailsPage;

export const getStaticPaths = async () => {
  const slugs = await getJobSlugs();
  const paths = slugs.map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const slug = params.slug;
  const job = await getJobBySlug({ slug });

  return {
    props: {
      job,
    },
  };
};
