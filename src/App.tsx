import { useState } from "react";
import "./App.css";
import { BASE_URL } from "./constants";

function App() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);
  const [isDeleteFail, setIsDeleteFail] = useState(false);

  const onDeleteAcction = async () => {
    setIsLoading(true);
    await fetch(`${BASE_URL}/accounts`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then((value) => {
        console.log(value);
        setIsLoading(false);
        setIsDeleteSuccess(true);
      })
      .catch(() => {
        setIsLoading(false);
        setIsDeleteFail(true);
      });
  };
  return (
    <div className="bg-gray-200 w-full min-h-dvh flex justify-center items-center">
      <div className="bg-white p-10 rounded-md gap-2 items-start flex flex-col max-w-[60%]">
        <h1 className="text-2xl font-bold">Xóa tài khoản và dữ liệu</h1>
        <p>
          Chúng tôi tôn trọng quyền bảo mật thông tin cá nhân của bạn và nỗ lực
          hết mình để bảo vệ dữ liệu cá nhân của bạn. Nếu bạn muốn xóa tài khoản
          và toàn bộ dữ liệu trong ứng dụng Career App, vui lòng nhập số điện
          thoại đã đăng ký.
        </p>
        <p className="font-bold">Lưu ý:</p>
        <ol>
          <li>
            - Việc xóa tài khoản là không thể hoàn tác. Toàn bộ dữ liệu liên
            quan đến tài khoản sẽ bị xóa vĩnh viễn và không thể khôi phục.
          </li>
          <li>- Quá trình xóa dữ liệu có thể mất vài ngày.</li>
        </ol>
        <div>
          <p className="font-bold mb-2">Email :</p>
          <div className="flex items-center gap-2 flex-wrap">
            <input
              type="tel"
              className={`border px-4 py-2 rounded-md`}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              className="bg-red-400 py-2 px-5 rounded-lg text-white hover:bg-red-300"
              onClick={onDeleteAcction}
            >
              {isLoading ? "Đang xử lí" : "Xóa tài khoản"}
            </button>
          </div>

          {isDeleteSuccess && (
            <p className="text-xl text-green-500">Xóa tài khoản thành công</p>
          )}
          {isDeleteFail && (
            <p className="text-xl text-red-500">Xóa tài khoản thất bại</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
