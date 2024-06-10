import useAuth from "@/hooks/useAuth";
import { useEffect, useId, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
    const navigate = useNavigate();
    const { user, changeProfile } = useAuth();

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [imgFile, setImgFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>(
        user?.avatar ? user.avatar : "/default-profile.jpg"
    );

    const fileInputId = useId();
    const nickNameId = useId();

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // 파일 처리 로직 추가
            console.log(file);
            setImgFile(file);
        }
    };

    const handleImageClick = (
        e: React.MouseEvent<HTMLButtonElement | HTMLImageElement>
    ) => {
        e.preventDefault();
        fileInputRef.current?.click();
    };

    const handleReturnClick = () => {
        if (user) navigate("/ledger");
        else navigate("/");
    };

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const nickName = formData.get("nickname")?.toString();

        if (!imgFile) return alert("변경할 이미지를 선택해 주세요");
        if (!nickName) return alert("변경할 닉네임을 입력해 주세요");

        const data = {
            accessToken: localStorage.getItem("accessToken"),
            data: { avatar: imgFile, nickname: nickName },
        };

        try {
            const yes = confirm("이대로 변경하시겠습니까?");
            if (!yes) return;

            const result = await changeProfile(data);
            console.log(result);
            if (result) return alert(result.message);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (imgFile) {
            const fileUrl = URL.createObjectURL(imgFile);
            setPreviewUrl(fileUrl);

            return () => URL.revokeObjectURL(fileUrl);
        }
    }, [imgFile]);

    return (
        <section>
            <form onSubmit={handleFormSubmit} className="flex flex-row gap-4">
                <div className="flex flex-col gap-3">
                    <div className="w-28 h-28 rounded-full overflow-hidden">
                        <img
                            className="w-full h-full object-cover cursor-pointer"
                            src={
                                imgFile
                                    ? previewUrl
                                    : user?.avatar
                                    ? user.avatar
                                    : "/default-profile.jpg"
                            }
                            alt="profile-image"
                            onClick={handleImageClick}
                        />
                    </div>
                    <button
                        type="button"
                        className="bg-black text-white py-1 px-1 text-[15px] rounded-md font-medium hover:bg-black/80 transition active:bg-black/70"
                        onClick={handleImageClick}
                    >
                        이미지 변경하기
                    </button>
                    <input
                        id={fileInputId}
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: "none" }}
                    />
                </div>
                <div className="flex flex-col gap-2 justify-center">
                    <label htmlFor={nickNameId}>닉네임 변경하기</label>
                    <input
                        type="text"
                        id={nickNameId}
                        name="nickname"
                        placeholder={user ? user.nickname : ""}
                        className="border px-4 py-1 rounded-md w-80"
                    />
                    <div className="flex gap-1 justify-end">
                        <button
                            type="button"
                            className="bg-black text-white py-1 px-1 text-[15px] rounded-md font-medium hover:bg-black/80 transition active:bg-black/70"
                            onClick={handleReturnClick}
                        >
                            돌아가기
                        </button>
                        <button
                            type="submit"
                            className="bg-black text-white py-1 px-1 text-[15px] rounded-md font-medium hover:bg-black/80 transition active:bg-black/70"
                        >
                            저장하기
                        </button>
                    </div>
                </div>
            </form>
        </section>
    );
}

export default Profile;
