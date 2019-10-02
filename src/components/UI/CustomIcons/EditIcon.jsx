import React from "react";

const EditIcon = ({ icon_label, userHandle, editHandler, icon }) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            enableBackground='new 0 0 32 32'
            viewBox='0 0 32 32'
            role='img'
            data-action={icon_label}
            onClick={!userHandle && editHandler}
            className={icon}
        >
            <path d='M27 0c2.761 0 5 2.239 5 5 0 1.126-0.372 2.164-1 3l-2 2-7-7 2-2c0.836-0.628 1.874-1 3-1zM2 23l-2 9 9-2 18.5-18.5-7-7-18.5 18.5zM22.362 11.362l-14 14-1.724-1.724 14-14 1.724 1.724z' />
        </svg>
    );
};

export default EditIcon;
