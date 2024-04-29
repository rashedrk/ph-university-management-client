import { TAcademicSemester } from "./academicManagement.type"

export type TSemester = {
    _id: string
    academicSemester: TAcademicSemester
    status: string
    startDate: string
    endDate: string
    minCredit: number
    maxCredit: number
    createdAt: string
    updatedAt: string
};

export type TPreRequisiteCourses = {
    course: string
    isDeleted: boolean
}

export type TCourse = {
    _id: string
    title: string
    prefix: string
    code: number
    credits: number
    preRequisiteCourses: TPreRequisiteCourses[]
    isDeleted: boolean
    __v: number
}

export type TCourses = {
    course: TCourse
    isDeleted: boolean
}