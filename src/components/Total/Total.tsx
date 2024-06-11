import useLedger from "@/hooks/useLedger";
import clsx from "clsx";

const colors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-red-500",
    "bg-yellow-500",
    "bg-teal-500",
];

function Total() {
    const { monthlyExpends, month } = useLedger();

    if (!monthlyExpends) return <></>;

    // 그래프를 위해 월별 지출 배열을 가공하여
    // {total : number, "item" : number, ...} 구조의 객체로 변환
    const reduced = monthlyExpends.reduce(
        (acc: { [key: string]: number; total: number }, cur) => {
            // 순환중 프로퍼티가 없으면 0 으로
            if (!acc[cur.item]) acc[cur.item] = 0;
            // 있으면 각 프로퍼티에 더하고, total 에도 더하고
            acc[cur.item] += cur.amount;
            acc.total += cur.amount;

            return acc;
        },
        { total: 0 }
    );

    // 위에서 만든 가공된 전체 지출 객체를 그래프 표시용 배열로 변환 Object.values
    // map 으로 index 1번 부터(토탈제외) 소수2자리까지 표시 백분율 계산
    // 내림차순 정렬
    const graphArray = Object.values(reduced)
        .map((amount, idx, array) =>
            idx > 0 ? Number(((amount / array[0]) * 100).toFixed(2)) : amount
        )
        .sort((a, b) => b - a);

    // 위에서 만든 가공된 전체 지출 객체를 그래프 하단 항목 표시용 배열로 변환 Object.entries
    // 토탈은 filter 로 없애고
    // 내림차순 정렬
    // map 으로 리턴 형태를 [ key, value, 백분율값] 로 만듬
    const anotArray = Object.entries(reduced)
        .filter((_, idx) => idx !== 0)
        .sort((a, b) => b[1] - a[1])
        .map((anot, idx) => {
            return [...anot, graphArray[idx + 1]];
        });

    return (
        <section className="box-border p-5 w-full rounded-sm text-center text-lg font-bold">
            {`${month}월 총 지출: ${reduced.total.toLocaleString("ko-KR")}원`}
            <div className="flex justify-center mt-5 h-10 rounded-lg overflow-hidden">
                {graphArray.slice(1).map((percent, idx) => (
                    <div
                        className={clsx(
                            "h-full transition-width duration-200 ease-in-out",
                            colors[idx]
                        )}
                        style={{ width: `${percent}%` }}
                        key={percent}
                    ></div>
                ))}
            </div>
            <div className="mx-auto my-0 w-10/12 flex justify-center gap-5 flex-wrap">
                {anotArray.map((anot, idx) => (
                    <div
                        className="flex justify-center items-center text-sm text-gray-500"
                        key={idx}
                    >
                        <div
                            className={clsx("w-5 h-3 mr-2", colors[idx])}
                        ></div>
                        {`${anot[0]}: ${anot[1].toLocaleString("ko-KR")} 원 (${
                            anot[2]
                        }%)`}
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Total;
