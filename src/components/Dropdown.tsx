import React from 'react'
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useNavigate, useLocation } from 'react-router-dom'

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

const Dropdown = ({ userName, logOut, createApp }: { userName: string, logOut: () => void, createApp?: () => void }) => {
    const location = useLocation()
    const navigate = useNavigate()

    const handleNavigate = (path: string) => {
        if (path.includes("archive")) {
            navigate("/")
            return
        }
        navigate("/archive")
    }

    return (
        <>
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                        Actions
                        <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                    </MenuButton>
                </div>

                <Transition
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <MenuItems className="absolute left-0 z-10 mt-2 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                            <MenuItem>
                                {({ focus }) => (
                                    <span
                                        className={classNames(
                                            focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm', 'hover:bg-white'
                                        )}
                                    >
                                        {userName}
                                    </span>
                                )}
                            </MenuItem>
                            <MenuItem>
                                {({ focus }) => (
                                    <button
                                        onClick={logOut}
                                        className={classNames(
                                            focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block w-full px-4 py-2 text-left text-sm'
                                        )}
                                    >
                                        Sign out
                                    </button>
                                )}
                            </MenuItem>
                            {
                                location.pathname.includes("archive") ? null : (
                                    <MenuItem>
                                        {({ focus }) => (
                                            <button
                                                onClick={createApp}
                                                className={classNames(
                                                    focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'block w-full px-4 py-2 text-left text-sm'
                                                )}
                                            >
                                                Create App
                                            </button>
                                        )}
                                    </MenuItem>
                                )
                            }
                        </div>
                    </MenuItems>
                </Transition>
            </Menu>

        </>
    )
}

export default Dropdown;
