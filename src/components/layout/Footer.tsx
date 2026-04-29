export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-red-500/20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center space-y-2">
          <p className="text-gray-400 text-sm font-medium">WinWin Consult</p>
          <p className="text-gray-500 text-xs">
            ที่ปรึกษาการเงินสำหรับเจ้าของธุรกิจ | สร้างธุรกิจโดยไม่ใช้เงินตัวเอง
          </p>
          <p className="text-gray-600 text-xs">
            &copy; {year} WinWin Consult. สงวนลิขสิทธิ์.
          </p>
        </div>
      </div>
    </footer>
  );
}
