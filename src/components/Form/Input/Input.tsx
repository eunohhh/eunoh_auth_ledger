import styled from "styled-components";
import inputs from "../../../data/inputs";

const StyledDiv = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 90%;
    gap: 0.5rem;

    & > div {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        width: 160px;
    }

    input {
        color: rgb(79, 79, 79);
        font-size: 16px;
        font-size: max(16px, 1em);
        font-family: inherit;
        padding: 0.25em 0.5em;
        background-color: #fff;
        border: 1px solid rgb(221, 221, 221);
        border-radius: 4px;
    }
    label {
        text-align: left;
    }
    select {
        color: rgb(79, 79, 79);
        font-size: 16px;
        font-size: max(16px, 1em);
        font-family: inherit;
        padding: 0.16em 0.5em;
        background-color: #fff;
        border: 1px solid rgb(221, 221, 221);
        border-radius: 4px;
    }
`;

function Input() {
    return (
        <StyledDiv>
            {inputs.map((input, idx) => (
                <div key={idx}>
                    <label htmlFor={input.name}>{input.label}</label>
                    {input.type === "select" ? (
                        <select name={input.name}>
                            <option value={"주거"}>주거</option>
                            <option value={"식비"}>식비</option>
                            <option value={"의류"}>의류</option>
                            <option value={"여가"}>여가</option>
                            <option value={"기타"}>기타</option>
                        </select>
                    ) : (
                        <input
                            type={input.type}
                            name={input.name}
                            placeholder={input.placeholder}
                            required
                        ></input>
                    )}
                </div>
            ))}
        </StyledDiv>
    );
}

export default Input;
