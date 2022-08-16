/* This example requires Tailwind CSS v2.0+ */
import {Fragment, useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import Image from 'next/image'
import {connectors} from "./connectors";
import {useMoralis} from "react-moralis";
import Spinner from "../Spinner";


const ConnectWallet = () => {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const {authenticate, isAuthenticated, account, chainId, logout} = useMoralis()
    console.log({account, isAuthenticated});

    const connectToWallet = async ({connectorId}) => {
        try {
            setLoading(true)
            await authenticate({provider: connectorId});
            window.localStorage.setItem("connectorId", connectorId);
            setOpen(false)
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Connect Wallet
            </button>

            {/*  Connect wallet modal  */}
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
                    </Transition.Child>

                    <div className="fixed z-10 inset-0 overflow-y-auto">
                        <div
                            className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                {loading ?
                                    <Dialog.Panel
                                        className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-sm sm:w-full sm:p-6">
                                        <div>
                                            <Dialog.Title as="h2"
                                                          className="text-2xl leading-6 font-medium text-gray-900">
                                                Connecting wallet
                                            </Dialog.Title>

                                            <div className="mt-2 text-xs">
                                                <p>Communicating with wallet. Sign message with your wallet</p>
                                            </div>
                                            <div className={'mt-3 text-center'}>
                                                <Spinner loading={true} color={"black"}/>
                                            </div>
                                        </div>
                                    </Dialog.Panel>

                                    :

                                    <Dialog.Panel
                                        className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-sm sm:w-full sm:p-6">
                                        <div>
                                            <div className="mt-3 text-center sm:mt-5">
                                                <Dialog.Title as="h3"
                                                              className="text-lg leading-6 font-medium text-gray-900">
                                                    Connect Wallet
                                                </Dialog.Title>
                                                <div>
                                                    {connectors.map(({title, icon, connectorId}, key) => (

                                                        <button
                                                            type="button"
                                                            key={key}
                                                            className="w-full mt-5 inline-flex justify-between border border-gray-300 items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-dark hover:bg-neutral-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                            onClick={() => connectToWallet({connectorId})}
                                                        >
                                                            {title}
                                                            <Image width={30} height={30} src={icon} alt={title}/>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-5 sm:mt-6">
                                            <button
                                                type="button"
                                                className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                                                onClick={() => setOpen(false)}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </Dialog.Panel>
                                }


                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>

        </>


    )
}

export default ConnectWallet
