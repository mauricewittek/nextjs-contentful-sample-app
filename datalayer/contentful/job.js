import { client } from "./client";
import { jobFormatter } from "./utils";

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
  });

  if (rawJob.items.length == 0) {
    return null;
  }

  return jobFormatter(rawJob.items[0]);
};

export const getSlugs = async () => {
  const rawSlugs = await client.getEntries({
    content_type: "job",
    select: ["fields.slug"],
    include: 2,
  });

  const slugs = rawSlugs.items.map((rawslug) => rawslug.fields.slug);

  return slugs;
};
