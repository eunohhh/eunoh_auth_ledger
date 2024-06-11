import useAuth from "@/hooks/useAuth";
import { ChangeEvent, useId, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function SignUp() {
    const navigate = useNavigate();
    const idId = useId();
    const passwordId = useId();
    const passwordConfirmId = useId();
    const nicknameId = useId();

    const { signUp } = useAuth();

    const [input, setInput] = useState({
        id: "",
        password: "",
        passwordConfirm: "",
        nickName: "",
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const id = e.target.id;
        const value = e.target.value;

        if (/\s/.test(value)) {
            return Swal.fire({
                title: "에러",
                text: "공백을 포함할 수 없습니다!",
                icon: "error",
            });
            return; // 공백이 포함된 경우 상태 업데이트 안함
        }

        switch (id) {
            case idId:
                setInput({ ...input, id: value });
                break;
            case passwordId:
                setInput({ ...input, password: value });
                break;
            case nicknameId:
                setInput({ ...input, nickName: value });
                break;
            case passwordConfirmId:
                setInput({ ...input, passwordConfirm: value });
                break;
        }
    };

    const handleSignUpClick = async () => {
        if (
            !input.id ||
            !input.password ||
            !input.passwordConfirm ||
            !input.nickName
        )
            return Swal.fire({
                title: "에러",
                text: "빈 값이 없도록 해주세요",
                icon: "error",
            });

        if (input.id.length < 4 || input.id.length > 10) {
            return Swal.fire({
                title: "에러",
                text: "아이디는 4~10 글자로 해야합니다!",
                icon: "error",
            });
        }
        if (input.password.length < 4 || input.password.length > 15) {
            return Swal.fire({
                title: "에러",
                text: "비밀번호는 4~15 글자로 해야합니다!",
                icon: "error",
            });
        }
        if (input.nickName.length < 1 || input.nickName.length > 10) {
            return Swal.fire({
                title: "에러",
                text: "닉네임은 1~10 글자로 해야합니다!",
                icon: "error",
            });
        }
        if (input.password !== input.passwordConfirm) {
            return Swal.fire({
                title: "에러",
                text: "비밀번호가 일치하지 않습니다.",
                icon: "error",
            });
        }
        const data = {
            id: input.id,
            password: input.password,
            nickname: input.nickName,
        };

        try {
            await signUp(data);
            Swal.fire({
                title: "성공",
                text: "회원가입 완료",
                icon: "success",
            });
            navigate("/");
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: "에러",
                text: `${error}`,
                icon: "error",
            });
        }
    };

    const handleLogInClick = () => navigate("/");

    return (
        <div className="grid grid-cols-1 gap-y-6">
            <h1 className="text-2xl font-semibold text-center">회원가입</h1>
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
                <div className="flex flex-col gap-y-1.5 items-start">
                    <label
                        htmlFor={passwordConfirmId}
                        className="text-sm font-medium"
                    >
                        {"비밀번호 확인"}
                    </label>
                    <input
                        id={passwordConfirmId}
                        className="border px-4 py-2.5 rounded-md w-80"
                        type="password"
                        value={input.passwordConfirm}
                        onChange={handleInputChange}
                    ></input>
                </div>
                <div className="flex flex-col gap-y-1.5 items-start">
                    <label htmlFor={nicknameId} className="text-sm font-medium">
                        {"닉네임"}
                    </label>
                    <input
                        id={nicknameId}
                        className="border px-4 py-2.5 rounded-md w-80"
                        type="text"
                        value={input.nickName}
                        onChange={handleInputChange}
                    ></input>
                </div>
            </div>
            <button
                onClick={handleSignUpClick}
                className="bg-black text-white py-3 text-[15px] rounded-md font-medium hover:bg-black/80 transition active:bg-black/70"
            >
                회원가입
            </button>
            <button
                onClick={handleLogInClick}
                className="bg-black text-white py-3 text-[15px] rounded-md font-medium hover:bg-black/80 transition active:bg-black/70"
            >
                로그인하러가기
            </button>
        </div>
    );
}

export default SignUp;
