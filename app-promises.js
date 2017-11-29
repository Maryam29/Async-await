const users = [{
	id:1,
	name:'Andrew',
	schoolId:101
},{
	id:2,
	name:'Jessica',
	schoolId:103
}];

const grades = [{
	id:1,
	schoolId:101,
	grade:86
},
{
	id:2,
	schoolId:103,
	grade:100
},
{
	id:3,
	schoolId:101,
	grade:90
}];

const getUser = (id) =>{
	return new Promise((resolve,reject) => {
		var user = users.find((user) => {
		return user.id === id
	})
	
	if(user)
		resolve(user);
	else
		reject(`Unable to find user with id of ${id}`);
	})
}

const getGrades = (schoolId) => {
	return new Promise((resolve,reject) => {
	var grades_schoolid = grades.filter((grade) => {
		return grade.schoolId === schoolId
	})
	if(grades_schoolid){
		resolve(grades_schoolid)
	}
	else{
		reject(`Unable to find user with Schoolid of ${schoolId}`);
	}
	})
}

//Find the average of given user id and print the output in this format
// Andrew has a 83% in the classs
const getStatus =(id) => {
	var username;											// creating a global variable which is accessible inside all the then callbacks
	return getUser(id).then((user) => {
		username = user.name;
		return getGrades(user.schoolId).then((grades)=>{  //get grades can be called only get user brings back the user therefore inside then call, similarly average is called only when getGrades return an object
			//average and return our string
			let average = 0;
			if(grades.length > 0){
				average = grades.map((grade) => grade.grade).reduce((a,b) => a+b)/grades.length;
			}
			return `${username} has a ${average}% in the class`;
		})
	}).catch((e) => {
	console.log(e);
	})
}

//async await 
// regular functions return strings/data while async function always always return promises 
// () => {
	// return new Promise((resolve, reject) => {
		// resolve('Mike');
	// })
// }
// const getStatusAlt = async (id) =>{
	// return "Mike";
	// throw new Error("This is an error");  // this is how you reject in async function
// }
//const st = await getStatusAlt(1); This is not valid, no await at the top level, call inside async always

const getStatusAlt = async (id) =>{
	var User = await getUser(id); // doesn't hit the next line untill this function get returned. We're waiting for the promise to resolve or reject. 
	//console.log(User); // returns the value Without await a promise is returned while with await resolved/reject result is returned
	var grades = await getGrades(User.schoolId);
	let average = 0;
			if(grades.length > 0){
				average = grades.map((grade) => grade.grade).reduce((a,b) => a+b)/grades.length;
			}
			return `${User.name} has a ${average}% in the class`;
}



// getUser(4).then((user) => {
	// console.log(user);
// }).catch((e) => {
// console.log(e);
// })

// //Get grade summary based on school ID
// getGrades(101).then((user) => {
	// console.log(user);
// }).catch((e) => {
// console.log(e);
// });

// //Get grade summary based on school ID
// getStatus(1).then((average) => {
	// console.log(average);
// }).catch((e) => {
// console.log(e);
// });

// console.log(getStatusAlt(1)); Promise is returned
getStatusAlt(1).then((res) => {
	console.log(res);
}).catch((e) => {
console.log(e);
});
