import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Spinner = ({loading, color }) => {

    return (
        <div className="sweet-loading">
            <ClipLoader color={color || "#ffffff"} loading={loading} />
        </div>
    );
}

export default Spinner;
