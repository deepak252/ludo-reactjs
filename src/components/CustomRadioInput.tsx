type CustomRadioInputProps = {
  label?: string
  group: string
  id: string
} & React.ComponentProps<'input'>

const CustomRadioInput = ({
  label,
  group,
  id,
  onChange,
}: CustomRadioInputProps) => {
  return (
    <div className="inline-flex items-center">
      <label
        htmlFor={id}
        className="relative size-6 bg-gray-750 rounded-full cursor-pointer"
      >
        <input
          type="radio"
          id={id}
          name={group}
          className="peer opacity-0"
          onChange={onChange}
        />
        <span className="peer-checked:bg-primary absolute-center size-3 bg-gray-750 rounded-full"></span>
      </label>
      <label
        htmlFor={id}
        className="text-15 text-[#70768d] font-medium mx-2 cursor-pointer"
      >
        {label}
      </label>
    </div>
  )
}

export default CustomRadioInput
