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
