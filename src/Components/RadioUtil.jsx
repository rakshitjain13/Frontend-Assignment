import React, { memo, useEffect, useRef, useState } from "react";

function RadioUtil({ data, setValue, watch, parentKey = "" }) {
	const selected = watch(parentKey + data.jsonKey);

	const isFirst = useRef(false);

	useEffect(() => {
		if (!selected) {
			setValue(parentKey + data.jsonKey, data?.validate?.defaultValue);
		}
	}, []);

	const onChange = (value) => {
		setValue(parentKey + data.jsonKey, value);
	};
	return (
		<div className="my-2">
			{data.level == 0 && (
				<div className="text-sm font-semibold text-gray-500">{data.label}</div>
			)}

			<div className="flex flex-row gap-x-2">
				{data.validate.options.map((obj, i) =>
					obj.value == selected ? (
						<div
							key={i}
							className="w-full outline-none bg-gray-100 border border-gray-400 text-gray-600 px-2 py-1 text-sm rounded-lg shadow-md font-semibold cursor-pointer"
						>
							{obj.label}
						</div>
					) : (
						<div
							key={i}
							className="w-full outline-none bg-gray-200 border border-gray-400 text-gray-500 px-2 py-1 text-sm rounded-lg inner-shadow font-semibold cursor-pointer "
							onClick={() => onChange(obj.value)}
						>
							{obj.label}
						</div>
					)
				)}
			</div>
		</div>
	);
}

export default RadioUtil;
