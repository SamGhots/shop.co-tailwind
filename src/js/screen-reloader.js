document.addEventListener("DOMContentLoaded", () => {
    // 1. กำหนด Media Query สำหรับจอใหญ่ (lg: 1024px ขึ้นไป)
    const largeScreenQuery = window.matchMedia("(min-width: 1024px)");

    // 2. สร้างฟังก์ชันที่จะทำงานเมื่อ Media Query เปลี่ยนสถานะ
    /**
     * @param {MediaQueryListEvent} e - Object event ที่มาจาก Media Query 'change' listener
     */
    
    function handleScreenChange(e) { 
        // *** แก้ไข: สั่งรีโหลดทุกครั้งที่สถานะ e.matches เปลี่ยนไป ***
        // นี่คือพฤติกรรมที่จำเป็นเพื่อให้ Astro/Tailwind โหลด View ใหม่เมื่อข้าม breakpoint 1024px
        setTimeout(() => {
            window.location.reload();
        }, 10);
    }

    // 3. เริ่มฟังการเปลี่ยนแปลงของ Media Query
    // addEventListener('change') จะทำงานเมื่อสถานะของ Media Query เปลี่ยน (ข้าม 1024px)
    largeScreenQuery.addEventListener("change", handleScreenChange);
});