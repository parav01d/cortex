import React from 'react';
import { BehaviorSubject, Subject } from "rxjs"
import { Button } from 'View/Common';
import 'View/Component/Pagination/Pagination.css';

type ButtonProps = {
    subject$: BehaviorSubject<string | undefined>,
    total: number,
    take: number,
    page: number
};

export const Pagination = ({ subject$, total, page, take }: ButtonProps) => {
    return (
        <div className={"Pagination__List"}>
            <Button key={"back"} subject$={subject$} value={`${page - 1}`} text={`<-`} />
            {
                Array.from(Array(Math.ceil(total / take)).keys()).map((n) => (
                    <Button key={`${n + 1}`} className={(`${n + 1}` === `${page}`) ? "Button--Active" : ""} subject$={subject$} value={`${n + 1}`} text={`${n + 1}`} />
                ))
            }
            <Button key={"forward"} subject$={subject$} value={`${page + 1}`} text={`->`} />
        </div>
    )
}