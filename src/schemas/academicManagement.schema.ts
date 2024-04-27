import { z } from "zod";

export const academicSemesterSchema = z.object({
    name: z.string({required_error: 'please select a Name'}),
    year: z.string({required_error: 'please select a Year'}),
    startMonth: z.string({required_error: 'please select a Start Month'}),
    endMonth: z.string({required_error: 'please select a End Month'}),
})

export const academicFacultySchema = z.object({
    name: z.string({required_error: 'please select a Name'}),
})