import useLedger from "@/hooks/useLedger";
import { v4 as uuidv4 } from "uuid";
import isValidDate from "../../utils/isValidDate";
import Input from "./Input";

function Form() {
    const { expends, addExpend } = useLedger();
    // 폼 서브밋 핸들러
    // 인풋핸들러에서 설정된 가계부 객체를 전체 가계부 배열에 추가
    // 여기서는 비제어 컴포넌트를 사용
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const date = formData.get("date")?.toString();
        const item = formData.get("item")?.toString();
        const amount = formData.get("amount");
        const description = formData.get("description")?.toString();

        const amountNumber = Number(amount);

        if (!date || !item || !amount || !description) return;

        if (
            !date?.trim() ||
            !item?.trim() ||
            !amount?.toString().trim() ||
            !description?.trim()
        ) {
            alert("내용을 입력해 주세요!");
            return;
        }

        if (!isValidDate(date)) {
            alert("날짜 유효한지 확인해 주세요!");
            return;
        }

        if (isNaN(amountNumber) || amountNumber < 0) {
            alert("왜 그런 금액 입력하는 것임??");
            return;
        }

        const newExpend = {
            id: uuidv4(),
            date,
            item,
            amount: Number(amount),
            description,
        };

        if (!expends) return;

        const newExpends = [...expends, newExpend];
        // dispatch(addToDo(newTodo));

        const result = await addExpend(newExpends);

        console.log(result);

        // 추가하고 나면 폼 리셋 시키기!!
        form.reset();
    };

    return (
        <section className="w-full flex justify-center items-center h-20 bg-white text-neutral-900 box-border p-3">
            <form
                className="w-full h-full flex flex-row justify-between"
                onSubmit={handleSubmit}
            >
                <Input />
                <div className="h-full w-1/12 flex justify-center items-end">
                    <button
                        className="bg-sky-400 m-0 px-4 py-2 rounded-md transition shadow-lg shadow-blue-500/50 text-white hover:bg-sky-500"
                        type="submit"
                    >
                        저장
                    </button>
                </div>
            </form>
        </section>
    );
}

export default Form;
