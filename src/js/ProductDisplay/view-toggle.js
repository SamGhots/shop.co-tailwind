// ทําให้เเน่ใจว่า DOM โหลดเสร็จสมบูรณ์ก่อนที่จะเพิ่ม event listeners
window.addEventListener('DOMContentLoaded', () => { 
    
 //เก็บค่าปุ่มทั้งหมดที่มีคลาส 'view-all-button' ไว้ในตัวแปร
    const toggleButtons = document.querySelectorAll('.view-all-button');
        // วนลูปผ่านปุ่มทั้งหมดที่เลือกมา
    toggleButtons.forEach(button => {
        //1. เพิ่ม event listener ให้กับแต่ละปุ่ม
        button.addEventListener("click", () => {
            
            
            const section = button.closest('section'); // เก็บค่าที่เป็น parent section ของปุ่มนั้นๆ
            const productList = section?.querySelector('.product-list');  // เก็บค่าที่เเสดงรายการสินค้าใน section นั้นๆ

            //2. หลังจากตรวจพบ productList เเล้ว ให้สลับคลาสระหว่าง 'limited-view' กับ 'expanded-view'
            if (productList) {
           
                productList.classList.toggle("limited-view");
                productList.classList.toggle("expanded-view");
                
             //3. เปลี่ยนข้อความของปุ่มตามสถานะปัจจุบันของ productList
                if (productList.classList.contains("expanded-view")) {
                    button.textContent = "View Less";
                } else {
                    button.textContent = "View All";
                }
            }
        });
    });
});