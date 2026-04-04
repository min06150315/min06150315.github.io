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

// 상대 시간 계산 함수
export const formatRelative = (d: Date | string | null | undefined) => {
  if (!d) return '-';
  const date = new Date(d);
  const now = new Date();

  if (isNaN(date.getTime())) return '-';

  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return '방금 전';

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}분 전`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}시간 전`;

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays}일 전`;
  }

  return formatDateLong(d);
};
