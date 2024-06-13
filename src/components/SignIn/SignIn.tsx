import useAuth from "@/hooks/useAuth";
import useLedger from "@/hooks/useLedger";
import { FormEvent, useEffect, useId } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function SignIn() {
    const navigate = useNavigate();
    const idId = useId();
    const passwordId = useId();

    const { isLoggedIn, logIn } = useAuth();
    const { expendsLoading } = useLedger();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);
        const id = formData.get("id")?.toString();
        const pw = formData.get("password")?.toString();

        if (!id || !pw)
            return Swal.fire({
                title: "에러",
                text: "빈 값이 없도록 해주세요",
                icon: "error",
            });

        if (/\s/.test(id) || /\s/.test(pw)) {
            return Swal.fire({
                title: "에러",
                text: "공백을 포함할 수 없습니다!",
                icon: "error",
            });
        }

        const data = {
            id: id,
            password: pw,
        };

        try {
            const result = await logIn(data);
            if (result.success) {
                Swal.fire({
                    title: "로그인 성공",
                    text: `${result.userId}님 환영합니다`,
                    icon: "success",
                });
                navigate("/ledger");
            }
        } catch (error) {
            Swal.fire({
                title: "로그인 에러",
                text: `에러가 발생했습니다! ${error}`,
                icon: "error",
            });
        }
    };

    const handleSignUpClick = () => {
        navigate("/sign-up");
    };

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/ledger");
        }
    }, [isLoggedIn, navigate]);

    useEffect(() => {
        if (expendsLoading) {
            console.log("데이터 사전 로딩중");
        } else {
            console.log("데이터 사전 로딩 완료");
        }
    }, [expendsLoading]);

    return (
        <section className="grid grid-cols-1 gap-y-6 h-dvh">
            <form
                onSubmit={handleSubmit}
                className="h-fit top-1/2 -translate-y-1/2 relative flex gap-4 flex-col"
            >
                <h1 className="text-2xl font-semibold text-center">로그인</h1>
                <div className="flex flex-col gap-y-4">
                    <div className="flex flex-col gap-y-1.5 items-start">
                        <label htmlFor={idId} className="text-sm font-medium">
                            {"아이디"}
                        </label>
                        <input
                            id={idId}
                            name="id"
                            className="border px-4 py-2.5 rounded-md w-80"
                            type="text"
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
                            name="password"
                            type="password"
                        ></input>
                    </div>
                </div>
                <button
                    type="submit"
                    className="bg-black text-white py-3 text-[15px] rounded-md font-medium hover:bg-black/80 transition active:bg-black/70"
                >
                    로그인
                </button>
                <button
                    type="button"
                    onClick={handleSignUpClick}
                    className="bg-black text-white py-3 text-[15px] rounded-md font-medium hover:bg-black/80 transition active:bg-black/70"
                >
                    회원가입
                </button>
            </form>
        </section>
    );
}

export default SignIn;
