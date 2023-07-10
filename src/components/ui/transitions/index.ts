import { PropsWithChildren } from "react";
import EnterTransition from "./EnterTransition";
import RightTransition from "./RightTransition";

export type TransitionProps = PropsWithChildren & { unmount?: boolean }

export { EnterTransition, RightTransition }