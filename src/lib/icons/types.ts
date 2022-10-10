import { FC, MouseEvent } from "react";

export type IconProps = {
  onClick?: (event: MouseEvent) => void;
};

export type Icon = FC<IconProps>;
