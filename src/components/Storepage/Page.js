import React from "react";
import previousArrowIcon from "../../assets/icons/arrow_previous.svg";
import nextArrowIcon from "../../assets/icons/arrow_next.svg";

function Page(props) {

  const [nextPageNumber, setNextPageNumber] = React.useState(1);
  const [previousPageNumber, setPreviousPageNumber] = React.useState(1);

  React.useEffect(() => {
    function setPreviousNumber() {
      let previousNumber = props.pageNumber - 4;
      if (previousNumber < 1) {
        previousNumber = 1;
      }

      setPreviousPageNumber(previousNumber);
    }

    function setNextNumber() {
      let nextNumber = props.pageNumber + 4;
      if (nextNumber > props.maxPageNumber) {
        nextNumber = props.maxPageNumber;
      }

      setNextPageNumber(nextNumber);
    }

    setNextNumber();
    setPreviousNumber();
  }, [props.pageNumber, props.maxPageNumber]);


  function handleNextPageArrowClick() {
    let newPageNumber = props.pageNumber + 1;
    if (newPageNumber > props.maxPageNumber) {
      newPageNumber = props.maxPageNumber;
    }

    props.newPageNumber(newPageNumber);
  }

  function handlePreviousArrowClick() {
    let newPageNumber = props.pageNumber - 1;
    if (newPageNumber < 1) {
      newPageNumber = 1;
    }

    props.newPageNumber(newPageNumber);
  }

  function handleNextPageNumberClick() {
    props.newPageNumber(nextPageNumber);
  }

  function handlePreviousPageNumberClick() {
    props.newPageNumber(previousPageNumber);
  }

  const previousPageStyle = {
    opacity: props.pageNumber === previousPageNumber ? "0" : "1"
  };

  const nextPageStyle = {
    opacity: props.pageNumber === nextPageNumber ? "0" : "1"
  };

  const containerStyle = {
    display: props.pageNumber === 0 ? "none" : ""
  };

  return (
    <div style={containerStyle} className={"page-number-container"}>
      <img style={previousPageStyle}
           onClick={handlePreviousArrowClick}
           className="previous-page-arrow"
           src={previousArrowIcon}
           alt={"previous arrow"}
      />
      <div data-testid="previous-number"
           style={previousPageStyle}
           onClick={handlePreviousPageNumberClick}
           className={"previous-page-number"}
      >
        {previousPageNumber}
      </div>
      <div className={"page-number"}>{props.pageNumber}</div>
      <div data-testid="next-number"
           style={nextPageStyle}
           onClick={handleNextPageNumberClick}
           className={"next-page-number"}
      >
        {nextPageNumber}
      </div>
      <img style={nextPageStyle}
           onClick={handleNextPageArrowClick}
           className={"next-page-arrow"}
           src={nextArrowIcon}
           alt={"next arrow"}
      />
    </div>
  );
}

export default Page;