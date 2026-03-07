// TODO: "1시간 전" 같은 기능 추가하기

const formatBase = (dateInput: Date | string | null | undefined) => {
  const date = !dateInput ? new Date(NaN) : new Date(dateInput);

  if (isNaN(date.getTime())) {
    return { year: '-', shortYear: '-', month: '-', day: '-', isValid: false };
  }

  return {
    year: String(date.getFullYear()),
    shortYear: String(date.getFullYear()).slice(-2),
    month: String(date.getMonth() + 1).padStart(2, '0'),
    day: String(date.getDate()).padStart(2, '0'),
    isValid: true,
  };
};

// 26년 11월 25일
export const formatDateLong = (d: Date | string | null | undefined) => {
  const { year, month, day, isValid } = formatBase(d);
  return !isValid ? '-' : `${year}년 ${month}월 ${day}일`;
};

// 26.11.25
export const formatDateDot = (d: Date | string | null | undefined) => {
  const { shortYear, month, day, isValid } = formatBase(d);
  return !isValid ? '-' : `${shortYear}.${month}.${day}`;
};

// 26-11-25
export const formatDateDash = (d: Date | string | null | undefined) => {
  const { shortYear, month, day, isValid } = formatBase(d);
  return !isValid ? '-' : `${shortYear}-${month}-${day}`;
};
