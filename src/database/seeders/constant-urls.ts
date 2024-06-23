const AVATARS = [
  'https://i.pinimg.com/564x/0a/52/d5/0a52d5e52f7b81f96538d6b16ed5dc2b.jpg',
  'https://i.pinimg.com/564x/c0/92/01/c092013329f6f6fcd43cd0fafae95109.jpg',
];
const PRODUCT_IMG = [
  'https://firebasestorage.googleapis.com/v0/b/dango-de20b.appspot.com/o/seed%2F2c55d6bc4e02f4ef94718c4171ac25cb.jpg?alt=media&token=d382db30-ecb1-4269-b9bf-768706191676',
  'https://firebasestorage.googleapis.com/v0/b/dango-de20b.appspot.com/o/seed%2FRICE-Final-05.png?alt=media&token=d3677471-7376-41a4-83cf-78479df7eeda',
  'https://firebasestorage.googleapis.com/v0/b/dango-de20b.appspot.com/o/seed%2Fcai-thia-202312271059011562.webp?alt=media&token=154cd9ee-9ce5-45dd-a006-cbfe53446b85',
  'https://firebasestorage.googleapis.com/v0/b/dango-de20b.appspot.com/o/seed%2Fcam-sanh-202401201943148305.webp?alt=media&token=005d2392-3189-45fc-8410-58ef890296e2',
  'https://firebasestorage.googleapis.com/v0/b/dango-de20b.appspot.com/o/seed%2Fchuoi-gia-giong-nam-my-1kg-202012021040388708.webp?alt=media&token=9792c12f-43e0-4e2d-a5ca-3fbf3999ccb1',
  'https://firebasestorage.googleapis.com/v0/b/dango-de20b.appspot.com/o/seed%2Fdau-goi-sunsilk-ong-muot-rang-ngoi-874ml-202404190901052680.jpg?alt=media&token=2733d6cd-d5b9-4f2f-bda6-368880907de7',
  'https://firebasestorage.googleapis.com/v0/b/dango-de20b.appspot.com/o/seed%2Fdua-hau-khong-hat-202312270957362195.webp?alt=media&token=394917bf-668f-4a00-8381-4fb30417e70d',
  'https://firebasestorage.googleapis.com/v0/b/dango-de20b.appspot.com/o/seed%2Fhat-nem-cao-cap-vi-nam-huong-maggi-goi-450g-202207291105505226.jpg?alt=media&token=297cb940-35bb-4382-ba72-6b6fedb8e816',
  'https://firebasestorage.googleapis.com/v0/b/dango-de20b.appspot.com/o/seed%2Fimages.jpg?alt=media&token=bb4c8285-0d13-4f41-b7a4-4a6fadca44bf',
  'https://firebasestorage.googleapis.com/v0/b/dango-de20b.appspot.com/o/seed%2Fkim-chi-cai-thao-cat-lat-bibigo-ong-kims-goi-100g-202002031131554036.jpg?alt=media&token=ab4dfcdc-9e67-44b6-b9c1-09baa4e89301',
  'https://firebasestorage.googleapis.com/v0/b/dango-de20b.appspot.com/o/seed%2Fnam-dong-co-kho-bach-hoa-xanh-goi-50g-202101260006023251.jpg?alt=media&token=d73c2280-129b-4591-b9fb-e0199b40e912',
  'https://firebasestorage.googleapis.com/v0/b/dango-de20b.appspot.com/o/seed%2Fnua-con-vit-202402271111289359.webp?alt=media&token=83ec63e1-8104-46be-81ee-66f18330c129',
  'https://firebasestorage.googleapis.com/v0/b/dango-de20b.appspot.com/o/seed%2Fnuoc-cot-dua-vietcoco-lon-400ml-202303290833508429.jpg?alt=media&token=8669686a-430b-4d6f-9e69-2d6028eed825',
  'https://firebasestorage.googleapis.com/v0/b/dango-de20b.appspot.com/o/seed%2Fnuoc-giat-comfort-duong-vai-huong-thoi-thuong-giup-quan-ao-sach-thom-tuoi-mau-tui-34-lit-202306151116089200.jpg?alt=media&token=2c44196e-4854-49e1-b8e6-8114ebee382a',
  'https://firebasestorage.googleapis.com/v0/b/dango-de20b.appspot.com/o/seed%2Fnuoc-ngot-co-ga-coca-cola-zero-chai-390ml-202110281746112376.jpg?alt=media&token=d20e1b01-15ef-47db-a5bb-86957d8d0f90',
  'https://firebasestorage.googleapis.com/v0/b/dango-de20b.appspot.com/o/seed%2Fnuoc-ngot-mirinda-huong-cam-chai-390ml-202310311346499855.jpg?alt=media&token=d5d836bc-f855-470f-bc72-ab046409ca4d',
];

const DISH_IMG = [
  'https://firebasestorage.googleapis.com/v0/b/dango-de20b.appspot.com/o/seed%2Fdishes%2F2-cach-nau-canh-khoai-mo-ngon-va-vo-cung-bo-duong-7-1689751525-845-width600height400.jpg?alt=media&token=bc1093e0-ed7a-4190-b899-71530d4d45e1',
  'https://firebasestorage.googleapis.com/v0/b/dango-de20b.appspot.com/o/seed%2Fdishes%2F36b2813d90aa4b0705f7eefc79aef5a9.jpg?alt=media&token=6060b934-d338-431e-9012-6dff295cc29c',
  'https://firebasestorage.googleapis.com/v0/b/dango-de20b.appspot.com/o/seed%2Fdishes%2F6-cach-nau-canh-bi-do-voi-xuong-tom-thit-bam-thom-ngon-bo-duong-4-1688955113-281-width700height470.jpg?alt=media&token=296dff9e-4d7f-4ab1-8395-77ebde692c52',
  'https://firebasestorage.googleapis.com/v0/b/dango-de20b.appspot.com/o/seed%2Fdishes%2Fcach-lam-dau-hu-chien-sa-ot-5.jpg?alt=media&token=5a7ffa3c-0dd1-4967-85f4-9a65b544a1f3',
  'https://firebasestorage.googleapis.com/v0/b/dango-de20b.appspot.com/o/seed%2Fdishes%2Fcach-lam-rau-muong-xao-toi-xanh-muot-gion-ngon-202106261000257134.jpg?alt=media&token=6612b141-a63d-479a-a937-3d249720b3dd',
  'https://firebasestorage.googleapis.com/v0/b/dango-de20b.appspot.com/o/seed%2Fdishes%2Fcach-lam-suon-xao-chua-ngot-don-gian-nuoc-sot-dam-da-tham-vi-rat-hao-com-suon-xao-chua-ngot-eva-013-1688030039-777-width600height400.jpg?alt=media&token=0285b379-8a6d-44f1-8844-b10c47f0f01d',
  'https://firebasestorage.googleapis.com/v0/b/dango-de20b.appspot.com/o/seed%2Fdishes%2Fcach-lam-thit-kho-trung-cut-nong-hoi-vua-thoi-vua-an-202208301503413137.jpg?alt=media&token=7b379ed0-0e4c-422f-ac90-4a82c6fb5d35',
  'https://firebasestorage.googleapis.com/v0/b/dango-de20b.appspot.com/o/seed%2Fdishes%2Fcach-lam-tom-rim-man-ngot%20(3).jpg?alt=media&token=d5c148f1-8f6e-4e44-8942-d77161908e25',
  'https://firebasestorage.googleapis.com/v0/b/dango-de20b.appspot.com/o/seed%2Fdishes%2Fcach-lam-vit-kho-gung-cac-mon-vit-kho-ngon-khong-bi-hoi-202209091336576558.jpeg?alt=media&token=ed247453-11bc-44c0-b6ed-bd5b702faeba',
  'https://firebasestorage.googleapis.com/v0/b/dango-de20b.appspot.com/o/seed%2Fdishes%2Fche-dau-den-2-251.jpg?alt=media&token=fc2f1d2e-4712-4d4a-a37d-e541688fed51',
  'https://firebasestorage.googleapis.com/v0/b/dango-de20b.appspot.com/o/seed%2Fdishes%2Fchả-trứng-hấp-recipe-main-photo.jpg?alt=media&token=8b61a01e-b8bf-4848-b05b-f6ae56665917',
  'https://firebasestorage.googleapis.com/v0/b/dango-de20b.appspot.com/o/seed%2Fdishes%2Fdau-hu-nhoi-thit-sot-ca-chua-ivivu-1.jpg?alt=media&token=e1c7a0fb-6dc9-4c3e-b570-ec63987bfe4a',
  'https://firebasestorage.googleapis.com/v0/b/dango-de20b.appspot.com/o/seed%2Fdishes%2Fga-nuong-sa-ot.jpg?alt=media&token=5c175564-ae7e-4c11-bc13-6ca70b8b077e',
  'https://firebasestorage.googleapis.com/v0/b/dango-de20b.appspot.com/o/seed%2Fdishes%2Fmaxresdefault%20(1).jpg?alt=media&token=ed35ba3d-c3b6-41a6-ab19-72babdc3ce16',
  'https://firebasestorage.googleapis.com/v0/b/dango-de20b.appspot.com/o/seed%2Fdishes%2Fmaxresdefault.jpg?alt=media&token=76c13cc2-cdac-4448-ba14-378ba4965099',
  'https://firebasestorage.googleapis.com/v0/b/dango-de20b.appspot.com/o/seed%2Fdishes%2Fmuc1-1617182767-1435-1617182779.jpg?alt=media&token=2163e50f-590b-4103-a720-ff6ad58a7026',
  'https://firebasestorage.googleapis.com/v0/b/dango-de20b.appspot.com/o/seed%2Fdishes%2Fthit-bo-xao-gi-ngon.jpg?alt=media&token=1d86c0a4-fd2c-4a23-a7a4-1860325d210f',
  'https://firebasestorage.googleapis.com/v0/b/dango-de20b.appspot.com/o/seed%2Fdishes%2Fxao-cai-thao-dung-cho-luon-vao-chao-them-buoc-nua-rau-moi-ngon-ngot-mem-caithao-1641523342-896-width640height480.jpeg?alt=media&token=337c9376-08c9-4bb7-9f3d-61686eda89f1',
];

export { PRODUCT_IMG, AVATARS, DISH_IMG };
