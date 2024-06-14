import React, { useEffect, useState } from 'react';
import Loading from './Loading';
import { useGlobalState } from "../context";
import { createAppRequest } from '../requests/create_app';

const CreateAppForm = ({ onClose }: { onClose: () => void }) => {
    const [loading, setLoading] = React.useState(false)
    const globalState = useGlobalState()
    const [appData, setAppData] = useState({
        name: "",
        repository_url: "",
        deployment_directory: "",
    });


    const handleNameChange = async (e: any) => {
        setAppData({ ...appData, name: e.target.value });
    }

    const handleRepositoryUrlChange = async (e: any) => {
        setAppData({ ...appData, repository_url: e.target.value });
    }

    const handleDeploymentDirChange = async (e: any) => {
        setAppData({ ...appData, deployment_directory: e.target.value });
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!globalState?.id) {
            return
        }
        try {
            setLoading(true);
            await createAppRequest(appData.name, appData.repository_url, appData.deployment_directory, globalState?.id);
            setLoading(false);
            globalState?.setUser({ ...globalState, refetch: !globalState?.refetch });
            onClose();
        } catch (error: any) {
            setLoading(false);
            console.log(error);
            alert("Error creating app. Please try again.");
        }
    }

    useEffect(() => {
        return () => {
            globalState?.setUser({ ...globalState, refetch: !globalState?.refetch });
        }
    }, [])

    return (
        <div className='bg-white rounded-lg p-4'>


            <h2 className="text-xl font-extrabold mb-4">Deploy An App</h2>


            <p>Remember the repository must be public and https</p>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <input type="hidden" name="remember" value="true" />
                <div className="-space-y-px rounded-md shadow-sm">
                    <div>
                        <label htmlFor="name" className="sr-only">
                            App Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="name"
                            onChange={handleNameChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="repositoryUrl" className="sr-only">
                            Repository URL
                        </label>
                        <input
                            id="repositoryUrl"
                            name="repositoryUrl"
                            type="text"
                            required
                            className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="repository url"
                            onChange={handleRepositoryUrlChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="deploymentDir" className="sr-only">
                            Deployment Directory
                        </label>
                        <input
                            id="deploymentDir"
                            name="deploymentDir"
                            type="text"
                            required
                            className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="deployment directory. ex: /dist"
                            onChange={handleDeploymentDirChange}
                        />
                    </div>
                </div>
                <div className="flex justify-center">
                    {loading ? (
                        <Loading width={6} height={6} />
                    ) : (
                        <button
                            type="submit"
                            className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Create
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default CreateAppForm;
