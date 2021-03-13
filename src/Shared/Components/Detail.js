import React from "react";

const GenericDetail = ({detailValues, instance}) => {
    return (
        <>
            <h3>{detailValues.title}</h3>
            {detailValues.fields.map((field) =>
                <div>
                    <label>
                        <strong>{field.label}:</strong>
                    </label>{" "}
                    {instance[field.name]}
                </div>
            )}
        </>
    );
};

export default GenericDetail;
