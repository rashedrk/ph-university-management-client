
import { TAcademicSemester, TResponseRedux } from "../../../types";
import { baseApi } from "../../api/baseApi";


const academicManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAcademicSemester: builder.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    args.forEach(item => {
                        params.append(item.name, item.value)
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
        })
    })

});

export const { useGetAcademicSemesterQuery, useAddAcademicSemesterMutation } = academicManagementApi;