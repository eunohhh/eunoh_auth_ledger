// 로컬 스토리지에서 선택했던 월 가져오기
const getLsMonth = () => {
    const savedMonth = localStorage.getItem("selectedMonth");
    return savedMonth ? parseInt(savedMonth, 10) : 1; // 기본값 1월 임~~
};

export default getLsMonth;
