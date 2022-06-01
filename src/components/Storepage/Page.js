import React from "react";

function Page(props) {

  const previousPageStyle = {
    opacity: props.pageNumber === 1 ? "0" : "1"
  };

  const nextPageStyle = {
    opacity: props.pageNumber === props.maxPageNumber ? "0" : "1"
  };

  const containerStyle = {
    display: props.pageNumber === 0 ? "none" : ""
  };

  return (
    <div style={containerStyle} className={"page-number-container"}>
      <img style={previousPageStyle} onClick={props.previousPage} className="previous-page-arrow"
           src={"./assets/icons/arrow_previous.svg"}
           alt={"previous arrow"}/>
      <div style={previousPageStyle} onClick={props.previousPage}
           className={"previous-page-number"}>{props.pageNumber - 1}</div>
      <div className={"page-number"}>{props.pageNumber}</div>
      <div style={nextPageStyle} onClick={props.nextPage} className={"next-page-number"}>{props.pageNumber + 1}</div>
      <img style={nextPageStyle} onClick={props.nextPage} className={"next-page-arrow"}
           src={"./assets/icons/arrow_next.svg"}
           alt={"next arrow"}/>
    </div>
  );
}

export default Page;