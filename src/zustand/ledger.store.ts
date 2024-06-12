import { Expend, Ledger } from "@/types/d";
import getLsMonth from "@/utils/getLsMonth";
import { produce } from "immer";
import { create } from "zustand";

export const useLedgerStore = create<Ledger>((set) => ({
    expends: null,
    month: getLsMonth(),
    monthlyExpends: null,
    setExpends: (expends: Expend[]) => set({ expends }),
    selectMonth: (selectedMonth: number) => {
        localStorage.setItem("selectedMonth", selectedMonth.toString());
        set(() => ({
            month: selectedMonth,
        }));
    },
    setExpend: (newExpend: Expend) =>
        set(
            produce((state: Ledger) => {
                if (state.expends) {
                    state.expends.push(newExpend);
                } else {
                    state.expends = [newExpend];
                }
            })
        ),
    deleteExpend: (expendId: string) =>
        set(
            produce((state: Ledger) => {
                if (state.expends) {
                    state.expends = state.expends.filter(
                        (expend) => expend.id !== expendId
                    );
                }
            })
        ),
    updateExpend: (newExpend: Expend) =>
        set(
            produce((state: Ledger) => {
                if (state.expends) {
                    state.expends = state.expends.map((expend) =>
                        expend.id === newExpend.id ? newExpend : expend
                    );
                }
            })
        ),
}));
