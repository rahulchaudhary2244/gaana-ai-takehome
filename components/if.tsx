import { ReactNode } from "react";

type Props = {
    condition?: boolean;
    children: ReactNode;
};

export const If = ({ condition, children }: Props) => {
    if (condition) return <>{children}</>;

    return null;
};
