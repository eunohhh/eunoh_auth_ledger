import styled from "styled-components";
import { Expend } from "../../types/d";

const StyledUl = styled.ul`
    position: relative;
    display: flex;
    justify-content: space-between;
    width: 90%;
    background-color: rgb(249, 249, 249);
    padding: 15px 20px;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px;
    transition: transform 0.2s ease-in-out 0s;
    cursor: pointer;
    margin: 0 auto;

    &:hover {
        transform: scale(1.02);
    }

    & > div {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    div:nth-child(1) {
        flex-direction: column;
        align-items: flex-start;
        text-align: left;
        max-width: 80%;
    }
    div:nth-child(1) p:nth-child(1) {
        color: gray;
    }
    div:nth-child(1) p:nth-child(2) {
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: blue;
        font-weight: bold;
    }
    div:nth-child(2) p {
        color: blue;
        font-weight: bold;
    }
`;

function Card({ expend }: { expend: Expend }) {
    return (
        <StyledUl>
            <div>
                <p>{expend.date}</p>
                <p>{`${expend.item} - ${expend.description}`}</p>
            </div>
            <div>
                <p>{`${expend.amount.toLocaleString("ko-KR")}원`}</p>
            </div>
        </StyledUl>
    );
}

export default Card;
