import api from "@/api/api";
import { useLedgerStore } from "@/zustand/ledger.store";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

function useLedger() {
    const { expends, setExpends, addExpend, deleteExpend, updateExpend } =
        useLedgerStore(
            useShallow((state) => ({
                expends: state.expends,
                setExpends: state.setExpends,
                addExpend: state.addExpend,
                deleteExpend: state.deleteExpend,
                updateExpend: state.updateExpend,
            }))
        );

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await api.ledger.getLedger();
                setExpends(data);
            } catch (error) {
                console.error("Failed to fetch ledger data", error);
            }
        };

        fetchData();
    }, [setExpends]);

    return {
        expends,
        addExpend,
        deleteExpend,
        updateExpend,
    };
}

export default useLedger;
