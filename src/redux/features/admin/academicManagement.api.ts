import { TQueryParams } from './../../../types/global.type';

import { TAcademicDepartment, TAcademicSemester, TResponseRedux } from "../../../types";
import { baseApi } from "../../api/baseApi";


const academicManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAcademicSemester: builder.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    args.forEach((item: TQueryParams) => {
                        params.append(item.name, item.value as string)
                    });
                }
                return {
                    url: '/academic-semesters',
                    method: 'GET',
                    params: params
                }
            },
            transformResponse: (response: TResponseRedux<TAcademicSemester[]>) => {
                // console.log(response);
                return {
                    data: response.data,
                    meta: response.meta
                }
            }
        }),
        addAcademicSemester: builder.mutation({
            query: (data) => ({
                url: '/academic-semesters/create-academic-semester',
                method: 'POST',
                body: data
            })
        }),
        addAcademicFaculty: builder.mutation({
            query: (data) => ({
                url: '/academic-faculties/create-academic-faculty',
                method: 'POST',
                body: data
            })
        }),
        getAcademicDepartment: builder.query({
            query: () => ({
                url: '/academic-departments',
                method: 'GET',
            }),
            transformResponse: (response: TResponseRedux<TAcademicDepartment[]>) => {
                // console.log(response);
                return {
                    data: response.data,
                    meta: response.meta
                }
            }
        }),
    })

});

export const { useGetAcademicSemesterQuery, useAddAcademicSemesterMutation, useAddAcademicFacultyMutation, useGetAcademicDepartmentQuery } = academicManagementApi;