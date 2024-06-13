import useAuth from "@/hooks/useAuth";
import { FormEvent, useId } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function SignUp() {
    const navigate = useNavigate();
    const idId = useId();
    const passwordId = useId();
    const passwordConfirmId = useId();
    const nicknameId = useId();

    const { signUp } = useAuth();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);
        const id = formData.get("id")?.toString();
        const password = formData.get("password")?.toString();
        const passwordConfirm = formData.get("passwordConfirm")?.toString();
        const nickName = formData.get("nickname")?.toString();

        if (!id || !password || !passwordConfirm || !nickName) {
            return Swal.fire({
                title: "에러",
                text: "빈 값이 없도록 해주세요",
                icon: "error",
            });
        }

        const validateInputs = (inputs: string[]) => {
            const hasWhitespace = inputs.some((input) => /\s/.test(input));
            return hasWhitespace;
        };

        const hasWhiteSpace = validateInputs([
            id,
            password,
            passwordConfirm,
            nickName,
        ]);

        if (hasWhiteSpace) {
            return Swal.fire({
                title: "에러",
                text: "공백을 포함할 수 없습니다!",
                icon: "error",
            });
        }

        if (id.length < 4 || id.length > 10) {
            return Swal.fire({
                title: "에러",
                text: "아이디는 4~10 글자로 해야합니다!",
                icon: "error",
            });
        }
        if (password.length < 4 || password.length > 15) {
            return Swal.fire({
                title: "에러",
                text: "비밀번호는 4~15 글자로 해야합니다!",
                icon: "error",
            });
        }
        if (nickName.length < 1 || nickName.length > 10) {
            return Swal.fire({
                title: "에러",
                text: "닉네임은 1~10 글자로 해야합니다!",
                icon: "error",
            });
        }
        if (password !== passwordConfirm) {
            return Swal.fire({
                title: "에러",
                text: "비밀번호가 일치하지 않습니다.",
                icon: "error",
            });
        }
        const data = {
            id: id,
            password: password,
            nickname: nickName,
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
        <section className="grid grid-cols-1 gap-y-6 h-dvh">
            <form
                onSubmit={handleSubmit}
                className="h-fit top-1/2 -translate-y-1/2 relative flex gap-4 flex-col"
            >
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
                            name="id"
                        ></input>
                    </div>
                    <div className="flex flex-col gap-y-1.5 items-start">
                        <label
                            htmlFor={passwordId}
                            className="text-sm font-medium"
                        >
                            {"비밀번호"}
                        </label>
                        <input
                            id={passwordId}
                            className="border px-4 py-2.5 rounded-md w-80"
                            type="password"
                            name="password"
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
                            name="passwordConfirm"
                        ></input>
                    </div>
                    <div className="flex flex-col gap-y-1.5 items-start">
                        <label
                            htmlFor={nicknameId}
                            className="text-sm font-medium"
                        >
                            {"닉네임"}
                        </label>
                        <input
                            id={nicknameId}
                            className="border px-4 py-2.5 rounded-md w-80"
                            type="text"
                            name="nickname"
                        ></input>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center w-full gap-4">
                    <button
                        type="submit"
                        className="bg-black text-white py-3 text-[15px] rounded-md font-medium hover:bg-black/80 transition active:bg-black/70 w-full"
                    >
                        회원가입
                    </button>
                    <button
                        type="button"
                        onClick={handleLogInClick}
                        className="bg-black text-white py-3 text-[15px] rounded-md font-medium hover:bg-black/80 transition active:bg-black/70 w-full"
                    >
                        로그인하러가기
                    </button>
                </div>
            </form>
        </section>
    );
}

export default SignUp;
