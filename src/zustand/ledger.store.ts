import { Expend, Ledger } from "@/types/d";
import { produce } from "immer";
import { create } from "zustand";

// 로컬 스토리지에서 선택했던 월 가져오기
const getLsMonth = () => {
    const savedMonth = localStorage.getItem("selectedMonth");
    return savedMonth ? parseInt(savedMonth, 10) : 1; // 기본값 1월 임~~
};

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
