import { TOfferedCourse, TQueryParams, TResponseRedux } from "../../../types";
import { baseApi } from "../../api/baseApi";


const studentCourseApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMyOfferedCourses: builder.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    args.forEach((item: TQueryParams) => {
                        params.append(item.name, item.value as string)
                    });
                }
                return {
                    url: '/offered-courses/my-offered-courses',
                    method: 'GET',
                    params: params
                }
            },
            providesTags: ['offeredCourses'],
            transformResponse: (response: TResponseRedux<TOfferedCourse[]>) => {
                return {
                    data: response.data,
                    meta: response.meta
                }
            }
        }),
        enrollCourse: builder.mutation({
            query: (data) => ({
                url: '/enrolled-courses/create-enrolled-course',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ["offeredCourses"]
        }),
        getMyEnrolledCourses: builder.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    args.forEach((item: TQueryParams) => {
                        params.append(item.name, item.value as string)
                    });
                }
                return {
                    url: '/enrolled-courses/my-enrolled-courses',
                    method: 'GET',
                    params: params
                }
            },
            transformResponse: (response: TResponseRedux<any>) => {
                return {
                    data: response.data,
                    meta: response.meta
                }
            }
        }),
    })

});

export const { useGetMyOfferedCoursesQuery, useEnrollCourseMutation, useGetMyEnrolledCoursesQuery } = studentCourseApi;