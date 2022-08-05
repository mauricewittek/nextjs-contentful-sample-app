import React, { useState, useEffect, useRef } from "react";
import JobsList from "../data/lists/JobsList";
import SearchJobForm from "../forms/SeachJobForm";
import JobsSortForm from "../forms/JobsSortForm";
import JobsPageSideBarForm from "../forms/JobsPageSideBarForm";

const JobsPage = ({ jobs }) => {
  let title = `Found ${jobs.length} Jobs.`;
  switch (jobs.length) {
    case 0:
      title = "No Jobs found.";
      break;
    case 1:
      title = "Only one Job found.";
  }

  const [sideBarFormState, setSideBarFormState] = useState({
    jobTypes: [],
    experienceLevels: [],
    remoteOkOnly: false,
    featuredJobsOnly: false,
    baseSalaryOptions: [],
    baseSalaryBounds: [],
  });

  const [searchFormState, setSearchFormState] = useState();
  const [displayedJobs, setDisplayedJobs] = useState(jobs);

  const searchJobs = async (apiUrl, formsStates) => {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(formsStates),
    });

    const foundJobs = await response.json();
    setDisplayedJobs(foundJobs);
  };

  const initialRenderSideBar = useRef(true);
  useEffect(() => {
    if (initialRenderSideBar.current) {
      initialRenderSideBar.current = false;
    } else {
      const formsStates = { sideBarFormState, searchFormState };
      searchJobs("api/search-jobs", formsStates);
    }
  }, [sideBarFormState]);

  const initialRenderSearchForm = useRef(true);
  useEffect(() => {
    if (initialRenderSearchForm.current) {
      initialRenderSearchForm.current = false;
    } else {
    }
  }, [searchFormState]);

  return (
    <div className="flex flex-col space-y-10 sm:flex-row sm:space-x-6 sm:space-y-0 md:flex-col md:space-x-0 md:space-y-10 xl:flex-row xl:space-x-6 xl:space-y-0 mt-9">
      <JobsPageSideBarForm
        sideBarFormState={sideBarFormState}
        setSideBarFormState={setSideBarFormState}
        setdisplayedJobs={setDisplayedJobs}
      />
      <div className="w-full">
        <SearchJobForm
          searchFormState={searchFormState}
          setSearchFormState={setSearchFormState}
          setdisplayedJobs={setDisplayedJobs}
        />
        {/* Jobs header */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-slate-500 italic">{title}</div>
          {/* Sort */}
          <JobsSortForm
            jobs={displayedJobs}
            setDisplayedJobs={setDisplayedJobs}
          />
        </div>
        <JobsList jobs={displayedJobs} />
      </div>
    </div>
  );
};

export default JobsPage;
