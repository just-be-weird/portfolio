import {
    GET_COCHE_DATA,
    SET_COCHE_DATA
} from '../actions/actionTypes';
import { updateObject } from "../Shared/Util";


const initialState = {
    current_step: {},
    title: "Tell's about your self,",
    subtitle: "This makes easy for others to identify you",
    step_completed: [{ id: 'step' }, { id: 'about' }, { id: 'experience' }, { id: 'stones' }, { id: 'projects' }, { contact: 'contact' }],
    profile_data: [
        {
            id: 0,
            count: 1,
            data: [
                {
                    info_0_0: "Country",
                    info_0_0_id: "country",
                    info_0_0_type: "text",
                    placeholder0: "Enter Country",
                    req: true,
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
                    info_1_0_val: "student",
                    info_1_0_a: true,
                    req: false,
                    status: 1,
                },
                {
                    info_1_1: "Working professional",
                    info_1_1_id: "is_working",
                    info_1_1_type: "radio",
                    info_1_1_val: "professional",
                    info_1_1_a: false,
                    req: false,
                    status: 1,
                },
                {
                    info_1_2: "Github User ID",
                    info_1_2_type: "text",
                    placeholder2: "Enter Github user ID",
                    info_1_2_id: "github_id",
                    req: false,
                    status: 0,
                },
                {
                    info_1_3: "Company",
                    info_1_3_type: "text",
                    info_1_3_id: "company",
                    req: false,
                    placeholder3: "Enter company name",
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
                    info_2_0_id: "professional_status",
                    info_2_0: {
                        label: "Professional Field",
                        q: "Please select a professional field",
                        options: [
                            "Artist",
                            "Fashion desginer",
                            "Software developer",
                            "Web app developer",
                            "Sales and marketing",
                            "Accounting professional",
                            "Teacher",
                            "Student",
                            "HR professional",
                            "Others"
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
                    info_3_0_id: "skill-set",
                    info_3_0_type: "text",
                    info_3_0: "Professional Skills",
                    placeholder0: "Add your professional skills",
                    req: false,
                    status: 0,
                }
            ]
        },
        {
            id: 4,
            count: 1,
            data: [
                {
                    info_4_0_id: "avatar",
                    info_4_0_type: "file",
                    info_4_0: "Update Photo",
                    req: false,
                    status: 0,
                }
            ]
        },
    ],
    experience: [],
    education: []
}

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_COCHE_DATA:
            return updateObject(state, payload)

        case SET_COCHE_DATA:
            return updateObject(state, payload)

        default:
            return state;
    }
}
