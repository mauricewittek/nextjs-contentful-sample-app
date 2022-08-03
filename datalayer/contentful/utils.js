import date from "date-and-time";

export const dateFormatter = (dateString) => {
  const dateObject = date.parse(dateString.split("T")[0], "YYYY-MM-DD");
  return dateObject.toDateString();
};

export const imageFormatter = (imageField) => {
  return {
    url: `https:${imageField.fields.file.url}`,
    alt: imageField.fields.title,
    height: imageField.fields.file.details.image.height,
    width: imageField.fields.file.details.image.width,
    contentType: imageField.fields.file.contentType,
  };
};

export const companyFormatter = (rawCompany) => {
  let company = { ...rawCompany.fields };
  company.id = rawCompany.sys.id;
  company.locale = rawCompany.sys.locale;
  company.logo = imageFormatter(rawCompany.fields.logo);

  return company;
};

export const jobFormatter = (rawJob, parseRelatedJobs = true) => {
  let job = { ...rawJob.fields };

  job.id = rawJob.sys.id;
  job.locale = rawJob.sys.locale;
  job.datePosted = dateFormatter(rawJob.fields.datePosted);
  job.company = companyFormatter(rawJob.fields.company)

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
