export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center space-y-2">
          <p className="text-fg-2 text-sm font-medium">WinWin Wealth Creation</p>
          <p className="text-fg-muted text-xs">
            ที่ปรึกษาการเงินสำหรับเจ้าของธุรกิจ | สร้างธุรกิจโดยไม่ใช้เงินตัวเอง
          </p>
          <p className="text-fg-muted text-xs">
            &copy; {year} WinWin Wealth Creation. สงวนลิขสิทธิ์.
          </p>
        </div>
      </div>
    </footer>
  );
}
