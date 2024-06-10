function isValidDate(dateString: string): boolean {
    // 아래 정규식으로 YYYY-MM-DD 인지 판단?
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateString.match(regex)) {
        return false;
    }

    // 날짜 유효성 검사 (이상한 날짜 입력 가능하므로..)
    // 스트링을 - 로 split 하면 년, 월, 일 나오고 얘를 타입캐스팅
    // 해당 날짜를 Date 객체에 담아서
    // 근데 month 는 1꼭 빼줘야함...!!! 이것땜에 어휴
    // Date 객체는 2월 30일 처럼 존재할수 없는 날짜는 자동으로 바꿔버림
    // 이것을 이용해서 입력받은 값이랑 일치하는지 여부를 확인하고
    // 하나라도 불일치면 false 리턴
    const [year, month, date] = dateString.split("-").map(Number);
    const dateObj = new Date(year, month - 1, date);

    if (
        dateObj.getFullYear() !== year ||
        dateObj.getMonth() !== month - 1 ||
        dateObj.getDate() !== date
    ) {
        console.log("2월 30같은 날짜 입력했냐");
        return false;
    }

    return true;
}

export default isValidDate;
