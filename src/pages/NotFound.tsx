import { Link } from "react-router-dom";

export function NotFound({ message = "페이지를 찾을 수 없습니다." }: { message?: string }) {
  return (
    <div className="empty-state" style={{ marginTop: 40 }}>
      <p style={{ fontSize: 15, fontWeight: 700, color: "var(--ink)" }}>{message}</p>
      <p>
        주소를 확인하거나 <Link to="/">투자 프로세스 지도</Link>에서 다시 시작해 주세요.
      </p>
    </div>
  );
}
