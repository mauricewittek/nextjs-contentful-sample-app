import date from "date-and-time";

export const dateFormatter = (dateString) => {
  const dateObject = date.parse(dateString.split("T"[0], "YYYY-MM-DD"));
  return dateObject.toDateString();
};

export const jobFormatter = (rawJob, parseRelatedJobs = true) => {
  let job = { ...rawJob.fields };

  job.id = rawJob.sys.id;
  job.locale = rawJob.sys.locale;
  job.datePosted = dateFormatter(rawJob.datePosted);

  const relatedJobs = rawJob.fields.relatedJobs || [];

  if (!parseRelatedJobs) {
    job.relatedJobs = [];
  } else {
    job.relatedJobs = relatedJobs.map((relatedJob) => {
      return jobFormatter(relatedJob, false);
    });
  }

  return job;
};
