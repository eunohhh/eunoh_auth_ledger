import useLedger from "@/hooks/useLedger";
import { Link } from "react-router-dom";
import Card from "../Card";

// Link의 state 기능 사용해서 디테일로 state(props) 처럼 전달
function List() {
    const { monthlyExpends } = useLedger();

    if (!monthlyExpends) return <></>;

    return (
        <section className="flex flex-col justify-center items-center gap-3 w-full py-4 h-auto rounded-sm">
            {monthlyExpends.map((expend) => (
                <Link
                    className="w-full"
                    key={expend.id}
                    to={`/detail/${expend.id}`}
                    state={{ expend }}
                >
                    <Card expend={expend} />
                </Link>
            ))}
        </section>
    );
}

export default List;
