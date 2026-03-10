const productSections = document.querySelectorAll(".product-section"); 

productSections.forEach((group, index) => {
//--------------ตัวแปรเก็บค่า----------------
  // 1. ดึงปุ่ม
  let viewAllBtn = group.querySelector(".view-all-button");
  
  // 2. ดึงรายการสินค้า
  let boxes = [...group.querySelectorAll(".product-list > *")];
  // 3. เก็บค่าจำนวนกล่องที่แสดงอยู่ในปัจจุบัน (เริ่มต้นคือ 0)
  let currentItems = 0; 
//--------------เตรียมฟังก์ชั่น----------------
// ฟังก์ชันหาจำนวนคอลัมน์ปัจจุบัน
      const getColumnCount = () => {
        // 1. อ้างอิงถึงตัว Element ที่เป็น Grid Container
        let productGrid = group.querySelector(".product-list");

        // 2. window.getComputedStyle(container)
        // สั่งให้เบราว์เซอร์ไป "ดู Style จริงๆ" ที่กำลังใช้งานอยู่ (ไม่ใช่แค่ที่เราเขียนในไฟล์ CSS)

        // 3. .getPropertyValue("grid-template-columns")
        // เจาะจงดึงค่า "รูปแบบคอลัมน์" ออกมา เช่น "320px 320px 320px"
        let gridConfig = window
          .getComputedStyle(productGrid)
          .getPropertyValue("grid-template-columns");

        // 4. .split(" ").length
        // ตัดช่องว่างแล้วนับจำนวนชิ้น (เช่น ได้ 3 ชิ้น ก็คือมี 3 คอลัมน์)
        return gridConfig.split(" ").length;
      };
// ฟังก์ชันสำหรับแสดงกล่องตามจำนวนที่ต้องการ
      const showItems = (count) => {
        let target = currentItems + count; // คือถ้าอยากเพิ่ม 3 กล่อง จากที่มี 0 ก็จะเป็น 3
        for (let i = currentItems; i < target; i++) {
          // เริ่มต้นคือ 0  ก็ทํางานถึง 3 ก็หลุดloop
          if (boxes[i]) {
            boxes[i].style.display = "flex";
          }
        }
        currentItems = Math.min(target, boxes.length);

        // จัดการปุ่ม Load More
        if (currentItems >= boxes.length) {
          viewAllBtn.innerHTML = 'View less <i class="fa-solid fa-chevron-up"></i>';
        } else {
          viewAllBtn.innerHTML = 'View all <i class="fa-solid fa-chevron-down"></i>';
        }
      };
 // ------------------------ ขั้นตอนการทำงาน ----------------------------
 let initialColumns = getColumnCount(); // หาจำนวนคอลัมน์ตอนเริ่มต้น
 showItems(initialColumns); //ส่งค่าคอลัมน์ปัจจุบันเข้าไปในฟังก์ชันเพื่อแสดงกล่องให้เต็มแถวแรก
 viewAllBtn.onclick = () => {
  let columnCount = getColumnCount();
  let previousCount = currentItems;

  if (currentItems < boxes.length) {
    // --- โหมดโชว์เพิ่ม ---
    showItems(columnCount);
    if (boxes[previousCount]) {
      boxes[previousCount].scrollIntoView({ behavior: "smooth", block: "center" });
    }
  } else {
    // --- โหมด Show Less ---
    const waitTime = window.innerWidth < 768 ? 800 : 500; // ปรับเวลาให้เร็วขึ้นนิดนึงจะได้ไม่รู้สึกว่ารอนานไป

    // เลื่อนไปที่หัวข้อของกลุ่มสินค้าตัวเอง (ไม่ใช่บนสุดของเว็บ)
    group.scrollIntoView({ behavior: "smooth", block: "start" });

    setTimeout(() => {
      boxes.forEach(box => box.style.display = "none");
      currentItems = 0;
      showItems(columnCount); // โชว์แถวแรกกลับมา
    }, waitTime);
  }
};
    
let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      // 1. หาจำนวน Column ใหม่ ณ ขนาดจอนั้นๆ
      let newColumnCount = getColumnCount();

      // 2. ตรวจสอบเศษ
      if (currentItems > 0) {
        let remainder = currentItems % newColumnCount;

        if (remainder !== 0) {
          // ถ้ามีเศษ (ฟันหลอ) ให้เติมให้เต็มแถว
          let itemsToAdd = newColumnCount - remainder;
          showItems(itemsToAdd);
        }
      }
      console.log(`Adjusted Group ${index + 1} to ${newColumnCount} columns`);
    }, 250);
  });
});


