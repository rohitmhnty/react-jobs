import React from 'react';
import {Route, createBrowserRouter, RouterProvider} from 'react-router-dom';
import HomePage from './pages/HomePage';
import MainLayout from './layouts/MainLayout';
import JobsPage from './pages/JobsPage';
import NotFoundPage from './pages/NotFoundPage';
import JobPage, {jobLoader} from './pages/JobPage';
import AddJobPage from './pages/AddJobPage';
import EditJobPage from './pages/EditJobPage';



const App = () => {
  // Add new job
  const addJob = async (newJob) => {
    const res = await fetch('/api/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newJob),
  });
    return;

  };

  //Delete job
  const deleteJob = async (id) => {
      const res = await fetch(`/api/jobs/${id}`, {
        method: 'DELETE',
    });
      return;
  
  };

  //Update job
  const updateJob = async(job) => {
    const res = await fetch(`/api/jobs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(job),
  });
    return;

  }

  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/jobs",
          element: <JobsPage />,
        },
        {
          path: "*",
          element: <NotFoundPage />,
        },
        {
          path: "/jobs/:id",
          element: <JobPage deleteJob = {deleteJob}/>,
          loader: jobLoader,
        },
        {
          path: "/edit-job/:id",
          element: <EditJobPage updateJobSubmit={updateJob}/>,
          loader: jobLoader,
        },
        {
          path: '/add-job',
          element: <AddJobPage addJobSubmit= {addJob}/>,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
