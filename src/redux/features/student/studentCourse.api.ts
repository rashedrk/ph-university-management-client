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
            providesTags: ['semester'],
            transformResponse: (response: TResponseRedux<TOfferedCourse[]>) => {
                return {
                    data: response.data,
                    meta: response.meta
                }
            }
        }),
    })

});

export const { useGetMyOfferedCoursesQuery } = studentCourseApi;