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
        <h1 className="text-2xl font-bold">계정 및 데이터 삭제</h1>
        <p>
          저희는 여러분의 개인 정보 보호를 존중하며, 여러분의 개인 데이터를
          보호하기 위해 최선을 다하고 있습니다. DangPro 앱에서 계정 및 모든
          데이터를 삭제하고 싶으시면, 등록하신 전화번호를 입력해 주세요.
        </p>
        <p className="font-bold">주의:</p>
        <ol>
          <li>
            - 계정 삭제는 되돌릴 수 없는 작업입니다. 계정과 관련된 모든 데이터가
            영구적으로 삭제되며 복구할 수 없습니다.
          </li>
          <li>- 데이터 삭제 과정은 며칠이 소요될 수 있습니다.</li>
        </ol>
        <div>
          <p className="font-bold mb-2">전화번호 및 등록 방식:</p>
          <div className="flex items-center gap-2 flex-wrap">
            <input
              type="tel"
              className={`border px-4 py-2 rounded-md ${
                isError && "border-red-600"
              }`}
              placeholder="전화번호 "
              onChange={(e) => setPhoneNumber(e.target.value)}
            />

            <button
              className="bg-red-400 py-2 px-5 rounded-lg text-white hover:bg-red-300"
              onClick={onRequestOTP}
            >
              {isLoading ? "OTP 전송 중" : "OTP 전송"}
            </button>
          </div>
          {isError && <p>존재하지 않는 전화번호입니다</p>}
          {isSuccess && (
            <div className="flex items-center gap-2 flex-wrap mt-2">
              <input
                type="number"
                className="border px-4 py-2 rounded-md "
                placeholder="OTP 코드"
                onChange={(e) => setOtp(e.target.value)}
              />

              <button
                className="bg-green-400 py-2 px-5 rounded-lg text-white hover:bg-red-300"
                onClick={onDeleteAcction}
              >
                계정 삭제
              </button>
            </div>
          )}
          {isDeleteSuccess && (
            <p className="text-xl text-green-500">계정 삭제 성공</p>
          )}
          {isDeleteFail && (
            <p className="text-xl text-red-500">계정 삭제 실패</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
