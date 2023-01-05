import React, { useRef, useState } from "react";
import InputUtil from "./InputUtil";
import RadioUtil from "./RadioUtil";
import SelectUtil from "./SelectUtil";
import { useForm } from "react-hook-form";
import SwitchUtil from "./SwitchUtil";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/ext-language_tools";

function MainComponent() {
	const {
		register,
		handleSubmit,
		setValue,
		watch,
		getValues,
		formState: { errors },
	} = useForm();

	const tempJson = useRef();
	const [data, Setdata] = useState([]);

	const onEditorChange = (value) => {
		tempJson.current = value;
	};

	const SubParameters = ({ data, parentKey = "" }) => {
		const subparams = data;
		subparams.sort((a, b) => a.sort - b.sort);
		const Rows = ({ obj }) => {
			switch (obj.uiType) {
				case "Input":
					return (
						<div
							className={
								obj.level == 0
									? "p-5 bg-gray-200 shadow-md rounded-md max-w-2xl mb-4"
									: "mb-4"
							}
						>
							<InputUtil
								data={obj}
								register={register}
								setValue={setValue}
								watch={watch}
								parentKey={parentKey}
								errors={errors}
							/>
						</div>
					);
				case "Radio":
					return (
						<div
							className={
								obj.level == 0
									? "p-5 bg-gray-200 shadow-md rounded-md max-w-2xl mb-4"
									: "mb-4"
							}
						>
							<RadioUtil
								data={obj}
								register={register}
								setValue={setValue}
								watch={watch}
								parentKey={parentKey}
								errors={errors}
							/>
						</div>
					);
				case "Select":
					return (
						<div
							className={
								obj.level == 0
									? "p-5 bg-gray-200 shadow-md rounded-md max-w-2xl mb-4"
									: "mb-4"
							}
						>
							<SelectUtil
								data={obj}
								register={register}
								setValue={setValue}
								watch={watch}
								parentKey={parentKey}
								errors={errors}
							/>
						</div>
					);
				case "Group":
					return (
						<div
							className={
								obj.level == 0
									? "p-5 bg-gray-200 shadow-md rounded-md max-w-2xl mb-4"
									: "mb-4"
							}
						>
							<div className="text-sm font-semibold text-gray-500">
								{obj.label}
							</div>
							<div className="h-[2px] bg-gray-300 my-2 w-full"></div>
							<SubParameters
								data={obj.subParameters}
								parentKey={parentKey + obj.jsonKey + "."}
							/>
						</div>
					);
				case "Switch":
					return (
						<div
							className={
								obj.level == 0
									? "p-5 bg-gray-200 shadow-md rounded-md max-w-2xl mb-4"
									: "mb-4"
							}
						>
							<SwitchUtil
								data={obj}
								register={register}
								setValue={setValue}
								watch={watch}
								parentKey={parentKey}
								errors={errors}
							/>
						</div>
					);
				case "Ignore":
					if (obj.conditions) {
						const cond = obj.conditions[0];
						if (cond.op == "==") {
							if (getValues(cond.jsonKey) != cond.value) return null;
						}
					}
					return (
						<SubParameters
							data={obj.subParameters}
							parentKey={parentKey + obj.jsonKey + "."}
						/>
					);
				default:
					return null;
			}
		};
		return (
			<div>
				{subparams.map((obj, i) => (
					<Rows obj={obj} key={i} />
				))}
			</div>
		);
	};

	const onSubmit = (data) => {
		alert("Thank You Form Submitted " + JSON.stringify(data));
	};
	const setJson = () => {
		try {
			Setdata(JSON.parse(tempJson.current));
		} catch (err) {
			alert("Json Not Valid");
		}
	};
	return (
		<div className=" flex flex-row bg-gray-100 min-h-screen">
			<div className="w-[30%] h-screen fixed bg-gray-300 p-5 rounded-tr-md rounded-br-md">
				<div className="text-lg text-gray-800 font-semibold">UI Schema</div>
				<div className="w-full my-2">
					<AceEditor
						width="100%"
						height="80vh"
						mode="json"
						theme="xcode"
						showPrintMargin={true}
						showGutter={true}
						highlightActiveLine={true}
						onChange={onEditorChange}
						editorProps={{ $blockScrolling: true }}
						setOptions={{
							enableBasicAutocompletion: true,
							enableLiveAutocompletion: true,
							enableSnippets: true,
						}}
						style={{ borderRadius: "8px" }}
					/>
				</div>
				<div
					onClick={setJson}
					className="inline-block bg-gray-400 text-gray-200 px-4 py-1 rounded-md font-semibold cursor-pointer hover:shadow-xl hover:bg-gray-700 transition duration-200"
				>
					Show
				</div>
			</div>
			<div className="ml-[30%] p-10 w-full flex flex-col ">
				{/* {data.map((obj, i) => (
					< obj={obj} key={i} />
				))} */}
				<SubParameters data={data} />
				{data && data.length > 0 && (
					<div>
						<div
							onClick={handleSubmit(onSubmit)}
							className="inline-block bg-gray-400 text-gray-100 px-4 py-1 rounded-md font-semibold cursor-pointer hover:shadow-xl hover:bg-gray-600 transition duration-200"
						>
							Submit
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default MainComponent;
