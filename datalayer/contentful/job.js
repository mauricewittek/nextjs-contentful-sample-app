import { client } from "./client";
import { jobFormatter, skillsFormatter, tagsFormatter } from "./utils";

export const getJobs = async () => {
  const res = await client.getEntries({ content_type: "job" });
  const rawJobs = res.items;

  const jobs = rawJobs.map((job) => {
    return jobFormatter(job);
  });

  return jobs;
};

export const getJobBySlug = async ({ slug }) => {
  const rawJob = await client.getEntries({
    content_type: "job",
    "fields.slug": slug,
    include: 2,
  });

  if (rawJob.items.length == 0) {
    return null;
  }

  const job = jobFormatter(rawJob.items[0]);

  return job;
};

export const getJobsByCompanyId = async ({ id }) => {
  const result = await client.getEntries({
    content_type: "job",
    "fields.company.sys.id": id,
    include: 2,
  });

  if (result.items.length == 0) {
    return null;
  }

  const jobs = result.items.map((rawJob) => {
    return jobFormatter(rawJob);
  });

  return jobs;
};

export const getJobSlugs = async () => {
  const rawSlugs = await client.getEntries({
    content_type: "job",
    select: ["fields.slug"],
  });

  const slugs = rawSlugs.items.map((rawslug) => rawslug.fields.slug);

  return slugs;
};

export const getJobsSkills = async () => {
  const res = await client.getTags();
  const rawTags = res.items;

  const tags = tagsFormatter(rawTags);
  const skills = skillsFormatter(tags);

  return skills;
};

export const searchJobs = async (query) => {
  let contentfulQuery = {
    content_type: "job",
    include: 2,
  };

  if (query.remoteOkOnly) {
    contentfulQuery["fields.remote"] = true;
  }

  if (query.featuredJobsOnly) {
    contentfulQuery["fields.featuredJob"] = true;
  }

  contentfulQuery["fields.baseAnnualSalary[gte]"] = query.minBaseSalary;
  contentfulQuery["fields.baseAnnualSalary[lte]"] = query.maxBaseSalary;

  // Add Inclusion Query Filters
  // [DOES NOT WORK]
  /*contentfulQuery["fields.jobType[in]"] = query.jobTypes.join(",");
  contentfulQuery["fields.experienceLevel[in]"] =
    query.experienceLevels.join(","); */

  const res = await client.getEntries(contentfulQuery);
  const foundJobs = res.items;

  const jobs = foundJobs.map((rawJob) => {
    return jobFormatter(rawJob);
  });

  // Contentful doesn't have an OR operator so we have to filter at the application level
  let filteredJobs = jobs.filter((job) => {
    if (query.experienceLevels.length == 0) return true;
    if (query.experienceLevels.includes(job.experienceLevel)) return true;
    return false;
  });

  filteredJobs = filteredJobs.filter((job) => {
    if (query.jobTypes.length == 0) return true;
    if (query.jobTypes.includes(job.jobType)) return true;
    return false;
  });

  return filteredJobs;
};
