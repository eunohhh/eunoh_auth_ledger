import useAuth from "@/hooks/useAuth";
import { ChangeEvent, useId, useState } from "react";
import { useNavigate } from "react-router-dom";

function SignIn() {
    const navigate = useNavigate();
    const idId = useId();
    const passwordId = useId();

    const { logIn } = useAuth();

    const [input, setInput] = useState({
        id: "",
        password: "",
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const id = e.target.id;
        const value = e.target.value;

        switch (id) {
            case idId:
                setInput({ ...input, id: value });
                break;
            case passwordId:
                setInput({ ...input, password: value });
                break;
        }
    };

    const handleLogInClick = async () => {
        const data = {
            id: input.id,
            password: input.password,
        };

        try {
            const result = await logIn(data);
            if (result.success) {
                alert(`${result.userId}님 환영합니다`);
                navigate("/ledger");
            }
        } catch (error) {
            console.log(error);
            alert(error);
        }
    };

    const handleSignUpClick = () => {
        navigate("/sign-up");
    };

    return (
        <div className="grid grid-cols-1 gap-y-6">
            <h1 className="text-2xl font-semibold text-center">로그인</h1>
            <div className="flex flex-col gap-y-4">
                <div className="flex flex-col gap-y-1.5 items-start">
                    <label htmlFor={idId} className="text-sm font-medium">
                        {"아이디"}
                    </label>
                    <input
                        id={idId}
                        className="border px-4 py-2.5 rounded-md w-80"
                        type="text"
                        value={input.id}
                        onChange={handleInputChange}
                    ></input>
                </div>
                <div className="flex flex-col gap-y-1.5 items-start">
                    <label htmlFor={passwordId} className="text-sm font-medium">
                        {"비밀번호"}
                    </label>
                    <input
                        id={passwordId}
                        className="border px-4 py-2.5 rounded-md w-80"
                        type="password"
                        value={input.password}
                        onChange={handleInputChange}
                    ></input>
                </div>
            </div>
            <button
                onClick={handleLogInClick}
                className="bg-black text-white py-3 text-[15px] rounded-md font-medium hover:bg-black/80 transition active:bg-black/70"
            >
                로그인
            </button>
            <button
                onClick={handleSignUpClick}
                className="bg-black text-white py-3 text-[15px] rounded-md font-medium hover:bg-black/80 transition active:bg-black/70"
            >
                회원가입
            </button>
        </div>
    );
}

export default SignIn;
