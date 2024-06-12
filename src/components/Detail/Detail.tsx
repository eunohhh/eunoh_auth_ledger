import useAuth from "@/hooks/useAuth";
import useLedger from "@/hooks/useLedger";
import isValidDate from "@/utils/isValidDate";
import { ChangeEvent, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import inputs from "../../data/inputs";
import { Expend } from "../../types/d";

function Detail() {
    const { user } = useAuth();
    const { deleteExpend, updateExpend } = useLedger();
    // navigate 는 수정 삭제 돌아가기 시 홈으로 돌려보내기 위해
    // location 은 List 에서 쏴준 데이터 받기 위해
    // state는 제어 컴포넌트를 위해
    const navigate = useNavigate();
    const location = useLocation();
    const { expend }: { expend: Expend } = location.state;
    const [inputValues, setInputValues] = useState<[string, string][]>(
        Object.entries(expend)
    );

    const inputRef = useRef<(HTMLInputElement | HTMLSelectElement)[]>([]);

    const handleUpdateClick = async () => {
        if (!user) return;
        // useRef 를 사용하도록 수정
        const date = inputRef.current[0].value;
        const day = parseInt(date.split("-")[1], 10);
        const item = inputRef.current[1].value;
        const amount = Number(inputRef.current[2].value);
        const description = inputRef.current[3].value;

        const newExpend = {
            id: expend.id,
            date,
            item,
            amount,
            description,
            day,
            created_by: user.userId,
        };

        if (!date || !item || !amount || !description) return;

        if (
            !date?.trim() ||
            !item?.trim() ||
            !amount?.toString().trim() ||
            !description?.trim()
        ) {
            Swal.fire({
                title: "에러",
                text: "내용을 입력해 주세요!",
                icon: "error",
            });
            return;
        }

        if (!isValidDate(date)) {
            Swal.fire({
                title: "에러",
                text: "날짜 유효한지 확인해 주세요!",
                icon: "error",
            });
            return;
        }

        if (isNaN(amount) || amount < 0) {
            Swal.fire({
                title: "에러",
                text: "왜 그런 금액 입력하는 것임??",
                icon: "error",
            });
            return;
        }

        try {
            Swal.fire({
                title: "정말 수정하실 겁니까?",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "네",
                denyButtonText: "아니오",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const result = await updateExpend(newExpend);
                    console.log(result);
                    Swal.fire({
                        title: "성공",
                        text: "업데이트 완료!",
                        icon: "success",
                    });
                    navigate("/");
                } else if (result.isDenied) {
                    Swal.fire("다시 진행해 주세요");
                }
            });
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: "실패",
                text: "알수 없는 에러가 발생했습니다",
                icon: "error",
            });
        }
    };

    const handleDeleteClick = async () => {
        Swal.fire({
            title: "정말 삭제하실 겁니까?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "네",
            denyButtonText: "아니오",
        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                await deleteExpend(expend.id);
                Swal.fire({
                    title: "삭제 성공",
                    icon: "success",
                });
                navigate("/");
            } else if (result.isDenied) {
                Swal.fire("다시 진행해 주세요");
            }
        });
    };

    // 제어 컴포넌트를 위해 onChange 시 값 바꿔줌
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.currentTarget.name;
        const val = e.currentTarget.value;

        setInputValues((prev) => {
            return prev.map(([key, value]) => {
                if (key === name) {
                    return [key, val];
                }
                return [key, value];
            });
        });
    };

    return (
        <div className="max-w-screen-md	mx-auto my-0 p-5 rounded-sm">
            {inputs.map((input, idx) => (
                <div className="flex flex-col mb-3" key={idx}>
                    <label
                        className="mb-1 text-sm text-gray-500 text-left"
                        htmlFor={input.name}
                    >
                        {input.label}
                    </label>
                    {input.type === "select" ? (
                        <select
                            className="p-2.5 border-solid border-slate-200 border-2 rounded-sm text-sm"
                            name={input.name}
                            ref={(ele) => ele && inputRef.current.push(ele)}
                        >
                            <option
                                defaultValue={"주거"}
                                // selected={inputValues[2][1] === "주거"}
                            >
                                주거
                            </option>
                            <option
                                value={"식비"}
                                // selected={inputValues[2][1] === "식비"}
                            >
                                식비
                            </option>
                            <option
                                value={"의류"}
                                // selected={inputValues[2][1] === "의류"}
                            >
                                의류
                            </option>
                            <option
                                value={"여가"}
                                // selected={inputValues[2][1] === "여가"}
                            >
                                여가
                            </option>
                            <option
                                value={"기타"}
                                // selected={inputValues[2][1] === "기타"}
                            >
                                기타
                            </option>
                        </select>
                    ) : (
                        <input
                            className="p-2.5 border-solid border-slate-200 border-2 rounded-sm text-sm"
                            onChange={handleChange}
                            type="text"
                            name={input.name}
                            value={inputValues[idx + 1][1]}
                            placeholder={inputValues[idx + 1][1]}
                            required
                            ref={(ele) => ele && inputRef.current.push(ele)}
                        ></input>
                    )}
                </div>
            ))}
            <div className="flex gap-4">
                <button
                    className="py-2 px-4 bg-blue-700 text-center text-white rounded-sm transition hover:bg-blue-600"
                    onClick={handleUpdateClick}
                >
                    수정
                </button>
                <button
                    className="py-2 px-4 bg-red-600 text-center text-white rounded-sm transition hover:bg-red-500"
                    onClick={handleDeleteClick}
                >
                    삭제
                </button>
                <button
                    className="py-2 px-4 bg-gray-400 text-center text-white rounded-sm transition hover:bg-gray-500"
                    onClick={() => navigate("/")}
                >
                    뒤로 가기
                </button>
            </div>
        </div>
    );
}

export default Detail;
