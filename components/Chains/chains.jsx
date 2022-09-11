import {useEffect, useState} from "react";
import {AvaxLogo, PolygonLogo, BSCLogo, ETHLogo} from "./logos";

/* This example requires Tailwind CSS v2.0+ */
import {Fragment} from 'react'
import {Menu, Transition} from '@headlessui/react'
import Image from 'next/image'
import {
    ArchiveIcon,
    ArrowCircleRightIcon,
    ChevronDownIcon,
    DuplicateIcon,
    HeartIcon,
    PencilAltIcon,
    TrashIcon,
    UserAddIcon,
} from '@heroicons/react/solid'
import {useAccount, useNetwork, useSwitchNetwork} from "wagmi";


const styles = {
    item: {
        display: "flex",
        alignItems: "center",
        height: "42px",
        fontWeight: "500",
        fontFamily: "Roboto, sans-serif",
        fontSize: "14px",
        padding: "0 10px",
    },
    button: {
        border: "2px solid rgb(231, 234, 243)",
        borderRadius: "12px",
    },
};

const menuItems = [
    {
        id: 1,
        key: "0x1",
        value: "Ethereum",
        icon: "/assets/ChainIcons/ethereum.svg",
    },
    {
        id: 3,
        key: "0x3",
        value: "Ropsten Testnet",
        icon: "/assets/ChainIcons/ethereum.svg",
    },
    {
        id: 4,
        key: "0x4",
        value: "Rinkeby Testnet",
        icon: "/assets/ChainIcons/ethereum.svg",
    },
    {
        id: 42,
        key: "0x2a",
        value: "Kovan Testnet",
        icon: "/assets/ChainIcons/ethereum.svg",
    },
    {
        id: 5,
        key: "0x5",
        value: "Goerli Testnet",
        icon: "/assets/ChainIcons/ethereum.svg",
    },
    {
        id: 56,
        key: "0x38",
        value: "Binance",
        icon: "/assets/ChainIcons/ethereum.svg",
    },
    {
        id: 97,
        key: "0x61",
        value: "Smart Chain Testnet",
        icon: "/assets/ChainIcons/bsc.svg",
    },
    {
        id: 137,
        key: "0x89",
        value: "Polygon",
        icon: "/assets/ChainIcons/polygon.svg",
    },
    {
        id: 80001,
        key: "0x13881",
        value: "Mumbai",
        icon: "/assets/ChainIcons/polygon.svg",
    },
    {
        id: 43114,
        key: "0xa86a",
        value: "Avalanche",
        icon: "/assets/ChainIcons/avax.svg",
    },
    {
        id: 43112,
        key: "0xa869",
        value: "Avalanche Testnet",
        icon: "/assets/ChainIcons/avax.svg",
    },
];

function Chains() {
    const [selected, setSelected] = useState({});
    const {isConnected} = useAccount();
    const {error, isLoading, pendingChainId, switchNetwork} =
        useSwitchNetwork()
    const {chain} = useNetwork()

    useEffect(() => {
        if (!chain) return null;
        const newSelected = menuItems.find((item) => item.id === chain?.id);
        if (!newSelected) return;
        setSelected(newSelected);
    }, [chain]);

    const handleMenuClick = (key) => {
        try {
            switchNetwork?.(key);
        } catch (e) {
            alert("Failed to switch to this network")
        }

    };


    if (!chain || !isConnected) return null;

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }


    return (
        <Menu as="div" className="relative inline-block text-left z-40">
            <div>
                <Menu.Button
                    className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                    {selected.value || "Select A Chain"}
                    <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true"/>
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items
                    className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
                    <div className="py-1">
                        <Menu as={'div'}>
                            {menuItems.map((item) => (
                                // <Menu.Item key={item.key} icon={item.icon} style={styles.item}>
                                //     <span style={{ marginLeft: "5px" }}>{item.value}</span>
                                // </Menu.Item>

                                <div className="py-1" key={item.key} onClick={() => handleMenuClick(item.key)}>
                                    <Menu.Item disabled={!switchNetwork || item.id === chain?.id}>
                                        {() => (
                                            <a
                                                href="#"
                                                className={classNames(
                                                    item.id === chain?.id ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'group flex items-center px-4 py-2 text-sm'
                                                )}
                                            >
                                                <Image height={32} width={32}
                                                       className=" mr-5 h-5 w-4 text-gray-400 group-hover:text-gray-500"
                                                       src={item.icon}/>
                                                <span className={"ml-3"}> {item.value}</span>
                                            </a>
                                        )}
                                    </Menu.Item>
                                </div>


                            ))}
                        </Menu>
                    </div>


                </Menu.Items>
            </Transition>
        </Menu>
    );
}

export default Chains;
