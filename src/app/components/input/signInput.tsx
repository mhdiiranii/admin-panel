import { FieldValues, Path, UseFormRegister } from "react-hook-form";

interface PropsType<T extends FieldValues> {
  register: UseFormRegister<T>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: { [key: string]: any };
  names: Path<T>;
  placeholder: string;
  type?: string
}

const InputSign = <T extends FieldValues>({ register, errors, placeholder, names, type, }: PropsType<T>) => {
  const { onChange, onBlur, name, ref } = register(names);
  
  return (
    <div className="h-16 flex flex-col justify-between">
      <input autoComplete="off" onChange={onChange} type={type} onBlur={onBlur} name={name} ref={ref} placeholder={placeholder} className="border px-4 py-2 text-sm text-gray-400 outline-none rounded-lg" />
      {errors[name] && <span className="text-xs text-right text-red-500">{errors[name]?.message}</span>}
    </div>
  );
};

export default InputSign;
