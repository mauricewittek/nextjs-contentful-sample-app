// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { searchJobs } from "../../datalayer";

export default async function handler(req, res) {
  const { sideBarFormState, searchFormState } = req.body;
  const jobs = await searchJobs({
    ...sideBarFormState,
    searchText: searchFormState,
  });

  res.status(200).json(jobs);
}
