/* eslint-disable react/no-unescaped-entities */
/* This example requires Tailwind CSS v2.0+ */
import { getJobs, getJobsSkills } from "../datalayer/";
import JobsPage from "../components/ui/JobsPage";

export default function Index({ jobs, jobsSkills }) {
  return <JobsPage jobs={jobs} jobsSkills={jobsSkills} />;
}

export const getStaticProps = async (ctx) => {
  const jobs = await getJobs();
  const jobsSkills = await getJobsSkills();

  return {
    props: {
      jobs,
      jobsSkills,
    },
  };
};
