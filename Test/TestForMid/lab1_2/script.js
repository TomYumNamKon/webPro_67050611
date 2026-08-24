// 2.2
let students = [
{ id: 1, name: "Somchai" ,score: 48 },
{ id: 2, name: "Somsri" ,score: 75 },
{ id: 3, name: "Sompong" ,score: 32 },
{ id: 4, name: "Somnak" ,score: 85 }
];
console.log("--- foreach Q1 ---");
students.forEach(student => {
    console.log("ชื่อนักศึกษา :",student.name ,"ได้คะแนน :", student.score );
})

console.log("--- map Q2 ---");
let newStudents = students.map(student => {
    return {
        id: student.id,
        name: student.name,
        score: student.score*2
    };
})
newStudents.forEach(student => {
    console.log("ชื่อนักศึกษา :",student.name ,"ได้คะแนน :", student.score );
})

console.log("--- filter Q3 ---");
let filterStudents = students.filter(student => student.score > 50);
filterStudents.forEach(student => {
    console.log("ชื่อนักศึกษา :",student.name ,"ได้คะแนน :", student.score )
})

console.log("--- find Q4 ---");
let findStudents = students.find(student => student.name === "Somsri")
console.log(findStudents);