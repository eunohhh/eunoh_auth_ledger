import useLedgerRedux from "@/hooks/useLedgerRedux";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import isValidDate from "../../utils/isValidDate";
import Input from "./Input";

const InputSection = styled.section`
    width: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 8vh;
    background-color: white;
    color: rgb(79, 79, 79);
    border-radius: 5px;
    box-sizing: border-box;
    padding: 1rem;
`;

const SubmitForm = styled.form`
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const StyledDiv = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    width: 10%;
    height: 100%;

    & > button {
        background: var(--button-bg-color);
        color: var(--button-color);
        margin: 0;
        padding: 0.5rem 1rem;
        font-size: 1rem;
        font-weight: 400;
        text-align: center;
        text-decoration: none;
        border: none;
        border-radius: 4px;
        display: inline-block;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);
        cursor: pointer;
        transition: 0.5s;
    }
    button:active,
    button:hover,
    button:focus {
        background: var(--button-hover-bg-color);
        outline: 0;
    }
    button:disabled {
        opacity: 0.5;
    }
`;

function Form() {
    const { addExpend } = useLedgerRedux();
    // 폼 서브밋 핸들러
    // 인풋핸들러에서 설정된 가계부 객체를 전체 가계부 배열에 추가
    // 여기서는 비제어 컴포넌트를 사용
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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

        const newLedger = {
            id: uuidv4(),
            date,
            item,
            amount: Number(amount),
            description,
        };

        console.log(newLedger);
        // dispatch(addToDo(newTodo));

        addExpend(newLedger);

        // 추가하고 나면 폼 리셋 시키기!!
        form.reset();
    };

    return (
        <InputSection>
            <SubmitForm onSubmit={handleSubmit}>
                <Input />
                <StyledDiv>
                    <button type="submit">저장</button>
                </StyledDiv>
            </SubmitForm>
        </InputSection>
    );
}

export default Form;
