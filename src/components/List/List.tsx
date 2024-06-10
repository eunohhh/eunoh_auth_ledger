import useLedgerRedux from "@/hooks/useLedgerRedux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Card from "../Card";

const StyledSection = styled.section`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.6rem;
    width: 100%;
    padding: 1rem 0;
    height: auto;
    background-color: white;
    border-radius: 5px;
`;

const StyledLink = styled(Link)`
    width: 100%;
`;

// Link의 state 기능 사용해서 디테일로 state(props) 처럼 전달
function List() {
    const { monthlyExpends } = useLedgerRedux();

    return (
        <StyledSection>
            {monthlyExpends.map((expend) => (
                <StyledLink
                    key={expend.id}
                    to={`/detail/${expend.id}`}
                    state={{ expend }}
                >
                    <Card expend={expend} />
                </StyledLink>
            ))}
        </StyledSection>
    );
}

export default List;
