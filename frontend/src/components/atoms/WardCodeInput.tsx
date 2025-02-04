import { useRef, useState } from "react";

interface WardCodeInputProps {
  id: string;
  name: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  length?: number;
  onChange?: (value: string) => void;
}

export const WardCodeInput = ({
  id,
  name,
  label = "병동 코드",
  error,
  disabled,
  length = 6,
  onChange,
}: WardCodeInputProps) => {
  const [values, setValues] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    // 영문(대소문자)과 숫자만 허용하고 대문자로 변환
    const sanitizedValue = value.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
    
    if (sanitizedValue.length <= 1) {
      const newValues = [...values];
      newValues[index] = sanitizedValue;
      setValues(newValues);
      
      // 다음 입력 칸으로 포커스 이동
      if (sanitizedValue && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
      
      // 전체 값을 문자열로 합쳐서 상위 컴포넌트에 전달
      onChange?.(newValues.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !values[index] && index > 0) {
      // 현재 칸이 비어있고 Backspace를 누르면 이전 칸으로 이동
      inputRefs.current[index - 1]?.focus();
    }
  };

  const singleInputClass = error
    ? "w-8 h-10 sm:w-9 sm:h-12 rounded-md bg-white text-center text-[1rem] sm:text-[1.125rem] text-red-900 outline-1 -outline-offset-1 outline-red-300 focus:outline-2 focus:-outline-offset-2 focus:outline-red-600"
    : "w-8 h-10 sm:w-9 sm:h-12 rounded-md bg-white text-center text-[1rem] sm:text-[1.125rem] text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:outline-gray-200";

  return (
    <div>
      {label && (
        <label 
          htmlFor={`${id}-0`}
          className="block text-[1rem] font-medium text-gray-900 sm:text-[1.125rem] mb-2"
        >
          {label}
        </label>
      )}
      <div className="flex gap-2 sm:gap-3">
        {Array(length).fill(0).map((_, index) => (
          <input
            key={index}
            ref={el => inputRefs.current[index] = el}
            id={`${id}-${index}`}
            name={`${name}-${index}`}
            type="text"
            maxLength={1}
            value={values[index]}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            disabled={disabled}
            className={singleInputClass}
            aria-invalid={error ? "true" : undefined}
          />
        ))}
      </div>
      {error && (
        <p className="mt-2 text-[0.875rem] text-red-600 sm:text-[1rem]">
          {error}
        </p>
      )}
    </div>
  );
}; 