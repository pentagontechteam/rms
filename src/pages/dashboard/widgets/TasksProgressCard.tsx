import { Circle } from "lucide-react";
import React, { useEffect, useState } from "react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { toast } from "sonner";

import Card1 from "../../../components/UI/Input/Card1";
import DonutChart from "../../../components/UI/Input/DonutChart";

interface Props {
	className?: string;
}

const TasksProgressCard: React.FC<Props> = ({ className }) => {
	const [completed, setCompleted] = useState(0);
	const [inProgress, setInProgress] = useState(0);
	const [notStarted, setNotStarted] = useState(0);
	const authHeader = useAuthHeader();

	useEffect(() => {
		const fetchFileTypeGraph = async () => {
			try {
				const token = authHeader?.split(" ")[1];
				if (!token) return;

				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/reports/file-type-graph`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (!response.ok) {
					throw new Error("Failed to fetch file type graph");
				}

				const data: Record<string, number> = await response.json();

				// Categorize:
				const completedVal = data["PDF"] || 0;
				const inProgressVal = data["Word"] || 0;

				// Sum remaining as "not started"
				const total = Object.values(data).reduce((acc, val) => acc + val, 0);
				const notStartedVal = total - (completedVal + inProgressVal);

				setCompleted(completedVal);
				setInProgress(inProgressVal);
				setNotStarted(notStartedVal);
			} catch (error) {
				console.error(error);
				toast.error("Failed to load file type graph");
			}
		};

		fetchFileTypeGraph();
	}, [authHeader]);

	return (
		<Card1
			header={"File Insights"}
			className={`pb-[30px] gap-4 ${className}`}
			isStroked
		>
			{/* Donut Chart */}
			<DonutChart
				completed={completed}
				inProgress={inProgress}
				notStarted={notStarted}
			/>

			{/* Legend */}
			<div className="mt-1 flex items-center gap-[8px] text-[14px] font-header2 justify-center">
				<LegendDot color="#CDBF2C" label="Word" />
				<LegendDot color="#18320C" label="PDF" />
				<LegendDot color="#E5E5E5" label="Other" />
			</div>
		</Card1>
	);
};

const LegendDot = ({ color, label }: { color: string; label: string }) => (
	<span className="flex items-center gap-[8px]">
		<Circle size={10} fill={color} stroke={color} />
		{label}
	</span>
);

export default TasksProgressCard;

// import { Circle } from "lucide-react";
// import React from "react";
// import { useEffect, useState } from "react";
// import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
// import { toast } from "sonner";

// import Card1 from "../../../components/UI/Input/Card1";
// import DonutChart from "../../../components/UI/Input/DonutChart";

// interface Props {
// 	className?: string;
// }

// const TasksProgressCard: React.FC<Props> = ({ className }) => {
// 	const [completed, setCompleted] = useState(0);
// 	const [inProgress, setInProgress] = useState(0);
// 	const [notStarted, setNotStarted] = useState(0);
// 	const authHeader = useAuthHeader();

// 	useEffect(() => {
// 		const fetchStatusGraph = async () => {
// 			try {
// 				const token = authHeader?.split(" ")[1];
// 				if (!token) return;

// 				const response = await fetch(
// 					`${import.meta.env.VITE_API_URL}/reports/file-type-graph`,
// 					{
// 						headers: {
// 							Authorization: `Bearer ${token}`,
// 						},
// 					}
// 				);

// 				if (!response.ok) {
// 					throw new Error("Failed to fetch task graph");
// 				}

// 				const data = await response.json();
// 				setCompleted(data.completed || 0);
// 				setInProgress(data.inProgress || 0);
// 				setNotStarted(data.todo || 0);
// 			} catch (error) {
// 				console.error(error);
// 				toast.error("Failed to load task graph");
// 			}
// 		};

// 		fetchStatusGraph();
// 	}, [authHeader]);

// 	return (
// 		<Card1
// 			header={"File types"}
// 			className={`pb-[30px] gap-4 ${className}`}
// 			isStroked
// 		>
// 			{/* Donut Chart */}

// 			<DonutChart
// 				completed={completed}
// 				inProgress={inProgress}
// 				notStarted={notStarted}
// 			/>

// 			{/* Legend */}
// 			<div className="mt-1 flex items-center gap-[8px] text-[14px] font-header2 justify-center item-center">
// 				<LegendDot color="#E5E5E5" label="Not started" />
// 				<LegendDot color="#CDBF2C" label="In progress" />
// 				<LegendDot color="#18320C" label="Completed" />
// 			</div>
// 		</Card1>
// 	);
// };

// const LegendDot = ({ color, label }: { color: string; label: string }) => (
// 	<span className="flex items-center gap-[8px]">
// 		<Circle size={10} fill={color} stroke={color} />
// 		{label}
// 	</span>
// );

// export default TasksProgressCard;
