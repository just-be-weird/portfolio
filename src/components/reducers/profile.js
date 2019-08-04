import {
    GET_COCHE_DATA,
    SET_COCHE_DATA
} from '../actions/actionTypes';
import { updateObject } from "../Shared/Util";


const initialState = {
    current_step: 0,
    title: "Tell's about your self,",
    subtitle: "This makes easy for others to identify you",
    step_completed: [],
    step_meta_data: [
        {
            id: 0,
            count: 2,
            data: [
                {
                    info_0_0: "Country",
                    info_0_0_id: "country",
                    info_0_0_type: "text",
                    placeholder0: "Enter Country",
                    req: true,
                    status: 0,
                },
                {
                    
                    info_0_1: "Postal code",
                    info_0_1_type: "number",
                    info_0_1_id: "postal_code",
                    req: true,
                    placeholder1: "Enter Postal Code",
                    status: 0,
                }
            ],

        },
        {
            id: 1,
            count: 4,
            data: [
                {
                    info_1_0: "Are you a student?",
                    info_1_0_id: "is_student",
                    info_1_0_type: "radio",
                    placeholder0: "profession",
                    info_1_0_val: 'student',
                    info_1_0_a: true,
                    status: 0,
                },
                {
                    info_1_1: "Working professional",
                    info_1_1_id: "is_working",
                    info_1_1_type: "radio",
                    placeholder1: "profession",
                    info_1_1_val: 'professional',
                    info_1_1_a: false,
                    req: true,
                    status: 0,
                },
                {
                    info_1_2: "Job title",
                    info_1_2_type: "text",
                    placeholder2: "Enter Job Title",
                    info_1_2_id: "job_title",
                    req: true,
                    status: 0,
                },
                {
                    info_1_3: "Company",
                    info_1_3_type: "text",
                    info_1_3_id: "company",
                    req: false,
                    placeholder3: "Enter Company Name",
                    status: 0,
                }
            ]
        },
        {
            id: 2,
            count: 1,
            data: [
                {
                    info_2_0_type: "select",
                    info_2_0_id: "req_portfolio",
                    info_2_0: {
                        q: "Why you need portfolio",
                        options: [
                            "Hunting a job",
                            "Building a network",
                            "trying out my app",
                            "Not Sure!",
                        ],
                    },
                    req: true,
                    status: 0,
                }
            ]
        },
        {
            id: 3,
            count: 1,
            data: [
                {
                    info_3_0_id: "avatar",
                    info_3_0_type: "file",
                    info_3_0: "Add a photo",
                    status: 0,

                }
            ]
        },
    ],
}

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_COCHE_DATA:
            return updateObject(state)

        case SET_COCHE_DATA:
            return updateObject(state, payload)

        default:
            return state;
    }
}
