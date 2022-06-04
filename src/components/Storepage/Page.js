import React from "react";

function Page(props) {

  const [previousNumber, setPreviousNumber] = React.useState(getPreviousNumber);
  const [nextNumber, setNextNumber] = React.useState(getNextNumber);

  function getPreviousNumber() {
    let previousNumber = props.pageNumber - 4;
    if (previousNumber < 1) {
      previousNumber = 1;
    }

    return previousNumber;
  }

  function getNextNumber() {
    let nextNumber = props.pageNumber + 4;
    if (nextNumber > props.maxPageNumber) {
      nextNumber = props.maxPageNumber;
    }

    return nextNumber;
  }

  const previousPageStyle = {
    opacity: props.pageNumber === previousNumber ? "0" : "1"
  };

  const nextPageStyle = {
    opacity: props.pageNumber === nextNumber ? "0" : "1"
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
           className={"previous-page-number"}>{getPreviousNumber()}</div>
      <div className={"page-number"}>{props.pageNumber}</div>
      <div style={nextPageStyle} onClick={props.nextPage} className={"next-page-number"}>{props.pageNumber + 4}</div>
      <img style={nextPageStyle} onClick={props.nextPage} className={"next-page-arrow"}
           src={"./assets/icons/arrow_next.svg"}
           alt={"next arrow"}/>
    </div>
  );
}

export default Page;