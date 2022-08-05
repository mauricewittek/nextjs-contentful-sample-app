// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { searchJobs } from "../../datalayer";

export default async function handler(req, res) {
  const { sideBarFormState, searchFormState } = req.body;
  const minBaseSalary =
    sideBarFormState.baseSalaryBounds.length > 0
      ? Math.min(...sideBarFormState.baseSalaryBounds)
      : 0;

  const maxBaseSalary =
    sideBarFormState.baseSalaryBounds.length > 0
      ? Math.max(...sideBarFormState.baseSalaryBounds)
      : 1000000;

  const query = {
    ...sideBarFormState,
    searchBarText: searchFormState,
    minBaseSalary,
    maxBaseSalary,
  };

  const jobs = await searchJobs(query);

  res.status(200).json(jobs);
}
