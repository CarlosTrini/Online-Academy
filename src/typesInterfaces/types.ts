export type idCourseT = string;
export type idSubscriberT = string;
export type scoreT = 0 | 1 | 2 | 3 | 4 | 5;
export type levelT = 'Básico' | 'Intermedio' | 'Avanzado';
export type typeUserCategory = 'Estudiante' | 'Docente';
export type longDescriptionT = {
    title: string;
    description: string;
};
export type commentCourseT = {
    userName: string;
    comment: string;
    score: scoreT;
}
export type courseCategoriesT = 'Desarrollo web' | 'Programación' | 'Gastronomía' | 'Superación personal' | 'Psicología' | 'Fotografía' | 'Video' | 'Medicina' | 'Herbolaria';

export type cardT = {
    nameOwner: string;
    cardNumber: string;
    date: string;
    cvv: string;
    visible? : boolean;
    id?: string | number;
}

export type contentT = {
    contentTitle: string;
    chapter: {
        title: string;
        duration: string;
    }[];
    
}


export type userT = {
    typeUser: typeUserCategory;
    user: string;
    email: string;
    password: string;
    id: idSubscriberT;
    name: string;
    lastName: string;
    favorites: idCourseT[];
    subscriptions: idCourseT[];
    card?: cardT[];
    picture: string;
}

export type coursesT = {
    id: idCourseT;
    title: string;
    longDescription: longDescriptionT;
    shortDescription: string;
    skills: [string, string, string],
    longSkills: string[] | [],
    score: scoreT;
    idTeacher: string;
    lastUpdated: string;
    students: number;
    image: string;
    discountPercentaje: number;
    discountPrice: string;
    price: number;
    tags: string[];
    level: levelT;
    courseDuration: string;
    commentsCourse?: commentCourseT[];
    category: courseCategoriesT;
    subscribers?: idSubscriberT[];
    content: contentT[] | [];
};

export type teacherT = {
    picture: string;
    typeUser: typeUserCategory;
    id: string;
    name: string;
    lastName: string;
    aboutMe: {
        greeting: string;
        text: string;
    };
};

export type loginDataT = {
    idUser: string;
    name: string;
    typeUser: typeUserCategory;
    login: boolean;
    userPicture: string;
}

export type cardCourseT = { // sin uso aún...
    level: coursesT['level'];
    duration: coursesT['courseDuration'];
    idCourse: coursesT['id'];
    imageCourse: coursesT['image'];
    idTeacher: coursesT['idTeacher'];
    titleCourse: coursesT['title'];
    price: coursesT['price'];
    discountPrice: coursesT['discountPrice']
    score: coursesT['score'];
    category: coursesT['category'];
    studentsQty: coursesT['students'];
    teacherName: string;
    shortDescription: coursesT['shortDescription'];
    lastUpdated: coursesT['lastUpdated'];
    skills: coursesT['skills']
}
// con el idCourse se buscará la data del curso

export type infoCourseCartT = {
    idCourse: coursesT['id'];
    imageCourse: coursesT['image'];
    idTeacher: coursesT['idTeacher'];
    titleCourse: coursesT['title'];
    price: coursesT['price'];
    discountPrice: coursesT['discountPrice'];
    teacherName: string;
    isRepeated: boolean;
}

export type cartT = {
    infoCourse: infoCourseCartT[];
    total: number;
    totalDiscount: number;
}
