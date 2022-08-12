import Transfer from "./components/Transfer";
import Address from "../Address";
import UserBlockies from "../Blockies";
import { Card } from "antd";
import Balance from "../Balance";

const styles = {
    title: {
        fontSize: "30px",
        fontWeight: "600",
    },
    header: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "5px",
    },
    card: {
        boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
        border: "1px solid #e7eaf3",
        borderRadius: "1rem",
        width: "450px",
        fontSize: "16px",
        fontWeight: "500",
    },
};

function Wallet() {
    return (
        <Card
            style={styles.card}
            title={
                <div style={styles.header}>
                    <UserBlockies />
                    <Address size="6" copyable />
                    <Balance />
                </div>
            }
        >
            <Transfer />
        </Card>
    );
}

export default Wallet;
