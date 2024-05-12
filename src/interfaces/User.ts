

export default interface User {
    fullName: string;
    nickName:string
    password: string;
    rol: "god" | "admin" | "instructor" | "student";
    document:string;
    documentType: "god" | "admin";
    birdDate:String;
    phoneNumber:String;
    createdAt: Date;
    updatedAt: Date;
  }
  