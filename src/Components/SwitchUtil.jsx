import React from "react";

function SwitchUtil({ data, register, parentKey = "" }) {
	return (
		<div className="flex flex-row items-center my-2">
			<div className="">
				<input
					disabled={data.validate.immutable}
					{...register(parentKey + data.jsonKey)}
					type={"checkbox"}
					defaultChecked={data.validate.defaultValue}
					className="form-checkbox h-4 w-4 text-gray-500 outline-none rounded-md focus:ring  focus:ring-gray-400 ring-offset-1"
				/>
			</div>
			<div className="text-sm font-semibold text-gray-500 ml-2 flex flex-row items-center">
				{data.label}
				{data.description !== "" && (
					<div className="ml-2 text-gray-400 group relative">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-4 h-4"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
							/>
						</svg>
						<div className="absolute hidden group-hover:block bg-gray-100 p-2 rounded-md text-gray-600 font-normal text-xs -top-2 left-5">
							{data.description}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default SwitchUtil;
