import date from "date-and-time";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";

export const dateFormatter = (dateString) => {
  const dateObject = date.parse(dateString.split("T")[0], "YYYY-MM-DD");
  return dateObject.toDateString();
};

export const richTextFormatter = (rawRichText) => {
  const parsedRichText = documentToHtmlString(rawRichText);
  let styledRichText = parsedRichText.replace(
    "<ul>",
    "<ul style='list-style-type: disc'>"
  );
  return styledRichText;
};

export const tagsFormatter = (tagsField) => {
  let tags = [];
  tagsField.map((rawTag) => {
    const tag = rawTag.sys.id;
    tags.push(tag);
  });

  return tags;
};

export const skillsFormatter = (parsedTags) => {
  const skillTags = parsedTags.filter((tag) => tag.includes("skill."));
  const skills = skillTags.map((skillTag) => skillTag.replace("skill.", ""));

  return skills;
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
  company.locale = rawCompany.sys.locale

  return company;
};

export const jobFormatter = (rawJob, parseRelatedJobs = true) => {
  let job = { ...rawJob.fields };

  job.id = rawJob.sys.id;
  job.locale = rawJob.sys.locale;
  job.datePosted = dateFormatter(rawJob.fields.datePosted);
  job.company = companyFormatter(rawJob.fields.company);
  job.aboutYou = richTextFormatter(rawJob.fields.aboutYou);
  job.jobDescription = richTextFormatter(rawJob.fields.jobDescription);
  job.remunerationPackage = richTextFormatter(
    rawJob.fields.remunerationPackage
  );
  job.jobResponsibilities = richTextFormatter(
    rawJob.fields.jobResponsibilities
  );

  job.tags = tagsFormatter(rawJob.metadata.tags);
  job.skills = skillsFormatter(job.tags);

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
