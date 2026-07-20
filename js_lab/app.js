// 1.2
// const input = prompt("กรุณากรอกคะแนนของคุณ (0-100):");

// const score = Number(input);

// if(score < 100 && score >= 0){
//     if(score >= 50){
//         console.log("สอบผ่าน");
//     }
//     else{
//         console.log("สอบไม่ผ่าน");
//     }
// }
// else{
//     console.log("ข้อมูลไม่ถูกต้อง");
// }

// 2.1
let score = [45,78,8,35,90];
let indexWhile = 0;
console.log("--- While Loop Q1 ---")
while(indexWhile < score.length){
    console.log("Index :" , indexWhile , "|| Value :" ,score[indexWhile]);
    indexWhile++;
}

console.log("--- For Loop Q1 ---")
for(let i = 0; i < score.length;i++){
    console.log("Index :" , i , "|| Value :" ,score[i]);
}

console.log("--- push Q2 ---")

score.push(65);
score.push(48);

console.log(score);

console.log("--- pop Q3 ---");
console.log(score.pop(score));

console.log("--- includes Q4 ---");
console.log(score.includes(82));

console.log("--- sort Q5 ---");
score.sort((a, b) => a - b)
console.log(score)
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

// 3.1

function calculateGrade(sc){
    if(sc >= 80){
        return "A";
    }
    else if(sc >= 60){
        return "B";
    }
    else{
        return "F";
    }

    return "Error";
}

const calculateGradeArrow = (sc) => sc >= 80 ? "A" : sc >= 60 ? "B" : "F";

console.log(" -- calculateGrade(61) -- ")
console.log(calculateGrade(61))

console.log(" -- calculateGradeArrow(61) -- ")
console.log(calculateGradeArrow(61))

let GradeStudents = students.map(student => calculateGradeArrow(student.score))
GradeStudents.forEach(student => {
    console.log("ได้เกรด :", student)
})

// 3.2
const input = prompt("กรุณาทายเลขลูกเต๋า (1-6):");
const min = 1;
const max = 6;

const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
if(randomNum === Number(input)){
    console.log("ยินดีด้วย! คุณทายถูกต้อง เลขที่ออกคือ [",randomNum,"]")
}else{
    console.log("เสียใจด้วย! คุณทายผิด บอททอยลูกเต๋าได้เลข [",randomNum,"]")
}