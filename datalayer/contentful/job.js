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
    include: 2,
  });

  if (rawJob.items.length == 0) {
    return null;
  }

  const job = jobFormatter(rawJob.items[0]);

  console.log("slug:", slug);
  console.log("job:", job);

  return job;
};

export const getSlugs = async () => {
  const rawSlugs = await client.getEntries({
    content_type: "job",
    select: ["fields.slug"],
  });

  const slugs = rawSlugs.items.map((rawslug) => rawslug.fields.slug);

  return slugs;
};
