import { useState } from "react";
import CircleLoader from "react-spinners/CircleLoader";

const Spinner = ({loading, color }) => {

    return (
        <div className="sweet-loading">
            <CircleLoader color={color || "#ffffff"} loading={loading} size={'10%'} />
        </div>
    );
}

export default Spinner;
