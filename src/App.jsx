/* eslint-disable no-unused-vars */
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import JobsPage from "./pages/JobsPage";
import NotFound from "./pages/NotFound";
import AddJob from "./pages/AddJob";
import SingleJob, { jobLoader } from "./pages/SingleJob";
import EditJob from "./pages/EditJob";
import MainLayout from "./layouts/MainLayout";


const App = () => {
  //Add new job
  const addJob = async (newJob) => {
    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newJob),
    });
    return;
  };

  //Delete Job
  const deleteJob = async (id) => {
    const res = await fetch(`/api/jobs/${id}`, {
      method: "DELETE",
    });
    return;
  };
  
  //Update Job
  const updateJob = async (job) => {
    const res = await fetch(`/api/jobs/${job.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(job),
    });
    return;
  }
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route
          path="/jobs/:id"
          element={<SingleJob deleteJob={deleteJob} />}
          loader={jobLoader}
        />
         <Route
          path="/edit-job/:id"
          element={<EditJob updateJobSubmit={updateJob}/>}
          loader={jobLoader}
          
        />
        <Route path="/add-jobs" element={<AddJob addJobSubmit={addJob} />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
