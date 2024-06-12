import api from "@/api/api";
import { Expend } from "@/types/d";
import { useAuthStore } from "@/zustand/auth.store";
import { useLedgerStore } from "@/zustand/ledger.store";

async function LedgerPageLoader(): Promise<Expend[]> {
    const ledgers = await api.ledger.getLedger();
    const user = useAuthStore.getState().user;
    const month = useLedgerStore.getState().month;

    return ledgers
        .filter((expend) => {
            const dateStr = expend.date;
            const _month = parseInt(dateStr.split("-")[1], 10);
            return _month === month;
        })
        .filter((expend) => expend.created_by === user?.userId)

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
}

export default LedgerPageLoader;
