import useLedger from "@/hooks/useLedger";
import clsx from "clsx";

const calenderArray = Array.from({ length: 12 }, (_, i) => i + 1);

function Calender() {
    const { selectMonth, month } = useLedger();

    if (!month) return <></>;
    return (
        <section className="grid grid-cols-6 grid-rows-2 items-center justify-center justify-items-center w-full rounded-sm gap-2 px-4 py-4">
            {calenderArray.map((calender, idx) => (
                <div
                    className={clsx(
                        "flex items-center justify-center box-border w-20 h-12 cursor-pointer hover:bg-gray-400 rounded-sm",
                        {
                            "bg-gray-400": month === calender,
                            "bg-gray-300": month !== calender,
                        }
                    )}
                    key={idx}
                    id={String(calender)}
                    onClick={() => selectMonth(calender)}
                >{`${calender}월`}</div>
            ))}
        </section>
    );
}

export default Calender;
