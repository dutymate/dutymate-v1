import { ExclamationCircleIcon, MagnifyingGlassIcon } from "@heroicons/react/16/solid";

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
}: InputProps) => {
	const inputClasses = error
		? "col-start-1 row-start-1 block w-full rounded-md bg-white py-2.5 pr-10 pl-3 text-base text-red-900 outline-1 -outline-offset-1 outline-red-300 placeholder:text-red-300 focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 sm:py-3 sm:text-lg"
		: "block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:outline-gray-200 sm:py-3 sm:text-lg";

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
					<ExclamationCircleIcon
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
}

export const NumberInput = ({ min, max, ...props }: NumberInputProps) => {
	return (
		<Input
			{...props}
			type="number"
			placeholder={props.placeholder || "0"}
			defaultValue={props.defaultValue || "0"}
		/>
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
		? "block w-full rounded-md bg-white py-1.5 text-base text-red-900 outline-1 -outline-offset-1 outline-red-300 placeholder:text-red-300 focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 sm:text-sm/6"
		: "block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:outline-gray-200 sm:text-sm/6";

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

export const SearchInput = (props: Omit<InputProps, 'type' | 'label'>) => {
	const searchInputClasses = "block w-full rounded-full bg-white pl-10 pr-3 py-2.5 text-[1rem] text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:outline-gray-200 sm:py-3 sm:text-[1.125rem]"

	return (
		<div>
			<div className="relative">
				<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
					<MagnifyingGlassIcon 
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
	)
}
