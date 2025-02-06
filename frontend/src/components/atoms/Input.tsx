import { HiExclamationCircle, HiMagnifyingGlass } from "react-icons/hi2";

export interface InputProps {
	id: string;
	name: string;
	type?: string;
	label: string;
	placeholder?: string;
	helpText?: string;
	error?: string;
	disabled?: boolean;
	optional?: boolean;
	defaultValue?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({
	id,
	name,
	type = "text",
	label,
	placeholder,
	helpText,
	error,
	disabled,
	optional,
	defaultValue,
	onChange,
}: InputProps) => {
	const inputClasses = error
		? "col-start-1 row-start-1 block w-full rounded-md bg-white py-2.5 pr-10 pl-3 text-base text-red-900 outline outline-[0.125rem] outline-red-300/50 placeholder:text-red-300 focus:outline-[0.125rem] focus:outline-red-600/50 sm:py-3 sm:text-lg"
		: "block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-900 outline outline-[0.125rem] outline-gray-300/50 placeholder:text-gray-400 focus:outline-[0.125rem] focus:outline-primary/50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:outline-gray-200/50 sm:py-3 sm:text-lg";

	return (
		<div>
			<div className="flex justify-between">
				<label
					htmlFor={id}
					className="block text-base font-medium text-gray-900 sm:text-lg"
				>
					{label}
				</label>
				{optional && (
					<span
						id={`${id}-optional`}
						className="text-sm text-gray-500 sm:text-base"
					>
						Optional
					</span>
				)}
			</div>
			<div className={`mt-2 sm:mt-3 ${error ? "grid grid-cols-1" : ""}`}>
				<input
					id={id}
					name={name}
					type={type}
					defaultValue={defaultValue}
					placeholder={placeholder}
					disabled={disabled}
					onChange={onChange}
					aria-invalid={error ? "true" : undefined}
					aria-describedby={
						error
							? `${id}-error`
							: helpText
								? `${id}-description`
								: optional
									? `${id}-optional`
									: undefined
					}
					className={inputClasses}
				/>
				{error && (
					<HiExclamationCircle
						aria-hidden="true"
						className="pointer-events-none col-start-1 row-start-1 mr-3 size-5 self-center justify-self-end text-red-500 sm:size-6"
					/>
				)}
			</div>
			{helpText && !error && (
				<p
					id={`${id}-description`}
					className="mt-2 text-base text-gray-500 sm:text-lg"
				>
					{helpText}
				</p>
			)}
			{error && (
				<p
					id={`${id}-error`}
					className="mt-2 text-base text-red-600 sm:text-lg"
				>
					{error}
				</p>
			)}
		</div>
	);
};

export const EmailInput = (props: Omit<InputProps, "type">) => {
	return (
		<Input
			{...props}
			type="email"
			placeholder={props.placeholder || "example@domain.com"}
		/>
	);
};

export const PasswordInput = (props: Omit<InputProps, "type">) => {
	return (
		<Input
			{...props}
			type="password"
			placeholder={props.placeholder || "••••••••"}
		/>
	);
};

interface NumberInputProps extends Omit<InputProps, "type"> {
	min?: number;
	max?: number;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const NumberInput = ({ min, max, ...props }: NumberInputProps) => {
	const numberInputClasses =
		"block w-full rounded-md bg-white px-3 py-2.5 text-base font-bold text-primary text-center outline outline-[0.125rem] outline-gray-300/50 placeholder:text-gray-400 placeholder:font-normal focus:text-gray-900 focus:font-normal focus:outline-[0.125rem] focus:outline-primary/50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:outline-gray-200/50 sm:py-3 sm:text-lg";

	return (
		<div>
			<div className="flex justify-between">
				<label
					htmlFor={props.id}
					className="block text-base font-medium text-gray-900 sm:text-lg"
				>
					{props.label}
				</label>
				{props.optional && (
					<span
						id={`${props.id}-optional`}
						className="text-sm text-gray-500 sm:text-base"
					>
						Optional
					</span>
				)}
			</div>
			<div className="mt-2 sm:mt-3">
				<input
					id={props.id}
					name={props.name}
					type="number"
					min={min}
					max={max}
					defaultValue={props.defaultValue || "0"}
					placeholder={props.placeholder || "0"}
					disabled={props.disabled}
					aria-invalid={props.error ? "true" : undefined}
					aria-describedby={
						props.error
							? `${props.id}-error`
							: props.helpText
								? `${props.id}-description`
								: props.optional
									? `${props.id}-optional`
									: undefined
					}
					className={numberInputClasses}
				/>
			</div>
			{props.helpText && !props.error && (
				<p
					id={`${props.id}-description`}
					className="mt-2 text-base text-gray-500 sm:text-lg"
				>
					{props.helpText}
				</p>
			)}
			{props.error && (
				<p
					id={`${props.id}-error`}
					className="mt-2 text-base text-red-600 sm:text-lg"
				>
					{props.error}
				</p>
			)}
		</div>
	);
};

export const DateInput = (props: Omit<InputProps, "type">) => {
	return <Input {...props} type="date" />;
};

interface TextAreaProps {
	id: string;
	name: string;
	label: string;
	placeholder?: string;
	helpText?: string;
	error?: string;
	disabled?: boolean;
	optional?: boolean;
	defaultValue?: string;
	rows?: number;
}

export const TextArea = ({
	id,
	name,
	label,
	placeholder,
	helpText,
	error,
	disabled,
	optional,
	defaultValue,
	rows = 4,
}: TextAreaProps) => {
	const textAreaClasses = error
		? "block w-full rounded-md bg-white py-1.5 text-base text-red-900 outline outline-[0.125rem] outline-red-300/50 placeholder:text-red-300 focus:outline-[0.125rem] focus:outline-red-600/50 sm:text-sm/6"
		: "block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-[0.125rem] outline-gray-300/50 placeholder:text-gray-400 focus:outline-[0.125rem] focus:outline-primary/50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:outline-gray-200/50 sm:text-sm/6";

	return (
		<div>
			<div className="flex justify-between">
				<label
					htmlFor={id}
					className="block text-sm/6 font-medium text-gray-900"
				>
					{label}
				</label>
				{optional && (
					<span id={`${id}-optional`} className="text-sm/6 text-gray-500">
						Optional
					</span>
				)}
			</div>
			<div className="mt-2">
				<textarea
					id={id}
					name={name}
					rows={rows}
					defaultValue={defaultValue}
					placeholder={placeholder}
					disabled={disabled}
					aria-invalid={error ? "true" : undefined}
					aria-describedby={
						error
							? `${id}-error`
							: helpText
								? `${id}-description`
								: optional
									? `${id}-optional`
									: undefined
					}
					className={textAreaClasses}
				/>
			</div>
			{helpText && !error && (
				<p id={`${id}-description`} className="mt-2 text-sm text-gray-500">
					{helpText}
				</p>
			)}
			{error && (
				<p id={`${id}-error`} className="mt-2 text-sm text-red-600">
					{error}
				</p>
			)}
		</div>
	);
};

export const SearchInput = (props: Omit<InputProps, "type" | "label">) => {
	const searchInputClasses =
		"block w-full rounded-full bg-white pl-10 pr-3 py-2.5 text-[1rem] text-gray-900 outline outline-[0.125rem] outline-gray-300/50 placeholder:text-gray-400 focus:outline-[0.125rem] focus:outline-primary/50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:outline-gray-200/50 sm:py-3 sm:text-[1.125rem]";

	return (
		<div>
			<div className="relative">
				<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
					<HiMagnifyingGlass
						className="size-5 text-gray-400 sm:size-6"
						aria-hidden="true"
					/>
				</div>
				<input
					id={props.id}
					name={props.name}
					type="search"
					defaultValue={props.defaultValue}
					placeholder={props.placeholder || "이름으로 검색하기"}
					disabled={props.disabled}
					className={searchInputClasses}
				/>
			</div>
			{props.helpText && (
				<p
					id={`${props.id}-description`}
					className="mt-2 text-[0.875rem] text-gray-500 sm:text-[1rem]"
				>
					{props.helpText}
				</p>
			)}
		</div>
	);
};
