import { Rating } from "@mui/material";
import React from "react";
import { CgProfile } from "react-icons/cg";
const ReviewCard = ({ review }) => {
    const options = {
        size: "large",
        value: review.rating,
        readOnly: true,
        precision: 0.5,
    };
    return (
        <div className="border-2 border-red-500 w-[40vmax] flex flex-col justify-center items-center p-4">
            <CgProfile className="" size="4rem" />
            <p className="font-semibold f">{review.name}</p>
            <Rating {...options} />
            <span className="font-oxygen">{review.comment}</span>
        </div>
    );
};

export default ReviewCard;
