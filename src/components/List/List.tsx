import useLedger from "@/hooks/useLedger";
// import { Expend } from "@/types/d";
// import { Link, useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";
import Loader from "../Loaders/Loader";
import Card from "./Card";

// Link의 state 기능 사용해서 디테일로 state(props) 처럼 전달
function List() {
    const { monthlyExpends, expendsLoading } = useLedger();

    // const ledgers = useLoaderData() as Expend[];
    // const Expends = !monthlyExpends ? ledgers : monthlyExpends;

    // console.log(user);
    // console.log(ledgers);

    if (expendsLoading) return <Loader />;

    return (
        <section className="flex flex-col justify-start items-center gap-3 w-full py-4 h-auto rounded-sm min-h-[400px] box-border">
            {monthlyExpends?.length === 0 && (
                <div className="min-h-full box-border">
                    현재 유저가 작성한 내역이 없습니다!
                </div>
            )}
            {monthlyExpends?.map((expend) => (
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
