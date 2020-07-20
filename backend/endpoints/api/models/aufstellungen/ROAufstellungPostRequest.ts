import {ROClass} from "../shared/ROClass";
import {RORole} from "../shared/RORole";
import {ROEncounter} from "../shared/ROEncounter";

export class ROAufstellungPostRequest {
    session: string;
    body: ROAufstellungPostRequestBody;
}

export class ROAufstellungPostRequestBody {
    terminId: number;
    aufstellungen: ROPostAufstellung[];
}

export class ROPostAufstellung {
    aufstellungId?: number;
    encounterId?: ROEncounter;
    isCM?: boolean;
    elements: ROElement[];
}

export class ROElement {
    position: number;
    spielerId: number;
    classId: ROClass;
    roleId: RORole;
}
