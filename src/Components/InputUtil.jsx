import React from "react";

function resolve(path, obj = self, separator = ".") {
	var properties = Array.isArray(path) ? path : path.split(separator);
	return properties.reduce((prev, curr) => prev?.[curr], obj);
}
function InputUtil({ data, register, parentKey = "", errors }) {
	return (
		<div className="flex flex-row items-center justify-between my-2">
			<div className="text-sm font-semibold text-gray-500 flex flex-row items-center">
				{data.label}
				{data.validate.required && <span className="text-red-500">*</span>}{" "}
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
			<div className="w-[50%]">
				<input
					placeholder={data.placeholder}
					disabled={data.validate.immutable}
					aria-invalid={"Invalid"}
					{...register(parentKey + data.jsonKey, {
						required: data.validate.required,
						pattern: data.validate.pattern,
					})}
					className="w-full outline-none bg-gray-100 border border-gray-400 text-gray-600 px-2 py-1 text-sm rounded-lg shadow font-semibold"
				/>
				{resolve(parentKey + data.jsonKey, errors) && (
					<p className="text-red-500 text-xs mt-1 font-medium">
						Field is required or Pattern not matched
					</p>
				)}
			</div>
		</div>
	);
}

export default InputUtil;
