import inputs from "../../../data/inputs";

function Input() {
    return (
        <div className="flex flex-row justify-around gap-2">
            {inputs.map((input, idx) => (
                <div className="flex flex-col justify-end w-[160px]" key={idx}>
                    <label className="text-left" htmlFor={input.name}>
                        {input.label}
                    </label>
                    {input.type === "select" ? (
                        <select
                            className="text-gray-500 h-8 text-base pt-1 py-2 border-solid border border-slate-400 rounded-sm"
                            id={input.name}
                            name={input.name}
                        >
                            <option value={"주거"}>주거</option>
                            <option value={"식비"}>식비</option>
                            <option value={"의류"}>의류</option>
                            <option value={"여가"}>여가</option>
                            <option value={"기타"}>기타</option>
                        </select>
                    ) : (
                        <input
                            className="text-gray-500 h-8 text-base pt-1 py-2 border-solid border border-slate-400 rounded-sm"
                            id={input.name}
                            type={input.type}
                            name={input.name}
                            placeholder={input.placeholder}
                            required
                        ></input>
                    )}
                </div>
            ))}
        </div>
    );
}

export default Input;
