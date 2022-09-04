import UserBlockies from "../Blockies";
import {useEnsAvatar, useEnsName} from "wagmi";

const UserInfo = ({address}) => {

    const {data: ensName} = useEnsName({address})
    const {data: ensAvatar, isError} = useEnsAvatar({
        addressOrName: address,
    })

    return (
        <div className={"flex flex-col items-center mt-5"}>
            {ensAvatar ?
                <img className={"rounded-full w-20 h-20 mt-10"}
                     src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
                     alt=""/> :
                <UserBlockies size={30} userAddress={address}/>
            }

            <p className={'p-3'}>{ensName || address}</p>
        </div>

    )
}
export default UserInfo
