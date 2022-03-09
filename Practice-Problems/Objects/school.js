/* eslint-disable max-lines-per-function */
// School
// Create a school object that uses the student object. The school object
// should have methods that use and update information about the student.
// Implement the given methods for the school object.

function createStudent(name, year) {
  return {
    name: name,
    year: year,
    courses: [],

    info: function () {
      console.log(`${this.name} is a ${year} year student`);
    },

    addCourse: function (courseObj) {
      this.courses.push(courseObj);
    },

    listCourses: function () {
      return this.courses;
    },

    addNote: function (code, note) {
      let course = this.courses.filter((obj) => {
        return obj.code === code;
      });

      if (course[0]) {
        if (course[0].note) {
          course[0].note += `; ${note}`;
        } else {
          course[0].note = note;
        }
      }
    },

    viewNotes: function () {
      this.courses.forEach((obj) => {
        if (obj.note) {
          console.log(`${obj.name}: ${obj.note}`);
        }
      });
    },

    updateNote: function (code, note) {
      let course = this.courses.filter((obj) => {
        return obj.code === code;
      });

      if (course[0]) {
        course[0].note = note;
      }
    },
  };
}

let school = {
  students: [],
  addStudent: function (name, year) {
    if (['1st', '2nd', '3rd', '4th', '5th'].indexOf(year) >= 0) {
      let student = createStudent(name, year);
      this.students.push(student);
      return student;
    } else {
      console.log('Invalid Year');
      return undefined;
    }
  },

  enrollStudent: function (student, courseName, courseCode) {
    student.addCourse({ name: courseName, code: courseCode });
  },

  addGrade: function (student, courseName, grade) {
    let course = student.listCourses().filter((course) => {
      return course.name === courseName;
    })[0];

    if (course) {
      course.grade = grade;
    }
  },

  getReportCard: function (student) {
    student.listCourses().forEach((course) => {
      if (course.grade) {
        console.log(`${course.name} : ${String(course.grade)}`);
      } else {
        console.log(`${course.name} : In progress`);
      }
    });
  },

  courseReport: function (courseName) {
    function getCourse(student, courseName) {
      return student.listCourses().filter((course) => {
        return course.name === courseName;
      })[0];
    }

    let courseStudents = this.students
      .map((student) => {
        let course = getCourse(student, courseName) || { grade: undefined };
        return { name: student.name, grade: course.grade };
      })
      .filter((student) => student.grade);

    if (courseStudents.length > 0) {
      console.log(`= ${courseName} Grades=`);

      let average =
        courseStudents.reduce((total, student) => {
          console.log(`${student.name} : ${String(student.grade)}`);
          return total + student.grade;
        }, 0) / courseStudents.length;

      console.log('---');
      console.log(`Course Average: ${String(average)}`);
    }
  },
};

let foo = school.addStudent('foo', '3rd');
school.enrollStudent(foo, 'Math', 101);
school.enrollStudent(foo, 'Advanced Math', 102);
school.enrollStudent(foo, 'Physics', 202);
school.addGrade(foo, 'Math', 95);
school.addGrade(foo, 'Advanced Math', 90);
school.getReportCard(foo);
school.courseReport('Math');
