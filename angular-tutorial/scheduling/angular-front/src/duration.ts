import { NONE_TYPE } from "@angular/compiler";

export interface Duration{
    seconds : number | null;
    minutes : number | null;
    hours : number | null;
    days : number | null;
}

export const ZERO_DURATION : Duration = {
    seconds : null,
    minutes : null,
    hours : null,
    days : null
}