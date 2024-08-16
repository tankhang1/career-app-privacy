import { useState } from "react";
import "./App.css";
import { BASE_URL } from "./constants";

function App() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);
  const [isDeleteFail, setIsDeleteFail] = useState(false);
  const [otp, setOtp] = useState("");
  const onRequestOTP = async () => {
    setIsLoading(true);
    await fetch(`${BASE_URL}/api/v1/accounts/send-otp`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phoneNumber: phoneNumber,
        type: "DELETE_ACCOUNT",
      }),
    })
      .then(() => {
        setIsLoading(false);
        setIsSuccess(true);
      })
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
  };

  const onDeleteAcction = async () => {
    setIsLoading(true);
    await fetch(`${BASE_URL}/api/v1/accounts/deactivate`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phoneNumber: phoneNumber,
        otp: otp,
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
        <h1 className="text-2xl font-bold">Xóa Tài Khoản và Dữ Liệu</h1>
        <p>
          Chúng tôi tôn trọng quyền riêng tư của bạn và cam kết bảo vệ dữ liệu
          cá nhân của bạn. Nếu bạn muốn xóa tài khoản và toàn bộ dữ liệu của
          mình khỏi ứng dụng DangPro, vui lòng nhập số điện thoại đã đăng ký với
          chúng tôi.
        </p>
        <p className="font-bold">Lưu ý:</p>
        <ol>
          <li>
            - Việc xóa tài khoản là hành động không thể hoàn tác. Tất cả dữ liệu
            liên quan đến tài khoản của bạn sẽ bị xóa vĩnh viễn và không thể
            khôi phục.
          </li>
          <li>- Quá trình xóa dữ liệu có thể mất vài ngày để hoàn tất.</li>
        </ol>
        <div>
          <p className="font-bold mb-2">Số Điện Thoại và Hình Thức Đăng Ký:</p>
          <div className="flex items-center gap-2 flex-wrap">
            <input
              type="tel"
              className={`border px-4 py-2 rounded-md ${
                isError && "border-red-600"
              }`}
              placeholder="Số điện thoại "
              onChange={(e) => setPhoneNumber(e.target.value)}
            />

            <button
              className="bg-red-400 py-2 px-5 rounded-lg text-white hover:bg-red-300"
              onClick={onRequestOTP}
            >
              {isLoading ? "Đang gửi OTP" : "Gửi OTP"}
            </button>
          </div>
          {isError && <p>Số điện thoại không tồn tại</p>}
          {isSuccess && (
            <div className="flex items-center gap-2 flex-wrap mt-2">
              <input
                type="number"
                className="border px-4 py-2 rounded-md "
                placeholder="Mã OTP"
                onChange={(e) => setOtp(e.target.value)}
              />

              <button
                className="bg-green-400 py-2 px-5 rounded-lg text-white hover:bg-red-300"
                onClick={onDeleteAcction}
              >
                Xóa tài khoản
              </button>
            </div>
          )}
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
