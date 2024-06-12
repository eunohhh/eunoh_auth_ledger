import { Expend } from "../../types/d";

function Card({ expend }: { expend: Expend }) {
    return (
        <ul className="flex justify-between w-11/12 py-4 px-5 rounded-lg shadow-md shadow-slate-300 cursor-pointer transition mx-auto my-0 hover:scale-105 bg-gray-100">
            <div className="flex justify-center items-start flex-col text-left max-w-60">
                <p className="text-gray-400">{expend.date}</p>
                <p className="w-full whitespace-nowrap overflow-hidden text-ellipsis text-blue-800 font-bold">{`${expend.item} - ${expend.description} (${expend.created_by})`}</p>
            </div>
            <div className="flex justify-center items-center">
                <p className="text-blue-800 font-bold">{`${expend.amount.toLocaleString(
                    "ko-KR"
                )}원`}</p>
            </div>
        </ul>
    );
}

export default Card;
