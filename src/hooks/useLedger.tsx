import api from "@/api/api";
import { Expend, Ledger } from "@/types/d";
import { useLedgerStore } from "@/zustand/ledger.store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useShallow } from "zustand/react/shallow";

function useLedger(): Ledger {
    const { month, selectMonth } = useLedgerStore(
        useShallow((state) => ({
            month: state.month,
            selectMonth: state.selectMonth,
        }))
    );

    const { mutateAsync: addExpend } = useMutation({
        mutationFn: (newExpends: Expend[]) => api.ledger.addLeger(newExpends),
    });

    const { mutateAsync: updateExpend } = useMutation({
        mutationFn: (newExpends: Expend) => api.ledger.updateLeger(newExpends),
    });
    const { mutateAsync: deleteExpend } = useMutation({
        mutationFn: (expendId: string) => api.ledger.deleteLeger(expendId),
    });

    const { data: expends = [], isLoading: expendsLoading } = useQuery({
        queryKey: ["ledger"],
        queryFn: () => api.ledger.getLedger(),
    });

    const monthlyExpends = useMemo<Expend[]>(() => {
        if (expends) {
            return expends
                .filter((expend) => {
                    const dateStr = expend.date;
                    const _month = parseInt(dateStr.split("-")[1], 10);
                    return _month === month;
                })
                .map((expend) => ({
                    ...expend,
                    day: parseInt(expend.date.split("-")[2], 10),
                }))
                .sort((a, b) => {
                    // undefined 일 경우 기본값 세팅
                    if (a.day === undefined && b.day === undefined) return 0;
                    if (a.day === undefined) return 1;
                    if (b.day === undefined) return -1;
                    return a.day - b.day;
                });
        } else {
            return [];
        }
    }, [expends, month]);

    return {
        expends,
        month,
        expendsLoading,
        monthlyExpends,
        selectMonth,
        addExpend,
        updateExpend,
        deleteExpend,
    };
}

export default useLedger;
