import React from 'react';
import Loading from './Loading';

import './styles/AppComponent.css'

const AppComponent = ({ app }: { app: any }) => {

    return (
        <>
            <article
                key={app.uuid}
                className={`
                    flex w-100% flex-col 
                    items-start justify-between ml-2 mr-2 
                    mt-4 mb-4 bg-white shadow-lg rounded-lg 
                    p-4 hover:bg-gray-100
                `}
            >
                <div className="flex items-center justify-between w-full">
                    <time dateTime={app.created_at.split("T")[0]} className="text-gray-500">
                        {app.created_at.split("T")[0]}
                    </time>
                    {
                        app.status === "PENDING" ? (
                            <Loading width={6} height={6} />
                        ) : app.status === "ACTIVE" ? (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                                <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                            </svg>
                        ) : app.status === "INACTIVE" ? (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                                <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
                            </svg>
                        ) : null
                    }
                </div>
                <div className="group relative flex flex-row items-center justify-between w-full">
                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600 break-all">{app.name}</p>
                    <a className="mt-5 bg bg-blue-800 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full text-sm" target='_blank' href={app.deploy_url}>
                        {
                            app.deploy_url ? "View" : app.status === "INACTIVE" ? "Failed" : "App Deploying..."
                        }
                    </a>
                </div>
            </article>
        </>
    )
}

export default AppComponent;
