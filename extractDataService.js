import governorates from "./governorates.js";

function handelCentury(centuryCode) {
  if (centuryCode === "2") {
    return "19";
  } else if (centuryCode === "3") {
    return "20";
  } else {
    return "";
  }
}

function isValidDate(year, month, day) {
  const date = new Date(year, month - 1, day); // beacuase month is 0-indexed in js
  return (
    date.getFullYear() == year &&
    date.getMonth() == month - 1 &&
    date.getDate() == day
  );
}

export function extractData(id) {
  const centuryCode = id.substring(0, 1);
  const year = id.substring(1, 3);
  const month = id.substring(3, 5);
  const day = id.substring(5, 7);
  const governorateCode = id.substring(7, 9);
  const genderCode = id.substring(12, 13);

  let birthCentury = handelCentury(centuryCode);
  let fullYear = `${birthCentury}${year}`;

  if (!isValidDate(fullYear, month, day)) {
    return { error: "Invalid birth date extracted from National ID" };
  }

  const birthDate = `${fullYear}-${month}-${day}`;
  const governorate = governorates[governorateCode] || "Unknown Governorate";
  const gender = genderCode % 2 === 0 ? "Female" : "Male";

  return {
    birthDate: birthDate,
    governorate: governorate,
    gender: gender,
    isValid: !!birthCentury && !!governorates[governorateCode],
    year: fullYear,
    month,
    day,
  };
}
