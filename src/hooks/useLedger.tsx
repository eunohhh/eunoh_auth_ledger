import api from "@/api/api";
import { Expend } from "@/types/d";
import { useLedgerStore } from "@/zustand/ledger.store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useShallow } from "zustand/react/shallow";

function useLedger() {
    // const { expends, setExpends, addExpend, deleteExpend, updateExpend } =
    //     useLedgerStore(
    //         useShallow((state) => ({
    //             expends: state.expends,
    //             setExpends: state.setExpends,
    //             addExpend: state.addExpend,
    //             deleteExpend: state.deleteExpend,
    //             updateExpend: state.updateExpend,
    //         }))
    //     );

    const { month, selectMonth } = useLedgerStore(
        useShallow((state) => ({
            month: state.month,
            selectMonth: state.selectMonth,
        }))
    );

    // const { mutateAsync: getLedger } = useMutation<Expend[]>({
    //     mutationFn: () => api.ledger.getLedger(),
    // });

    const { mutateAsync: addExpend } = useMutation({
        mutationFn: (newExpends: Expend[]) => api.ledger.addLeger(newExpends),
    });

    const { mutateAsync: updateExpend } = useMutation({
        mutationFn: (newExpends: Expend) => api.ledger.updateLeger(newExpends),
    });
    const { mutateAsync: deleteExpend } = useMutation({
        mutationFn: (expendId: string) => api.ledger.deleteLeger(expendId),
    });

    const { data: expends, isLoading: expendsLoading } = useQuery({
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

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const data = await getLedger();
    //             setExpends(data);
    //         } catch (error) {
    //             console.error(
    //                 "가계부기본 데이터를 불러오는데 실패했습니다",
    //                 error
    //             );
    //         }
    //     };

    //     fetchData();
    // }, [setExpends]);

    if (expendsLoading) return { expendsLoading };
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
