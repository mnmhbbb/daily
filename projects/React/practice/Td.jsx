import React, { useCallback, memo } from "react";
import { CLICK_CELL } from "./TicTacToe";

const Td = memo(({ rowIndex, cellIndex, dispatch, cellData }) => {
  console.log("render");

  const onClickTd = useCallback(() => {
    if (cellData) {
      return;
    }
    dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex }); // 칸 클릭
  }, [cellData]);

  return <td onClick={onClickTd}>{cellData}</td>;
});

export default Td;
