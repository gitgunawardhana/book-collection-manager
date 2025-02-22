import { twMerge } from "tailwind-merge";

interface InputFieldProps {
  type?: string; 
  id?: string;
  className?: string;
  placeholder?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value?: string;
  disabled?: boolean;
  name?: string;
  accept?: string;
  label?: string|React.ReactNode;
  labelClassName?: string;
  helperText?: string;
}

const InputField: React.FC<InputFieldProps> = (props)=> {
  return (
    <div className="w-full">
      <div className="relative">
        <input
          type={props.type ? props.type : "text"}
          id={props.id}
          className={twMerge([
            "border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-1.5 pt-3 text-sm text-lime-green-300 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500",
            props.className,
          ])}
          placeholder={props.placeholder}
          onChange={props.onChange}
          value={props.value}
          disabled={props.disabled}
          name={props.name}
          accept={props.accept}
        />
        <label
          htmlFor={props.id}
          className={twMerge([
            "absolute left-1 top-1 z-10 origin-[0] -translate-y-3 scale-75 transform bg-lime-green px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-1 peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 dark:bg-lime-green-300 dark:text-gray-400 peer-focus:dark:text-blue-500",
            props.labelClassName,
          ])}
        >
          {props.label}
        </label>
      </div>
      {props.helperText && (
        <p
          id="floating_helper_text"
          className="mt-2 text-xs text-gray-500 dark:text-gray-400"
        >
          {props.helperText}
        </p>
      )}
    </div>
  );
};

export default InputField;