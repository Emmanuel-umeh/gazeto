import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Spinner = ({loading, color, size }) => {

    return (
        <div className="sweet-loading">
            <ClipLoader size={size} color={color || "#ffffff"} loading={loading} />
        </div>
    );
}

export default Spinner;
