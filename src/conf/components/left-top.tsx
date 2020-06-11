import * as React from "react";
import { FunctionComponent, ReactNode } from "react";
import { css } from "@emotion/core";
import { zIndex } from "../utils/style";

interface Props {
  children: ReactNode;
}
const LeftTop: FunctionComponent<Props> = ({ children }: Props) => (
  <div css={wrapperStyle}>
    <div css={bottomStyle}>{children}</div>
  </div>
);

export default LeftTop;

const wrapperStyle = css({
  position: "absolute",
  top: 0,
  left: 0,
  bottom: 0,
  zIndex: zIndex.base,
});

const bottomStyle = css({
  position: "absolute",
  left: 8,
  top: 8,
});
