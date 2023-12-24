import withReactContent from "sweetalert2-react-content";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import axios from "axios";

export default function Timer({ setTimer, test, start, end, token }) {
  const initialTime = 1800; // <- Dalam Detik
  const storeTime = localStorage.getItem(test) || initialTime.toString();
  const [leftTime, setLeftTime] = useState(parseInt(storeTime, 10));
  const [isActive, setIsActive] = useState(true);
  const alertWithSwal = withReactContent(Swal);
  const router = useRouter();

  const currentTime = Date.now();
  end = currentTime;

  useEffect(() => {
    localStorage.setItem(test, leftTime.toString());
    if (isActive && leftTime > 0) {
      const countdown = setInterval(() => {
        setLeftTime((previousTime) => previousTime - 1);
      }, 1000);
      return () => clearInterval(countdown);
    } else if (leftTime === 0) {
      setIsActive(false);
      localStorage.removeItem(test);
      axios
        .post(
          "/api/exam/submit-time",
          { timer, test, start, end },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((response) => {
          alertWithSwal.fire({
            toast: false,
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false,
            width: "40%",
            imageUrl: "/icons/success.png",
            imageWidth: "20%",
            title: (
              <p className="text-center font-head text-lg font-semibold tracking-wide text-green-600">
                Waktu Tes Berakhir
              </p>
            ),
            html: (
              <p className="text-center font-body font-medium tracking-wide text-green-400">
                {`${response.data?.times?.Test} Telah Dikumpulkan`}
              </p>
            ),
          });
          setTimeout(() => {
            router.push("/");
          }, 3000);
        })
        .catch((error) => {
          console.log(error);
          alertWithSwal.fire({
            toast: false,
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false,
            width: "40%",
            imageUrl: "/icons/error.png",
            imageWidth: "20%",
            title: (
              <p className="text-center font-head text-lg font-semibold tracking-wide text-red-600">
                Waktu Tes Berakhir
              </p>
            ),
            html: (
              <p className="text-center font-body font-medium tracking-wide text-red-400">
                Gagal Mengumpulkan Tes
              </p>
            ),
          });
          setTimeout(() => {
            router.push("/");
          }, 3000);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, leftTime]);

  const minutes = Math.floor(leftTime / 60);
  const seconds = leftTime % 60;

  const timer = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  setTimer(timer);

  return (
    <div>
      <p>{timer}</p>
    </div>
  );
}
