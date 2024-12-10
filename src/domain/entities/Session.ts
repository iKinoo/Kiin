import { Moment } from "moment";
import { Day } from "./Day";

export class Session {

    private _day: Day;
    private _startHour: Moment;
    private _endHour: Moment;
    private _room: string;

    constructor(day: Day, startHour: Moment, endHour: Moment, room: string) {
        this._day = day;
        this._startHour = startHour;
        this._endHour = endHour;
        this._room = room;
    }

    get day(): Day {
        return this._day;
    }
    get startHour(): Moment {
        return this._startHour;
    }
    get endHour(): Moment {
        return this._endHour;
    }
    get room(): string {
        return this._room;
    }

}
