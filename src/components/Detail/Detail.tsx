import useLedgerRedux from "@/hooks/useLedgerRedux";
import isValidDate from "@/utils/isValidDate";
import { ChangeEvent, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import inputs from "../../data/inputs";
import { Expend } from "../../types/d";

const StyledDiv = styled.div`
    max-width: 800px;
    width: 100%;
    margin: 0px auto;
    padding: 20px;
    background-color: rgb(255, 255, 255);
    border-radius: 16px;
`;

const StyledInnerDiv = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;

    & > label {
        margin-bottom: 5px;
        font-size: 14px;
        color: rgb(51, 51, 51);
        text-align: left;
    }

    input {
        padding: 10px;
        border: 1px solid rgb(221, 221, 221);
        border-radius: 4px;
        font-size: 14px;
    }

    select {
        padding: 10px;
        border: 1px solid rgb(221, 221, 221);
        border-radius: 4px;
        font-size: 14px;
    }
`;

const StyledButtonDiv = styled.div`
    display: flex;
    gap: 10px;

    & > button:nth-child(1) {
        padding: 10px 20px;
        background-color: rgb(0, 123, 255);
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.2s ease-in-out 0s;
    }

    button:nth-child(2) {
        padding: 10px 20px;
        background-color: rgb(255, 77, 77);
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.2s ease-in-out 0s;
    }

    button:nth-child(3) {
        padding: 10px 20px;
        background-color: rgb(108, 117, 125);
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.2s ease-in-out 0s;
    }
`;

function Detail() {
    const { deleteExpend, updateExpend } = useLedgerRedux();
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

    const handleUpdateClick = () => {
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
        };

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

        if (isNaN(amount) || amount < 0) {
            alert("왜 그런 금액 입력하는 것임??");
            return;
        }

        updateExpend(newExpend);
        navigate("/");
    };

    const handleDeleteClick = () => {
        if (confirm("정말 삭제하실 겁니까?")) {
            deleteExpend(expend.id);
            navigate("/");
        } else {
            return;
        }
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
        <StyledDiv>
            {inputs.map((input, idx) => (
                <StyledInnerDiv key={idx}>
                    <label htmlFor={input.name}>{input.label}</label>
                    {input.type === "select" ? (
                        <select
                            name={input.name}
                            ref={(ele) => ele && inputRef.current.push(ele)}
                        >
                            <option
                                value={"주거"}
                                selected={inputValues[2][1] === "주거"}
                            >
                                주거
                            </option>
                            <option
                                value={"식비"}
                                selected={inputValues[2][1] === "식비"}
                            >
                                식비
                            </option>
                            <option
                                value={"의류"}
                                selected={inputValues[2][1] === "의류"}
                            >
                                의류
                            </option>
                            <option
                                value={"여가"}
                                selected={inputValues[2][1] === "여가"}
                            >
                                여가
                            </option>
                            <option
                                value={"기타"}
                                selected={inputValues[2][1] === "기타"}
                            >
                                기타
                            </option>
                        </select>
                    ) : (
                        <input
                            onChange={handleChange}
                            type="text"
                            name={input.name}
                            value={inputValues[idx + 1][1]}
                            placeholder={inputValues[idx + 1][1]}
                            required
                            ref={(ele) => ele && inputRef.current.push(ele)}
                        ></input>
                    )}
                </StyledInnerDiv>
            ))}
            <StyledButtonDiv>
                <button onClick={handleUpdateClick}>수정</button>
                <button onClick={handleDeleteClick}>삭제</button>
                <button onClick={() => navigate("/")}>뒤로 가기</button>
            </StyledButtonDiv>
        </StyledDiv>
    );
}

export default Detail;
