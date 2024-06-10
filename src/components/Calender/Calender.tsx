import useLedgerRedux from "@/hooks/useLedgerRedux";
import styled from "styled-components";

const StyledSection = styled.section`
    position: relative;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: 1fr 1fr;
    align-items: center;
    justify-items: center;
    width: 100%;
    height: 20vh;
    background-color: white;
    border-radius: 5px;
`;

const StyledDiv = styled.div<{ $selected: number; $curr: number }>`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    width: 80px;
    height: 50px;
    border-radius: 5px;
    background-color: ${({ $selected, $curr }) =>
        $selected === $curr ? "var(--button-bg-color)" : "#f5f5f5"};
    cursor: pointer;

    &:hover {
        background-color: var(--button-bg-color);
    }
`;

const calenderArray = Array.from({ length: 12 }, (_, i) => i + 1);

function Calender() {
    const { selectMonth, month } = useLedgerRedux();

    return (
        <StyledSection>
            {calenderArray.map((calender, idx) => (
                <StyledDiv
                    key={idx}
                    id={String(calender)}
                    onClick={() => selectMonth(calender)}
                    $selected={month}
                    $curr={calender}
                >{`${calender}월`}</StyledDiv>
            ))}
        </StyledSection>
    );
}

export default Calender;
