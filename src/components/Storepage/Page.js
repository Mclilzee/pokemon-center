import React from "react";

function Page(props) {

  return (
    <div className={"page-number-container"}>
      <img className="previous-page-arrow" src={"./assets/icons/arrow_previous.svg"} alt={"previous arrow"}/>
      <div className={"previous-page-number"}>{props.pageNumber - 1}</div>
      <div className={"page-number"}>{props.pageNumber}</div>
      <div className={"next-page-number"}>{props.pageNumber + 1}</div>
      <img className={"next-page-arrow"} src={"./assets/icons/arrow_next.svg"} alt={"next arrow"}/>
    </div>
  );
}

export default Page;