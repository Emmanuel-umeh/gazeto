import Blockies from 'react-blockies';
import Spinner from "../Spinner";
import {useAccount} from "wagmi";

const UserBlockies = ({size, userAddress}) => {
    const { address } = useAccount()
    if (!address) return <Spinner loading={true} />;
    return (
        <Blockies
            seed={userAddress || address}
            size={size || 10}
            scale={3}
            bgColor="#fff"
            className="identicon"
        />
    )
}
export default UserBlockies;
