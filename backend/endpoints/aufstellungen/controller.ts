import * as _aufstellung from './aufstellung';
import * as _element from './element';
import * as _roles from '../../authentication/role';
import { Request } from 'express';
import { Authentication } from 'models/Auth';
import { Encounter } from 'models/Encounter';
import { Aufstellung } from 'models/Aufstellung';
import { OkPacket } from 'mysql';
import { ControllerEndpoint } from 'models/ControllerEndpoint';

const endpoints: ControllerEndpoint[] = [
	{function: getForTermin, path: '', method: 'get', authed: true},
    {function: putSuccess, path: '/success', method: 'put', authed: true},
    {function: putCM, path: '/cm', method: 'put', authed: true},
    {function: deleteTermin, path: '', method: 'delete', authed: true},
    {function: getElement, path: '/elements', method: 'get', authed: true},
    {function: postElement, path: '/elements', method: 'post', authed: true},
    {function: copyElements, path: '/copyElements', method: 'post', authed: true},
];
export default endpoints;

async function getForTermin(req: Request, authentication: Authentication): Promise<(Aufstellung & Encounter)[]> {
    const termin = parseInt(req.query.termin as string);
    if (termin) {
        const role = await _roles.forTermin(authentication, termin);
        if (role != null) return await _aufstellung.getForTermin(termin);
    }
    return [];
}

async function putSuccess(req: Request, authentication: Authentication): Promise<OkPacket> {
    const aufstellung = req.body.aufstellung;
    const success: boolean = req.body.success;
    if (aufstellung && success != null) {
        const role = await _roles.forAufstellung(authentication, aufstellung);
        if (role > 0) return await _aufstellung.setSuccess(aufstellung, success);
    }
    return;
}

async function putCM(req: Request, authentication: Authentication): Promise<OkPacket> {
    const aufstellung = req.body.aufstellung;
    const cm: boolean = req.body.cm;
    if (aufstellung && cm != null) {
        const role = await _roles.forAufstellung(authentication, aufstellung);
        if (role > 0) return await _aufstellung.setCM(aufstellung, cm);
    }
    return;
}

async function deleteTermin(req: Request, authentication: Authentication): Promise<(Aufstellung & Encounter)[]> {
    const aufstellung: number = req.body.aufstellung;
    const termin: number = req.body.termin;
    if (aufstellung && termin) {
        const role = await _roles.forTermin(authentication, termin);
        if (role > 0) {
            return _aufstellung.delete(aufstellung).then(async () => {
                return await _aufstellung.getForTermin(termin);
            });
        } else {
            return await _aufstellung.getForTermin(termin);
        }
    }
    return [];
}

async function getElement(req: Request, authentication: Authentication): Promise<any> {
    const termin = parseInt(req.query.termin as string);
    const aufstellung = parseInt(req.query.aufstellung as string);
    if (termin) {
        const role = await _roles.forTermin(authentication, termin);
        if (role != null) return await _element.getForTermin(termin);
    } else if (aufstellung) {
        const role = await _roles.forAufstellung(authentication, aufstellung);
        if (role != null) return await _element.getForAufstellung(aufstellung);
    }
    return;
}

async function postElement(req: Request, authentication: Authentication): Promise<OkPacket> {
    const aufstellung: number = req.body.aufstellung;
    const position: number = req.body.position;
    const type: string = req.body.type;
    const value: number = req.body.value;
    if (aufstellung && position && type && (value || value === 0)) {
        const role = await _roles.forAufstellung(authentication, aufstellung);
        if (role != null) {
            if (type === "class") {
                return _element.setClass(aufstellung, position, value);
            } else if (type === "role") {
                return _element.setRole(aufstellung, position, value);
            } else if (type === "name") {
                return _element.setName(aufstellung, position, value);
            }
        }
    }
    return;
}

async function copyElements(req: Request, authentication: Authentication): Promise<OkPacket> {
    const from: number = req.body.from;
    const to: number = req.body.to;
    if (from && to) {
        const role = await _roles.forAufstellung(authentication, to);
        if (role > 0) {
            return _aufstellung.copyElements(from, to);
        }
    }
}