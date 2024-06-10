import { ChangeEvent, useId, useState } from "react";

function SignIn() {
    const titleId = useId();
    const contentId = useId();
    const timeId = useId();

    const [input, setInput] = useState({
        title: "Scheduled: Catch up",
        content: "Friday, February 10, 2023 at 5:57 PM",
        duration: 2000,
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const id = e.target.id;
        const value = e.target.value;

        switch (id) {
            case titleId:
                setInput({ ...input, title: value });
                break;
            case contentId:
                setInput({ ...input, content: value });
                break;
            case timeId:
                setInput({ ...input, duration: Number(value) });
                break;
        }
    };

    const handleClick = () => {};

    return (
        <div className="grid grid-cols-1 gap-y-6">
            <h1 className="text-2xl font-semibold text-center">
                토스트 컨트롤러
            </h1>
            <div className="flex flex-col gap-y-4">
                <div className="flex flex-col gap-y-1.5 items-start">
                    <label htmlFor={titleId} className="text-sm font-medium">
                        {"제목 (필수)"}
                    </label>
                    <input
                        id={titleId}
                        className="border px-4 py-2.5 rounded-md w-80"
                        value={input.title}
                        onChange={handleInputChange}
                    ></input>
                </div>
                <div className="flex flex-col gap-y-1.5 items-start">
                    <label htmlFor={contentId} className="text-sm font-medium">
                        {"내용 (필수)"}
                    </label>
                    <input
                        id={contentId}
                        className="border px-4 py-2.5 rounded-md w-80"
                        value={input.content}
                        onChange={handleInputChange}
                    ></input>
                </div>
                <div className="flex flex-col gap-y-1.5 items-start">
                    <label htmlFor={timeId} className="text-sm font-medium">
                        {"노출 시간(ms) (선택)"}
                    </label>
                    <input
                        id={timeId}
                        className="border px-4 py-2.5 rounded-md w-80"
                        type="number"
                        value={input.duration}
                        onChange={handleInputChange}
                    ></input>
                </div>
            </div>
            <button
                onClick={handleClick}
                className="bg-black text-white py-3 text-[15px] rounded-md font-medium hover:bg-black/80 transition active:bg-black/70"
            >
                토스트 띄우기
            </button>
        </div>
    );
}

export default SignIn;
