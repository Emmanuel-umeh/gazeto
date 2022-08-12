import Blockies from 'react-blockies';
import Spinner from "../Spinner";
import {useAccount} from "wagmi";

const UserBlockies = ({size}) => {
    const { address } = useAccount()
    if (!address) return <Spinner loading={true} />;
    return (
        <Blockies
            seed={address}
            size={size || 10}
            scale={3}
            color="#dfe"
            bgColor="#ffe"
            spotColor="#abc"
            className="identicon"
        />
    )
}
export default UserBlockies;
