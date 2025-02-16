export const formatTimeAgo = (dateString: string) => {
	const date = new Date(dateString);
	const now = new Date();
	const diffInMinutes = Math.floor(
		(now.getTime() - date.getTime()) / (1000 * 60),
	);

	if (diffInMinutes === 0) {
		return "방금";
	} else if (diffInMinutes < 60) {
		return `${diffInMinutes}분 전`;
	} else {
		const diffInHours = Math.floor(diffInMinutes / 60);
		if (diffInHours < 24) {
			return `${diffInHours}시간 전`;
		} else {
			const diffInDays = Math.floor(diffInHours / 24);
			return `${diffInDays}일 전`;
		}
	}
};
