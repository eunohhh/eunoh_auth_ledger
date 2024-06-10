import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

function Profile() {
    const navigate = useNavigate();
    const { user } = useAuth();

    const handleImageSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    const handleReturnClick = () => {
        if (user) navigate("/ledger");
        else navigate("/");
    };

    return (
        <section>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <div>
                        <img
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                            }}
                            alt="profile-image"
                        />
                        <button type="button" onClick={handleImageSubmit}>
                            이미지 변경하기
                        </button>
                        <input
                            id="fileInput"
                            type="file"
                            accept="image/*"
                            // onChange={handleImageChange}
                            style={{ display: "none" }}
                        />
                    </div>
                </div>
                <div>
                    <label>닉네임 변경하기</label>
                    <br />
                    <input type="text" />
                    <div>
                        <button type="submit">저장하기</button>
                        <button type="button" onClick={handleReturnClick}>
                            돌아가기
                        </button>
                    </div>
                </div>
            </form>
        </section>
    );
}

export default Profile;
