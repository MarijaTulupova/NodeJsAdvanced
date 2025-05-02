// Basic Requirements:
// 1. Student interface
interface Student {
  id: number;
  name: string;
  age: number;
  grades: number[];
}

const student1: Student = {
  id: 1,
  name: "Bob Bobski",
  age: 20,
  grades: [5, 3, 4],
};

const student2: Student = {
  id: 2,
  name: "John Doe",
  age: 22,
  grades: [1, 5, 3],
};

const student3: Student = {
  id: 3,
  name: "Jane Smith",
  age: 19,
  grades: [5, 5, 2],
};

// console.log(student1);
// console.log(student2);
// console.log(student3);

// 2. Function calculateAverageGrade()
function calculateAverageGrade(students: Student[]): number {
  let gradesSum = 0;
  let gradesTotal = 0;

  students.forEach((student) => {
    student.grades.forEach((grade) => {
      gradesSum += grade;
    });
    gradesTotal += student.grades.length;
  });

  return gradesSum / gradesTotal;
}

const students: Student[] = [student1, student2, student3];
// console.log("Average grade is:", calculateAverageGrade(students).toFixed(2));

// 3. Enum
enum GradeLevel {
  FRESHMAN = "FRESHMAN",
  SOPHOMORE = "SOPHOMORE",
  JUNIOR = "JUNIOR",
  SENIOR = "SENIOR",
}

// 4. Function getGradeLevel
function getGradeLevel(age: number): GradeLevel {
  if (age >= 18 && age <= 19) {
    return GradeLevel.FRESHMAN;
  }

  if (age >= 20 && age <= 21) {
    return GradeLevel.SOPHOMORE;
  }

  if (age >= 22 && age <= 23) {
    return GradeLevel.JUNIOR;
  }

  if (age >= 24) {
    return GradeLevel.SENIOR;
  }

  throw new Error("Invalid age for grade level");
}

// console.log(`${student1.name} is a ${getGradeLevel(student1.age)}.`);
// console.log(`${student2.name} is a ${getGradeLevel(student2.age)}.`);
// console.log(`${student3.name} is a ${getGradeLevel(student3.age)}.`);

//Advanced Requirements:
// 1. Course interface
interface Course {
  id: number;
  name: string;
  students: Student[];
  instructor: string;
  maxStudents: number;
}

const course1: Course = {
  id: 101,
  name: "Node Js Basic",
  students: [student1, student2],
  instructor: "Professor Anderson",
  maxStudents: 10,
};

const course2: Course = {
  id: 102,
  name: "Database",
  students: [student2, student3],
  instructor: "Professor Brown",
  maxStudents: 15,
};

const course3: Course = {
  id: 103,
  name: "Node Js Advanced",
  students: [student1, student3],
  instructor: "Professor Clovis",
  maxStudents: 5,
};

// console.log(course1);
// console.log(course2);
// console.log(course3);

// 2. Class CourseManager
class CourseManager {
  private courses: Course[] = [];

  public addNewCourse(course: Course): void {
    this.courses.push(course);
  }

  public removeCourseById(id: number): void {
    const courseExists = this.courses.some((course) => course.id === id);

    if (!courseExists) {
      throw new Error(`Course with ID ${id} does not exist.`);
    }

    this.courses = this.courses.filter((course) => course.id !== id);
    console.log(`Course with ID ${id} has been removed.`);
  }

  public getCourseById(id: number): Course {
    const course = this.courses.find((course) => course.id === id);

    if (!course) {
      throw new Error(`Course with ID ${id} not found.`);
    }

    return course;
  }

  public getAllCourses(): Course[] {
    return this.courses;
  }
}

const courseManager = new CourseManager();

// Add new courses
courseManager.addNewCourse(course1);
courseManager.addNewCourse(course2);
courseManager.addNewCourse(course3);

//Remove a course by Id
courseManager.removeCourseById(101);

//Get course by Id
console.log("Found course:", courseManager.getCourseById(102));

//Get all courses
console.log("All courses:", courseManager.getAllCourses());

// 3. Function getTopStudents
function getAverageGrade(student: Student): number {
  const total = student.grades.reduce((sum, grade) => sum + grade, 0);
  return total / student.grades.length;
}

function getTopStudents(
  courseId: number,
  topN: number,
  manager: CourseManager
): Student[] {
  const course = manager.getCourseById(courseId);

  const sortedStudents = [...course.students].sort((a, b) => {
    const avgA = getAverageGrade(a);
    const avgB = getAverageGrade(b);
    return avgB - avgA;
  });

  return sortedStudents.slice(0, topN);
}

const topStudents = getTopStudents(102, 2, courseManager);
console.log("Top students in course 102:");

topStudents.forEach((student) => {
  const avg =
    student.grades.reduce((sum, g) => sum + g, 0) / student.grades.length;
  console.log(`${student.name} - Average Grade: ${avg.toFixed(2)}`);
});
