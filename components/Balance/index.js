import {useAccount, useBalance} from 'wagmi'
import Spinner from "../Spinner";

const Balance = () => {
    const { address } = useAccount()
    const { data, isError, isLoading } = useBalance({
        addressOrName: address,
        watch: true,
    })

    if (isLoading) return <Spinner loading={true} />
    if (isError) return <div>...</div>
    return (
        <div>
            Balance: {data?.formatted} {data?.symbol}
        </div>
    )
}


export default Balance
