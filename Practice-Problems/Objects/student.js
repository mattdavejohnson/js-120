/* eslint-disable max-lines-per-function */
// Student
// Create an object factory for a student object. The student object should
// have the given methods and it should produce the expected results

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

let foo = createStudent('Foo', '1st');
foo.info();
foo.listCourses();

foo.addCourse({ name: 'Math', code: 101 });
foo.addCourse({ name: 'Advanced Math', code: 102 });
console.log(foo.listCourses());

foo.addNote(101, 'Fun course');
foo.addNote(101, 'Remember to study for algebra');
foo.viewNotes();

foo.addNote(102, 'Difficult subject');
foo.viewNotes();

foo.updateNote(101, 'Fun course');
foo.viewNotes();
