# MiniShop React — บันทึกการทำใบงาน Week 6–8

อ้างอิง: `docs/ใบงาน Week 6_8 React.pdf` (52 หน้า) และโปรเจกต์ Vanilla ใน `../minishop-noReact`

เอกสารนี้เรียงตามหัวข้อของใบงาน React และอธิบายผลลัพธ์สุดท้ายของ **โปรเจกต์แยก** ชื่อ `minishop-react` โค้ดตัวอย่างระหว่างทาง เช่น `Hello MiniShop` เป็นขั้นเรียนรู้ จึงไม่ค้างไว้แทนแอปฉบับสมบูรณ์

## Part 1 — Environment และ Week 3

| ข้อ | ทำอะไร | เดิม → ตอนนี้ |
| --- | --- | --- |
| 1.1 | ตรวจ Node.js/npm; เครื่องมีเครื่องมือพร้อมแล้ว | ใช้ environment เดียวกับงาน Vanilla โดยไม่ติดตั้ง Node ซ้ำ |
| 1.2 | ทบทวน `../minishop-noReact/src/main.js` | งาน Week 3 ใช้ `document.querySelector('#app').innerHTML` → งานนี้ใช้ JSX/Component |

## Part 2 — React Project ด้วย Vite

| ข้อ | ทำอะไร | เดิม → ตอนนี้ |
| --- | --- | --- |
| 2.1–2.4 | แยก `minishop-react` เป็นโฟลเดอร์โปรเจกต์จาก `minishop-noReact`; ใช้ Vite + React + JavaScript | Vanilla กับ React อยู่คนละโปรเจกต์ตามหน้า 5–7 ของใบงาน; `src/main.jsx` render `<App />` |
| 2.5 | รัน `npm install` ใน `minishop-react` | `react`, `react-dom`, Vite, Tailwind และปลั๊กอินติดตั้งในโปรเจกต์นี้ |
| 2.6 | ตรวจโครงสร้าง | มี `src/components`, `src/data`, `public/products` และไฟล์ config ตามที่ใช้จริง |
| 2.7 | รัน Vite และเปิดหน้าเว็บที่ `http://127.0.0.1:5173/` | หน้า React โหลดได้แยกจากโปรเจกต์ Vanilla |

## Part 3 — JSX และ Tailwind CSS

| ข้อ | ทำอะไร | เดิม → ตอนนี้ |
| --- | --- | --- |
| 3.1–3.3 | ใช้ JSX ใน `App.jsx` และทุก Component; ใช้ `className` | ไม่มีการใช้ `innerHTML` หรือ `document.querySelector` เพื่อสร้าง UI |
| 3.4 | ตรวจ `src/style.css` และ `vite.config.js` | มี `@import "tailwindcss";` กับ `@tailwindcss/vite` ตาม Tailwind v4 อยู่แล้ว |
| 3.5 | ใช้ utility class กับ JSX จริง | ตัวอย่าง `MiniShop`/ปุ่มถูกต่อยอดเป็นหน้าสินค้าฉบับสมบูรณ์ |

## Part 4 — Component

| ข้อ | ทำอะไร | เดิม → ตอนนี้ |
| --- | --- | --- |
| 4.1–4.2 | แยก `src/components` | จาก HTML string ใน Vanilla → Component รับผิดชอบ UI คนละส่วน |
| 4.3–4.5 | สร้างและเรียก `<Header />` จาก `App` | แถบบนรับจำนวนตะกร้าและ callback จาก parent |
| 4.6–4.8 | สร้างและเรียก `<ProductCard />` ผ่าน `<ProductList />` | เดิม card เป็น HTML ที่สร้างจาก Vanilla JS → card ใช้ซ้ำเป็น React Component |

## Part 5 — Props

| ข้อ | ทำอะไร | เดิม → ตอนนี้ |
| --- | --- | --- |
| 5.1–5.4 | ส่ง `name`, `price`, `image`, `category` และข้อมูล rating จาก App → ProductList → ProductCard | Card ไม่ผูกกับ Headphones ตัวเดียว; แต่ละใบแสดงข้อมูลของสินค้าตนเอง |

## Part 6 — State (`useState`)

| ข้อ | ทำอะไร | เดิม → ตอนนี้ |
| --- | --- | --- |
| 6.1–6.3 | สร้าง `cartCount` เริ่มที่ `0` | เดิม Vanilla ใช้ตัวแปรธรรมดา → React ใช้ `useState(0)` |
| 6.4–6.7 | แสดงตัวเลขใน Header และเพิ่มด้วย `setCartCount(count => count + quantity)` | React render จำนวนใหม่ทันที; ไม่แก้ DOM ด้วย `innerText` |

## Part 7 — Event Handling

| ข้อ | ทำอะไร | เดิม → ตอนนี้ |
| --- | --- | --- |
| 7.1–7.2 | `onClick` ที่ปุ่ม Add to Cart, View Detail, ปุ่มกลับ, Retry และนำทาง | เดิม Vanilla ติด listener บน `#app` → React ส่ง callback ผ่าน props |
| 7.3 | `onChange` ที่ช่องค้นหาและตัวเลือก filter/sort | ค่าที่พิมพ์แสดงผลใน UI โดยตรง ไม่ต้องดูใน Console |

## Part 8 — MiniShop React

| ข้อ | ทำอะไร | เดิม → ตอนนี้ |
| --- | --- | --- |
| 8.1 | จัดโครงสร้าง `App.jsx`, `components/*`, `data/*` | แยก UI, แหล่งข้อมูลตัวอย่าง และฟังก์ชันแปลง API |
| 8.2–8.3 | ย้ายแนวคิดสินค้า 4 รายการจากงาน Vanilla ไป `sampleProducts.js` สำหรับโหมดสาธิตเท่านั้น | การโหลดหลักใช้ API; ไม่แสดงข้อมูลคงที่แทน API โดยอัตโนมัติ |
| 8.4 | `ProductList` ใช้ `products.map()` และ `key={product.id}` | รายการปรับตามข้อมูลที่รับมาโดยไม่ต้องเขียน `<ProductCard />` ซ้ำ |
| 8.5 | App ส่ง `filteredProducts` เป็น props ให้ ProductList | ข้อมูลไหล App → ProductList → ProductCard → UI |

## Part 9 — Product Filter และ Interactive Form

| ข้อ | ทำอะไร | เดิม → ตอนนี้ |
| --- | --- | --- |
| 9.1–9.2 | `search` เป็น state; input ใช้ `value` + `onChange` | เดิม Vanilla เก็บในตัวแปรและแก้ DOM → React render จาก state |
| 9.3–9.4 | กรองชื่อแบบไม่สนตัวพิมพ์ใหญ่เล็ก แล้วส่งผลให้ ProductList | กรองร่วมกับ category และ sort ใน `filteredProducts` |
| 9.5 | ทดลอง `Lap`, `XYZ` ในโหมดข้อมูลตัวอย่าง | `Lap` เหลือ Laptop; `XYZ` แสดง Empty State |

## Part 10 — `useEffect` และ Data Fetching

| ข้อ | ทำอะไร | เดิม → ตอนนี้ |
| --- | --- | --- |
| 10.1–10.3 | สร้าง `products`, `loading`, `error` state และใช้ `useEffect` | เดิมสินค้า 4 รายการถูกประกาศใน Vanilla `main.js` → React เริ่มด้วย array ว่างแล้วรอ API |
| 10.4 | `fetch('https://dummyjson.com/products?limit=0')` ตรวจ HTTP status, อ่าน `data.products` แล้วแปลง field เป็นรูปแบบที่ Card ใช้ | ตามคำขอใหม่ เปลี่ยนจาก Fake Store API ในใบงานเป็น DummyJSON; `limit=0` โหลดทั้งรายการเพื่อให้ค้นหา/กรองได้ครบ |
| 10.5 | ใช้ dependency array เพื่อโหลดตอนเริ่มต้น; `retry` กระตุ้นโหลดใหม่ | `AbortController` ยกเลิก request ค้างเมื่อ component cleanup รวมถึง React StrictMode ใน development |

## Part 11 — Loading / Error / Empty State

| ข้อ | ทำอะไร | เดิม → ตอนนี้ |
| --- | --- | --- |
| 11.1 | แสดง `Loading products...` ระหว่าง fetch | ไม่ปล่อยหน้าสินค้าว่างโดยไม่มีคำอธิบาย |
| 11.2 | แสดง `ไม่สามารถโหลดข้อมูลได้` เมื่อ request, HTTP หรือ JSON ผิดพลาด | มี `Try again`; มี `Use sample products` ให้ผู้ใช้เลือกทดลองแอปต่อได้ |
| 11.3–11.4 | เมื่อ filter แล้วเหลือ 0 แสดง `ไม่พบสินค้าที่ค้นหา` | Error จาก API และ Empty จากการค้นหาเป็นคนละสถานะ |

## Part 12 — Final Integration

| ข้อ | ทำอะไร | เดิม → ตอนนี้ |
| --- | --- | --- |
| 12.1 | ประกอบ Header, ProductList, ProductCard, Profile, Dashboard และหน้าตะกร้า/รายละเอียด | โครงสร้างแยก Component ชัดเจน; ตารางคำสั่งซื้อและสรุป Profile เดิมยังอยู่พร้อมป้ายข้อมูลตัวอย่าง |
| 12.2 | หน้า Products มี Header, Search, Products, Cart | กด Add to Cart 2 ครั้ง ตัวเลข 0 → 1 → 2; รายการและยอดรวมใน Cart ตรงกัน |

## Part 13 — Assignment ทั้ง 9 Requirements

1. **Component:** มี `Header`, `ProductCard`, `ProductList`, `Profile` ครบ
2. **Props:** `ProductCard` รับ `name`, `price`, `image`, `category` ครบ
3. **State:** มี `cartCount`, `search` และ state ที่จำเป็นสำหรับ API/UI
4. **Event:** ใช้ `onClick` และ `onChange`
5. **Product Filter:** ค้นหาชื่อแบบไม่สนตัวพิมพ์ใหญ่เล็ก
6. **API:** เรียก DummyJSON Products ตามคำขออัปเดตหลังทำใบงาน
7. **Loading:** แสดงขณะรอ request
8. **Error:** แสดงข้อความไทยตามใบงานเมื่อ API ใช้งานไม่ได้
9. **Empty:** แสดงข้อความไทยตามใบงานเมื่อกรองแล้วไม่มีสินค้า

## Part 14 — Bonus ทั้ง 4 Challenges

1. **Category Filter:** All / Computer / Audio / Fashion / Gadget ตามใบงาน และ Other สำหรับหมวดของ DummyJSON ที่ไม่ตรง 4 กลุ่มแรก; สินค้าเสียงจำแนกจากชื่อ เช่น AirPods/Earphones
2. **Sort Price:** เรียงราคาต่ำ→สูง และสูง→ต่ำ โดยไม่แก้ลำดับ array ต้นฉบับ
3. **Product Detail:** View Detail แสดงชื่อ ราคา คำอธิบาย rating และเลือกจำนวนก่อนเพิ่มตะกร้า
4. **Cart:** Header แสดงจำนวนรวม; หน้าตะกร้าแสดงชื่อสินค้า จำนวน ราคาต่อรายการ และยอดรวม

## Part 15 — ตรวจปัญหาที่ใบงานระบุ

1. Imports ของ Component ชี้ไปยังไฟล์จริง และ Vite build ผ่าน
2. `ProductCard` import ผ่าน `ProductList` ถูกต้อง
3. หน้าเว็บเปิดได้; ตรวจ UI ในเบราว์เซอร์
4. Tailwind ทำงานใน build และหน้าเว็บ
5. Fake Store API ในใบงานตอบ HTTP 521 จากเครื่องตรวจ ณ วันที่ 5 ต.ค. 2026; เปลี่ยนไปใช้ DummyJSON ตามคำขอใหม่ และยังคง Error/Retry/ข้อมูลตัวอย่างไว้หาก API ใหม่ขัดข้อง

## Part 16 และ 18 — ภาพรวม / Learning Outcome

Flow ที่ใช้จริง: `API → useEffect → products state → search/category/sort → ProductList → ProductCard → onClick → cartCount/cartItems state → Header/Cart`.

## วิธีรันและผลตรวจ

ที่โฟลเดอร์โปรเจกต์ ใช้ `npm run dev -- --configLoader runner` แล้วเปิด URL ที่ Vite แสดงใน Terminal (`--configLoader runner` ช่วยหลีกเลี่ยงข้อจำกัดการอ่าน path ของ environment ที่ใช้ตรวจงานนี้)

ผลตรวจเดิม: production build ผ่านด้วย Vite `--configLoader runner`; เปิดหน้าเว็บในเบราว์เซอร์; ตรวจ Error State ของ API เดิม; กดใช้ข้อมูลตัวอย่าง; ค้น `Lap`/`XYZ`; กรอง Audio; เรียงราคาต่ำ→สูง; เปิด Detail; เพิ่ม Laptop 2 ชิ้นและตรวจ Header/Cart ยอดรวม ฿25,800.00

ผลตรวจ API ใหม่: DummyJSON ตอบ HTTP 200 พร้อมสินค้า 194 รายการ; response เป็น object ที่มี `products` array, `rating` เป็นตัวเลข, `reviews` เป็น array และรูปภาพอยู่ใน `thumbnail`/`images` จึงปรับตัวแปลงข้อมูลให้ตรง เปิดหน้าเว็บแล้วสินค้าจาก API แสดงจริง; ค้น `MacBook` เหลือ Apple MacBook Pro หนึ่งรายการและเพิ่มลงตะกร้าแล้วตัวเลขขึ้น 1 โหมดตัวอย่างใช้เงินบาทตามใบงาน ส่วนข้อมูล DummyJSON แสดง USD โดยไม่มีการแปลงอัตราแลกเปลี่ยน

แหล่งข้อมูลรูปแบบ API ใหม่: [DummyJSON Products documentation](https://dummyjson.com/docs/products)
