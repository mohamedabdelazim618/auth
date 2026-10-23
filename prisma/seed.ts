import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const products = [
  { name: 'هاتف ذكي سامسونج جالاكسي S22', price: 289.000 },
  { name: 'لابتوب ديل XPS 15', price: 599.000 },
  { name: 'سماعات آبل AirPods Pro', price: 79.500 },
  { name: 'ساعة ذكية Apple Watch Series 7', price: 149.000 },
  { name: 'تلفاز سامسونج QLED 65 بوصة', price: 449.000 },
  { name: 'كاميرا كانون EOS R5', price: 899.000 },
  { name: 'بلايستيشن PS5', price: 189.000 },
  { name: 'آيباد برو 12.9 بوصة', price: 379.000 },
  { name: 'سماعة جيمنج Razer', price: 39.500 },
  { name: 'ماوس لوجيتك G Pro X', price: 24.500 },
  { name: 'كيبورد ميكانيكي Corsair K95', price: 59.900 },
  { name: 'مايكروفون Blue Yeti', price: 45.900 },
  { name: 'شاشة ألعاب ASUS ROG 27 بوصة', price: 129.000 },
  { name: 'راوتر ASUS ROG Rapture', price: 89.900 },
  { name: 'كرت شاشة RTX 4080', price: 379.000 },
  { name: 'معالج AMD Ryzen 9 5950X', price: 219.000 },
  { name: 'باور سبلاي Corsair 850W', price: 44.900 },
  { name: 'كيس كمبيوتر NZXT H510', price: 34.900 },
  { name: 'ذاكرة رام Corsair 32GB', price: 54.900 },
  { name: 'هارد SSD Samsung 2TB', price: 75.900 },
  { name: 'طابعة HP LaserJet Pro', price: 94.900 },
  { name: 'ماسح ضوئي Epson', price: 64.900 },
  { name: 'شاحن سريع Anker 65W', price: 14.900 },
  { name: 'حامل لابتوب قابل للتعديل', price: 12.900 },
  { name: 'كاميرا ويب Logitech C920', price: 29.900 },
  { name: 'محول USB-C متعدد المنافذ', price: 18.900 },
  { name: 'حقيبة لابتوب SwissGear', price: 24.900 },
  { name: 'لوحة تبريد للابتوب', price: 12.900 },
  { name: 'كابل HDMI 2.1 مقوى', price: 7.900 },
  { name: 'حماية شاشة زجاجية للموبايل', price: 4.900 }
];

async function main() {
  console.log('بدء إضافة المنتجات بأسعار بالدينار البحريني...');

  // حذف المنتجات القديمة إن وجدت
  await prisma.product.deleteMany();
  
  for (const product of products) {
    await prisma.product.create({
      data: product
    });
  }
  
  console.log('تم إضافة المنتجات بنجاح!');
}

main()
  .catch((e) => {
    console.error('حدث خطأ:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });