

export default interface User {
    nickName: string;
    rol: "God" | "Admin" | "Instructor" | "Student";
    password: string;
    createdAt: Date;
    updatedAt: Date;
  }
  