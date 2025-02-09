export const convertDutyType = (
	duty: "D" | "E" | "N" | "O",
): "day" | "evening" | "night" | "off" => {
	const dutyMap = {
		D: "day",
		E: "evening",
		N: "night",
		O: "off",
	} as const;
	return dutyMap[duty];
};
