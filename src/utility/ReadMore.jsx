import React, { useState } from 'react'

function ReadMore(props) {
    const {text,displayCount} = props;

    const [isReadMore, setIsReadMore] = useState(true);

    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    }
  return (
    <p className="text">
            {isReadMore ? text.slice(0, displayCount) : text}
            <span
                onClick={toggleReadMore}
                className="read-or-hide"
                style={{ color: "green" }}
            >
                {isReadMore ? "...read more" : " show less"}
            </span>
    </p>
  
  )
}

export default ReadMore;