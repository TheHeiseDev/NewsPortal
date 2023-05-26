const arr1 = [
  { name: "edgar", id: 1 },
  { name: "alla", id: 2 },
];
const arr2 = [
  { name: "edgar", id: 1 },
  { name: "vika", id: 4 },
];

const result = [...new Map([...arr1, ...arr2].map((item) => [item.id, item])).values()];
console.log(result);
