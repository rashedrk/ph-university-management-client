import { TQueryParams, TResponseRedux } from "../../../types";
import { TCourse, TSemester } from "../../../types/courseManagement.type";
import { baseApi } from "../../api/baseApi";


const courseManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllRegisteredSemester: builder.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    args.forEach((item: TQueryParams) => {
                        params.append(item.name, item.value as string)
                    });
                }
                return {
                    url: '/semester-registrations',
                    method: 'GET',
                    params: params
                }
            },
            providesTags: ['semester'],
            transformResponse: (response: TResponseRedux<TSemester[]>) => {
                // console.log(response);
                return {
                    data: response.data,
                    meta: response.meta
                }
            }
        }),
        addRegisteredSemester: builder.mutation({
            query: (data) => ({
                url: '/semester-registrations/create-semester-registration',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['semester'],
        }),
        updateSemesterStatus: builder.mutation({
            query: (args) => ({
                url: `/semester-registrations/${args.id}`,
                method: 'PATCH',
                body: args.data
            }),
            invalidatesTags: ['semester'],
        }),
        getAllCourses: builder.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    args.forEach((item: TQueryParams) => {
                        params.append(item.name, item.value as string)
                    });
                }
                return {
                    url: '/courses',
                    method: 'GET',
                    params: params
                }
            },
            providesTags: ['courses'],
            transformResponse: (response: TResponseRedux<TCourse[]>) => {
                return {
                    data: response.data,
                    meta: response.meta
                }
            }
        }),
        addCourse: builder.mutation({
            query: (data) => ({
                url: '/courses/create-course',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['courses'],
        }),
        offerCourse: builder.mutation({
            query: (data) => ({
                url: '/offered-courses/create-offered-course',
                method: 'POST',
                body: data
            }),
        }),
    })

});

export const { useAddRegisteredSemesterMutation, useGetAllRegisteredSemesterQuery, useUpdateSemesterStatusMutation, useGetAllCoursesQuery, useAddCourseMutation, useOfferCourseMutation } = courseManagementApi;