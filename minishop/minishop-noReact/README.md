# MiniShop — ใบงาน Tailwind CSS (Vanilla JavaScript)

โปรเจกต์นี้ทำตาม `docs/ใบงาน Tailwind CSS.pdf` โดยใช้ **Vite + Vanilla JavaScript + Tailwind CSS** เท่านั้น ไม่มี React/JSX ใช้ `src/main.js` สร้าง UI ด้วย `document.querySelector('#app').innerHTML` ตามตัวอย่างในใบงาน โฟลเดอร์นี้ใช้ชื่อ `minishop-noReact` ตามที่ผู้ใช้กำหนด; ชื่อใน PDF คือ `minishop-dashboard`

## ทำตามลำดับในใบงาน

| ขั้นใน PDF | สิ่งที่ทำและผลจากขั้นก่อน |
| --- | --- |
| Part 1 ขั้น 1–4 (หน้า 2–5) | ตรวจเครื่องมือ Node.js/npm ก่อนเริ่ม; เครื่องนี้มี Node.js และ npm อยู่แล้ว จึงไม่ติดตั้ง Node ซ้ำ |
| Part 2 Step 1 (หน้า 6–8) | สร้างโปรเจกต์ Vite แบบ Vanilla JavaScript ในโฟลเดอร์นี้; `package.json` ไม่มี React และ `index.html` มี `#app` |
| Part 2 Step 2 (หน้า 8) | รัน Vite และเปิดหน้าเว็บ; หน้าแรกเป็น Dashboard แทนหน้า Vite ตัวอย่าง |
| Part 2 Step 3.1–3.3 (หน้า 9) | ติดตั้ง `tailwindcss` กับ `@tailwindcss/vite`; `npm install` สำเร็จ และตรวจ dependencies ใน `package.json` |
| Part 2 Step 3.4 (หน้า 9–10) | ตั้ง `vite.config.js` ให้เรียก `tailwindcss()` โดยไม่มีปลั๊กอิน React |
| Part 2 Step 3.5–3.6 (หน้า 10–12) | `src/style.css` เริ่มด้วย `@import "tailwindcss";` และ `src/main.js` import CSS; หน้าเว็บแสดงสไตล์ Tailwind ได้ |
| Part 3 ข้อ 3.1–3.3 (หน้า 12–15) | ใช้ utility class แทนการเขียน CSS แยกสำหรับทุกองค์ประกอบ; ประกอบ Text → Font → Background → Spacing → Size → Border → Rounded → Shadow → Hover ใน UI สุดท้าย |
| Part 3 ข้อ 3.4–3.6 (หน้า 16–19) | ขนาดตัวอักษร (`text-sm`, `text-xl`, `text-2xl`), น้ำหนัก (`font-bold`, `font-extrabold`) และสี (`text-brand-600`, `text-slate-600`) ปรากฏใน Header, หัวข้อ และ Card |
| Part 3 ข้อ 3.7–3.11 (หน้า 19–21) | ใช้ `bg-*`, `p-*`, `mt-*`, `w-*`, `h-*` กำหนดพื้นหลัง ระยะห่างและขนาดในหน้าเว็บจริง |
| Part 3 ข้อ 3.12–3.15 (หน้า 21–23) | ใช้ `border`, `rounded-lg`, `shadow-*` และ `hover:bg-brand-700` กับ Card, input และปุ่ม Add to Cart |
| Part 4 ข้อ 4.1–4.10 (หน้า 27–31) | ใช้ `flex`, `gap-*`, `items-center`, `justify-between`, `max-w-7xl`, `mx-auto` จัด Header, Sidebar และแถวข้อมูล |
| Part 4 ข้อ 4.11–4.12 (หน้า 32–34) | ประกอบ Header เป็นโลโก้ MiniShop, Search, Cart และ Profile โดยจัดซ้าย–ขวาด้วย Flexbox |
| Part 5 ข้อ 5.1–5.4 (หน้า 34–39) | สร้าง Dashboard: 3 Stat Cards และตาราง Recent Orders ด้วย Grid/Flex; ค่าตัวเลขเป็นข้อมูลตัวอย่างตามใบงาน |
| Part 5 ข้อ 5.5–5.9 (หน้า 39–41) | ปรับจำนวนคอลัมน์ตามหน้าจอและใช้ `gap-*` เว้นช่องระหว่าง Card; ตารางเลื่อนแนวนอนเมื่อจอแคบ |
| Part 6 ข้อ 6.1–6.2 (หน้า 42–44) | เพิ่ม Product Cards 4 ชิ้น: Laptop, Headphones, Backpack, Smart Watch พร้อมรูป ราคา rating และปุ่ม |
| Part 7 (หน้า 44–45) | เพิ่มหน้า Profile ด้วย Flexbox: ชื่อ อีเมล รหัสนักศึกษา และสรุปบัญชีตัวอย่าง |
| Part 8 (หน้า 46) | ใช้ `grid-cols-1`, `sm:grid-cols-2`, `lg:grid-cols-4` ให้สินค้าเปลี่ยนจำนวนคอลัมน์ตามความกว้างจอ |
| Part 9 (หน้า 47) | รวม Header, Dashboard, Products และ Profile เป็น MiniShop เดียว; Sidebar เปลี่ยนหน้าได้ด้วย Vanilla JS |

ตัวอย่างย่อยที่ PDF ให้ทดลองเปลี่ยนค่า เช่น `p-2 → p-4 → p-6` เป็นขั้นเรียนรู้ชั่วคราว ค่าในโปรเจกต์สุดท้ายเลือกให้เหมาะกับหน้าจอจริง จึงไม่ได้เก็บทุกค่าทดลองไว้พร้อมกัน

## พฤติกรรมเพิ่มเติมของงาน Vanilla

- ช่องค้นหาและตัวเลือกหมวดกรอง Card ในหน้า Products โดยแก้ DOM ตรง ๆ
- ปุ่ม Add to Cart เพิ่มตัวเลขบน Header โดยแก้ DOM ตรง ๆ
- หน้า Profile มีปุ่ม Edit Profile เพื่อเปิดฟอร์มแก้ชื่อ อีเมล และรหัสนักศึกษา แล้วแสดงค่าที่บันทึกในหน้าปัจจุบัน
- หน้า Products เพิ่ม Sport Shoes และปุ่ม View Details เพื่อเปิดหน้ารายละเอียดแบบ Vanilla JS; ปุ่ม −/+ กำหนดจำนวน (ต่ำสุด 1) และ Add to Cart เพิ่มตามจำนวนนั้น
- ข้อมูลสินค้า/คำสั่งซื้อ/โปรไฟล์เป็นข้อมูลตัวอย่างใน `src/main.js`; ไม่มี API และไม่มี React state

ภาพ Screen 4 ในหน้าแรกของ PDF เป็นภาพตัวอย่าง React Workshop; ส่วนหน้ารายละเอียดที่เพิ่มในโฟลเดอร์นี้เป็นพฤติกรรมเสริมด้วย Vanilla JS ตามคำขอ ไม่ได้เปลี่ยนโปรเจกต์นี้ให้เป็น React

## รันและตรวจ

```bash
npm install
npm run dev
npm run build
```

ถ้า environment จำกัดสิทธิ์การอ่าน path ให้เติม `-- --configLoader runner` หลังคำสั่ง `dev` หรือ `build` ผลตรวจในเครื่องนี้: `npm install` สำเร็จ, production build ผ่าน, และเปิดเบราว์เซอร์ตรวจ Dashboard → Products → ค้น `Lap` → Add to Cart → Profile แล้ว
